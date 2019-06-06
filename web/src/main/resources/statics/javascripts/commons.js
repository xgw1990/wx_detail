///////////////////////////////////////////////////////////////////////////////
// Init Setup
///////////////////////////////////////////////////////////////////////////////

$(function () {
    // set this on so server could receive Array
    $.ajaxSetup({
        traditional: true,
        cache: true,
        complete: ajaxCompleteHandler,
        error : ajaxErrorHandler
    });

    window.Modal = function () {
        var reg = new RegExp("\\[([^\\[\\]]*?)\\]", 'igm');
        var alr = $("#ycf-alert");
        var ahtml = alr.html();

        //关闭时恢复 modal html 原样，供下次调用时 replace 用
        //var _init = function () {
        //	alr.on("hidden.bs.modal", function (e) {
        //		$(this).html(ahtml);
        //	});
        //}();

        /* html 复原不在 _init() 里面做了，重复调用时会有问题，直接在 _alert/_confirm 里面做 */

        var _alert = function (options) {
            alr.html(ahtml);	// 复原
            alr.find('.ok').removeClass('btn-success').addClass('btn-primary');
            alr.find('.cancel').hide();
            _dialog(options);

            return {
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        alr.find('.ok').click(function () { callback(true) });
                    }
                }
            };
        };

        var _confirm = function (options) {
            alr.html(ahtml); // 复原
            alr.find('.ok').removeClass('btn-primary').addClass('btn-success');
            alr.find('.cancel').show();
            _dialog(options);

            return {
                on: function (callback) {
                    if (callback && callback instanceof Function) {
                        alr.find('.ok').click(function () { callback(true) });
                        alr.find('.cancel').click(function () { callback(false) });
                    }
                }
            };
        };

        var _dialog = function (options) {
            var ops = {
                msg: "提示内容",
                title: "操作提示",
                btnok: "确定",
                btncl: "取消",
                large: false,
                ok_callback: null,
                cancel_callback: null
            };

            $.extend(ops, options);

            var html = alr.html().replace(reg, function (node, key) {
                return {
                    Title: ops.title,
                    Message: ops.msg,
                    BtnOk: ops.btnok,
                    BtnCancel: ops.btncl
                }[key];
            });

            alr.html(html);
            if (ops.large) alr.find('.modal-dialog').removeClass('modal-sm').addClass('modal-lg')
            alr.modal({
                backdrop: 'static'
            });
            alr.find(".btn-primary").click(ops.ok_callback ? ops.ok_callback : null);
            alr.find(".btn-default").click(ops.cancel_callback ? ops.cancel_callback : null);
        };

        return {
            alert: _alert,
            confirm: _confirm
        }

    }();

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    $(document).on('show.bs.modal', '.modal', function () {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            $("body").css('padding-right','0px'); //fix modal-open create padding-right move
        }, 0);
    });

    $(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
        $("body").css('padding-right','0px'); //fix modal-open create padding-right move
    });
});

///////////////////////////////////////////////////////////////////////////////
// String Utils
///////////////////////////////////////////////////////////////////////////////

// Usage: "{0} is dead, but {1} is alive! {0} {2}".format("ASP", "ASP.NET")
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

if (!String.prototype.isEmpty) {
    String.prototype.isEmpty = function() {
        var obj = this;
        return obj == null || obj == '' || obj.length == 0 || obj == undefined;
    }
}

if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
}

if (!String.prototype.encodeToSelectorName) {
    String.prototype.encodeToSelectorName = function() {
        return encodeURIComponent(this).replaceAll("%", "").replaceAll("\\(", "∆").replaceAll("\\)", "∆");
    }
}

if (!Number.prototype.toFixedSafe) {
    Number.prototype.toFixedSafe = function() {
        try {
            return this.toFixed()
        } catch (error) {
            return this;
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
// Object/Array Utils
///////////////////////////////////////////////////////////////////////////////

//判断是否为正整数
function isPositiveInteger(number) {
    var reg = /^[1-9]*[1-9][0-9]*$/;
    return reg.test(number);
}


function cleanEmptyFields(obj) {
    for (var key in obj) {
        if (obj[key] === "" || obj[key] === null || obj[key] === undefined)
            delete obj[key];
    }
    return obj;
}

/**
 * 返回数组内某元素的下标位置，（判断是否包含某元素）
 * **/
if (!Array.prototype.indexOfVal) {
    Array.prototype.indexOfVal = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;//does not have
    };
}


/**
 * 删除数组内某元素
 * **/
Array.prototype.removeVal = function(val) {
    var index = this.indexOfVal(val);
    if (index > -1) {
        this.splice(index, 1);//remove val
    }
};

/**
 * 数组内是否有重复元素
 * **/
if (!Array.prototype.isRepeat) {
    Array.prototype.isRepeat = function() {
        var target = this;
        var hash = {};
        for (var k in target) {
            if (hash[target[k]]) return true;
            hash[target[k]] = true;//
        }
        return false;
    };
}

/** 获取数组里的重复元素 **/
if (!Array.prototype.getDuplicateArr) {
    Array.prototype.getDuplicateArr = function() {
        var newArr = [];
        var target = this;
        for (var i = 0; i < target.length; i++) {
            if(newArr.indexOf(target[i]) < 0){
                newArr.push(target[i]);
            }
        }
        return newArr;
    }
}

function anyMatch(obj, predicate, callback) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && predicate(key, obj[key])) {
            if (callback) callback(key, obj[key])
            return true;
        }
    }
    return false;
}

function findAny(obj, predicate) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && predicate(obj[key])) {
            return obj[key];
        }
    }
    return null;
}

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] == searchTerm) return i;
    }
    return -1;
}

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function getSortedIndex(array, objToInsert, cmpFunc) {
    var low = 0, high = array.length

    while (low < high) {
        var mid = (low + high) >>> 1;
        if (cmpFunc(array[mid], objToInsert) <= 0) low = mid + 1;
        else high = mid;
    }
    return low;
}

///////////////////////////////////////////////////////////////////////////////
// Date Utils
///////////////////////////////////////////////////////////////////////////////

Date._parseISO = Date.parseISO;
Date.parseISO = function (s) {
    var r = null;
    if (!s) {
        return null;
    }
    try {
        r = Date.Grammar.start.call({}, s);
    } catch (e) {
        return null;
    }
    return r[0];
};

function isoDateFormatter(cellvalue, options, cellobject) {
    return cellvalue ? new Date(cellvalue).Format('yyyy-MM-dd') : "无";
}

