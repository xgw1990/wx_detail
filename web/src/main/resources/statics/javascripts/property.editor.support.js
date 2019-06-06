/** 属性字段类别 文本框 **/
var PO_PROPERTY_FIELD_TYPE_TEXT = 0;
/** 属性字段类别 数字 **/
var PO_PROPERTY_FIELD_TYPE_NUMBER = 1;
/** 属性字段类别 日期 **/
var PO_PROPERTY_FIELD_TYPE_DATE = 2;
/** 属性字段类别 对照表 **/
var PO_PROPERTY_FIELD_TYPE_NG_LEAGUE = 3;
/** 属性字段类别 网版信息 **/
var PO_PROPERTY_FIELD_TYPE_PRINT_STENCIL = 4;
/** 属性字段类别 附件信息 **/
var PO_PROPERTY_FIELD_TYPE_ATTACHMENT = 5;
/** 属性字段类别 品号 **/
var PO_PROPERTY_FIELD_TYPE_NG_PRODUCT = 6;
/** 属性字段类别 模具 **/
var PO_PROPERTY_FIELD_TYPE_MOLD = 7;
/** 属性字段类别 基础选项 (NGGeneralDictionary) **/
var PO_PROPERTY_FIELD_TYPE_GENERAL_DICTIONARY = 10;
/** 属性字段类别 多行文本框 **/
var PO_PROPERTY_FIELD_TYPE_TEXT_AREA = 11;
/** 属性字段类别 选项文本框 **/
var PO_PROPERTY_FIELD_TYPE_DICT_TEXT = 12;

var SKIPPABLE_SYMBOL = '∆'


