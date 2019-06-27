/*
* Written by:     prosurfer
* function:       消息提示js库
* Created Date:   2010-07-01
* Modified Date:  2010-07-05
*/
var _M = {};
var fixed = true;
function _gid(id) {
    return document.getElementById ? document.getElementById(id) : null;
}
//计算相对位置
function getposOffset(what, offsettype, HaveMarginleft) {
    var totaloffset = (offsettype == "left") ? what.offsetLeft : what.offsetTop;
    var parentEl = what.offsetParent;
    while (parentEl != null) {
        totaloffset = (offsettype == "left") ? totaloffset + parentEl.offsetLeft : totaloffset + parentEl.offsetTop;
        parentEl = parentEl.offsetParent;
    }
    if (HaveMarginleft && $.browser.msie && $.browser.version == 7) {
        return (totaloffset - 162);
    }
    return totaloffset;
}


function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
function addResizeEvent(func) {
    var oldonload = window.onresize;
    if (typeof window.onresize != 'function') {
        window.onresize = func;
    } else {
        window.onresize = function () {
            oldonload();
            func();
        }
    }
}

//清除错误提示
_M.MsgNo = function (id, dom) {
    if (id != null && id != "")
        $("#" + id).remove();
    if (dom)
        $(dom).nextAll(".check_tips").remove();
    return;
}

//错误提示框
_M.ErrMsg = function (id, tit, tag, dom) {
    if (id != null && id != "") {
        if ($("#errorMsg_" + id)[0]) {
            $("#errorMsg_" + id).html("<p>" + tit + "</p><i></i>");
        }
        else if ($("#errorMsg2_" + id)[0]) {
            $("#errorMsg2_" + id).html("<div class=\"check_tips\" ><p>" + tit + "</p><i></i></p>");
        }
        else if (tag)
            $("#" + id).after("<div class=\"check_tips\" id=\"errorMsg_" + id + "\"><p>" + tit + "</p><i></i></div>");
        else {
            $("#" + id).parent().append("<div class=\"check_tips\" id=\"errorMsg_" + id + "\"><p>" + tit + "</p><i></i></div>");
        }
    }
    if (dom)
        $(dom).parent().append("<div class=\"check_tips\"><p>" + tit + "</p><i></i></div>");
    return;
}

//引导提示框
//_M.CueMsg = function(id, tit) {
//if ($("#cueMsg_" + id)[0]) {
//        $("#cueMsg_" + id).html("<p>" + tit + "</p><i></i><q></q>");
//    }
//    else
//        $("#" + id).after("<div class=\"flaot_tips_left\"  id=\"cueMsg_" + id + "\"><p><span>" + tit + "</span></p><q></q></div>");
//    return;
//}

//营销建议
_M.Advice = function (id, content) {
    $("#" + id).css('display', 'block');
    _gid(id).innerHTML = "<div class=\"top_tips\">" + content + "<i></i><a href=\"javascript:void(0);\" onclick=\"_M.CloseMS();return false;\" class=\"btn_close\">关闭</a></div>";
}

_M.CloseMS = function () {
    $('.top_tips').slideUp('');
}
//警告提示带关闭
_M.Alerts = function (id, content) {
    $("#" + id).css('display', 'block');
    _gid(id).innerHTML = "<div class=\"top_tips_w\">" + content + "<i></i><a href=\"javascript:void(0);\" onclick=\"$('#" + id + "').css('display','none');return false;\" class=\"btn_close\">关闭</a></div>";
}
//引导提示
_M.CueMsgSmall = function (id, content) {
    $("#" + id).css('display', 'block');
    _gid(id).innerHTML = "<div class=\"alert_tips\"><div> " + content + "<i></i>    </div>    </div>";
}
//使DIV位于屏幕顶部
_M.SetDivTop = function (id, HTML, showID, resizeEvent, marginleft) {
    if (!_gid(showID))
        $(HTML).prependTo("body");
    _gid(showID).style.zIndex = "10001";

    _M.SetOnTop(id, showID, marginleft);
    addResizeEvent(resizeEvent);

    window.onscroll = function () {
        _M.SetOnTop(id, showID, marginleft);
    }
    setTimeout("_M.MsgNo('" + showID + "');window.onscroll=null;", 3000);
}

//处于顶部的滚屏计算
_M.SetOnTop = function (gid, pid, marginleft) {
    if (_gid(pid)) {
        _gid(pid).style.position = "absolute";
        if (gid && _M.page.HideTopH() < getposOffset(_gid(gid), "top")) {
            _gid(pid).style.top = getposOffset(_gid(gid), "top") + "px";
        }
        else {
            _gid(pid).style.top = _M.page.HideTopH() + "px";
        }
        _M.SetMiddleW(_gid(pid), marginleft);
    }
}
//标题提示框，有id定位，没id浮动
_M.TitMsg = function (tit, id, NoNeedleft) {
    var HTML = "<div class=\"title_tips\" id=\"BitDoMsg\">" + tit + "<i></i></div>";
    var marginleft = 0;
    if (typeof NoNeedleft == "undefined")
        marginleft = 81;
    else
        marginleft = NoNeedleft;
    var resizeFun = function () { _M.SetMiddleW(_gid("BitDoMsg"), marginleft); }
    _M.SetDivTop(id, HTML, "BitDoMsg", resizeFun, marginleft);
}