function isoDateTimeFormatter(cellvalue, options, cellobject) {
    return cellvalue ? new Date(cellvalue).Format('yyyy-MM-dd hh:mm:ss') : "无";
}

function whiteSpaceNormalFormatter(cellvalue, options, cellobject) {
    if (cellvalue) {
        //超过长度自动换行
        return '<div style="white-space:normal;">' + cellvalue + '</div>';
    } else {
        return "";
    }
}

function whiteSpacePreLineFormatter(cellvalue, options, cellobject) {
    if (cellvalue) {
        //超过长度自动换行
        return '<div style="white-space:pre-line;">' + cellvalue + '</div>';
    } else {
        return "";
    }
}

function dictValueAndDescriptionFormatter(cellvalue, options, cellobject) {
    if (!cellvalue) return ''
    if (cellvalue.dictValue.indexOf('(') == -1) {
        return cellvalue ? "(" + cellvalue.dictValue + ")" +  cellvalue.description : "";
    } else {
        return cellvalue.dictValue
    }

}

var DEFAULT_DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2014-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2014-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

///////////////////////////////////////////////////////////////////////////////
// Network Utils
///////////////////////////////////////////////////////////////////////////////

var ladda;

function ajaxErrorHandler(jqXHR, textStatus, errorThrown) {
    if (waitingDialog) waitingDialog.hide();
    if (ladda) ladda.stop();
    if (jqXHR.status === 404) {
        toastr["error"]("无法找到请求页面 (404)");
    } else if (jqXHR.status === 401) {
        // 登录态失效
        // window.location.replace('/login');
        Modal.alert({
            msg: '登录失效, 请求失败. 如果您正在提交数据, 请不要关闭当前窗口, 可以打开一个新窗口重新登录后, 再重新尝试提交.',
            title: '提示',
            btnok: '确定'
        });
    } else if (jqXHR.status === 400) {
        toastr["error"]("请求参数错误 (400)");
    } else if (jqXHR.status === 405) {
        toastr["error"]("非法请求 (405)");
    } else if (jqXHR.status === 500) {
        var message = '';
        try {
            message = jqXHR.responseJSON.message + "(" + jqXHR.responseJSON.ret + ")";
        } catch(e) {
            message = "服务器异常 (500)";
        }
        toastr["error"](message);
    } else if (textStatus != 'abort') {
        toastr["error"]("请求失败 ({0})".format(textStatus));
    }
}

//ajax 完成之后，判断Header
function ajaxCompleteHandler(jqXHR, textStatus, errorThrown) {
    /*if (jqXHR.getResponseHeader('UN-NOTIFICATION') == 'Y') {
       console.log("---exist un-handled notification");
       loadSysNotifications();
    }*/
}

///////////////////////////////////////////////////////////////////////////////
// View Widgets/Utils
///////////////////////////////////////////////////////////////////////////////

/**
 * Build html text for bootstrap alert
 *
 * @param text
 * @param alertStyle
 */
function buildBootstrapAlert(text, alertStyle) {
    if (!alertStyle) alertStyle = "alert-info";
    return "<div class=\"alert {0} alert-dismissible fade in\" role=\"alert\">\
                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>\
            {1}\
            </div>".format(alertStyle, text);
}

/**
 * Load and prepare a form from Ajax request. This form will also
 * be submitted using Ajax post, thus response html could be feed back
 * to
 *
 * @param html
 * @param onSucceeded
 */
function loadAjaxForm(html, onSucceeded) {
    $('.ajaxForm').empty().append(html);
    $(".ajaxForm form").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        //get the action-url of the form
        var actionurl = e.currentTarget.action;
        //do your own request an handle the results
        $.post(actionurl, $(".ajaxForm form").serialize(), function(html) {
            loadAjaxForm(html, onSucceeded);
            onSucceeded();
        });
    });
}

function isSelect2Inited($obj) {
    return $obj.hasClass("select2-hidden-accessible")
}

/**
 * Initialize select2
 *
 * @param $elem
 * @param ajaxUrl
 * @param searchFieldName
 * @param options extraParamFunction (function),
 *                resultMapper (object),
 *                allowClear (boolean, default false),
 *                templateResult (function),
 *                templateSelection (function),
 *                onSelect (function),
 *                onClear (function),
 *                fixModal (boolean),
 *                placeholder (string),
 *                contextMenu (object)
 */
function createSelect2($elem, ajaxUrl, searchFieldName, options) {
    if (!options) options = {}
    if (isSelect2Inited($elem)) {
        try { $elem.select2('destroy') } catch (e) {}
    }
    $elem.select2({
        theme: "bootstrap",
        ajax: {
            url: ajaxUrl,
            dataType: 'json',
            delay: 500,
            data: function (params) {
                var originParam = {
                    page: params.page || 1, rows: 10, sidx: "", sord: "asc"
                }
                originParam[searchFieldName] = params.term;// 搜索框传过来的值
                return (options['extraParamFunction'] && typeof options['extraParamFunction'] == 'function')
                    ? $.extend(originParam, options['extraParamFunction']()) : originParam;
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                return {
                    results: (options['resultMapper'] && typeof options['resultMapper'] == 'function')
                        ? options['resultMapper'](data.rows) : data.rows,
                    pagination: {
                        more: (params.page * 10) < data.records
                    }
                }
            },
            cache: true
        },
        allowClear: (options['allowClear'] && typeof options['allowClear'] == 'boolean')
            ? options['allowClear'] : false,
        placeholder: options['placeholder']||'请选择',
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 0,
        templateResult: (options['templateResult'] && typeof options['templateResult'] == 'function')
            ? options['templateResult'] : function(data) {return data[searchFieldName]},
        templateSelection: (options['templateSelection'] && typeof options['templateSelection'] == 'function')
            ? options['templateSelection'] : function(data) {return data[searchFieldName] || data.text }
    })
    if (options['onSelect'] && typeof options['onSelect'] == 'function') {
        $elem.on("select2:select", options['onSelect'])
    }
    if (options['onClear'] && typeof options['onClear'] == 'function') {
        $elem.on("select2:unselect", options['onClear'])
    }
    if (options['onClose'] && typeof options['onClose'] == 'function') {
        $elem.on("select2:close", options['onClose'])
    }
    if (options['fixModal'] && typeof options['fixModal'] == 'boolean') {
        $elem.parent().find('.select2-container--bootstrap').removeAttr("style");
    }
    // in bootstrap dropdown, prevent dropdown from disappearing
    $elem.on("select2:open", function(){
        // select2 in feedback.js fix
        $('.select2-dropdown').css("z-index", 99999);
        $('.select2-container').click(function(e){
            e.stopPropagation();
        })
    })
    if (options['contextMenu'] && typeof options['contextMenu'] == 'object') {
        $elem.parent().contextMenu({
            selector: ".select2-container",
            items: options['contextMenu']
        });
    }
}