function renderFields(property, $container, opt) {
    if (!property.fields) return;
    var $row
    $.each(property.fields, function(index, field) {
        if (index % opt.column == 0) {
            $row = $('<div class="row"></div>')
            $container.append($row)
        }

        var fieldHtml =
            '<div>' +
                '<div class="col-md-{0} field-container">'.format(12/opt.column-1) +
                    '<div class="form-group">' +
                        '<span class="restrict"></span><label class="control-label"></label>' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-1 optBtns"></div>' +
            '</div>';
        var $fieldRow = $(fieldHtml);
        $fieldRow.attr("id", "row_"+field.name.encodeToSelectorName());
        $fieldRow.find(".control-label").text(field.name + "  ");
        $fieldRow.find(".restrict").append(showRestrict(field));

        // !!!EXTEND HERE!!! 渲染字段
        if (field.type == PO_PROPERTY_FIELD_TYPE_TEXT) {
            var input = '<input class="form-control propertyField" id="input_{0}" name="{0}" value="{1}" placeholder="{2}" type="text" />'
                .format(field.name.encodeToSelectorName(), field.readableValue || field.value || "", field.extra || '')
            $fieldRow.find(".form-group").append(input);
            $row.append($fieldRow);

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_TEXT_AREA) {
            var input = '<textarea class="form-control propertyField" id="input_{0}" name="{0}" rows="5" placeholder="{2}">{1}</textarea>'
                .format(field.name.encodeToSelectorName(), field.readableValue || field.value || "", field.extra || '')
            $fieldRow.find(".form-group").append(input);
            $row.append($fieldRow);

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_NUMBER) {
            var input = '<input class="form-control propertyField" id="input_{0}" name="{0}" value="{1}" type="number" />'
                .format(field.name.encodeToSelectorName(), field.readableValue || field.value || "")
            $fieldRow.find(".form-group").append(input);
            $row.append($fieldRow);

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_DATE) {
            var input = '<input class="form-control datePicker propertyField" id="input_{0}" name="{0}" value="{1}" type="text" />'
                .format(field.name.encodeToSelectorName(), field.value || "")
            $fieldRow.find(".form-group").append(input);
            $row.append($fieldRow);
            $row.find(".datePicker").datepicker();

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_NG_LEAGUE) {
            var input = '<select id="input_{0}" name="{0}" class="form-control select2 propertyField">'
                .format(field.name.encodeToSelectorName())
            if (field.readableValue) {
                input += '<option value="{0}" selected="selected">{1}</option>'
                    .format(field.value, field.readableValue);
            }
            if (field.overwrittenReadableValue) {
                input += '<option value="{0}">{1}</option>'
                    .format(field.overwrittenValue, field.overwrittenReadableValue);
            }
            input += '</select>';
            $fieldRow.find(".form-group").append(input)
            $row.append($fieldRow);
            createSelect2($fieldRow.find("#input_"+field.name.encodeToSelectorName()), "/dict/league_detail/"+field.extra, "leagueValue", {
                allowClear: true,
                fixModal: true
            })

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_PRINT_STENCIL) {
            var input = '<select id="input_{0}" name="{0}" class="form-control select2 propertyField">'
                .format(field.name.encodeToSelectorName())
            var printImageData = JSON.parse(field.readableValue || null)
            var overwrittenPrintImageData = JSON.parse(field.overwrittenReadableValue || null)
            if (printImageData) {
                input += '<option value="{0}" selected="selected">{1}</option>'
                    .format(printImageData.printImageId, printImageData.code);
            }
            if (overwrittenPrintImageData) {
                input += '<option value="{0}">{1}</option>'
                    .format(overwrittenPrintImageData.printImageId, overwrittenPrintImageData.code);
            }
            input += '</select>';
            $fieldRow.find(".form-group").append(input);
            $row.append($fieldRow);
            var dictUrl = "/dict/print_image";
            if (opt.customerCode) dictUrl += "?customerCode=" + opt.customerCode;

            var $extraField = $('<div id="ext_print_image_{0}"><div id="list_attachment" class="row"></div><div id="list_print_stencil"></div></div>'
                    .format(field.name.encodeToSelectorName()));
            $fieldRow.find(".form-group").append($extraField);

            if (printImageData) {
                showPrintImageAttachments($container, opt, field, $extraField, printImageData.printImageId, printImageData.selectedAttachmentId)
                showPrintImagePrintStencil($extraField, printImageData.printImageCode)
            }

            createSelect2($fieldRow.find("#input_"+field.name.encodeToSelectorName()), dictUrl, "code", {
                allowClear: true,
                fixModal: true,
                templateResult: printStencilSelect2Formatter,
                onSelect: function (event) {
                    showPrintImageAttachments($container, opt, field, $extraField, event.params.data.id)
                    showPrintImagePrintStencil($extraField, event.params.data.code)
                }
            });

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_ATTACHMENT) {
            var $input = initFormDataAttachmentUpload({
                uploadUrl: opt.uploadUrl,
                formFieldName: 'attachment_'+field.name.encodeToSelectorName(),
                rowId: "group_"+field.name.encodeToSelectorName(),
                overriddenColClass: '',
                insertUploadComponentTemplate: function() {}
            }).removeClass("row")

            $fieldRow.find(".form-group").append($input);
            $row.append($fieldRow);

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_NG_PRODUCT) {
            var fieldVal = field.value || "";
            var productCode = "", count = "", countBase = "";
            if (!fieldVal.isEmpty()) {
                var arrV = fieldVal.split('|');
                productCode = arrV[0];
                count = arrV[1];
                countBase = arrV[2];
            }

            var input = '<div class="propertyField"><select id="input_{0}" name="{0}" class="form-control select2">'
                .format(field.name.encodeToSelectorName());
            if (productCode) {
                input += '<option value="{0}" selected="selected">{1}</option>'
                    .format(productCode, field.readableValue);
            }
            input += '</select>';
            input += '<input class="form-control" id="input_count_{0}" placeholder="用量" value="{1}" type="text" />'
                .format(field.name.encodeToSelectorName(), count);
            input += '<input class="form-control" id="input_countBase_{0}" placeholder="用量基数" value="{1}" type="text" />'
                .format(field.name.encodeToSelectorName(), countBase);
            input += '</div>'

            $fieldRow.find(".form-group").append(input);
            $row.append($fieldRow);
            var productUrl = "/dict/products";
            if (field.extra) {
                productUrl = "/dict/products?rootLeagueId=" + field.extra;
            }
            createSelect2($fieldRow.find("#input_" + field.name.encodeToSelectorName()), productUrl, "code", {
                allowClear: true,
                fixModal: true,
                resultMapper: function(rows) {
                    $.each(rows, function(index, data) {
                        data.id = data.code;
                    })
                    return rows;
                },
                templateResult:function (data) {
                    return data.code ? data.code + " | " + data.name + " | " + data.spec : data.text
                }
            });

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_MOLD) {
            var input = '<select id="input_{0}" name="{0}" class="form-control select2 propertyField">'
                .format(field.name.encodeToSelectorName());
            if (field.readableValue) {
                input += '<option value="{0}" selected="selected">{1}</option>'
                    .format(field.value, field.readableValue);
            }
            if (field.overwrittenReadableValue) {
                input += '<option value="{0}">{1}</option>'
                    .format(field.overwrittenValue, field.overwrittenReadableValue);
            }
            input += '</select>';
            $fieldRow.find(".form-group").append(input);
            $row.append($fieldRow);
            createSelect2($fieldRow.find("#input_"+field.name.encodeToSelectorName()), "/dict/mold", "name", {
                allowClear: true,
                fixModal: true
            })

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_GENERAL_DICTIONARY) {
            var input = '<select id="input_{0}" name="{0}" class="form-control select2 propertyField">'
                .format(field.name.encodeToSelectorName())
            if (field.readableValue) {
                input += '<option value="{0}" selected="selected">{1}</option>'
                    .format(field.value, field.readableValue);
            }
            if (field.overwrittenReadableValue) {
                input += '<option value="{0}">{1}</option>'
                    .format(field.overwrittenValue, field.overwrittenReadableValue);
            }
            input += '</select>';
            $fieldRow.find(".form-group").append(input)
            $row.append($fieldRow);
            createSelect2($fieldRow.find("#input_" + field.name.encodeToSelectorName()),
                "/dict/ng_general_dictionary?dictGroup=" + field.extra, "dictValue", {
                    allowClear: true,
                    fixModal: true
                })

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_DICT_TEXT) {
            var input = '<input class="form-control propertyField typeahead" id="input_{0}" name="{0}" value="{1}" type="text" />'
                .format(field.name.encodeToSelectorName(), field.readableValue || field.value || "")
            $fieldRow.find(".form-group").append(input);
            $row.append($fieldRow);

            var dicts = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('code'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                sufficient: 1,
                limit: 30,
                remote: {
                    url: '/dict/ng_general_dictionary?dictGroup='+field.extra,
                    transform:function(resp) {
                        return resp.rows.map(function(row) { return row.dictValue })
                    }
                }
            });
            $fieldRow.find("input").typeahead({
                hint: false,
                minLength: 0
            }, {
                limit: 30,
                source: dicts
            });
        }

        $fieldRow.find(".optBtns").append(renderEditButton(field))
        $container.find('#btn_overwrite_'+field.name.encodeToSelectorName()).on('click', function(e) {
            setOverwrittenBtnState($container, opt, field, true)
            if (field.skippable) {
                $container.find('#check_skippable_' + field.name.encodeToSelectorName()).prop('disabled', false)
                setSkipState($container, opt, field)
                setReadWriteState($container, opt, field,
                    $container.find('#check_skippable_' + field.name.encodeToSelectorName()).prop('checked'))
            } else {
                setReadWriteState($container, opt, field, false)
            }
            field.overwrittenValue = field.value
            field.overwrittenReadableValue = field.readableValue
        });
        $container.find('#btn_cancel_overwrite_'+field.name.encodeToSelectorName()).on('click', function(e) {
            field.value = field.overwrittenValue
            field.readableValue = field.overwrittenReadableValue
            field.overwrittenValue = null
            field.overwrittenReadableValue = null

            setOverwrittenBtnState($container, opt, field, false)
            if (field.skippable) {
                $container.find('#check_skippable_'+field.name.encodeToSelectorName())
                    .prop('checked', field.value == SKIPPABLE_SYMBOL)
                $container.find('#check_skippable_'+field.name.encodeToSelectorName())
                    .prop('disabled', checkFieldReadonlyByInheritance(field))
                setSkipState($container, opt, field)
            } else {
                setValue($container, opt, field, field.value, field.readableValue)
                setReadWriteState($container, opt, field, true)
            }
        });

        if (field.skippable) {
            var $skippableCheckBox = $('<span class="pull-right"><input type="checkbox" id="check_skippable_{0}"/><b>无</b></span>'
                .format(field.name.encodeToSelectorName()))
            $fieldRow.find('.control-label').after($skippableCheckBox)
            $skippableCheckBox.find('input').prop('checked', field.value == SKIPPABLE_SYMBOL)
            $skippableCheckBox.find('input').prop('disabled', checkFieldReadonlyByInheritance(field) || opt.readonly)
            $skippableCheckBox.on('click', function() {
                setSkipState($container, opt, field)
            })
            setSkipState($container, opt, field)
        } else {
            setValue($container, opt, field, field.value, field.readableValue)
            setReadWriteState($container, opt, field)
        }
        setOverwrittenBtnState($container, opt, field)
    });
}

