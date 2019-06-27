    /**
     * 将source对象中的属性扩展到target对象上
     * @name extend
     * @grammar UE.utils.extend(target,source)  => Object  //覆盖扩展
     * @grammar UE.utils.extend(target,source,true)  ==> Object  //保留扩展
     */
    function extend(t, s, b) {
        if (s) {
            for (var k in s) {
                if (!b || !t.hasOwnProperty(k)) {
                    t[k] = s[k];
                }
            }
        }
        return t;
    }
   function  extend2(t) {
        var a = arguments;
        for (var i = 1; i < a.length; i++) {
            var x = a[i];
            for (var k in x) {
                if (!t.hasOwnProperty(k)) {
                    t[k] = x[k];
                }
            }
        }
        return t;
    }


   function bind(fn, context) {
        return function () {
            return fn.apply(context, arguments);
        };
    }

function StringHelper() { }
StringHelper.trim = function(s) {
    s += "";
    return s.replace(/^\s+|\s+$/g, '');
};

StringHelper.isInt = function(s) {
    return new RegExp(/^(0|[1-9][0-9]*)$/).test(this.trim(s));
};

StringHelper.isCleanString = function(s) {
    return new RegExp(/^[A-Za-z0-9_]+$/).test(this.trim(s));
};

StringHelper.isEmail = function(s) {
    return new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(this.trim(s));
};

StringHelper.isEmpty = function(s) {
    return this.trim(s).length == 0;
};
/**/
StringHelper.isDate = function(s) {
    var dateReg = new RegExp(/^(?=\d)(?:(?!(?:1582(?:\.|-|\/)10(?:\.|-|\/)(?:0?[5-9]|1[0-4]))|(?:1752(?:\.|-|\/)0?9(?:\.|-|\/)(?:0?[3-9]|1[0-3])))(?=(?:(?!000[04]|(?:(?:1[^0-6]|[2468][^048]|[3579][^26])00))(?:(?:\d\d)(?:[02468][048]|[13579][26]))\D0?2\D29)|(?:\d{4}\D(?!(?:0?[2469]|11)\D31)(?!0?2(?:\.|-|\/)(?:29|30))))(\d{4})([-\/.])(0?\d|1[012])\2((?!00)[012]?\d|3[01])(?:$|(?=\x20\d)\x20))?((?:(?:0?[1-9]|1[012])(?::[0-5]\d){0,2}(?:\x20[aApP][mM]))|(?:[01]\d|2[0-3])(?::[0-5]\d){1,2})?$/);
    return dateReg.test(s);
}
StringHelper.isMoney = function(s) {
    var reg = new RegExp(/^\d*\.?\d*$/);
    return reg.test(s);
}
//don't support multi-levles
StringHelper.buildFlatXmlString = function(rootName, arrNames, arrValues) {
    var returnVal = ("<" + rootName + ">");
    for (var i = 0; i < arrNames.length; i++) {
        returnVal += ("<" + arrNames[i] + ">");
        if (arrValues[i] != null) returnVal += this.encodeXml(arrValues[i]);
        returnVal += ("</" + arrNames[i] + ">");
    }
    returnVal += ("</" + rootName + ">");
    return returnVal;
};
StringHelper.encodeXml = function(s) {
    s = s.toString();
    s = s.replace(/\x26/g, "&#38;");     //&
    s = s.replace(/\x3c/g, "&#60;");     //<
    s = s.replace(/\x3e/g, "&#62;");     //>
    s = s.replace(/\x22/g, "&#34;");     //"
    s = s.replace(/\x27/g, "&#39;");     //'
    return s;
};
StringHelper.makePostParams = function(arrNames, arrValues) {
    var returnVal = "";
    for (var i = 0; i < arrNames.length; i++) {
        returnVal += arrNames[i];
        if (arrValues[i] != null) returnVal += ("=" + encodeURIComponent(arrValues[i]));
        //        if (arrValues[i].toString().indexOf("ZiiO 10&#34;") != -1) {
        //            var i = 0;
        //        }
        if (i != arrNames.length - 1) {
            returnVal += "&";
        }
    }
    return returnVal;
}