//校验提示有id定位，没id浮动
_M.Check = function (tit, id, NotNeedLeft) {
    var HTML = "<div class=\"fault_tips\"  id=\"BitCheckMsg\">" + tit + "</div>";
    var marginleft = 0;
    if (typeof NoNeedleft == "undefined")
        marginleft = 81;
    else
        marginleft = NoNeedleft;
    var resizeFun = function () { _M.SetMiddleW(_gid("BitCheckMsg"), marginleft); }
    _M.SetDivTop(id, HTML, "BitCheckMsg", resizeFun, marginleft);
}
//警告
_M.Notice = function (tit, id, NoNeedLeft) {
    var HTML = "<div class=\"top_tips_w\" id=\"BitAlertMsg\">" + tit + "<i></i></div>";
    var marginleft = 0;
    if (typeof NoNeedleft == "undefined")
        marginleft = 81;
    else
        marginleft = NoNeedleft;
    var resizeFun = function () { _M.SetMiddleW(_gid("BitAlertMsg"), marginleft); }
    _M.SetDivTop(id, HTML, "BitAlertMsg", resizeFun, marginleft);
}
var noneTime = null;
//随手帮助
_M.Help = function (obj, tit, left, NoMarginleft) {
    if (noneTime)
        clearTimeout(noneTime);
    $("#showHelpMsg").remove();
    var OutHtml = "<div class=\"float_tips_up\"  id=\"showHelpMsg\"  style=\"POSITION: absolute;\"  onMouseOver=\"if (isMouseLeaveOrEnter(event, this)) clearTimeout(noneTime);\" onmouseout=\"if (isMouseLeaveOrEnter(event, this))_M.MsgNo('showHelpMsg');\"><p>" + tit + "</p><b></b><q></q></div>";
    $("body").append(OutHtml);
    obj.onmouseout = function () { noneTime = setTimeout("_M.MsgNo('showHelpMsg');", 500); };
    _gid("showHelpMsg").style.top = (getposOffset(obj, "top") + 20) + "px";
    var ItLeft = (typeof left == "undefined" || left == "") ? 0 : left;
    var haveMarginleft = (typeof NoMarginleft == "undefined") ? true : NoMarginleft;
    _gid("showHelpMsg").style.left = (getposOffset(obj, "left", haveMarginleft) - 15 + ItLeft) + "px";
    _gid("showHelpMsg").style.zIndex = "8000";
    //_M.FullIframe();
    //_M.Close();
    return;
}
//_M.Help = function(obj, tit, left, NoNeedleft) {
//    if (noneTime)
//        clearTimeout(noneTime);
//    $("#showHelpMsg").remove();
//    var OutHtml = "<div class=\"float_tips_up\"  id=\"showHelpMsg\"  style=\"POSITION: absolute;display:none\"><p>" + tit + "</p><b></b><q></q></div>";
//    $("body").append(OutHtml);
//    obj.onmouseout = function() { clearTimeout(noneTime); _M.MsgNo('showHelpMsg'); };
//    _gid("showHelpMsg").style.zIndex = "8000";
//    if (typeof NoNeedleft == "undefined")
//        _M.IsIe7SouceNoMarginLeft(_gid("showHelpMsg"), "-162px");

//    var ItLeft = (typeof left == "undefined" || left == "") ? 0 : left;
//    var x = (getposOffset(obj, "left") - 15 + ItLeft);
//    var y = (getposOffset(obj, "top") + 20);
//    setTimeout("_M.HelpTimeOut(_gid('showHelpMsg')," + x + "," + y + ");", 200);
//    //_M.FullIframe();
//    //_M.Close();
//    return;
//}
_M.HelpTimeOut = function (obj, x, y) {
    if (obj) {
        obj.style.display = "block";
        obj.style.top = y + "px";
        obj.style.left = x + "px";
    }
}
//带倒计时提示框left为微调，Needleft为处于框架里的左移
_M.ShowTimeMsg = function (obj, tit, time, left, NoNeedleft) {
    var timeint = parseInt(time);
    if (timeint > 0) {
        timeint = (time) * 1000;
    }
    $("#showtimeMsg").remove();
    var OutHtml = "<div class=\"float_tips_up\" style=\"POSITION: absolute;\" id=\"showtimeMsg\" onMouseOver=\"if (isMouseLeaveOrEnter(event, this)) _M.timeFunc.stop();\" onMouseOut=\"if (isMouseLeaveOrEnter(event, this)) _M.timeFunc.go();\" ><p><em>" + tit + "</em>[<a href=\"javascript:void(0);\" onclick=\"$('#showtimeMsg').remove();\">关闭</a>]";
    if (timeint > 0) {
        OutHtml += "（<a id=\"showtimeMsg_num\">" + time + "</a>秒后自动关闭）";
    }
    OutHtml += "</p> <b></b><q></q></div>";
    $("body").append(OutHtml);
    obj.onmouseout = function () { _M.timeFunc.go(); };
    _gid("showtimeMsg").style.top = (getposOffset(obj, "top") + 20) + "px";
    var ItLeft = (typeof left == "undefined" || left == "") ? 0 : left;
    var haveMarginleft = (typeof NoNeedleft == "undefined") ? true : NoNeedleft;
    _gid("showtimeMsg").style.left = (getposOffset(obj, "left", haveMarginleft) - 15 + ItLeft) + "px";
    _gid("showtimeMsg").style.zIndex = "8001";
    if (timeint > 0) {
        _M.timeFunc.start(time + 1);
    }
    return;
}
//判断用户鼠标离开或进入(兼容方法)
function isMouseLeaveOrEnter(e, handler) {
    if (e.type != 'mouseout' && e.type != 'mouseover') return false;
    var reltg = e.relatedTarget ? e.relatedTarget :
	e.type == 'mouseout' ? e.toElement : e.fromElement;
    while (reltg && reltg != handler) reltg = reltg.parentNode;
    return (reltg != handler);
}