function showPrintImageAttachments($container, opt, field, $extraField, printImageId, selectedAttachmentId) {
    $.get('/screen_print/image/attachments/'+printImageId, function(resp) {
        if (resp.ret != 0) return;
        var $imgContainer = $extraField.find("#list_attachment").empty()
        $.each(resp.attachments, function(i, attachment) {
            var $imageItem = $('<div class="col-md-3 imageItem" style="min-height:90px;"><div class="img-resp thumbnail {1}" data-attachment-id={2}><img src="/attachment/{0}/preview"/></div></div>'
                .format(attachment.handle, (attachment.id == selectedAttachmentId ? "selected-thumbnail" : ""), attachment.id))
            $imgContainer.append($imageItem)
            setReadWriteState($container, opt, field) // 调这个方法来注册thumbnail的click事件
        })
        if (!selectedAttachmentId) {
            $imgContainer.find('.img-resp:first').addClass('selected-thumbnail')
        }
    })
}

function showPrintImagePrintStencil($extraField, printImageCode) {
    $.get('/screen_print/stencil/list/data', {
        page: 1, rows: 100, sord: 'desc', sidx: '',
        printImageCode: printImageCode
    }, function(resp) {
        var stencilContainer = $extraField.find("#list_print_stencil").empty()
        if (resp.rows && resp.rows.length > 0) {
            $.each(resp.rows, function(index, printStencil) {
                stencilContainer.append('<p>网版编号:{0}  位置:{1}  仓库:{2}  数量:{3}</p>'
                    .format(printStencil.code, printStencil.position.dictValue,
                        printStencil.warehouse||'无', printStencil.count||'0'))
            })
        } else {
            stencilContainer.append('无网版')
        }
    })
}