StringHelper.FilterDuplicateName = function(str1, str2) {
    var strReturn = str1;
    var arrStr2 = str2.split(",");
    for (var i = 0; i < arrStr2.length; i++) {
        if (str1.indexOf(arrStr2[i], 0) == -1) {
            strReturn = strReturn + "," + arrStr2[i];
        }
    }
    return strReturn;
}
StringHelper.getUrlParam = function(paramName) {
    var s = location.search;
    if (s != null && s.length > 1) {
        var sarr = s.substr(1).split("&");
        var tarr;
        for (i = 0; i < sarr.length; i++) {
            tarr = sarr[i].split("=");
            if (tarr[0].toLowerCase() == paramName.toLowerCase()) {
                return tarr[1];
            }
        }
        return null;
    }
}

StringHelper.htmlEncode = function(str) {
    var div = document.createElement("div");
    var text = document.createTextNode(str);
    div.appendChild(text);
    return div.innerHTML;
}
StringHelper.htmlDecode = function(str) {
    var div = document.createElement("div");
    div.innerHTML = str;
    return div.innerHTML;
}

StringHelper.replaceHtmlEntity = function(szText) {
    var arrSzHtmlEntities = new Array();
    arrSzHtmlEntities.push(["", ""]);
    var szReturn = szText;
    for (var i = 0; i < arrSzHtmlEntities.length; i++) {
        var szName = arrSzHtmlEntities[0];
        var szReplaceText = arrSzHtmlEntities[1];
        szReplaceText = szReplaceText.replace(szName, szReplaceText);
    }
    szReturn = szReplaceText;
    return szReturn;

}

/***xmlHttpHelper******/
//    readyState:
//    0: 请求未初始化
//    1: 服务器连接已建立
//    2: 请求已接收
//    3: 请求处理中
//    4: 请求已完成，且响应已就绪



function XmlHttpHelper() { }

XmlHttpHelper.__getXmlHttpObj = function() {

    var ajax = false;
    try {
        ajax = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch (e) {
        try {
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (E) {
            ajax = false;
        }
    }
    if (!ajax && typeof XMLHttpRequest != 'undefined') {
        ajax = new XMLHttpRequest();
    }
    return ajax;
};

XmlHttpHelper.transmit = function(async, httpMethod, responseType, url, callback, callback2, errorcallback, postData) {
    httpMethod = httpMethod.toLowerCase();
    if (responseType != null) {
        responseType = responseType.toLowerCase();
    }
    var xmlhttp = this.__getXmlHttpObj();
    xmlhttp.open(httpMethod, url, async);
    if (!async && httpMethod == "post") {
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }
    if (async) {
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                try {
                    if (typeof (callback) == "function") {
                        
                        switch (responseType) {
                            case "text":
                                callback(xmlhttp.responseText);
                                break;
                            case "xml":
                                callback(xmlhttp.responseXML);
                                break;
                            default:
                                callback(null);
                                break;
                        }
                    }
                }
                catch (e) {
                    if (typeof (errorcallback) == "function") {
                        errorcallback(e);
                    }
                }
                try {
                    delete xmlhttp;
                    xmlhttp = null;
                }
                catch (e) {
                }
            }

            else {
                if (typeof (callback2) == "function") {
                    callback2();
                }
            }
        }
        xmlhttp.send(postData);
    }
    else {
        xmlhttp.send(postData);
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            switch (responseType) {
                case "text":
                    return xmlhttp.responseText;
                case "xml":
                    return xmlhttp.responseXML;
                default:
                    return null;
            }
        }
        else {
            if (typeof (callback2) == "function") {
                callback2();
            }
            return null;
        }
    }
};