function updateSelect2($select2, value, name, data) {
    if (typeof value == 'object') {
        var names = name.split("x")
        $.each(value, function(i, v) {
            if ($select2.find('[value={0}]'.format(v)).length <= 0) {
                $select2.append('<option value="{0}">{1}</option>'.format(v, names[i]))
            }
        })
    } else if (value) {
        var $option = $select2.find('[value={0}]'.format(value))
        if ($option.length <= 0) {
            $select2.append('<option value="{0}">{1}</option>'.format(value, name))
        } else {
            $option.text(name)
        }
    }
    $select2.val(value).trigger("change");
    if (data) {
        $.extend(true, $select2.select2('data')[0], data)
    }
}

function clearSelect2($select2) {
    $select2.val(null).trigger("change");
}

function select2PlainTextResultMapperForNGDetailLeague(rows) {
    $.each(rows, function(i, data) {
        data.id = data.leagueValue
    })
    return rows;
}

function select2PlainTextResultMapperForNGGeneralDictionary(rows) {
    $.each(rows, function(i, data) {
        data.id = data.dictValue
    })
    return rows;
}

function select2PlainTextResultMapperForCode(rows) {
    $.each(rows, function(i, data) {
        data.id = data.code
    });
    return rows;
}

function doubleNumberFormat(value, bits) {
    if ($.isNumeric(value)) {
        return parseFloat(value).toFixed(bits || 2);
    } else {
        return value || '';
    }
}