function renderEditButton(field) {
    return  '<button type="button" class="btn btn-primary btn-sm hidden" ' +
                    'id="btn_overwrite_{0}" style="margin-top:25px;">'.format(field.name.encodeToSelectorName()) +
                '<span class="glyphicon glyphicon-edit" aria-hidden="true"></span>' +
            '</button>' +
            '<button type="button" class="btn btn-danger btn-sm hidden" ' +
                    'id="btn_cancel_overwrite_{0}" style="margin-top:25px;">'.format(field.name.encodeToSelectorName()) +
                '<span class="glyphicon glyphicon-lock" aria-hidden="true"></span>' +
            '</button>'
}

function setSkipState($container, opt, field) {
    if ($container.find('#check_skippable_'+field.name.encodeToSelectorName()).is(':checked')) {
        setValue($container, opt, field, SKIPPABLE_SYMBOL)
        $container.find('#row_'+field.name.encodeToSelectorName()).find('.control-label').addClass('glyphicon glyphicon-trash text-warning')
    } else {
        setValue($container, opt, field, field.value, field.readableValue)
        $container.find('#row_'+field.name.encodeToSelectorName()).find('.control-label').removeClass('glyphicon glyphicon-trash text-warning')
    }
    setReadWriteState($container, opt, field)
}

function setOverwrittenBtnState($container, opt, field, overwrite) {
    var fieldRow = $container.find("#row_"+field.name.encodeToSelectorName());
    if (opt.readonly || !field.inherent) { // 如果只读或不是继承的字段, 不展示特例修改按钮
        fieldRow.find('#btn_overwrite_' + field.name.encodeToSelectorName()).addClass("hidden")
        fieldRow.find('#btn_cancel_overwrite_' + field.name.encodeToSelectorName()).addClass("hidden")
    } else if (field.inherent) {
        if (overwrite == null) overwrite = !(field.overwrittenValue||'').isEmpty()
        if (overwrite) {
            fieldRow.find('#btn_overwrite_' + field.name.encodeToSelectorName()).addClass("hidden")
            fieldRow.find('#btn_cancel_overwrite_' + field.name.encodeToSelectorName()).removeClass("hidden")
        } else {
            fieldRow.find('#btn_overwrite_' + field.name.encodeToSelectorName()).removeClass("hidden")
            fieldRow.find('#btn_cancel_overwrite_' + field.name.encodeToSelectorName()).addClass("hidden")
        }
    }
}