//时间执行
_M.timeFunc = {}
_M.timeFunc.stop = function () {
    _M.timeFunc.IsRun = false;
    return;
}
_M.timeFunc.IsRun = null;
_M.timeFunc.index = null;
_M.timeFunc.go = function () {
    _M.timeFunc.IsRun = true;
    _M.timeFunc.start(_M.timeFunc.index);
}
_M.timeFunc.start = function (i) {
    _M.timeFunc.index = i;
    if (!_M.timeFunc.IsRun)
        return null;
    _M.timeFunc.index = i;
    i--;
    if (i == 0) {
        _M.timeFunc.IsRun = false;
        $('#showtimeMsg').remove();
        return null;
    }
    if (_gid("showtimeMsg_num"))
        _gid("showtimeMsg_num").innerHTML = i;
    setTimeout("_M.timeFunc.start(" + i + ");", 1000);
}

//
_M.Show = function (id, handid) {
    $("#" + id).css('display', 'block');
    $("#" + id).css('width', $("#" + id).width() + 'px');
    _M.pos(_gid(id));
    _M.mask();

    //$("#M_Confirm").fadeIn(600);
    _M.resizeOn(id);
    _M.Drag(id, handid);
    //return false;
}
var _M_resizeTimer;
_M.OldWidth = document.documentElement.clientWidth;

//确认提示1
_M.ConfirmDel = function (obj, content, smallText, Title, NoNeedC, unFunStr) {
    if ($('#M_Confirm')[0]) {
        $('#M_Confirm').remove();
    }
    //smallText作废
    if (typeof Title == "undefined")
        Title = "确认删除";
    if (content && content != "" && (!NoNeedC))
        content = "确认要删除“" + content + "”吗？";
    else if (NoNeedC) {
        content = content;
    }
    else
        content = "";

    //hanl需求
    //var unFun = "";
    var closeStr = "";
    var NeedClosMask = true;
    if (unFunStr) {
        closeStr = unFunStr;
    }
    else {
        closeStr = "_M.Close();";
    }
    var h = obj.href.replace(/'/g, '\\\''); ;

    var AlertHtml = "<div class=\"alert\" id=\"M_Confirm\">        <div class=\"alert_blc\">            <div class=\"alert_title\" id=\"M_ConfirmHand\"><h3>" + Title + "</h3></div>            <div class=\"alert_info\"> <div class=\"alert_confirm\"><p>" + content + "</p><i></i></div> </div>            <div class=\"btns\">                <a href=\"#\" onclick=\"return false;\" class=\"submit\"><input type=\"submit\" value=\"确定\" onclick=\"$('#M_Confirm').remove();" + closeStr + "window.location.href='" + h + "';\"  /></a>                <a href=\"#\" onclick=\"return false;\" class=\"cancel\"><input type=\"button\" value=\"取消\" onclick=\"$('#M_Confirm').css('display','none');" + closeStr + "\" ></a>            </div>            <span class=\"more\"><a class=\"alert_close\" href=\"javascript:void(0);\" onclick=\"$('#M_Confirm').remove();" + closeStr + "return false;\" title=\"关闭\">关闭</a></span>        </div>    </div>";
    $("body").append(AlertHtml);
    $("#M_Confirm").css('width', '416px');
    _M.pos(_gid("M_Confirm"));
    _M.mask();

    _M.resizeOn("M_Confirm");
    _M.Drag("M_Confirm", "M_ConfirmHand");
    return false;
}

