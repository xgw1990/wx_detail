$(function () {
    // Initialize jqGrid...
    if ($.jgrid) {
        $.extend($.jgrid.defaults, {
            // responsive: true,
            styleUI: 'Bootstrap',
            autowidth: true,
            height: '100%',
            mtype: 'GET',
            datatype: 'json',
            rowList: [10, 15, 20, 30, 50, 100, 200, 500, 1000],
            rowNum: 20,
            viewrecords: true,
            pager: '#toolBar',
            pagerpos: "left",
            recordpos: "center",
            hidegrid: false,
            sortable: {
                update: function(grid, perm) {
                    saveColumnOptions(grid, perm);
                }
            },
            regional: 'cn',
            loadtext: "加载中……",
            jsonReader: {
                root: "rows",
                page: "page",
                total: "total",
                records: "records",
                repeatitems: false,
                cell: "cell"
            },
            subGridOptions: {
                sortable: false
            },
            onInitGrid: function () {
                applyColumnOptions($(this));
                buildHeaderContextMenu($(this));
            },
            loadError: ajaxErrorHandler
        })
    }
});

//ui-jqgrid-htable 为header的class
function buildHeaderContextMenu($grid) {
    var gridId = "gbox_" + $grid[0].p.id;
    $.contextMenu('destroy',  " .headerContextMenu_" + gridId);
    $("#" + gridId + " .ui-jqgrid-htable").addClass('headerContextMenu_' + gridId);
    var callback = buildHeaderContextMenuCallback($grid);
    $.contextMenu({
        selector: "#" + gridId + " .headerContextMenu_" + gridId,
        items : {
            headerColumnClear: { name: "清除设置", callback: callback},
            separator1: "-----",
            headerColumnSet: { name: "设置表格", callback: callback }
        }
    });
}

function buildHeaderContextMenuCallback($grid) {
    return function (key, opt) {
        switch (key) {
            case "headerColumnSet": {
                $grid.jqGrid('columnChooser', {
                    done: function (perm) {
                        if (perm) {
                            $grid.jqGrid("remapColumns", perm, true);
                        }
                        saveColumnOptions($grid, perm);
                    }
                });
            } break;
            case "headerColumnClear": {
                var hideColumnsKey = getGridLocalStorageKey($grid, "hideColumns");
                if (localStorage.getItem(hideColumnsKey)) {
                    localStorage.removeItem(hideColumnsKey);
                    removeColumnPrefer(hideColumnsKey);
                }
                var colSortKey = getGridLocalStorageKey($grid, "colSort");
                if (localStorage.getItem(colSortKey)) {
                    localStorage.removeItem(colSortKey);
                    removeColumnPrefer(colSortKey);
                }
                window.location.reload();
            } break;
        }
    };
}

function setupJqGridNavbar($grid, withColumnChooser) {
    $grid.jqGrid('navGrid', $grid[0].p.pager, {add: false, edit: false, del: false, search: false, position: 'right'});
    $('.navtable').addClass("pull-right")
    if (withColumnChooser) {
        $grid.jqGrid('navButtonAdd', $grid[0].p.pager, {
            caption: "",
            title: "设置表格",
            buttonicon: "glyphicon-cog",
            onClickButton: function () {
                $grid.jqGrid('columnChooser', {
                    done: function (perm) {
                        if (perm) {
                            $grid.jqGrid("remapColumns", perm, true);
                        }
                        saveColumnOptions($grid, perm);
                    }
                });
            }
        });
    }
    $grid.jqGrid('navButtonAdd', $grid[0].p.pager, {
        caption: "",
        title: "清除设置",
        buttonicon: "glyphicon-remove-circle",
        onClickButton: function () {
            var hideColumnsKey = getGridLocalStorageKey($grid, "hideColumns");
            if (localStorage.getItem(hideColumnsKey)) {
                localStorage.removeItem(hideColumnsKey);
                removeColumnPrefer(hideColumnsKey);
            }
            var colSortKey = getGridLocalStorageKey($grid, "colSort");
            if (localStorage.getItem(colSortKey)) {
                localStorage.removeItem(colSortKey);
                removeColumnPrefer(colSortKey);
            }
            window.location.reload();
        }
    });
}