function checkFieldReadonlyByInheritance(field) {
    return field.inherent && (field.overwrittenValue||'').isEmpty()
}

function checkFieldReadonly($container, field, opt, readonly) {
    if (opt.readonly) readonly = true;
    if (readonly == null || readonly == undefined)
        readonly = checkFieldReadonlyByInheritance(field)
            || $container.find('#check_skippable_'+field.name.encodeToSelectorName()).is(':checked')
    return readonly
}

function setReadWriteState($container, opt, field, readonly) {
    var fieldRow = $container.find("#row_"+field.name.encodeToSelectorName());
    readonly = checkFieldReadonly($container, field, opt, readonly);

    // !!!EXTEND HERE!!! 设置只读状态
    if (field.type == PO_PROPERTY_FIELD_TYPE_ATTACHMENT) {
        fieldRow.find('.file-upload-input').prop('disabled', readonly);
        fieldRow.find('.copy-paste-input').prop('disabled', readonly).toggleClass('hidden', readonly);
        fieldRow.find('.btn-file-upload').toggleClass('hidden', readonly);
        fieldRow.find('.upload-delete-row').toggleClass('hidden', readonly);
        fieldRow.find('.edit-description').toggleClass('hidden', readonly);

    } else if (field.type == PO_PROPERTY_FIELD_TYPE_PRINT_STENCIL) {
        fieldRow.find("#input_"+field.name.encodeToSelectorName()).prop('disabled', readonly);
        var $imageItem = fieldRow.find('.imageItem')
        if (readonly) {
            $imageItem.off('click')
        } else {
            $imageItem.click(function() {
                $(this).parent().find('.img-resp').removeClass('selected-thumbnail')
                $(this).find('.img-resp').addClass('selected-thumbnail')
            })
        }

    } else if (field.type == PO_PROPERTY_FIELD_TYPE_NG_PRODUCT) {
        fieldRow.find("#input_"+field.name.encodeToSelectorName()).prop('disabled', readonly);
        fieldRow.find("#input_count_"+field.name.encodeToSelectorName()).prop('disabled', readonly);
        fieldRow.find("#input_countBase_"+field.name.encodeToSelectorName()).prop('disabled', readonly);

    } else {
        fieldRow.find("#input_"+field.name.encodeToSelectorName()).prop('disabled', readonly);
    }
}