//批量确认提示
_M.ConfirmDels = function (str, num, funStr, smallText, Title, unFunStr) {
    if ($('#M_Confirms')[0]) {
        $('#M_Confirms').remove();
    }
    var content = "确认要删除";
    var bigTit = "确认删除";
    if (Title) {
        bigTit = Title;
    }
    if (str && str != "")
        content += "“" + str + "”";
    if (num > 1) {
        content += "等";
        content += num + "条信息";
        content += "吗？";
    }
    else if (num == -1) {
        content = str;
    }
    var unFun = "";
    if (unFunStr) {
        unFun = unFunStr;
    }
    var AlertHtml = "<div class=\"alert\" id=\"M_Confirms\">        <div class=\"alert_blc\">            <div class=\"alert_title\" id=\"M_ConfirmHands\"><h3>" + bigTit + "</h3></div>            <div class=\"alert_info\"><div class=\"alert_confirm\"><p>" + content + "</p><i></i></div>  </div>              <div class=\"btns\">                <a href=\"#\" onclick=\"return false;\" class=\"submit\"><input type=\"submit\" value=\"确定\" onclick=\"$('#M_Confirms').remove();_M.Close();" + funStr + ";\"  /></a>                <a href=\"#\" onclick=\"return false;\" class=\"cancel\"><input type=\"button\" value=\"取消\" onclick=\"$('#M_Confirms').css('display','none');_M.Close();" + unFun + "\" ></a>            </div>            <span class=\"more\"><a class=\"alert_close\" href=\"javascript:void(0);\" onclick=\"$('#M_Confirms').remove();_M.Close();return false;\" title=\"关闭\">关闭</a></span>        </div>    </div>";
    $("body").append(AlertHtml);
    $("#M_Confirms").css('width', '416px');
    _M.pos(_gid("M_Confirms"));
    _M.mask();

    _M.resizeOn("M_Confirms");
    _M.Drag("M_Confirms", "M_ConfirmHands");
    //return false;
}

//确认提示2
_M.Confirm = function (tit, content, h) {
    if ($('#M_Confirm')[0]) {
        $('#M_Confirm').remove();
    }

    var AlertHtml = "<div class=\"alert\" id=\"M_Confirm\">        <div class=\"alert_blc\">            <div class=\"alert_title\" id=\"M_ConfirmHand\"><h3>" + tit + "</h3></div>            <div class=\"alert_info\"> " + content + " </div>            <div class=\"btns\">                <a href=\"#\" onclick=\"return false;\" class=\"submit\"><input type=\"submit\" value=\"确定\" onclick=\"$('#M_Confirm').remove();_M.Close();" + h + ";\"  /></a>                <a href=\"#\" onclick=\"return false;\" class=\"cancel\"><input type=\"button\" value=\"取消\" onclick=\"$('#M_Confirm').css('display','none');_M.Close();\" ></a>            </div>            <span class=\"more\"><a class=\"alert_close\" href=\"javascript:void(0);\" onclick=\"$('#M_Confirm').remove();_M.Close();\" title=\"关闭\">关闭</a></span>        </div>    </div>";
    $("body").append($(AlertHtml));
    $("#M_Confirm").css('width', '416px');
    _M.pos(_gid("M_Confirm"));
    _M.mask();

    _M.resizeOn("M_Confirm");
    _M.Drag("M_Confirm", "M_ConfirmHand");
    //return false;
}

//确认提示
_M.Alert = function (str, tit, url, fun, Icon) {
    if ($('#M_Alert')[0]) {
        $('#M_Alert').remove();
    }
    var toURL = "";
    if (typeof tit == "undefined" || tit == "")
        tit = "系统提示";
    if (url)
        toURL = "window.location.href='" + url + "';return false;";
    if (fun) {
        toURL = fun + ";return false;";
    }
    var IconStr = "";
    if (Icon == 1) {
        IconStr = "  alert_suc";
    }
    var AlertHtml = "<div class=\"alert\" id=\"M_Alert\">        <div class=\"alert_blc\">            <div class=\"alert_title\" id=\"M_AlertHand\"><h3>" + tit + "</h3></div>            <div class=\"alert_info\"><div class=\"alert_confirm" + IconStr + "\"><p>" + str + "</p><b>&nbsp;</b><i></i></div>  </div>            <div class=\"btns\">                <a href=\"#\" onclick=\"return false;\" class=\"submit\"><input type=\"submit\" value=\"确定\" onclick=\"$('#M_Alert').remove();_M.Close();" + toURL + "\"  /></a>  </div>            <span class=\"more\"><a class=\"alert_close\" href=\"javascript:void(0);\" onclick=\"$('#M_Alert').remove();_M.Close();return false;\" title=\"关闭\">关闭</a></span>        </div>    </div>";
    $("body").append($(AlertHtml));
    $("#M_Alert").css('width', '416px');
    _M.pos(_gid("M_Alert"));
    _M.mask();

    _M.resizeOn("M_Alert");
    _M.Drag("M_Alert", "M_AlertHand");
    return;
}
////成功提示
//_M.ShowSuccess = function(tit, smalltit,content) {
//    if ($('#M_ShowSucess')[0]) {
//        $('#M_ShowSucess').remove();
//    }
//    if (typeof tit == "undefined" || tit == "")
//        tit = "系统提示";
//    var AlertHtml = "<div class=\"sucz alert\" id=\"M_ShowSucess\">	<div class=\"fc \">		<div class=\"fc_blc\" id=\"M_ShowSucessHand\">            <h3>" + smalltit + "</h3>            <p>" + content + "</p>            <i></i>        </div>	<div class=\"btns\">                <a href=\"#\" onclick=\"return false;\" class=\"submit\"><input type=\"submit\" value=\"关闭\" onclick=\"$('#M_ShowSucess').remove();_M.Close();\" /></a>  </div><span class=\"more\"><a class=\"alert_close\" href=\"javascript:void(0);\" onclick=\"$('#M_ShowSucess').remove();_M.Close();return false;\" title=\"关闭\">关闭</a></span>   </div></div>";
//    $("body").append($(AlertHtml));
//    $("#M_ShowSucess").css('width', '516px');
//    _M.pos(_gid("M_ShowSucess"));
//    _M.mask();