function updateColumnPrefer(columnKey, columnSet) {
    var acct = getCurrentUsername();
    if (acct) {
        $.ajax({
            url:'/account/update/grid_column_prefer',
            type:'POST',
            dataType:'json',
            data:{username: acct, columnKey:columnKey, columnSet:columnSet},
            success:function(resp) {
                if (resp.ret == 0) {
                    console.log("update grid_column_prefer success");
                } else {
                    console.log("update grid_column_prefer failed ret: "
                        + resp.ret + "  msg: " + (resp.msg || ''));
                }
            },
            error:function(){
                console.error("update grid_column_prefer error");
            }
        });//end of ajax
    }
}

function removeColumnPrefer(columnKey) {
    var acct = getCurrentUsername();
    if (acct) {
        $.ajax({
            url:'/account/remove/grid_column_prefer',
            type:'POST',
            dataType:'json',
            data:{username: acct, columnKey:columnKey},
            success:function(resp) {
                if (resp.ret == 0) {
                    console.log("remove grid_column_prefer success");
                } else {
                    console.log("remove grid_column_prefer failed ret: "
                        + resp.ret + "  msg: " + (resp.msg || ''));
                }
            },
            error:function(){
                console.error("remove grid_column_prefer error");
            }
        });//end of ajax
    }
}

function getCurrentUsername() {
    return $('#current_user_name').val();
}

function getGridLocalStorageKey(grid, suffix) {
    var gridParamKey = grid.data('grid_param_key')
    if (!gridParamKey) {
        gridParamKey = grid.attr('id')
    }
    return window.location.pathname + '∆' + gridParamKey + '∆' + suffix + '∆' + getCurrentUsername();
}

function saveColumnOptions(grid, sortPerm) {
    // don't save for subGrid
    if (!sortPerm || (grid.parents('.table').length > 0 && !grid.data('grid_param_key'))) return;

    var hideColumns = [];
    var colModel = grid.jqGrid("getGridParam", "colModel");
    $('option', '#colchooser_' + grid.attr('id')).each(function () {
        if (!$(this).is(":selected")) {
            hideColumns.push(colModel[this.value].name);
        }
    });

    var newColSort = []
    $.each(colModel, function(key, row) {
        if(row.label != undefined)
        newColSort.push(row.name)
    })

    if (hideColumns.length > 0) {
        localStorage.setItem(getGridLocalStorageKey(grid, "hideColumns"), hideColumns);
        updateColumnPrefer(getGridLocalStorageKey(grid, "hideColumns"),
            hideColumns.join(','));
    }
    if (newColSort.length > 0) {
        localStorage.setItem(getGridLocalStorageKey(grid, "colSort"), newColSort);
        updateColumnPrefer(getGridLocalStorageKey(grid, "colSort"),
            newColSort.join(','));
    }
}