function setValue($container, opt, field, value, readableValue) {
    var $fieldRow = $container.find("#row_"+field.name.encodeToSelectorName());
    if (value == SKIPPABLE_SYMBOL) value = ''
    // !!!EXTEND HERE!!! 取值
    if (field.type == PO_PROPERTY_FIELD_TYPE_TEXT
        || field.type == PO_PROPERTY_FIELD_TYPE_TEXT_AREA
        || field.type == PO_PROPERTY_FIELD_TYPE_NUMBER
        || field.type == PO_PROPERTY_FIELD_TYPE_DATE
        || field.type == PO_PROPERTY_FIELD_TYPE_DICT_TEXT) {
        $fieldRow.find("#input_"+field.name.encodeToSelectorName()).val(value);

    } else if (field.type == PO_PROPERTY_FIELD_TYPE_NG_LEAGUE
        || field.type == PO_PROPERTY_FIELD_TYPE_MOLD
        || field.type == PO_PROPERTY_FIELD_TYPE_GENERAL_DICTIONARY) {
        $fieldRow.find("#input_" + field.name.encodeToSelectorName()).val(value);
        $fieldRow.find("#input_" + field.name.encodeToSelectorName()).trigger('change');

    } else if (field.type == PO_PROPERTY_FIELD_TYPE_NG_PRODUCT) {
        if (!value) {
            $fieldRow.find("#input_" + field.name.encodeToSelectorName()).val(null);
            $fieldRow.find("#input_" + field.name.encodeToSelectorName()).trigger('change');
            $fieldRow.find("#input_count" + field.name.encodeToSelectorName()).val('');
            $fieldRow.find("#input_countBase" + field.name.encodeToSelectorName()).val('');
        } else {
            var arrVal = value.split("|");
            $fieldRow.find("#input_" + field.name.encodeToSelectorName()).val(arrVal[0]);
            $fieldRow.find("#input_" + field.name.encodeToSelectorName()).trigger('change');
            $fieldRow.find("#input_count" + field.name.encodeToSelectorName()).val(arrVal[1]);
            $fieldRow.find("#input_countBase" + field.name.encodeToSelectorName()).val(arrVal[2]);
        }

    } else if (field.type == PO_PROPERTY_FIELD_TYPE_ATTACHMENT) {
        if (!value) {
            $fieldRow.find(".attachment_row").remove() // 把附件全删掉
        } else {
            $fieldRow.find(".attachment_row").remove() // 把附件全删掉再重新添加
            $.each(JSON.parse(readableValue || '[]'), function(i, attachment) {
                $fieldRow.find('.field-container').append(createAttachmentView(attachment, "attachment_"+field.name.encodeToSelectorName()))
            })
        }

    } else if (field.type == PO_PROPERTY_FIELD_TYPE_PRINT_STENCIL) {
        if (!value) {
            $container.find('#ext_print_image_' + field.name.encodeToSelectorName()).find('#list_attachment').empty()
            $container.find('#ext_print_image_' + field.name.encodeToSelectorName()).find('#list_print_stencil').empty()
            $fieldRow.find("#input_" + field.name.encodeToSelectorName()).val(null);
            $fieldRow.find("#input_" + field.name.encodeToSelectorName()).trigger('change');
        } else {
            var printImageData = JSON.parse(readableValue || null)
            var $extraField = $('#ext_print_image_'+field.name.encodeToSelectorName())
            if (printImageData) {
                showPrintImageAttachments($container, opt, field, $extraField, printImageData.printImageId, printImageData.selectedAttachmentId)
                showPrintImagePrintStencil($extraField, printImageData.printImageCode)
            }
        }
    }
}

function showRestrict(field) {
    switch(field.restrict) {
        case 1: return '<span class="glyphicon glyphicon glyphicon-alert text-warning"/>';
        case 2: return '<span class="glyphicon glyphicon-exclamation-sign text-danger"/>';
        default: return '';
    }
}

function saveProperty(property, $container) {
    var valueObj = {};

    $.each(property.fields, function(index, field) {
        var fieldRow = $container.find("#row_" + field.name.encodeToSelectorName());
        if (field.inherent && !field.overwrittenValue) return;

        // !!! EXTEND HERE !!!
        if (field.type == PO_PROPERTY_FIELD_TYPE_NG_PRODUCT) {
            var product = fieldRow.find("#input_" + field.name.encodeToSelectorName()).val();
            var count = fieldRow.find("#input_count" + field.name.encodeToSelectorName()).val();
            var countBase = fieldRow.find("#input_countBase" + field.name.encodeToSelectorName()).val();

            valueObj[field.name] = (product ? product : "") + "|"
                + (count ? count : "") + "|"
                + (countBase ? countBase : "");

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_PRINT_STENCIL) {
            var printImageId = fieldRow.find("#input_"+field.name.encodeToSelectorName()).val();
            var selectAttachmentId = fieldRow.find('.selected-thumbnail').attr('data-attachment-id');
            valueObj[field.name] = (printImageId||"") + "|" + (selectAttachmentId||"");

        } else if (field.type == PO_PROPERTY_FIELD_TYPE_ATTACHMENT) {
            var value = $.map(fieldRow.find('input[name="attachment_{0}"]'.format(field.name.encodeToSelectorName())),
                function(item) { return $(item).val(); }).join("|")
            valueObj[field.name] = value;

        } else {
            valueObj[field.name] = fieldRow.find("#input_"+field.name.encodeToSelectorName()).val();
            if (valueObj[field.name]) {
                valueObj[field.name] = valueObj[field.name].replaceAll("\"", "'")
            }
        }
        if (field.skippable && !valueObj[field.name]
            && $container.find('#check_skippable_'+field.name.encodeToSelectorName()).prop('checked')) valueObj[field.name] = SKIPPABLE_SYMBOL
    });

    return valueObj;
}