/******************jsUtil**************************/
function jsUtil() {
}
jsUtil.currPopUpWin = 0;
jsUtil.popUpWindow = function (URLStr, winName, width, height) {
    var l = (screen.width - width) / 2;
    var t = (screen.height - height) / 2;
    if (jsUtil.currPopUpWin != 0) {
        if (!jsUtil.currPopUpWin.closed) jsUtil.currPopUpWin.close();
    }
    jsUtil.currPopUpWin = window.open(URLStr, winName);
}
jsUtil.winLoad = function (fn) {
    var fnOldLoad = window.onload;
    if (typeof fnOldLoad != 'function') {
        window.onload = fn;
    }
    else {
        window.onload = function () {
            fnOldLoad();
            fn();
        }
    }
}
jsUtil.addEvent= function (element, type, fn) {
    if (element.attachEvent) {
        element.attachEvent("on" + type, fn);
    }
    else {
        element.addEventListener(type, fn, false);
    }
}
jsUtil.removeEvent=function (element, type, fn) {
    if (element.detachEvent) {
        element.detachEvent("on" + type, fn);
    }
    else {
        element.removeEventListener(type, fn, false);
    }
}
jsUtil.killEvent= function (event) {
    if (event && event.stopPropagation) {
        event.stopPropagation();
        event.preventDefault();
    }
    else {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
    }
}
jsUtil.preventDefault = function (event) {
    if (event && event.preventDefault) {       
        event.preventDefault();
    }
    else {      
        window.event.returnValue = false;
    }
}
jsUtil.stopPropagation = function (event) {
    if (event && event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        window.event.cancelBubble = true;
    }
}
extend(jsUtil, {
    toElement: function (ele) {
        var aa = null;
        if (typeof (ele) == 'object') {
            aa = ele;
        }
        else {
            aa = document.getElementById(ele);
        }
        return aa;
    },
    /**
    * 获取DOM对象的坐标
    * @param {Object}   DOM对象 
    * @return {[_x,_y]} 用数组的形式返回坐标
    */
    getMouseXY: function (e) {
        var _x = _y = 0;
        _x = document.documentElement.scrollLeft;
        _y = document.documentElement.scrollTop;
        if (e.clientX || e.clientY) {
            _x += e.clientX;
            _y += e.clientY;
        }
        else if (e.pageX || e.pageY) {
            _x += e.pageX;
            _y += e.pageY;
        }
        return { x: _x, y: _y };
    },
    closeWindow: function () {
        //window.opener = null;
        window.open('', '_parent', '');
        window.close();
    },
    getWindowRect: function () {
        var _y = document.body.offsetTop;
        var _x = document.body.offsetLeft;

        //      alert(window.innerHeight);
        //      alert(document.body.offsetHeight);
        //      alert(document.body.scrollHeight);
        //      alert(document.body.clientHeight);

        //        alert(document.documentElement.offsetHeight);
        //        alert(document.documentElement.scrollHeight);
        //        alert(document.documentElement.clientHeight); 
        var _h = document.documentElement.scrollHeight || document.body.scrollHeight;
        var _w = document.documentElement.scrollWidth || document.body.scrollWidth;

        var clientRect = this.getClientRect();
        _h = Math.max(clientRect.height, _h);
        _w = Math.max(clientRect.width, _w);

        return { top: _y, left: _x, height: _h, width: _w };

    },
    getClientRect: function () {
        var _y = document.documentElement.scrollTop || document.body.scrollTop;
        var _x = document.documentElement.scrollLeft || document.body.scrollLeft;
        var _h = self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var _w = self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        return { top: _y, left: _x, height: _h, width: _w };
    },
    getElementsByClassName:function(searchClass, node,tag){
          if(document.getElementsByClassName){
            var nodes =  (node || document).getElementsByClassName(searchClass),result = [];
              for(var i=0 ;node = nodes[i++];){
                if(tag !== "*" && node.tagName === tag.toUpperCase()){
                  result.push(node)
                }
              }
              return result
            }else{
              node = node || document;
              tag = tag || "*";
              var classes = searchClass.split(" "),
              elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
              patterns = [],
              current,
              match;
              var i = classes.length;
              while(--i >= 0){
                patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
              }
              var j = elements.length;
              while(--j >= 0){
                current = elements[j];
                match = false;
                for(var k=0, kl=patterns.length; k<kl; k++){
                  match = patterns[k].test(current.className);
                  if (!match)  break;
                }
                if (match)  result.push(current);
              }
              return result;
            }
  },
    getRect: function (el) {
        el = this.toElement(el);
        var _x = _y = 0;
        var _w = el.offsetWidth, _h = el.offsetHeight;
        while (el.offsetParent) {
            _x += el.offsetLeft;
            _y += el.offsetTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x, width: _w, height: _h };

    },
    setOpacity: function (el, val) {
        el = this.toElement(el);
        el.style.MozOpacity = '' + val / 100;
        el.style.filter = 'Alpha(Opacity=' + val + ')';
    },
    show: function (el) {
        el = this.toElement(el);
        el.style.display = 'block';
    },

    hide: function (el) {
        el = this.toElement(el);
        el.style.display = 'none';
    },
    //可见或不可见
    toggle: function (ele) {
        ele = this.toElement(ele);
        ele.style.display = (ele.style.display == 'none' ? 'block' : 'none');
    },
    getClass: function (el) {
        el = this.toElement(el);
        return el.className;
    },
    setClass: function (el, val) {
        el = this.toElement(el);
        el.className = val;
    },
    addClass: function (el, val) {
        el = this.toElement(el);
        if (!val) {
            return;
        }

        var _cln = el.className.split(' ');
        for (var i = 0; i != _cln.length; i++) {
            if (_cln[i] == val) {
                return;
            }
        }
        if (el.className.length > 0) {
            el.className = el.className + ' ' + val;
        }
        else {
            el.className = val;
        }

    },
    hasClass: function (el, val) {
        var _bl = false;
        if ($(el)) {
            if (!$(el).className) { return false; }
            var _cln = $(el).className.split(' ');
            for (var i = 0; i != _cln.length; i++) {
                if (_cln[i] == val) {
                    _bl = true;
                    break;
                }
            }
        }
        return _bl;
    },
    removeClass: function (el, val) {
        el = this.toElement(el);
        if (!val) {
            return;
        }
        var _cln = el.className.split(' ');
        var _s = '';
        for (var i = 0; i != _cln.length; i++) {
            if (_cln[i] != val) {
                _s += _cln[i] + ' ';
            }
        }
        if (_s == ' ') {
            _s = '';
        }
        if (_s.length != 0) {
            _s = _s.substr(0, _s.length - 1);
        }
        el.className = _s;

    },
    replaceClass: function (el, vala, valb) {
        el = this.toElement(el);
        if (!vala || !valb) {
            return;
        }

        var _cln = el.className.split(' ');
        for (var i = 0; i != _cln.length; i++) {
            if (_cln[i] == vala) {
                _cln[i] = valb;
            }
        }
        el.className = _cln.join(' ');

    },
    setStyle: function (el, styleName, styleValue) {
        el = this.toElement(el);
        el.style[styleName] = styleValue;
    },
    getStyle: function (el, styleName) {
        el = this.toElement(el);
        return el.style[styleName];
    },
    getComputedStyle: function (el, styleName) {
        el = this.toElement(el);
        var oStyle = null;
        if (el.currentStyle) {
            oStyle = el.currentStyle;
        }
        else if (window.getComputedStyle) {
            oStyle = document.defaultView.getComputedStyle(el, null);
        }
        if (oStyle) {
            return oStyle[styleName];
        }
        return "";
    },
    setCss: function (el, o) {
        el = this.toElement(el);
        var a = {};
        for (var i in o) {
            a[i] = el.style[i];
            el.style[i] = o[i];
        }
        return a;
    },
    resetCss: function (el, o) {
        el = this.toElement(el);
        for (var i in o) {
            el.style[i] = o[i];
        }
    },
    elementContain: function (parentNode, childNode) {
        var blReturn = false;
        var oParent = childNode.parentNode;
        if (childNode === parentNode) {
            blReturn = true;
        }
        else {
            while (oParent) {
                if (parentNode === oParent) {
                    blReturn = true;
                    break;
                }
                oParent = oParent.parentNode;
            }
        }
        return blReturn;
    },
    nextSibling: function (ele) {
        ele = this.toElement(ele);
        var parent = ele.parentNode;
        var children = parent.childNodes;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == ele) {
                if (i == children.length - 1) { return null; }
                else { return children[i + 1]; }
            }
        }
    },
    preSibling: function (ele) {
        ele = this.toElement(ele);
        var parent = ele.parentNode;
        var children = parent.childNodes;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == ele) {
                if (i == 0) { return null; }
                else { return children[i - 1]; }
            }
        }
    },
    createElement: function (type, id) {
        var eleExist = $(id);
        if (eleExist) this.remove(eleExist);

        var eleNew = document.createElement(type);
        eleNew.id = id;
        return eleNew;
    },
    insertElement: function (ele, newEle, position) {
        ele = this.toElement(ele);
        var parent = ele.parentNode;
        var brotherLen = parent.childNodes.length;
        var All = -1;

        for (var i = 0; i < brotherLen; i++) {
            if (parent.childNodes[i] == ele) {
                All = i;
            }
        }
        if (position == "beforeEnd") {
            ele.appendChild(newEle);
        }
        else if (position == "afterEnd") {
            if (All == brotherLen - 1) { parent.appendChild(newEle); }
            else { parent.insertBefore(newEle, parent.childNodes[All + 1]); }
        }
        else if (position == "beforeBegin") {
            parent.insertBefore(newEle, ele);
        }
        else if (position == "afterBegin") {
            if (ele.childNodes.length == 0) { ele.appendChild(newEle); }
            else { ele.insertBefore(newEle, ele.childNodes[0]); }
        }

    },
    remove: function (ele) {
        ele = this.toElement(ele);
        ele.parentNode.removeChild(ele);
    },
    setAttr: function (ele, attrBag) {
        ele = this.toElement(ele);
        for (var ao in attrBag) {
            ele[ao] = attrBag[ao];
        }
    }
});