$.fn.selectRange = function(start, end) {
    if(end === undefined) {
        end = start;
    }
    return this.each(function() {
        if('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if(this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if(this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

function generateCollapseDOM(value, btnId, contentId, linebreak) {
    return '<div id="{0}" class="panel-collapse collapse in" data-id="{1}" {2}>'
            .format(contentId, btnId, (linebreak ? 'style="white-space:normal;"' : ''))
        + ($.isArray(value) ? value.join("<br/>") : value)
        + '</div>'
        + '<a id="btn_expand_{0}"'.format(btnId)
        + 'data-toggle="collapse" aria-expanded="false" href="javascript:void(0)"'
        + 'data-target="#' + contentId + '" '
        + 'aria-controls="{0}"><span class="glyphicon glyphicon-menu-up"/></a>'.format(contentId);
}

function registerCollapseDOM($grid) {
    $grid.find('.collapse').collapse().on("show.bs.collapse", function() {
        $('#btn_expand_'+$(this).attr('data-id')+' span').removeClass("glyphicon-menu-up")
        $('#btn_expand_'+$(this).attr('data-id')+' span').addClass("glyphicon-menu-down")
    }).on("hide.bs.collapse", function() {
        $('#btn_expand_'+$(this).attr('data-id')+' span').removeClass("glyphicon-menu-down")
        $('#btn_expand_'+$(this).attr('data-id')+' span').addClass("glyphicon-menu-up")
    })
}

/**
 * @param url/link.href
 * @param [data]
 * @param [callback]
 */
function showAjaxModal(param1, param2, param3) {
    var event, url, data, callback;
    if (typeof param1 == 'object' && param1.preventDefault && param1.target) {
        event = param1;
        event.preventDefault();
        url = $(event.target).attr('href')
    } else if (typeof param1 == 'string') {
        url = param1
    }

    if (param2) {
        if (typeof param2 == 'object') {
            data = param2
        } else if (typeof param2 == 'function') {
            callback = param2
        }
    }

    if (param3 && typeof param3 == 'function') {
        callback = param3
    }

    var $ajaxContainer = $('#ajax_container');
    var cloned = $ajaxContainer.clone();
    cloned.attr('id', shortenUid());
    $ajaxContainer.after(cloned);
    var delegateFunc = function(responseText, textStatus, jqXHR) {
        if (callback) callback(responseText, textStatus, jqXHR)
        cloned.find(".ajax-modal").on('hidden.bs.modal', function(e) {
            if (e.target.parentElement === cloned[0]) cloned.remove()
        })
    };
    if (data) {
        cloned.empty().load(url, data, delegateFunc)
    } else {
        cloned.empty().load(url, delegateFunc)
    }
}


///////////////////////////////////////////////////////////////////////////////
// 获取系统通知
///////////////////////////////////////////////////////////////////////////////

var defaultNotificationPollingTime = 5 * 60 * 1000;//默认5分钟查询一次
function loadSysNotifications(interval) {
    var username = $('#current_user_name').val();
    if (username) {
        console.log("---start query notification, interval:" + (interval / (60 * 1000)) + " minutes; " + new Date().Format('yyyy-MM-dd hh:mm:ss'));
        $.ajax({
            url:'/sys/notification/get_un_handle/receiver_notification',
            type:'POST',
            dataType:'json',
            success:function(resp) {
                if (resp.ret == 0) {
                    buildNotificationContent(resp);
                } else $.messager.closeNotificationDialog();

                pollingNotification(interval);
            },
            error:function(){
                console.error("get " + username +" sys notification error");
                pollingNotification(interval);
            }
        });//end of ajax
    }
}

function pollingNotification(interval) {
    setTimeout(function() {
            loadSysNotifications(interval)
        }, interval || defaultNotificationPollingTime);
}

function refreshNotification() {
    var username = $('#current_user_name').val();
    if (username) {
        $.ajax({
            url:'/sys/notification/get_un_handle/receiver_notification',
            type:'POST',
            dataType:'json',
            success:function(resp) {
                if (resp.ret == 0) {
                    buildNotificationContent(resp);
                } else $.messager.closeNotificationDialog();
            },
            error:function(){
                console.error("get " + username +" sys notification error");
            }
        });//end of ajax
    }
}

function buildNotificationContent(resp) {
    var msgContent = "";
    if (parseInt(resp.needReplyCount) > 0) {
        var needReplyCount = '<p style="color:red;">当前您有未回复通知：<b>' + resp.needReplyCount + '</b></p>'
        msgContent += '<a href="javascript:void(0)" onclick="showUnReadNotificationModal(true)" style="cursor:pointer;">'
            + needReplyCount + '</a><br/>';
    }
    if (parseInt(resp.noReplyCount) > 0) {
        var noReplyCount = '<p>当前您有未阅读通知：<b>' + resp.noReplyCount + '</b></p>'
        msgContent += '<a href="javascript:void(0)" onclick="showUnReadNotificationModal(false)" style="cursor:pointer;">'
            + noReplyCount + '</a><br/>';
    }
    $.messager.lays(250, 160);
    $.messager.show('系统通知',  msgContent);
}

//弹框展示当前登录帐号的未读通知
function showUnReadNotificationModal(needReply) {
    showAjaxModal("/sys/notification/receiver/show_modal",
        {unHandle:true, needReply:needReply, receiver:$('#current_user_name').val()});
}


function showMineNotification() {
    showAjaxModal("/sys/notification/receiver/show_modal",
        {unHandle:true,receiver:$('#current_user_name').val()});
}

function showMineCreatedNotification() {
    showAjaxModal("/sys/notification/list/mine_modal",
        {});
}

function createSysNotification() {
    showAjaxModal("/sys/notification/create_notification", {});
}

///////////////////////////////////////////////////////////////////////////////
// 校检结果展示
///////////////////////////////////////////////////////////////////////////////

function onlyWarningInErrors(errors) {
    return !anyMatch(errors, function(key, err) {
        var level = err.level||err.errorLevel
        return level.toLowerCase() != "warning"
    })
}

function renderErrors(errors) {
    var $html = $('<div><ul id="error-general"><br/></ul></div>');

    if (Object.prototype.toString.call(errors) === '[object Array]') {
        $.each(errors, function(i, v){
            showGeneralErrorsInForm($html, v);
        })
    } else if (typeof errors == 'object') {
        for (var key in errors) {
            showGeneralErrorsInForm($html, errors[key]);
        }
    } else if (errors) showGeneralErrorsInForm($html, errors);

    return $html.html()
}

function assemableErrors(form, errors) {
    if(Object.prototype.toString.call(errors) === '[object Array]') {
        $.each(errors, function(i, v){
            if (form.find("#"+v['errorKey']+'[type!="hidden"]').length > 0) {
                showErrorsInForm(form, "#"+v['errorKey'], v);
            } else {
                showGeneralErrorsInForm(form, v);
            }
        })
    } else if (typeof errors == 'object') {
        for (var key in errors) {
            if (form.find("#"+key).length > 0) {
                showErrorsInForm(form, "#"+key, errors[key]);
            } else {
                showGeneralErrorsInForm(form, errors[key]);
            }
        }
    } else if (errors) showGeneralErrorsInForm(form, errors);
}

function clearErrorsInForm(form) {
    form.find(".has-error").removeClass("has-error");
    form.find("span.text-danger").remove();
    form.parent().find("ul#error-general").remove();
}

function showErrorsInForm(form, selector, error) {
    form.find(selector).parents(".form-group").addClass("has-error");
    if (typeof error == 'object') {
        var level = error.level||error.errorLevel||"fail"
        var errorSign = level.toLowerCase() == "warning" ? "glyphicon glyphicon-warning-sign" : "glyphicon glyphicon-remove-sign";
        var errorStyle = level.toLowerCase() == "warning" ? "text-warning" : "text-danger";
        form.find(selector).parents(".form-group").append("<span class='{0} {1}'>{2}</span>"
            .format(errorSign, errorStyle, error.errorMsg||"未知错误"));
    } else {
        form.find(selector).after("<span class='text-danger'>{0}</span>".format(error));
    }
}

function showGeneralErrorsInForm(form, error) {
    var $errorContainer = form.find("ul#error-general")
    if ($errorContainer.length == 0) {
        form.before("<ul id='error-general'><br/></ul>");
        $errorContainer = form.parent().find("ul#error-general")
    }
    if (typeof error == 'object') {
        var level = error.level||error.errorLevel||"fail"
        var errorSign = level.toLowerCase() == "warning" ? "glyphicon glyphicon-warning-sign" : "glyphicon glyphicon-remove-sign";
        var errorStyle = level.toLowerCase() == "warning" ? "text-warning" : "text-danger";
        $errorContainer.prepend("<li><span class='{0} {1}'>{2}</span></li>"
            .format(errorSign, errorStyle, error.errorKey + " : " + (error.errorMsg||"未知错误")));
    } else {
        $errorContainer.prepend("<li><span class='glyphicon glyphicon-remove-sign text-danger'>{0}</span></li>".format(error));
    }
}

function showFormFieldError($field, msg) {
    if (!$field.parent().hasClass('has-error')) {
        $field.parent().addClass("has-error")
        $field.parent().append('<span class="text-danger">{0}</span>'.format(msg))
    }
}

function removeFormFieldError($field) {
    $field.parent().removeClass("has-error")
    $field.parent().find('.text-danger').remove()
}

var FILTER_GROUP_CACHE_KEY = "SEARCH_CRITERIA"

function clearSearchFields() {
    localStorage.removeItem(FILTER_GROUP_CACHE_KEY)
    $('.filter-dropdown').find("input[type='text']").val('')
    $('.filter-dropdown').find("input[type='number']").val('')
    $('.filter-dropdown').find("select").val('')
    clearSelect2($('.filter-dropdown').find(".select2"))
}

///////////////////////////////////////////////////////////////////////////////
// Common Utils
///////////////////////////////////////////////////////////////////////////////

function copyTextToClipboard(text) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).blur().select();
    try {
        console.debug(document.execCommand('copy'))
    } catch (err) {
        alert('你的浏览器不支持复制功能');
    }
    $temp.remove();
}

function uid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function shortenUid() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function getChineseCounter(initValue) {
    return (function() {
        var privateCounter = initValue || 0;
        function increase() {
            privateCounter ++;
        }
        return {
            nextVal: function() {
                increase();
                return privateCounter;
            },
            nextChineseVal: function() {
                increase();
                return convertNumToChinese(privateCounter)
            }
        };
    })();
}

function convertNumToChinese(number) {
    if (!/^\d*(\.\d*)?$/.test(number)) { alert("Number is wrong!"); return "Number is wrong!"; }
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
    var BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
    var a = ("" + number).replace(/(^0*)/g, "").split("."), k = 0, re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0: re = BB[7] + re; break;
            case 4: if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
                re = BB[4] + re; break;
            case 8: re = BB[5] + re; BB[7] = BB[5]; k = 0; break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
        if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re; k++;
    }
    if (a.length > 1) //加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    return re;
}

function deepClone(o) {
    var _out, v, _key;
    _out = Array.isArray(o) ? [] : {};
    for (_key in o) {
        v = o[_key];
        _out[_key] = (typeof v === "object") ? deepClone(v) : v;
    }
    return _out;
}



///////////////////////////////////////////////////////////////////////////////
// Loading Dialog
///////////////////////////////////////////////////////////////////////////////

var waitingDialog = waitingDialog || (function ($) {
        'use strict';

        // Creating modal dialog's DOM
        var $dialog = $(
            '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
            '<div class="modal-dialog modal-m">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
            '<div class="modal-body">' +
            '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
            '</div>' +
            '</div></div></div>');

        return {
            /**
             * Opens our dialog
             * @param message Custom message
             * @param options Custom options:
             * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
             * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
             */
            show: function (message, options) {
                // Assigning defaults
                if (typeof options === 'undefined') {
                    options = {};
                }
                if (typeof message === 'undefined') {
                    message = '加载中……';
                }
                var settings = $.extend({
                    dialogSize: 'm',
                    progressType: '',
                    onHide: null // This callback runs after the dialog was hidden
                }, options);

                // Configuring dialog
                $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
                $dialog.find('.progress-bar').attr('class', 'progress-bar');
                if (settings.progressType) {
                    $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
                }
                $dialog.find('h3').text(message);
                // Adding callbacks
                if (typeof settings.onHide === 'function') {
                    $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                        settings.onHide.call($dialog);
                    });
                }
                // Opening dialog
                $dialog.modal();
            },
            /**
             * Closes dialog
             */
            hide: function () {
                $dialog.modal('hide');
            }
        };

    })(jQuery);