function applyColumnOptions(grid) {
    var hideColumns = localStorage.getItem(getGridLocalStorageKey(grid, "hideColumns"));
    var colSort = localStorage.getItem(getGridLocalStorageKey(grid, "colSort"));

    if (hideColumns) {
        hideColumns = hideColumns.split(",")
        for (var i = 0; i < hideColumns.length; i++) {
            grid.jqGrid("hideCol", hideColumns[i]);
        }
    }

    if (colSort) {
        colSort = colSort.split(",")
        var sortRows = []
        var i=0;
        var colModel = grid.jqGrid("getGridParam", "colModel");
        $.each(colModel, function(key, row) {
            sortRows.push({
                rowName: row.name,
                idx: i++
            })
        })

        sortRows.sort(function(lhs, rhs) {
            //如果列中出现后续增加的，在此前设定的colSort中没有，则把该列排到最后
            // if (lhs.rowName == "cb" || lhs.rowName == "subgrid") return -1
            var lhsIdx
            if (lhs.rowName == "cb" || lhs.rowName == "subgrid") {
                lhsIdx = -1
            } else {
                lhsIdx = colSort.indexOf(lhs.rowName)
                if (lhsIdx < 0) lhsIdx = 99999999
            }
            var rhsIdx
            if (rhs.rowName == "cb" || rhs.rowName == "subgrid") {
                rhsIdx = -1
            } else {
                rhsIdx = colSort.indexOf(rhs.rowName)
                if (rhsIdx < 0) rhsIdx = 99999999
            }
            return lhsIdx - rhsIdx;
        })

        var sortPerm = []
        for (var i=0; i<sortRows.length; i++) {
            sortPerm.push(sortRows[i].idx)
        }

        grid.jqGrid("remapColumns", sortPerm, true);
    }
}

/**
 * 将subGrid 行默认背景颜色改为选中，以区分与相邻父表格行数据颜色
 */
function setSubGridTrBgColor(subGridId) {
    var subGrid = $('#' + subGridId);
    var ids = subGrid.jqGrid('getDataIDs');
    for (var i = 0; i < ids.length; i++) {
        //$('#' + ids[i]).css('backgroundColor','grey').toggleClass('active',false);
        $('#' + ids[i]).toggleClass('success');
    }
}

function closeModalFunc(modalId) {
    $('#' + modalId).modal('hide');
}


function yesNoFormatter(cellvalue, options, rowObject) {
    if (!cellvalue || cellvalue == false) return "<span class='glyphicon glyphicon-remove text-danger'></span>";
    else return "<span class='glyphicon glyphicon-ok text-success'></span>";
}

function decimalFormatter(cellvalue, options, cellobject) {
    return (cellvalue).toFixed(2);
}

function yesNoUnformatter(cellvalue, options, cellobject) {
    if ("否" == cellvalue) return "false";
    else return "true";
}


function customeDateTimeFormatter(cellvalue, options, rowObject) {
    if (!cellvalue) return "";
    var reggie = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{3})/;
    var dateArray = reggie.exec(cellvalue);
    return new Date(
        (+dateArray[1]),
        (+dateArray[2])-1, // Careful, month starts at 0!
        (+dateArray[3]),
        (+dateArray[4]),
        (+dateArray[5]),
        (+dateArray[6])
    ).toString(DEFAULT_DATETIME_FORMAT);
}

function enableStatusFormatter(cellvalue, options, rowObject) {
    return cellvalue == null ? ""
         : cellvalue == 0    ? "<span class='glyphicon glyphicon-ok text-success'>启用</span>"
         : cellvalue == 1    ? "<span class='glyphicon glyphicon-remove text-danger'>禁用</span>"
         : cellvalue != 'N'  ? "<span class='glyphicon glyphicon-ok text-success'>启用</span>"
                             : "<span class='glyphicon glyphicon-remove text-danger'>禁用</span>";
}

function erpEnableStatusFormatter(cellvalue, options, rowObject) {
    return cellvalue == null ? ""
         : cellvalue != 'N'  ? "<span class='glyphicon glyphicon-ok text-success'>启用</span>"
                             : "<span class='glyphicon glyphicon-remove text-danger'>禁用</span>";
}

function enableStatusUnformat(cellvalue, options, cell) {
    return $('span', cell).hasClass('text-success') ? 0 : 1;
}

function diagStatusFormatter(cellvalue, options, rowObject) {
    return cellvalue == null ? ""
         : cellvalue < 2     ? "<span class='glyphicon glyphicon-ok text-success'>正常</span>"
         : cellvalue == 2    ? "<span class='glyphicon glyphicon-warning-sign text-warning'>待完善</span>"
                             : "<span class='glyphicon glyphicon-remove-sign text-danger'>待修复</span>";
}