/*
 *判断一个元素是否包含另一个元素
 */
jsUtil.elementContain = function (parentNode, childNode) {
    var blReturn = false;
    var oParent = childNode.parentNode;
    if (childNode === parentNode) {
        blReturn = true;
    }
    else {
        while (oParent) {
            if (parentNode === oParent) {
                blReturn = true;
                break;
            }
            oParent = oParent.parentNode;
        }
    }
    return blReturn;
}

jsUtil.cookie = {
    getCookie: function (szCookieName) {
        if (document.cookie.length > 0) {
            nStartIndex = document.cookie.indexOf(szCookieName + "=")
            if (nStartIndex != -1) {
            nStartIndex = nStartIndex + szCookieName.length + 1;
            nEndIndex = document.cookie.indexOf(";", nStartIndex);
            if (nEndIndex == -1) {
            nEndIndex = document.cookie.length
            };
            return unescape(document.cookie.substring(nStartIndex, nEndIndex))
        }
        }
        return "";
    }
    , setCookie: function (szCookieName, szCookieVal, expiredays) {
    var dCookieDate = new Date();
    dCookieDate.setDate(dCookieDate.getDate() + expiredays);
    document.cookie = szCookieName + "=" + escape(szCookieVal) + ((expiredays == null) ? "" : ";expires=" + dCookieDate.toGMTString());
    }
    , delCookie:function(szCookieName){
    var dExpDate = new Date();
    dExpDate.setTime(dExpDate.getTime() - 1);
    var szVal = this.getCookie(szCookieName);
    document.cookie = szCookieName + "=" + szVal + "; expires=" + dExpDate.toGMTString();
    }
    }
    jsUtil.fx = {
        getTypeName: function (value) {
            if (value === null) {
                return "null";
            }
            var t = typeof value;
            switch (t) {
                case "function":
                case "object":
                    if (value.constructor) {
                        if (value.constructor.name) {
                            return value.constructor.name;
                        } else {
                            // Internet Explorer
                            // Anonymous functions are stringified as follows: 'function () {}'
                            // => the regex below does not match
                            var match = value.constructor.toString().match(/^function (.+)\(.*$/);
                            if (match) {
                                return match[1];
                            }
                        }
                    }
                    // fallback, for nameless constructors etc.
                    return Object.prototype.toString.call(value).match(/^\[object (.+)\]$/)[1];
                default:
                    return t;
            }
        }
    }



/***********************Repeat control****************************/
function RepeaterControl() {
    this.HeaderTemplate = "";
    this.ItemTemplate = "";
    this.SelectedItemTemplate = "";
    this.FooterTemplate = "";
    this.AlternatingItemTemplate = "";
    this.SeparatorTemplate = "";
    this.HostControlID = null;
    this.DataSource = null;
    this.Config = {
        showContent: function() { } //a function with a parameter(i.e.this repeater's html string)
    };
}
RepeaterControl.prototype.DataBind = function() {
    var htmlString = "";
    htmlString += this.HeaderTemplate;
    for (var count = 0; count < this.DataSource.length; count++) {
        var node = this.DataSource[count];
        var row = this.ItemTemplate

        if (this.AlternatingItemTemplate != "" && (count + 1) % 2 == 0) {
            row = this.AlternatingItemTemplate;
        }

        for (var i = 0; i < node.attributes.length; i++) {
            var re = new RegExp("{@" + node.attributes[i].nodeName + "}", "g");
            row = row.replace(re, node.attributes[i].nodeValue);
        }

        for (var i = 0; i < node.childNodes.length; i++) {
            if (node.nodeType != 3) {
                var re = new RegExp("{\\$" + node.childNodes[i].nodeName + "}", "g");
                var reValue = "";
                if (node.childNodes[i].firstChild != null) {
                    reValue = node.childNodes[i].firstChild.nodeValue;
                }
                else {
                    reValue = "";
                }
                row = row.replace(re, reValue);
            }
        }
        // eval javascript
        evalRe = new RegExp("{Eval(.*?)}", "g");
        myArray = row.match(evalRe);
        if (myArray != null) {
            for (var i = 0; i < myArray.length; i++) {
                var result = eval(myArray[i].replace(evalRe, "$1"));
                row = row.replace(myArray[i], result);
            }
        }
        htmlString += row;
        if (this.SeparatorTemplate != "" && count + 1 != this.DataSource.length) {
            htmlString += this.SeparatorTemplate;
        }
    }

    htmlString += this.FooterTemplate;
    //edited by cc 11/09/2011
    if (this.HostControlID == null) {
        this.Config.showContent.call(this, htmlString);
    }
    else {
        $("#" + this.HostControlID)[0].innerHTML = htmlString;
    }

}

/*******************************page control****************************************/
function PagerControl(pageSize, step) {
    this.PageSize = pageSize;
    this.Step = step;
    this.PageCount = 0;
    this.CurrentPage = 1;
    this.HeaderTemplate = "";
    this.ItemTemplate = "<a href=\"javascript:{#reloadfunction}({#page})\" >{#title}</a>";
    this.SelectedItemTemplate = "<span class='current'>{#title}</span>";
    this.FooterTemplate = "<span>共<font color='red'>{#TotalCount}</font>项记录，<font color='red'>{#PageCount}</font>页，每页显示<font color='red'>{#PageSize}</font>项</span>";
    this.HostControlID = null;
    this.RecordCount = 0;
}
PagerControl.prototype.RenderPager = function(reloadFunction) {
    var result = "";

    if (this.PageCount > 1) {

        result += this.HeaderTemplate;
        var startPoint = Math.floor((this.CurrentPage / this.Step)) * this.Step;
        if ((this.CurrentPage % this.Step) == 0) {
            startPoint -= this.Step;
        }

        if (startPoint >= this.Step) {
            result += this.ItemTemplate.replace("{#page}", startPoint).replace("{#title}", "...").replace("{#reloadfunction}", reloadFunction);
        }

        for (var i = startPoint + 1; i <= this.PageCount && i <= (startPoint + this.Step); i++) {
            if (i != this.CurrentPage) {
                result += this.ItemTemplate.replace("{#page}", i).replace("{#title}", i).replace("{#reloadfunction}", reloadFunction);
            } else {
                result += this.SelectedItemTemplate.replace("{#title}", i);
            }
        }

        if (startPoint < (this.PageCount - this.Step)) {
            result += this.ItemTemplate.replace("{#page}", (startPoint + this.Step + 1)).replace("{#title}", "...").replace("{#reloadfunction}", reloadFunction);
        }

        var footerInfo = this.FooterTemplate.replace("{#TotalCount}", this.RecordCount).replace("{#PageCount}", this.PageCount).replace("{#PageSize}", this.PageSize);
        result += footerInfo;
    }
    if (this.HostControlID != null) {
        $("#" + this.HostControlID)[0].innerHTML = result;
    }
}

/**********************************tab control**************************/
; (function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var _this = $(this);
                if (!_this.data('cTab') || _this.data('cTab') == null) {
                    options = methods._saveOptions(_this, options);
                }
                $(options["linkFilter"], _this).each(function () {
                    var _thisLink = $(this);
                    _thisLink.click(function () {
                        var contentTabID = $(this).attr(options["contentIDName"]);
                        var tabIndex = $(options.tabContentFilter, _this).index($("#" + contentTabID));
                        if (tabIndex != -1) {
                            methods.setTab.call(_this, tabIndex);
                        }
                        if (options.afterSetTab) {
                            options.afterSetTab.call(this);
                        }
                    });
                });
                methods.setTab.call(_this, 0);
            });
        },
        setTab: function (tabIndex) {
            var opts = this.data("cTab");
            if (!opts) {
                alert("error, undeclared plugin");
                return;
            }
            this.find(opts.tabContentFilter).hide();
            if (this.find(opts.tabContentFilter).length > 0) {
                $(this.find(opts.tabContentFilter)[tabIndex]).show();
            }
            this.find(opts.linkFilter).removeClass(opts.selectedTabStyle);
            if (this.find(opts.linkFilter).length > 0) {
                $(this.find(opts.linkFilter)[tabIndex]).addClass(opts.selectedTabStyle);
            }
        },
        _saveOptions: function (ele, options) {
            var userOptions = $.extend({
                selectedTabStyle: "selected",
                contentIDName: "tabid",
                tabContentFilter: "formPanel",
                linkFilter: "cTabLink",
                afterSetTab: function () { }
            }, options);
            ele.data("cTab", userOptions);
            return userOptions;
        }
    };
    $.fn.cTab = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on cTab plugin');
        }
    };
})(jQuery);