///////////////////////////////////////////////////////////////////////////////
// Biz Util Methods
///////////////////////////////////////////////////////////////////////////////

function getNameByRules(rulesJson, prefix, serialNumber) {
    var preview = '';
    $.each(rulesJson.sort(function(lhs, rhs) {return lhs.sortOrder - rhs.sortOrder}), function(i, value) {
        if (value.useKey != undefined) {
            var nameOrCode = value.useKey ? '编码' : '名称';
            var separator = value.separator && value.separator != '' ? value.separator : '';
            preview = preview + '[' + value.leagueCatalog.leagueName + ':' + nameOrCode + ']' + separator
        }
    })
    if (prefix) {
        preview = prefix + preview
    }
    if (serialNumber) {
        preview = preview + '[流水号初始值:' +serialNumber + ']'
    }
    return preview;
}

function leagueCatalogResultMapper(data) {
    $.map(data, function (item) {
        item.id = item.leagueGroup;
        return item;
    })
    return data;
}

/**
 * 产品属性网版展示对应图片
 */
function select2ImageView(resp) {
    if (resp.loading) return resp.text || '';
    var data = resp.attachment;
    var row =  $('<div class="col-md-10 " style="border: 1px solid #ccc; margin-bottom: 20px;padding:0px;"></div>');
    var itemContainer = $('<div style="float: left"></div>');
    row.append(itemContainer);
    var thumbnailImage;
    if (data.thumbnail && data.thumbnail != "") {
        thumbnailImage = '<div class="img-resp" style="height: 90px; width: 90px;"><img src="data:image/jpeg;base64,{0}"></div>'.format(data.thumbnail);
    } else {
        thumbnailImage = '<div class="img-resp" style="height: 90px; width: 90px;"><img src="/images/no_pic.jpg"></div>'
    }
    var thumbnailImageObject = $(thumbnailImage);
    itemContainer.append(thumbnailImageObject);
    if (resp.customer) {
        row.append($('<div class="col-md-8 text-hidden"><p>{0} | {1} | 客户:{2}</p><p>{3} | {4} | {5}</p></div>'
            .format(resp.code || "", resp.description || "无", resp.customer ? resp.customer.code:"无",
            resp.position.dictValue, resp.size, resp.warehourseNumber)));
    } else {
        row.append($('<div class="col-md-8 text-hidden"><p>{0}</p></div>'.format(resp.code || "")));
    }

    /*row.append($('<div style="float: right">' +
     '<a class="btn btn-danger btn-sm select2-image-delete-row" onclick="">' +
     '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
     '</a></div>'));

     row.find('.select2-image-delete-row').on('click', function(e){
     e.preventDefault();
     var parent = $(this).parent().parent();
     parent.remove();
     });*/

    return row;
}

function printStencilSelect2Formatter(data) {
    if (data.loading) return data.text;
    return select2ImageFormatter(data, data.attachment,
        '<div class="col-md-8 text-hidden"><p>{0} | {1}</p><p>客户: {2}</p></div>'
            .format(data.code, data.size||"无", data.customer?data.customer.code:"无"))
}

function attachmentSelect2Formatter(data) {
    if (data.loading) return data.text;
    return select2ImageFormatter(data, data,
        '<div class="col-md-8 text-hidden"><p>{0}</p><p>{1}</p></div>'.format(data.path, data.description || ""))
}

function select2ImageFormatter(data, attachment, labelHtml) {
    if (data.loading) return data.text;
    var row = $('<div class="row"></div>');
    var itemContainer = $('<div class="col-md-4"></div>');
    row.append(itemContainer)
    var thumbnailImage = '<div class="img-resp" style="height: 90px; width: 90px;"><img src="{0}"/></div>'.format(
        attachment && attachment.thumbnail ? "data:image/jpeg;base64,"+attachment.thumbnail
            : "/images/no_pic.jpg");
    var thumbnailImageObject = $(thumbnailImage);
    itemContainer.append(thumbnailImageObject);
    row.append(labelHtml);

    if (attachment) {
        thumbnailImageObject.on('mouseover', function(e) {
            var target = $(e.target);
            var select2Container = target.parents('.select2-container');
            if (select2Container.find("#attachment_preview").length > 0) return
            var position = target.position();
            var previewImage = '<img id="attachment_preview" src="/attachment/{0}/preview"/>'.format(attachment.handle);
            var previewImageObject = $(previewImage);
            previewImageObject.css("position", "absolute").css("z-index", 999999);
            previewImageObject.appendTo(select2Container);
            previewImageObject.on("mouseout", function(e) {
                //$(this).remove()
                previewImageObject.animate({height: "90px", width: "90px"}, 200,
                    function() { previewImageObject.remove(); }
                );
            });
        })
    }

    return row;
}