function errorLevelFormatter(cellvalue, options, rowObject) {
    return cellvalue == "warning" ? "<span class='glyphicon glyphicon-warning-sign text-warning'>待完善</span>"
        : "<span class='glyphicon glyphicon-remove-sign text-danger'>待修复</span>";
}

function resolveGrid(gridId) {
    var $grid
    if (gridId && typeof gridId == 'object') {
        $grid = gridId
    } else {
        if (!gridId) gridId = 'gridBody';
        $grid = $('#' + gridId)
    }
    return $grid
}

function resolveSelection(gridId) {
    var $grid = resolveGrid(gridId)
    var id = $grid.jqGrid('getGridParam', 'selrow');
    if (id) {
        return $grid.jqGrid('getRowData', id);
    } else {
        toastr["info"]("请选择一条记录");
    }
}

function resolveLocalSelection(gridId) {
    var $grid = resolveGrid(gridId)
    var id = $grid.jqGrid('getGridParam', 'selrow');
    if (id) {
        return $grid.jqGrid('getLocalRow', id);
    } else {
        toastr["info"]("请选择一条记录");
    }
}

function resolveMultiSelection(gridId, field) {
    var $grid = resolveGrid(gridId)
    var rows = $grid.jqGrid('getGridParam', 'selarrrow');
    if (rows.length <= 0) {
        toastr["info"]("请先至少选择一条记录");
        return;
    }
    var objs = [];
    for (var i = 0; i < rows.length; i++) {
        var obj = $grid.jqGrid('getRowData', rows[i]);
        objs[i] = field ? obj[field] : obj;
    }
    return objs;
}

function resolveMultiSelectionForSingle(gridId, field) {
    var $grid = resolveGrid(gridId)
    var selRow = $grid.jqGrid('getGridParam', 'selarrrow');
    if (selRow.length <= 0) {
        toastr["info"]("请先选择一条记录");
        return;
    }
    if (selRow.length > 1) {
        toastr["info"]("请勿选择多条记录");
        return;
    }
    var data = $grid.jqGrid('getRowData', selRow);
    data = field ? data[field] : data;
    return data;
}

function isJqgridInited(gridId) {
    var $grid = resolveGrid(gridId)
    return $grid && $grid.length > 0 && $grid[0].grid != undefined
}

function destroyJqgrid(gridId) {
    var $grid = resolveGrid(gridId)

    if (isJqgridInited($grid)) {
        $grid.empty();
        $grid.off()
        delete $grid[0].grid;
        $('#gbox_' + gridId).replaceWith($grid);
        return $('#' + gridId);
    }

    return $grid;
}

function editGrid(gridId) {
    var $grid = resolveGrid(gridId)
    var ids = $grid.getDataIDs();
    for (var i = 0; i < ids.length; i++) {
        $grid.editRow(ids[i]);
    }
    $grid.find('select').removeAttr('size')
    $grid.find('input[type=text]').on('click', function() { $(this).select(); })
    $grid.find('input[type=number]').on('click', function() { $(this).select(); })
}

function saveGrid(gridId) {
    var $grid = resolveGrid(gridId)
    var ids = $grid.getDataIDs();
    for (var i = 0; i < ids.length; i++) {
        $grid.saveRow(ids[i], false, 'clientArray');
    }
}

var globalJqgridLocalRowId = -1
function genGridLocalRowId() {
    return globalJqgridLocalRowId -= 1;
}

function getRowElement(gridId, rowId) {
    return $('#{0} #{1}'.format(gridId, rowId));
}

function getCellElement(gridId, rowId, fieldName) {
    var $cell = $('#{0} #{1}_{2}'.format(gridId, rowId, fieldName));
    if ($cell.length <= 0) {
        $cell = $('#{0} #{1}'.format(gridId, rowId))
            .find('[aria-describedby="{0}_{1}"]'.format(gridId, fieldName))
    }
    return $cell
}