/**
* 遍历某一元素节点及其所有后代元素
*
* @param Elem node  所要清除的元素节点
* @param function func  进行处理的函数
* 
*/
function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
}
/**
* 清除dom节点的所有引用，防止内存泄露
*
* @param Elem node  所要清除的元素节点
* 
*/
function purgeEventHandlers(node) {
    walkTheDOM(node, function (e) {
        for (var n in e) {
            if (typeof e[n] ===
                     'function') {
                e[n] = null;
            }
        }
    });
}
/*
*Share buttons 社交网络分享按钮
*调用方式：
*<a title="QQ空间" onclick="javascript:newShare(curNewsTitle,document.URL,'qzone',this,curNewsPics);return true;" href="javascript:void(0);" class="share_qq">QQ空间</a>
*/

function newShare(title, url, site, obj, pic, video) {
    var titleText = encodeURIComponent(title);
    var urlText = encodeURIComponent(url);
    shareUrl = ['http://api.bshare.cn/share/', site, '?url=', urlText, '&title=', titleText].join('') + '&publisherUuid=512d9954-bb76-471e-8450-096dab2257b5';
    shareUrl += '&pic=' + encodeURIComponent(pic);
    if (typeof video != "undefined") {
        shareUrl += '&video=' + encodeURIComponent(video);
    }
    if (obj) {
        obj.href = shareUrl;
        obj.target = '_blank';
    }
    return shareUrl;
}
/**
*原生JS没有提供insertAfter,可由insertBefore变换而来
*/
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        // 如果最后的节点是目标元素，则直接添加。因为默认是最后
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement, targetElement.nextSibling);
        //如果不是，则插入在目标元素的下一个兄弟节点 的前面。也就是目标元素的后面
    }
}
UA = window.UA || {
    isIE: navigator.appName.indexOf("Microsoft Internet Explorer") != -1 && document.all
    , isIE6: navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 6.0") == "-1" ? false : true
    , isIE7: navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 7.0") == "-1" ? false : true
    , isIE8: navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 8.0") == "-1" ? false : true
    , isIE9: navigator.userAgent.split(";")[1].toLowerCase().indexOf("msie 9.0") == "-1" ? false : true
    , isNS: navigator.userAgent.indexOf("Netscape") != -1
    , isOpera: (navigator.appName.indexOf("Opera") != -1 || navigator.appName.indexOf("OPR") != -1)
    , isFF: navigator.userAgent.indexOf("Firefox") != -1
    , isSafari: navigator.userAgent.indexOf("Safari") > -1
    , isChrome: navigator.userAgent.indexOf("Chrome") > -1
    , toString: navigator.userAgent
}
 