function fireDataRefreshEvent(response, categoryId) {
    if (response.ret != 0) return;

    if (response.structureProperties) {
        $(".receiver").trigger("structurePropertiesRefreshed", {
            data: response.structureProperties
        })
    }
    if (response.structureProducts) {
        $(".receiver").trigger("structureProductsRefreshed", {
            data: response.structureProducts
        })
    }
    if (response.endProducts) {
        $(".receiver").trigger("endProductsRefreshed", {
            data: response.endProducts,
            deleteEndProductId: response.deleteEndProductId,
            categoryId: categoryId
        })
    }
}

function reloadTreeGrid(grid, newData) {
    var originalGridData = grid.getGridParam('data');
    var selectedRow = grid.getGridParam('selarrrow');

    /*    // 从之前的gridData里面复制expanded状态
     $.each(newData, function(i, newRow) {
     var matchRows = originalGridData.filter(function(originalRow) {
     return newRow.id == originalRow.id
     })
     if (matchRows.length > 0) newRow.expanded = matchRows[0].expanded
     });*/

    reserveExpandedStatus(originalGridData, newData);

    // treeGrid要调用delTreeNode方法移除已经干掉的item
    var removedRows = originalGridData.filter(function(originalRow) {
        return (newData.filter(function(newRow) {return newRow.id == originalRow.id}).length == 0)
    });
    $.each(removedRows, function(i, row) {
        grid.delTreeNode(row.id);
    });
    grid.clearGridData();
    extracShowInTableFields(newData);
    grid.setGridParam({data:newData});
    grid.trigger('reloadGrid')
    grid.setSelection(selectedRow);

}

function reserveExpandedStatus(originalGridData, newData) {
    // 从之前的gridData里面复制expanded状态
    $.each(newData, function(i, newRow) {
        var matchRows = originalGridData.filter(function(originalRow) {
            return newRow.id == originalRow.id
        })
        if (matchRows.length > 0) newRow.expanded = matchRows[0].expanded
    });
}

function extracShowInTableFields(gridData) {
    $.each(gridData, function(i, rowData){
        $.each(rowData.properties, function(j, property){
            $.each(property.fields, function(k, field){
                if (field.showInTable) {
                    rowData[field.name] = field.value
                }
            })
        })
    })
}

function initFormDataAttachmentUpload(options) {
    var defaults = {
        outerContainerID:'',
        readonly:false,
        uploadUrl:'http://localhost/upload',
        formFieldName:'',
        handleName: '',
        rowId:'',
        overriddenColClass:'col-md-12',
        multiple:true,
        insertUploadComponentTemplate: function($uploadComponentTemplate) {
            $('#' + defaults.outerContainerID).find('.attachment_block').prepend($uploadComponentTemplate)
            //$('.attachment_block').prepend($attachmentViewTemplate)
        },
        appendUploadResult:null,
        beforeUpload:null
    }
    defaults = $.extend(defaults, options || {});
    if (defaults.readonly) return;

    var uploadComponent = $('#' + defaults.outerContainerID).find('.upload-component-container').clone();
    if (uploadComponent.size() == 0) uploadComponent = $('.upload-component-container').first().clone();
    //uploadComponentTemplate.removeClass('upload-component-container');
    uploadComponent.attr('id', defaults.rowId);
    uploadComponent.find('.col').removeClass('col-md-12').addClass(defaults.overriddenColClass)
    uploadComponent.find('label').text(defaults.formFieldLabel);
    uploadComponent.removeClass('hidden');
    uploadComponent.find('.file-upload-input').change(function(e) {
        e.preventDefault();
        var file = $(this)[0].files[0];
        uploadFile(defaults.uploadUrl, file, $(this).parents('.upload-component-container'), defaults.formFieldName,
            defaults.multiple, defaults.appendUploadResult, defaults.beforeUpload, defaults.handleName)
    })
    uploadComponent.find('.copy-paste-input').on('paste', function(event) {
        var items = (event.clipboardData || event.originalEvent.clipboardData).items;
        var $uploadControl = $(this).parents('.upload-component-container')
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file') {
                uploadFile(defaults.uploadUrl, item.getAsFile(), $uploadControl, defaults.formFieldName,
                    defaults.multiple, defaults.appendUploadResult, defaults.beforeUpload, defaults.handleName)
            } else if (item.kind === 'string' && item.type.match('^text/plain')) {
                item.getAsString(function (s) {
                    $.get('/attachment/' + s, function(attachment){
                        if (attachment) {
                            if (!defaults.multiple) {
                                $uploadControl.parent().find('.attachment_row').remove();
                            }
                            $uploadControl.parent().append(createAttachmentView(attachment, defaults.formFieldName, defaults.handleName))
                            $('.receiver').trigger("onAttachmentAdded", [attachment, defaults.formFieldName])
                            if (defaults.appendUploadResult) defaults.appendUploadResult(attachment, defaults.multiple)
                        } else {
                            toastr["error"]("找不到对应的附件");
                        }
                    })
                })
            }
        }
    })
    uploadComponent.find('.copy-paste-input').keyup(function(e){
        if (!(e.keyCode==86 && e.ctrlKey || e.keyCode == 17)) {
            $(this).val('')
        }
    })

    defaults.insertUploadComponentTemplate(uploadComponent);

    return uploadComponent
}