//    _M.resizeOn("M_ShowSucess");
//    _M.Drag("M_ShowSucess", "M_ShowSucessHand");
//    return;
//}
_M.Include = function (url, tit, width, height) {
    if ($('#M_Include')[0]) {
        $('#M_Include').remove();
    }
    if (typeof tit == "undefined")
        tit = "系统提示";
    if (!width) {
        width = 580;
    }
    if (!height) {
        height = 700;
    }
    var AlertHtml = "<div class=\"alert\" id=\"M_Include\" style=\"width:" + width + "px;overflow:hidden;\">        <div class=\"alert_blc\">            <div class=\"alert_title\" id=\"M_IncludeHand\"><h3>" + tit + "</h3></div>            <div id=\"_DialogDiv\"></div><span class=\"more\"><a class=\"alert_close\" href=\"javascript:void(0);\" onclick=\"_M.CloseIframe();return false;\" title=\"关闭\">关闭</a></span>        </div>    </div>";
    $("body").append($(AlertHtml));
    var obj_div = document.createElement("div");
    obj_div.id = "iframe_div";
    if (url.indexOf("?") != -1) {
        url += "&rd=" + Math.random();
    }
    else {
        url += "?rd=" + Math.random();
    }
    obj_div.innerHTML = " <iframe src='" + url + "' id='_DialogFrame' width=\"" + (width - 2) + "\" height=\"" + height + "\" style=\"width:" + (width - 2) + "px;height:" + height + "px\" allowTransparency='true'  ' frameborder='0' style=\"background-color: #transparent; border:none;\"></iframe>";
    //兼容ie6
    $("#_DialogDiv").html(obj_div);
    $("#_DialogFrame")[0].src = url;
    _M.pos(_gid("M_Include"));
    _M.mask();

    _M.resizeOn("M_Include");
    _M.Drag("M_Include", "M_IncludeHand");
    //return false;
}

_M.CallBack = function (fun) {
    eval(fun);
}
_M.CloseIframe = function () {
    $('#_DialogFrame').remove();
    $('#M_Include').remove(); _M.Close();
}
_M.GetSmallOnBigY = function (BigId, smalldiv_height) {
    var _y = 0;
    var h_height = _M.page.HideTopH();
    var s_height = getposOffset(_gid(BigId), "top");
    var height = _gid(BigId).offsetHeight;

    var v_height = $(window).height(); //可视body区域高去掉状态栏

    if (h_height == 0) {//无卷轴
        if (height + s_height >= v_height) {
            _y = (v_height - s_height) / 2 - smalldiv_height / 2;
        }
        else {
            _y = height / 2 - smalldiv_height / 2;
        }
    }
    else if (h_height > 0) {//有卷轴
        if (s_height + height > h_height + v_height && s_height < h_height) { //整体横跨屏幕
            _y = v_height / 2 - smalldiv_height / 2 + h_height - s_height;
        }
        else if (height + s_height > v_height + h_height) {//整体处于屏幕下方
            _y = (v_height + h_height - s_height) / 2 - smalldiv_height / 2;
        }
        else if (s_height < h_height) {//整体处于屏幕上方
            _y = (s_height + height - h_height) / 2 - smalldiv_height / 2 + (h_height - s_height);
        }
        else {
            _y = height / 2 - smalldiv_height / 2;
        }
    }
    if (_y < 5) {
        _y = 5;
    }

    if (_y + smalldiv_height > height) {
        _y = height - smalldiv_height - 5;
    }
    return _y;
}
//加载中
_M.Load = function (id, alertId, loadingStr, NoMarginleft) {
    var loading = "";
    if (typeof loadingStr == "undefined" || loadingStr == "")
        loading = "正在加载....";
    else
        loading = loadingStr;
    //指定ID
    if (id && (!alertId)) {
        _gid(id).innerHTML = "<div class=\"float_tips\"><p><em class=\"loading\"><i></i>" + loading + "</em></p><b></b></div>";
        return;
    }

    if ($('#TLoading')[0]) {
        $('#TLoading').remove();
    }
    //弹框内部
    if (alertId) {

        var smalldiv_width = 232; //要弹出的Div高

        var x = _gid(alertId).offsetWidth / 2 - smalldiv_width / 2;
        var y = _M.GetSmallOnBigY(alertId, 74);


        if (id) {
            $("#" + id).css("position", "absolute");
            //$("#" + id).css("display", "block");//浩兵需要
            var haveMarginleft = (typeof NoMarginleft == "undefined") ? true : NoMarginleft;
            x += getposOffset(_gid(alertId), "left", haveMarginleft);
            y += getposOffset(_gid(alertId), "top");
            $("#" + id).css("top", y + "px");
            $("#" + id).css("left", x + "px");
        }
        else {
            $("#" + alertId).css('position', 'relative');
            if (!_gid("TLoading"))
                $("#" + alertId).append("<div class=\"float_tips\" id=\"TLoading\" style=\"position:absolute;\"><p><em class=\"loading\" id=\"TLoadingStr\"><i></i>" + loading + "</em></p><b></b></div>");
            $("#TLoading").css("top", y + "px");
            $("#TLoading").css("left", x + "px");
            $("#TLoadingStr").html("<i></i>" + loading);
            $("#TLoading").css("display", "block");
        }
        return;
    }
    //整体页面
    $("body").append($("<div class=\"float_tips\" id=\"TLoading\" style=\"z-index:10015\"><p><em class=\"loading\"><i></i>" + loading + "</em></p><b></b></div>"));
    _M.pos(_gid("TLoading"));
}
//未选择提示
_M.ErrorMsg = function (id, content, alertId) {
    $("#" + id).css('display', 'block');
    if (id && (!alertId)) {
        _gid(id).innerHTML = "<div class=\"float_tips\" id=\"ErrorMsg1\"><p><em class=\"warning\"><i></i>" + content + "</em></p><b></b><a href=\"javascript:void(0);\" onclick=\"$('#ErrorMsg1').remove();return false;\" class=\"btn_close\">关闭</a></div>";
        return;
    }
    if (alertId) {
        var smalldiv_width = 230;
        var x = _gid(alertId).offsetWidth / 2 - smalldiv_width / 2;
        var y = _M.GetSmallOnBigY(alertId, 70);

        if (id) {
            $("#" + id).css("position", "absolute");
            //$("#" + id).css("display", "block");
            var haveMarginleft = (typeof NoMarginleft == "undefined") ? true : NoMarginleft;
            x += getposOffset(_gid(alertId), "left", haveMarginleft);
            y += getposOffset(_gid(alertId), "top");
            $("#" + id).css("top", y + "px");
            $("#" + id).css("left", x + "px");
        }
        else {
            if (!_gid("ErrorMsg2")) {
                $("#" + alertId).after("<div class=\"float_tips\" id=\"ErrorMsg2\"  style=\"position:absolute;\"><p><em class=\"warning\" id=\"ErrorMsgContent\"><i></i>" + content + "</em></p><b></b><a href=\"javascript:void(0);\" onclick=\"$('#ErrorMsg2').remove();$('#popIframeSmall').remove();return false;\" class=\"btn_close\">关闭</a></div>");
            }
            $("#ErrorMsg2").css("top", y + "px");
            $("#ErrorMsg2").css("left", x + "px");
            $("#ErrorMsgContent").html("<i></i>" + content);
            $("#ErrorMsg2").css("display", "block");
        }
    }
}
_M.EditMsg = function (obj, id, left, top, NoMarginleft) {
    $("#" + id).css('display', 'block');
    $("#" + id).css("position", "absolute");
    var ItLeft = (typeof left == "undefined" || left == "") ? 0 : left;
    var ItTop = (typeof top == "undefined" || top == "") ? 0 : top;
    var haveMarginleft = (typeof NoMarginleft == "undefined") ? true : NoMarginleft;
    _gid(id).style.left = (getposOffset(obj, "left", haveMarginleft) - 80 + ItLeft) + "px";
    _gid(id).style.top = (getposOffset(obj, "top") - 10 + ItTop) + "px";
    _gid(id).style.zIndex = "10012";
}