function moveRowUp($grid) {
    var selectedRowKey = $grid.getGridParam('selrow');
    if (!selectedRowKey) {
        toastr["info"]("请选择一条记录")
        return
    }
    var previousRowKey = $grid.find("#" + selectedRowKey).prev().attr('id')
    $('#' + selectedRowKey, $grid).insertBefore($('#' + previousRowKey, $grid))
}

function moveRowDown($grid) {
    var selectedRowKey = $grid.getGridParam('selrow');
    if (!selectedRowKey) {
        toastr["info"]("请选择一条记录")
        return
    }
    var nextRowKey = $grid.find("#" + selectedRowKey).next().attr('id')
    $('#' + selectedRowKey, $grid).insertAfter($('#' + nextRowKey, $grid))
}

function cellRowsSpan(gridId, cellName) {
    var gridObj = $('#' + gridId);
    var rowIds = gridObj.getDataIDs();
    //当前显示多少条
    var length = rowIds.length;
    for (var i = 0; i < length; i++) {
        //从上到下获取一条信息
        var before = gridObj.jqGrid('getRowData', rowIds[i]);
        //定义合并行数
        var rowSpanTaxCount = 1;
        for (var j = i + 1; j <= length; j++) {
            //和上边的信息对比 如果值一样就合并行数+1 然后设置rowspan 让当前单元格隐藏
            var end = gridObj.jqGrid('getRowData', rowIds[j]);
            if (before[cellName] == end[cellName]) {
                rowSpanTaxCount++;
                gridObj.setCell(rowIds[j], cellName, '', { display: 'none' });
            } else {
                rowSpanTaxCount = 1;
                break;
            }
            //$("#" + cellName + "" + rowIds[i] + "").attr("rowspan", rowSpanTaxCount);
            //兼容有subGrid
            $("td[aria-describedby='" + gridId + "_" + cellName + "']", gridObj)
                .eq(i).attr("rowspan", rowSpanTaxCount);
        }
    }
}

function resolveCustomerInfoDynamicColModel(gridData) {
    var allProperties = {}; var allFields = false;
    $.each(gridData, function(i, rowData) {
        var properties = rowData.properties || rowData.endProduct.properties;
        $.each(properties.filter(function(property) { return property.code == 'BASICS_REQUIRMENT'}),
            function(j, property) {
            allProperties[property.code] = property
        })
    })
    return buildDynamicColModel(allProperties, allFields)
}

function resolveDynamicColModel(gridData) {
    var allProperties = {}; var allFields = false;
    $.each(gridData, function(i, rowData) {
        var properties = rowData.properties || rowData.endProduct.properties;
        $.each(properties, function(j, property) {
            allProperties[property.code] = property
        })
    })
    return buildDynamicColModel(allProperties, allFields)
}