/*
*获取js文件
*/
jsUtil.getJsonP = function (szJsUrl, szCallbackFnName, szCallbackParaName) {
    var szFnName = "", szParamName = "";
    if (arguments.length == 1) {
        szFnName = "callback";
        szParamName = "callback";
    }
    else if (arguments.length == 2 && typeof (callbackFnName).toLowerCase() != "string") {
        alert("please check the second argument, must be a 'string' type");
        return;
        szFnName = szCallbackFnName;
    }
    else if (arguments.length == 3) {
        if (typeof (callbackFnName).toLowerCase() != "string") {
            alert("please check the 2nd argument, must be a 'string' type");
            return;
        }
        else if (typeof (callbackParaName).toLowerCase() != "string") {
            alert("please check the 3rd argument, must be a 'string' type");
            return;
        }
        szFnName = szCallbackFnName;
        szParamName = szCallbackParaName;
    }
    var _this = this;
    //var szJsID = "jsID20130709";
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    if (szJsUrl.indexOf("?") != -1) {
        szJsUrl += "&" + szParamName + "=" + szFnName;
    }
    else {
        szJsUrl += "?" + szParamName + "=" + szFnName;
    }
    oScript.src = szJsUrl;
    // oScript.setAttribute("id", szJsID);
    var head = document.getElementsByTagName('head')[0];
    //remove(szJsID);
    head.appendChild(oScript);
    //    //for IE
    //    if (document.all) {
    //        oScript.onreadystatechange = function () {
    //            if (this.readyState == "complete" || this.readyState == "loaded") {
    //                try {
    //                    callback();
    //                } catch (e) {
    //                    setTimeout(function () {
    //                        remove();
    //                        head.appendChild(oScript);
    //                    }, 2000);
    //                }
    //            }
    //        };
    //    }
    //    else {
    //        oScript.onload = function () {
    //            callback();
    //        };
    //    }


    //    function callback() {
    //        if (typeof fnCallback == "function") {
    //            fnCallback(fnArgs);
    //        }
    //    }
    function remove() {
        var head = document.getElementsByTagName('head')[0];
        if (document.getElementById(szJsID)) {
            head.removeChild(document.getElementById(szJsID));
        }
    }

}