//关闭调用
_M.Close = function () {
    $('#BitAutoMask').remove();
    $('#popIframe').remove();
    window.onresize = null;
}
_M.resizeOn = function (id) {
    var oldonload = window.onresize;
    if (typeof window.onresize != 'function') {
        window.onresize = function () {
            if (_M.OldWidth != _M.page.width()) {
                if (!_M_resizeTimer) {
                    _M_resizeTimer = setTimeout("_M.resize(_gid('" + id + "'))", 100); //控制调用方法的时间间隔
                }
                _M_resizeTimer = null;
            }
            return false;
        };
    } else {
        window.onresize = function () {
            oldonload();
            if (_M.OldWidth != _M.page.width()) {
                if (!_M_resizeTimer) {
                    _M_resizeTimer = setTimeout("_M.resize(_gid('" + id + "'))", 100); //控制调用方法的时间间隔
                }
                _M_resizeTimer = null;
            }
            return false;
        }
    }
}

_M.resize = function (p) {
    _M.mask();
    if (p)
        _M.pos(p);
    //ie6需要
    _M.OldWidth = _M.page.width();
    return false;
}

////IE6浮动代码
//_M.IsIe6Souce = function(o, type) {
//    if ($.browser.msie && $.browser.version == 6) {
//        _gid("BitDoMsg").style.position = "absolute";
//    }
//}

_M.IsIe7SouceNoMarginLeft = function (o, leftpx) {
    if ($.browser.msie && $.browser.version == 7 && o) {
        o.style.marginLeft = leftpx;
    }
}

//定位弹窗
_M.pos = function (p) {
    var t = 10;
    if (!fixed) {
        p.className = p.className + " fixed";
        p.style.position = "fixed";
        if ($.browser.msie && $.browser.version == 6) {
            p.style.position = "absolute";
        }
    }
    _M.SetMiddleH(p);
    _M.SetMiddleW(p);
    p.style.zIndex = 10009;
}

//黑屏计算
//如果有FLASH则需要设置flash的透明<param name="wmode" value="transparent"> ie  wmode="transparent"    firefox