function uploadFile(uploadUrl, file, $uploadControl, submittedFormFieldName, multiple, uploadResultCallback, beforeUpload, handleName) {
    if (beforeUpload && !beforeUpload()) return;
    if (file.size > 50000000) {
        toastr["error"]("附件大小不能超过50M");
        return;
    }
    var formData = new FormData();
    if (!file.name) {
        formData.append("fileUpload", file, shortenUid()+ '-' +Date.now().toString("yyMMddHHmmss")+".png");
    } else {
        formData.append("fileUpload", file);
    }
    waitingDialog.show();
    $.ajax({
        url: uploadUrl,
        type: 'POST',
        success: function (resp) {
            $.post('/upload/attachment', {
                filePath: decodeURIComponent(resp)
            }, function(result) {
                waitingDialog.hide();
                //$uploadResultContainer.find('.copy-paste-input').removeClass('disabled')
                if (!multiple) {
                    $uploadControl.parent().find('.attachment_row').remove();
                }
                if (uploadResultCallback) {
                    uploadResultCallback(result, multiple);
                } else {
                    var br = $uploadControl.parent().find('br')
                    if (br.size() > 0) {
                        br.before(createAttachmentView(result, submittedFormFieldName, handleName))
                    } else {
                        $uploadControl.parent().append(createAttachmentView(result, submittedFormFieldName, handleName))
                    }

                }

                $('#fileDesc').val('');
                $('.receiver').trigger("onAttachmentAdded", [result, submittedFormFieldName])
                adjustSortOrder()
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            waitingDialog.hide();
            $uploadControl.find('.copy-paste-input').removeClass('disabled')
            ajaxErrorHandler(jqXHR, textStatus, errorThrown, function () {
                toastr["error"]("文件格式错误");
            });
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }, 'json');
}

function createAttachmentView(attachmentObject, submittedFormFieldName, handleName) {
    var attachmentGroupItem = $('.attachment-template').first().clone(true);
    attachmentGroupItem.addClass(submittedFormFieldName);
    attachmentGroupItem.find('.submitted_form_field').attr('name', submittedFormFieldName)
    if (attachmentObject.thumbnail) {
        attachmentGroupItem.find('.thumb').attr('src', 'data:image/jpeg;base64,' + attachmentObject.thumbnail)
    } else {
        attachmentGroupItem.find('.thumb').attr('src', '/images/no_pic.jpg')
    }
    attachmentGroupItem.find('.file-name').text(attachmentObject.fileName);
    attachmentGroupItem.find('.file-desc').text(attachmentObject.description);
    attachmentGroupItem.find('.file-desc').attr('title', attachmentObject.description);
    attachmentGroupItem.find('.file-desc-input').on('blur', function(event) {
        saveAttachmentDesc(attachmentObject.id, event.target)
    });
    attachmentGroupItem.find('.submitted_form_field')
        .attr('name', submittedFormFieldName).val(attachmentObject.id);
    attachmentGroupItem.find('.handle').attr('name', handleName).val(attachmentObject.handle);
    attachmentGroupItem.find('.download').attr('href', attachmentObject.url||('/attachment/'+attachmentObject.handle+'/img'));
    attachmentGroupItem.removeClass('hidden');
    attachmentGroupItem.removeClass('attachment-template');
    attachmentGroupItem.find('.upload-delete-row').on('click', function(e) {
        e.preventDefault();
        var parent = $(this).parents('.attachment_row');
        var removedId = parent.find('.submitted_form_field').val();
        parent.remove();
        $('.receiver').trigger("onAttachmentRemoved", [removedId, submittedFormFieldName])
    })
    attachmentGroupItem.find('.copy').off();
    attachmentGroupItem.find('.copy').click(function(){
        var rowParent = $(this).parent().parent();
        var handleText = rowParent.find(".handle").val()
        copyTextToClipboard(handleText)
        toastr["info"]("复制成功");
    })
    return attachmentGroupItem;
}

function getAttachmentIds(fieldName) {
    var attachmentIds = [];
    var attachments = $('#file_upload_container').find('input[name='+fieldName+']');
    $.each(attachments,function(index, value){
        if(value.value != "") attachmentIds.push(value.value);
    })
    return attachmentIds;
}

function getAttachmentGroupJSON(fieldName) {
    var attachmentGroupObjects = [];
    var attachments = $('#file_upload_container').find('input[name='+fieldName+']');
    $.each(attachments,function(index, value){
        if(value.value != "") {
            var attachmentGroupObject = {
                attachment:{id:value.value},
                sortOrder: $(value).parent().find('.sortOrder').val(),
                isMain: $(value).parent().find('.isMain').is(":checked")
            }
            attachmentGroupObjects.push(attachmentGroupObject)
        }
    })
    return JSON.stringify(attachmentGroupObjects)
}

function getAttachmentDOM(attachment, size) {
    if (!attachment || typeof attachment != 'object' || !attachment.handle) return ""

    return getImgDOM(attachment.thumbnail,
        "/attachment/{0}/preview".format(attachment.handle),
        "/attachment/{0}/img".format(attachment.handle),
        (attachment.description || attachment.fileName),
        size, attachment.handle)
}

function getImgDOM(thumbnail, previewUrl, downloadUrl, fileName, size, handle) {
    if (!size) size = size||90
    var imgDOM = thumbnail
        ? '<img src="data:image/jpeg;base64,{0}"/>'.format(thumbnail)
        : '<img src="{0}" onerror="this.src=\'/images/no_pic.jpg\';"/>'.format(previewUrl)
    var html = '<div class="img-resp btn-space" style="height: {0}px; width: {0}px;">'.format(size)
        + '<a href="{0}" target="_blank" data-handle="{1}">'.format(downloadUrl, handle)
        + imgDOM
        + '</a></div>'
    if (fileName) html += '<a download href="{0}">{1}</a>'.format(downloadUrl, fileName)
    return html;
}

function saveAttachmentDesc(id, input) {
    $(input).addClass('hidden')
    if ($(input).val() == $(input).parent().parent().find('.file-desc').text()) {
        $(input).parent().parent().find('.file-desc').removeClass('hidden')
        return
    }
    waitingDialog.show()

    $.post('/attachment/save_description', {id:id, description: $(input).val()}, function(resp){
        if (resp.ret == 0) {
            toastr['success']('保存成功')
            $(input).parent().find('.file-desc').removeClass('hidden')
            $(input).parent().parent().find('.file-desc').text($(input).val())
        } else {
            toastr['success']('保存失败')
        }
        waitingDialog.hide()
    })
}

function editDesc(button) {
    $(button).parent().parent().find('.file-desc-input').removeClass('hidden')
    $(button).parent().parent().find('.file-desc-input').focus()
    $(button).parent().parent().find('.file-desc-input').val($(button).parent().parent().find('.file-desc').text().trim())
    $(button).parent().parent().find('.file-desc').addClass('hidden')
}


function moveUpAtta(target) {
    var thisRow = $(target).parents('.attachment_row');
    var prevRow = thisRow.prev();
    thisRow.insertBefore(prevRow)
    adjustSortOrder()
}

function moveDownAtta(target) {
    var thisRow = $(target).parents('.attachment_row')
    var nextRow = thisRow.next()
    thisRow.insertAfter(nextRow)
    adjustSortOrder()
}

function adjustSortOrder() {
    $('#file_upload_container').children('.attachment_row').each(function(i, v){
        $(v).find('.btn-move-up').show()
        $(v).find('.btn-move-down').show()
        if (i == 0 ) $(v).find('.btn-move-up').hide()
        if (i == $('#file_upload_container').children('.attachment_row').size() - 1) $(v).find('.btn-move-down').hide()
        $(v).find('.sortOrder').val(i + 1)
    })
}

function bOMEntriesSortFunction(lhs, rhs) {
    if (lhs.sortOrder > rhs.sortOrder) return 1;
    else if (lhs.sortOrder < rhs.sortOrder) return -1;
    else if (lhs.product) {
        if (lhs.product.code > rhs.product.code) {
            return 1;
        } else if (lhs.product.code < rhs.product.code){
            return -1;
        } else {
            return 0;
        }
    }
    else if (lhs.structure) {
        if (lhs.structure.code > rhs.structure.code) {
            return 1;
        } else if (lhs.structure.code < rhs.structure.code){
            return -1;
        } else {
            return 0;
        }
    }
}

function flushServerCache(cacheName) {
    $.post('/flush_cache/' + cacheName)
}

/** 根据类别添加对照表查询条件 */
function getRootLeagueTemplateCatalogsExcludeCustom(selectedRootLeagueOption) {
    getRootLeagueTemplateCatalogs(selectedRootLeagueOption, true)
}

function getRootLeagueTemplateCatalogsIncludeCustom(selectedRootLeagueOption) {
    getRootLeagueTemplateCatalogs(selectedRootLeagueOption, false)
}

function getRootLeagueTemplateCatalogs(selectedRootLeagueOption, excludeCustom) {
    var gUrl = '/engineering/structure/list_template_catalogs?rootLeagueId='
        + selectedRootLeagueOption.params.data.id + '&excludeCustom=' + excludeCustom;
    if (selectedRootLeagueOption.params.data.structureId) {
        gUrl = gUrl + "&structureId=" + selectedRootLeagueOption.params.data.structureId;
    }
    $.get(gUrl,
        function(catalogs) {
            clearDetailLeagues();
            var row;
            $.each(catalogs, function(index, catalog) {
                if (index%2 == 0) {
                    row = $('<div class="row"></div>')
                    $('#detail_league_search_container').append(row);
                }
                addCatalog(row, catalog);
            });

            //针对个性值，加多一个文本框输入条件，放在最后
            $.each(catalogs, function(index, catalog) {
                if (!excludeCustom && catalog.custom) {
                    addCustomerInputCatalog(row, catalog);
                }
            })
        }
    )
}

function clearDetailLeagues(obj) {
    $('#detail_league_search_container').empty();
}

function addCustomerInputCatalog(container, catalog) {
    $(container).find('#q_customDetailLeague').remove();//只出现一个个性段文本框
    $(container).find('.customDetailLeagueLabel').remove();
    var col = $(
        '<div class="col-md-6">' +
        '<div class="detail">' +
        '<label class="control-label customDetailLeagueLabel">' + catalog.catalogName + '</label>' +
        '<input class="form-control detail-league" type="text" id="q_customDetailLeague" />' +
        '</div>' +
        '</div>'
    );
    $(container).append(col);
}

function addCatalog(container, catalog) {
    var col = $(
        '<div class="col-md-6">' +
        '<div class="detail">' +
        '<label class="control-label">' + catalog.catalogName + '</label>' +
        '<select class="form-control detail-league"></select>' +
        '</div>' +
        '</div>'
    );
    $(container).find('#q_customDetailLeague_select').remove();//只出现一个个性段
    $(container).append(col);
    var detailSelect =  col.find('.detail').find('select');
    //如果是个性化段,给个固定Id, 且唯一
    if (catalog.custom) {
        detailSelect.attr('id', 'q_customDetailLeague_select');
    } else {
        detailSelect.attr('name', 'league_detail_' + uid());
    }

    createSelect2(detailSelect, '/dict/league_detail?leagueGroup='+ catalog.leagueGroup, 'leagueValue', {
        allowClear: true,
        fixModal:true
    });

    if (catalog.id != 0) {
        updateSelect2(detailSelect, catalog.id,
            catalog.leagueKey + ":" + catalog.leagueValue);
    }
}

function startHeartbeat(interval) {
    setTimeout(function() {
        $.get('/heartbeat', function() {
            startHeartbeat(interval)
        })
    }, interval||(3*60*1000))
}

function doubleToFixed3Formatter(cellValue, options, rowObject) {
    if (!cellValue) return ''
    return parseFloat(cellValue).toFixed(3)
}

//历史订单产品库分析 添加额外查询条件
function analysisGroupGetExtraQryParam(bomCompositeType) {
    var params = [];
    var containerObj = $('#search_bomCompositeType_' + bomCompositeType);
    containerObj.find(".root-league").each(function(index, rootLeague){
        var obj = {};
        obj.rootLeagueId = $(rootLeague).val();
        obj.typeLeagueId = $('#type_' + $(rootLeague).attr('id').split("_")[1]).val();
        if (obj.rootLeagueId || obj.typeLeagueId) {
            params.push(obj);
        }
    });
    return params.length == 0 ? null : JSON.stringify(params);
}

function analysisGroupAddSearchBomCompositeType(target) {
    var id = $(target).attr('id');
    var bomCompositeType = id.substring(id.lastIndexOf("_") + 1, id.length);
    var containerObj = $('#search_bomCompositeType_' + bomCompositeType);
    var rowContainer = $('<div class="row"></div>');
    var rootLeagueCol = $('<div class="col-md-6"></div>');
    var rootLeagueUid = shortenUid();

    rootLeagueCol.append('<label>类别{0}</label>'.format(""));
    rootLeagueCol.append($('<select class="root-league select2" id="root_' + rootLeagueUid + '"></select>'));
    rowContainer.append(rootLeagueCol);
    var typeLeagueCol = $('<div class="col-md-6 hidden" id="label_' + rootLeagueUid + '"></div>');
    typeLeagueCol.append('<label>型号{0}</label>'.format(""));
    typeLeagueCol.append($('<select class="type-league select2" id="type_' + rootLeagueUid + '"></select>'));
    rowContainer.append(typeLeagueCol);
    containerObj.append(rowContainer);

    //init select2
    createSelect2($('#root_' + rootLeagueUid), '/dict/league_root', 'leagueValue', {
        onSelect: function(data) {
            if (data.params.data.typeCatalog) {
                $('#label_' + rootLeagueUid).removeClass('hidden');
                createSelect2($('#type_' + rootLeagueUid),
                    '/dict/league_detail?leagueGroup=' + data.params.data.typeCatalog.leagueGroup,
                    'leagueValue', {
                        allowClear:true,
                        fixModal: true
                    })
            } else {
                $('#label_' + rootLeagueUid).addClass('hidden')
            }
        },
        onClear:function() {
            $('#label_' + rootLeagueUid).addClass('hidden');
            $('#type_' + rootLeagueUid).empty();
        },
        allowClear:true,
        fixModal: true
    });
}