loadScript = function (url, callback, charset) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    charset && (s.charset = charset);
    if (s.readyState) {
        s.attachEvent("onreadystatechange", function () {
            if (s.readyState == "loaded" || s.readyState == "complete") {
                s.detachEvent("onreadystatechange", arguments.callee);
                callback && callback();
            }
        });
    }
    else {
        s.onload = function () {
            callback && callback();
        };
    }
    s.src = url;
    document.getElementsByTagName("head")[0].appendChild(s);
}






    jsUtil.domReady = function () {
        var fnArr = [];
        function doReady(doc) {
            //确保onready只执行一次
            doc.isReady = true;
            for (var ci; ci = fnArr.pop(); ci()) {
            }
        }
        return function (onready, win) {
            win = win || window;
            var doc = win.document;
            onready && fnArr.push(onready);
            if (doc.readyState === "complete") {
                doReady(doc);
            } else {
                doc.isReady && doReady(doc);
                if (!!window.ActiveXObject) {
                    (function () {
                        if (doc.isReady) return;
                        try {
                            doc.documentElement.doScroll("left");
                        }
                        catch (error) {
                            setTimeout(arguments.callee, 0);
                            return;
                        }
                        doReady(doc);
                    })();
                    win.attachEvent('onload', function () {
                        doReady(doc)
                    });
                } else {
                    doc.addEventListener("DOMContentLoaded", function () {
                        doc.removeEventListener("DOMContentLoaded", arguments.callee, false);
                        doReady(doc);
                    }, false);
                    win.addEventListener('load', function () {
                        doReady(doc)
                    }, false);
                }
            }

        }
    } ();  //end domReady







 