_M.mask = function (opacityValue) {
    if ($('#BitAutoMask')[0]) {
        $('#BitAutoMask').remove();
        $('#popIframe').remove();
    }
    var opactiy = 0.3;
    if (opacityValue)
        opactiy = opacityValue;
    var popCss = "background:#000;opacity:" + opactiy + ";-ms-filter:\'progid:DXImageTransform.Microsoft.Alpha(opacity=" + (opactiy * 100) + ")\'; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=" + (opactiy * 100) + "); position:absolute;left:0;top:0;overflow:hidden;";
    if (!_gid("BitAutoMask"))
        $("<div id=\"BitAutoMask\" style=\"" + popCss + "\"></div>").appendTo("body");
    $('#BitAutoMask').css("height", _M.page.theight() + 'px');
    $('#BitAutoMask').css("width", _M.page.twidth() + 'px');
    $('#BitAutoMask').css("position", "absolute");
    $('#BitAutoMask').css("zIndex", 10008);
    $('#BitAutoMask')[0].style.opacity = opactiy.toString();
    $('#BitAutoMask')[0].style.filter = 'alpha(opacity=' + (opactiy * 100) + ')';

    _M.FullIframe();
}
_M.FullIframe = function () {
    var popCss = _M.FullCSS();
    var pop_Iframe;
    if (!_gid("popIframe")) {
        pop_Iframe = document.createElement("iframe");
        pop_Iframe.id = "popIframe";
        document.getElementsByTagName("body")[0].appendChild(pop_Iframe);
    } else {
        pop_Iframe = _gid("popIframe");
    }
    pop_Iframe.style.cssText = popCss;
    pop_Iframe.style.zIndex = "10007";
    pop_Iframe.style.height = _M.page.theight() + "px";
    pop_Iframe.style.width = (parseInt(_M.page.twidth()) - 5) + "px";
}
_M.FullCSS = function () {
    return "opacity:0;-ms-filter:\'progid:DXImageTransform.Microsoft.Alpha(opacity=0)\'; filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0); position:absolute;left:0;top:0;overflow:hidden;";
}
_M.IframeFloor = function (Id) {
    if ($('#popIframeSmall')[0]) {
        $('#popIframeSmall').remove();
    }
    var popCss = _M.FullCSS();
    var pop_Iframe = document.createElement("iframe");
    pop_Iframe.id = "popIframeSmall";
    pop_Iframe.style.cssText = popCss;
    _gid(Id).appendChild(pop_Iframe);
    pop_Iframe.style.zIndex = "100";
    pop_Iframe.style.height = _gid(Id).offsetHeight + "px";
    pop_Iframe.style.width = (parseInt(_gid(Id).offsetWidth) - 5) + "px";
}
_M.Drag = function (rootid, handid) {
    var div_root = _gid(rootid);
    var div_handle = _gid(handid);
    if (!div_handle)
        div_handle = div_root;
    var w = 0, h = 0;
    if (_gid(rootid).style.width != "")
        w = parseInt(_gid(rootid).style.width);
    if (_gid(rootid).style.height != "")
        h = parseInt(_gid(rootid).style.height);
    Drag.init(div_handle, div_root, 0, _M.page.twidth() - w, 0, _M.page.theight() - h);
}
/************位置计算*******************/
//将一个对象居中marginleft为偏移量
_M.SetMiddleW = function (obj, marginleft) {
    if (obj) {
        var val = (_M.page.width() / 2 - obj.offsetWidth / 2);
        if (marginleft)
            val = val + marginleft;
        obj.style.left = val + 'px';
    }
}
//将一个对象垂直居中top为显示离屏幕顶部的距离，可以不传值
_M.SetMiddleH = function (obj, top) {
    if (obj) {
        obj.style.position = "absolute";
        var t = _M.page.HideTopH();
        if (top)
            t = t + top;
        else {
            t = t + _M.page.height() / 2 - obj.offsetHeight / 2;
        }
        obj.style.top = t + 'px';
    }
}
_M.page = function () {
    return {
        HideTopH: function () {
            return document.documentElement.scrollTop + document.body.scrollTop;
        },
        width: function () {
            return document.documentElement.clientWidth;
        },
        height: function () {
            return document.documentElement.clientHeight;
        },
        theight: function () {
            var d = document, b = d.body, e = d.documentElement;
            var _h = 0;
            if ($.browser.msie) {
                _h = b.scrollHeight;
            }
            else { _h = e.scrollHeight; }
            return Math.max(_h, Math.max(b.clientHeight, e.clientHeight));
        },
        twidth: function () {
            var d = document, b = d.body, e = d.documentElement;
            var _h = 0;
            if ($.browser.msie) {
                _h = b.scrollWidth;
            }
            else { _h = e.scrollWidth; }
            return Math.max(_h, Math.max(b.clientWidth, e.clientWidth));
        }
    }
} ();

/*********退出前询问******************/
//window.onbeforeunload = _M.IsExit;
var NeedLeaveAsk = false;

_M.BindBeforClose = function () {
    NeedLeaveAsk = true;
    window.onbeforeunload = _M.IsExit;
}
_M.CancelBeforClose = function () {
    NeedLeaveAsk = false;
    window.onbeforeunload = null;
}