function buildDynamicColModel(allProperties, allFields) {
    var extraColMods = [];
    var sortedProperties = [];
    $.each(allProperties, function(i, property) {
        sortedProperties.push(property)
    })
    sortedProperties.sort(function(lhs, rhs) {
        var cmp = (lhs.sortOrder||0) - (rhs.sortOrder||0);
        if (cmp != 0) return cmp;
        return lhs.code.localeCompare(rhs.code);
    })
    $.each(sortedProperties, function(i, property) {
        $.each(property.fields, function(k, field) {
            if (field.showInTable || allFields) {
                var columnName = property.code+'_'+field.name
                if (extraColMods.filter(function(col){return col.name == columnName}).length == 0) {
                    var fieldColMod = {
                        label: field.name,
                        name: columnName,
                        width: 120,
                        bizType: property.bizType,
                        formatter: function(cellValue, options, rowObject) {
                            var properties = rowObject.properties || rowObject.endProduct.properties;
                            var matchProperty = properties
                                .filter(function(p) { return p.code == property.code})
                            matchProperty = matchProperty.length > 0 ? matchProperty[0] : null
                            if (matchProperty) {
                                var matchedField = matchProperty.fields
                                    .filter(function(f) { return f.name == field.name})
                                matchedField = matchedField.length > 0 ? matchedField[0] : {}
                                var fieldValue = ''
                                if (matchedField.type == 5) {
                                    var attachments = JSON.parse(matchedField.readableValue||'[]')
                                    $.each(attachments, function(i, attachment) {
                                        var clonedAttachment = deepClone(attachment)
                                        clonedAttachment.fileName = false
                                        fieldValue += getAttachmentDOM(clonedAttachment, 60)
                                    })
                                    if (fieldValue.length > 0) {
                                        var uid = shortenUid()
                                        var contentId = "content_attachment_"+uid;
                                        var btnId = "toggle_attachment_"+uid;
                                        fieldValue = generateCollapseDOM(fieldValue, btnId, contentId)
                                    }

                                } else {
                                    fieldValue = matchedField.readableValue || matchedField.value
                                }
                                if (field.skippable) {
                                    if (fieldValue == "∆") {
                                        fieldValue = '<span class="text-danger">没有</span>'
                                    } else if (!fieldValue) {
                                        fieldValue = '<span class="text-warning"><b>待补充</b></span>'
                                    }
                                }
                                return fieldValue || ''
                            }
                            return '';
                        }}
                    extraColMods.push(fieldColMod)
                }
            }
        })
    })
    return extraColMods;
}

function buildPropertiesFormatter(idFieldName) {
    return function(cellValue, options, rowObject) {
        if (cellValue) return cellValue

        var fieldsSummary = ''
        $.each(rowObject.properties, function(j, property) {
            fieldsSummary += '<p class="text-info"><strong>'+property.name+'</strong></p>'
            $.each(property.fields, function(i, field) {
                if (!field.value || field.value == '∆') return
                if (field.type == 5) {
                    var attachmentDOM = '';
                    var attachments = JSON.parse(field.readableValue || '{}')
                    $.each(attachments, function(j, attachment) {
                        var popoverTemplate = '\'<div class="popover infinite-width" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>\''
                        var linkTemplate = '<a download href="/attachment/{0}/img" data-toggle="popover" data-trigger="hover" data-placement="left" data-html="true"  data-container="body" title="产品属性内容" data-content="{1}" data-template='+popoverTemplate+'>{2}</a>'
                        attachmentDOM = attachmentDOM + linkTemplate.format(attachment.handle, '<img src=\'data:image/jpeg;base64,' + attachment.thumbnail + '\' class=\'thumb\'  height=\'90px\'/\>', attachment.fileName)
                        if (j != attachments.length - 1) attachmentDOM = attachmentDOM + '&nbsp;'
                    })
                    fieldsSummary = fieldsSummary +
                        '<span style="color:red; margin-left:7px;">' + field.name + ':</span>' + attachmentDOM;
                } else {
                    if (field.simplerReadableValue) {
                        fieldsSummary += '<span style="color:red; margin-left:7px;">' + field.name + ':</span>' + field.simplerReadableValue;
                    }
                }
            })
        })

        var btnId = "prop_toggle" + (rowObject[idFieldName]);
        var contentId = "prop_content_" + (rowObject[idFieldName]);
        return generateCollapseDOM(fieldsSummary, btnId, contentId, true)
    }
}

var expandState = false
function expandTreeGrid(treeGridId) {
    var $grid = resolveGrid(treeGridId)
    var treeGridData = $grid.getGridParam('data');
    $.each(treeGridData, function(idx, rowData){
        var localRowData = $grid.getLocalRow(rowData.id)
        if (expandState && $grid.getNodeChildren(localRowData).length != 0) {
            $grid.expandRow(localRowData)
            $grid.expandNode(localRowData)
        } else {
            $grid.collapseRow(localRowData)
            $grid.collapseNode(localRowData)
        }
    })
    expandState = !expandState
}