_M.IsExit = function () {
    if (NeedLeaveAsk) {
        if (window.document != null && window.document.activeElement != null && window.document.activeElement.href != null && window.document.activeElement.href.substring(0, 10).toUpperCase() == 'JAVASCRIPT') {
            return;
        }
        else
            return "您的信息还没有保存！";
    }
}
/*************New**************/
//_M.oldValue = _M.getStatus();window.onbeforeunload = _M.IsChange;//LeavePass=true;
var LeavePass = false;
_M.IsChange = function () {
    if (LeavePass)
        return;
    var newValue = _M.getStatus();
    if (_M.oldValue == newValue) {
        return;
    }
    else {
        if (window.document != null && window.document.activeElement != null && window.document.activeElement.href != null && window.document.activeElement.href.substring(0, 10).toUpperCase() == 'JAVASCRIPT') {
            return;
        }
        else
            return "您的信息还没有保存！";
    }
    return;
}
_M.oldValue = null;
_M.getStatus = function () {
    var statusBag = "{'first':'none'";
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        //        if (!inputs[i].id) {
        //            alert("您有一个" + inputs[i].value + "没有id，请添加。");
        //            break;
        //        }
        statusBag += ",";
        if (inputs[i].type == "radio" || inputs[i].type == "checkbox") {
            statusBag += "'" + inputs[i].id + "':'" + inputs[i].checked + "'";
        }
        if (inputs[i].type == "text" || inputs[i].type == "password" || inputs[i].type == "hidden" || inputs[i].type == "file" || inputs[i].type == "button" || inputs[i].type == "submit" || inputs[i].type == "cancel") {
            statusBag += "'" + inputs[i].id + "':'" + inputs[i].value + "'";
        }
    }
    var selects = document.getElementsByTagName("select");
    for (var i = 0; i < selects.length; i++) {
        //        if (selects[i].id == null) {
        //            alert("您有一个" + selects[i].type + "没有id，请添加。");
        //            break;
        //        }
        statusBag += ",";
        statusBag += "'" + selects[i].id + "':'" + selects[i].value + "'";
    }
    var tas = document.getElementsByTagName("textarea");
    for (var i = 0; i < tas.length; i++) {
        //        if (tas[i].id == null) {
        //            alert("您有一个" + tas[i].type + "没有id，请添加。");
        //            break;
        //        }
        statusBag += ",";
        statusBag += "'" + tas[i].id + "':'" + tas[i].value + "'";
    }
    statusBag += "}";

    return statusBag;
}
/*********退出前询问End******************/

//拖动类
var Drag = {
    obj: null,
    init: function (o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper) {
        o.onmousedown = Drag.start;

        o.hmode = bSwapHorzRef ? false : true;
        o.vmode = bSwapVertRef ? false : true;

        o.root = oRoot && oRoot != null ? oRoot : o;

        if (o.hmode && isNaN(parseInt(o.root.style.left))) o.root.style.left = "0px";
        if (o.vmode && isNaN(parseInt(o.root.style.top))) o.root.style.top = "0px";
        if (!o.hmode && isNaN(parseInt(o.root.style.right))) o.root.style.right = "0px";
        if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

        o.minX = typeof minX != 'undefined' ? minX : null;
        o.minY = typeof minY != 'undefined' ? minY : null;
        o.maxX = typeof maxX != 'undefined' ? maxX : null;
        o.maxY = typeof maxY != 'undefined' ? maxY : null;

        o.xMapper = fXMapper ? fXMapper : null;
        o.yMapper = fYMapper ? fYMapper : null;

        o.root.onDragStart = new Function();
        o.root.onDragEnd = new Function();
        o.root.onDrag = new Function();
    },

    start: function (e) {
        var o = Drag.obj = this;
        e = Drag.fixE(e);
        var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
        var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
        o.root.onDragStart(x, y);
        o.style.cursor = "move";
        o.lastMouseX = e.clientX;
        o.lastMouseY = e.clientY;

        if (o.hmode) {
            if (o.minX != null) o.minMouseX = e.clientX - x + o.minX;
            if (o.maxX != null) o.maxMouseX = o.minMouseX + o.maxX - o.minX;
        } else {
            if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
            if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
        }

        if (o.vmode) {
            if (o.minY != null) o.minMouseY = e.clientY - y + o.minY;
            if (o.maxY != null) o.maxMouseY = o.minMouseY + o.maxY - o.minY;
        } else {
            if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
            if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
        }

        document.onmousemove = Drag.drag;
        document.onmouseup = Drag.end;

        return false;
    },

    drag: function (e) {
        e = Drag.fixE(e);
        var o = Drag.obj;

        var ey = e.clientY;
        var ex = e.clientX;
        var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
        var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
        var nx, ny;

        if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
        if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
        if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
        if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

        nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
        ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

        if (o.xMapper) nx = o.xMapper(y)
        else if (o.yMapper) ny = o.yMapper(x)

        Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
        Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
        Drag.obj.lastMouseX = ex;
        Drag.obj.lastMouseY = ey;

        Drag.obj.root.onDrag(nx, ny);
        return false;
    },

    end: function () {
        document.onmousemove = null;
        document.onmouseup = null;
        Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]),
                                    parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
        Drag.obj.style.cursor = "default";
        Drag.obj = null;
    },

    fixE: function (e) {
        if (typeof e == 'undefined') e = window.event;
        if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
        if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
        return e;
    }
};
