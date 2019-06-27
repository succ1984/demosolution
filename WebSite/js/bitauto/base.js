
/***************************************************************
*     BitAuto Common JavaScript Tool Library	                *
*																*
* File Name:  base.js	 										*
* Written by:  James	    									*
* Important: to use this script don't							*
*            remove these comments								*
* Version 1.0 (MSIE 5.0 above,Firefox1.0,Netscape.)				*
* Created Date: 2007-07-30										*
* Copyright：1997-2006 BitAuto.com Inc. All rights reserved.	*
****************************************************************/ 

 
/***************************************************************
* bit对象                                                      *
***************************************************************/ 
if( typeof(bit)=='undefined')    bit ={version:  "1.0.0",created: "2007.07.30"}; 

/***************************************************************
* 简化的document.getElementById()函数                          *
***************************************************************/ 
if(typeof($)=="undefined")
$ = function() {
  var elements = new Array();
  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);

    if (arguments.length == 1)
      return element;

    elements.push(element);
  }
  return elements;
}; 

/***************************************************************
* 浏览器版本对象                                                   *
***************************************************************/  
bit.Browser = {
    //是否Mozilla浏览器
    isMozilla:(typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined') && (typeof HTMLDocument!='undefined'),
    isIE :(navigator.userAgent.toLowerCase().indexOf("msie")!=-1),
    isFirefox : (navigator.userAgent.toLowerCase().indexOf("firefox")!=-1),
    isOpera :(navigator.userAgent.toLowerCase().indexOf("opera")!=-1),
    ieVersion: parseFloat(navigator.userAgent.substr(  navigator.userAgent.toLowerCase().indexOf("msie")  + 4)) || 0  
}
    
/***************************************************************
* 扩展 String 类                                               *
***************************************************************/
String.prototype.stripTags=function(){
    return this.replace(/<\/?[^>]+>/gi, '');
};  
String.prototype.escapeHTML=function(){
    var ag=document.createElement('div');
    var bv=document.createTextNode(this);
    ag.appendChild(bv);
    return ag.innerHTML;
}; 
String.prototype.unescapeHTML=function zk(){
    var ag=document.createElement('div');
    ag.innerHTML=this.stripTags();
    return ag.childNodes[0].nodeValue;
}; 
String.prototype.encodeHTML=function(){
    var s=this;
    s=s.replace(/\&/gi,"&amp;");
    s=s.replace(/</gi,"&lt;");
    s=s.replace(/>/gi,"&gt;");
    s=s.replace(/\"/gi,"&quot;");
    return s;
}; 
String.prototype.decodeHTML=function(){
    var s=this;
    s=s.replace(/&lt;/gi,"<");
    s=s.replace(/&gt;/gi,">");
    s=s.replace(/&quot;/gi,"\"");
    s=s.replace(/&amp;/gi,"&");
    s=s.replace(/&nbsp;/gi," ");
    return s;
}; 
String.prototype.toInt=function(){
    return parseInt(this,10);
}; 
String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}; 
String.prototype.ltrim=function (){
    return this.replace(/(^\s*)/g, "");
};
String.prototype.rtrim=function  (){
    return this.replace(/(\s*$)/g, "");
};
String.prototype.len=function(){
    var len=0;
    for (var i=0;i<this.length;i++){
        if (this.charCodeAt(i)>255){len+=2;}
        else{len++;}
    }
    return len;
//    return this.replace(/[^\x00-\xff]/g,"**").length; 
};
String.prototype.left=function(len){
    var i=0;
    var j=0;
    if(this.len()<=len){
        return this;
    }
    while(j<len){
        if(this.charCodeAt(i)>255){
            j+=2;
        }
        else{
            j ++;
        }
        i ++;
    }
    return this.substring(0,i) + "..";
};
String.prototype.isNumber=function(){
    return (this.search(/^\d+$/g)==0);
};
String.prototype.hasSpecialChar=function( ){
    var reg=/[,%\'\"\/\\;|\<\>]/;
    if(this.search( reg )!=-1)  return true; 
    else return false;
};
String.prototype.parseJSON=function () {
    try {
        return !(
            /[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(this.replace(/'(\\.|[^"\\])*'/g, ''))
        )
        &&
        eval('(' + this + ')')
        ;
    } 
    catch (e) {return false;}
};
String.prototype.startsWith=function(pattern) {
    return this.indexOf(pattern) === 0;
}; 
String.prototype.endsWith=function(pattern) {
    var d = this.length - pattern.length;
    return d >= 0 && this.lastIndexOf(pattern) === d;
};
//String.prototype.posIndexOf=function(bi, num){
//    var ab=this.split(bi);
//    if(ab.length - 1 < num){return -1;}
//    else{
//        var len=0;
//        for(var i=0;i<num;i++){
//            len+=ab[i].length;
//            len+=bi.length;
//        }
//        return len - bi.length;
//    }
//}; 

/***************************************************************
* 扩展Date类                                                  *
***************************************************************/
Date.prototype.dateAdd=function(n){ 
    return new Date(this.valueOf()+n*3600*24*1000);
};
Date.prototype.formatDateTime=function(){
    var ty=this.getFullYear();
    var tM=this.getMonth() + 1;
    var td=this.getDate();
    var th=this.getHours();
    var tm=this.getMinutes();
    var ts=this.getSeconds();
    var ug=ty + (tM<10 ? '-0' : '-')+ tM + (td<10 ? '-0' : '-')+ td +(th<10 ? ' 0' : ' ')+ th + (tm<10 ? ':0' : ":")+ tm + (ts<10 ? ':0' : ':')+ ts;
    return ug
};
Date.prototype.formatDate=function(){
    var ty=this.getFullYear();
    var tM=this.getMonth() + 1;
    var td=this.getDate();
   
    var ug=ty + (tM<10 ? '-0' : '-')+ tM + (td<10 ? '-0' : '-')+ td     ;
    return ug
}; 
//Array.prototype.exchange=function (Aco,ar){
//    if (Math.max(0,Aco,Aco+ar)<0||Math.min(this.length-1,Aco,Aco+ar)>this.length-1){return;}var am=this[Aco];this[Aco]=this[Aco+ar];this[Aco+ar]=am;
//};
//Array.prototype.escapeNull=function (){
//    var ge=[];for (var i=0,len=this.length;i<len;i++){if(this[i]){ge[ge.length]=this[i];}}return ge;
//};
//Array.prototype.clone=function (){var ge=[];for (var i=0;this[i]&&(ge[i]=this[i]);i++);return ge;};
//Array.prototype.subtract=function (Alq){var ge=[];for (var i=0;s=this[i];i++){if (s!=Alq){ge[ge.length]=s;};}return ge;};
//Array.prototype.filter=function(reg){
//    for(var i=0;s=this[i];i++){
//        this[i]=s.replace(reg,"");
//    }
//};
//if (!Array.prototype.push) {
//    Array.prototype.ie5=true;
//    Array.prototype.push=function() {
//        var startLength=this.length;
//        for (var i=0; i < arguments.length; i++)this[startLength + i]=arguments[i];
//        return this.length;
//    }
//}
//Array.prototype.splice=function(n){var ab=new Array();for(var i=0;i<this.length;i++){if(i!=n){ab[ab.length]=this[i];}}return ab;};
//if (!Array.prototype.shift) {Array.prototype.shift=function () {var returnValue=this[0];for (i=1; i < this.length; i++) {this[i - 1]=this[i];}this.length--;return returnValue;}}
//if (!Array.prototype.pop) {
//    Array.prototype.pop=function () {
//        lastElement=this[this.length-1];
//        this.length=Math.max(this.length-1,0);
//        return lastElement;
//    }
//}

//function Hash(){
//    this.ks=new Object();
//    this.Asf="object";
//    window.$continue=new Object();
//    window.$break=new Object();
//    this.isHash=true;
//    this.add=function(key,value){
//        if(value&&value.nodeType&&value.nodeType==1){
//            value=$(value);
//        }
//        if(key&&key.nodeType&&key.nodeType==1){
//            key=$(key);
//        }
//        if(this.Asf=="object"){
//            if(typeof(key)!="undefined"){
//                if(this.contains(key)==false){
//                    this.ks[key]=typeof(value)=="undefined"?null:value;
//                    return true;
//                } 
//                else {
//                    return false;
//                }
//            } 
//            else {
//                return false;
//            }
//        }
//        else{
//            if(typeof(value)!="undefined"&&typeof(key)!="undefined"){
//                this.ks[key]=value;
//                return true;
//            }
//            else if(typeof(key)!="undefined"){
//                this.ks[this.ks.length]=key;
//                return true;
//            }
//            else{
//                return false;
//            }
//        }
//    };
//    this.remove=function(key){
//        delete this.ks[key];
//    };
//    this.count=function(){
//        if(this.Asf=="array"){
//            return this.ks.length;
//        }
//        var i=0;
//        for(var k in this.ks){i++;}
//        return i;
//    };
//    this.items=function(key){return this.ks[key];};
//    this.contains=function(key){return typeof(this.ks[key])!="undefined";};
//    this.has=function(s){for(var k in this.ks){if(this.ks[k]==s){return true;}}return false;};
//    this.clear=function(){for(var k in this.ks){delete this.ks[k];}};
//    this.join=function(sJoin){var ab=[];for(var k in this.ks){ab[ab.length]=(this.ks[k] + "");}return ab.join(sJoin);};
//    this.each=function(func){
//        try{
//            if(this.Asf=="object"){
//                for(var k in this.ks){
//                    try{
//                        func(k, this.ks[k]);
//                    }
//                    catch(e){
//                        if (e!=$continue) throw e;
//                    }
//                }
//            }
//            else{
//                for(var k=0;k<this.ks.length;k++){
//                    try{
//                        func(k, this.ks[k]);
//                    }
//                    catch(e){
//                        if (e!=$continue) throw e;
//                    }
//                 }
//            }
//        }
//        catch(e){
//            if (e!=$break) throw e;
//        }
//     };
//     if(arguments.length>0){
//        var arg=arguments[0];
//        if(typeof arg=="object"){
//            if(ng(arg)||arg.ie5){
//                this.Asf="array";
//                this.ks=new Array();
//                for(var i=0;i<arg.length;i++){
//                    this.add(i, arg[i]);
//                }
//            }
//            else{
//                for(var ao in arg){
//                    this.add(ao, arg[ao]);
//                }
//            }
//        }
//    }
//}
/***************************************************************
* DOM 操作对象                                                   *
***************************************************************/
bit.DOM = {
    /**
    * 用一个函数对多个DOM对象进行处理
    * @param {String||Object||Array} el 要处理的一个或多个DOM对象
    * @param {String} func              处理函数 
    */
    //	_batch:function(el,func)
    //	{
    //		var _el=$A(el);
    //		for(var i=0;i!=_el.length;i++)
    //		{
    //			if(_el[i])
    //			{
    //				func(_el[i]);
    //			}
    //		}
    //	},
    toElement: function (ele) {
        var aa = null;
        if (typeof (ele) == 'object') {
            aa = ele;
        }
        else {
            aa = $(ele);
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
    getElementsByClassName: function (parentEl, className, tagName) {
        parentEl = this.toElement(parentEl);
        if (!parentEl || !className) {
            return null;
        }
        var els = cds = [];
        cds = parentEl.childNodes;
        className = className.toUpperCase();
        for (var i = 0; i < cds.length; i++) {
            var _type = cds[i].nodeType;
            if (_type != 3 && _type != 8 && cds[i].className.toUpperCase() == className) {
                //if(!tagName||cds[i].nodeName.toUpperCase()==tagName.toUpperCase()){
                //if(tagName||cds[i].nodeName.toUpperCase()==tagName.toUpperCase()){
                els[els.length] = cds[i];
                //}
            }
        }
        return els;
    },
    getRect: function (el) {
        el = this.toElement(el);
        var _x = _y = 0;
        var _w = el.offsetWidth, _h = el.offsetHeight;
        while (el) {
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
    elementContain:function (parentNode, childNode) {
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
}
/***************************************************************
* Event 事件操作对象                                           *
***************************************************************/
bit.Event = {
    getEvent: function (e) {
        var ev = e || window.event;
        if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                ev = c.arguments[0];
                if (ev && Event == ev.constructor) { break; }
                c = c.caller;
            }
        }
        return ev;
    },
    getTarget: function (ev, resolveTextNode) {
        if (!ev) ev = this.getEvent();
        var t = ev.target || ev.srcElement;
        if (resolveTextNode && t && "#text" == t.nodeName) {
            return t.parentNode;
        }
        else {
            return t;
        }
    },
    getCharCode: function (ev) {
        if (!ev) ev = this.getEvent();
        //        return ev.charCode||(ev.type=="keypress") ? ev.keyCode : 0;
        if (ev.charCode) return ev.charCode;
        else if (ev.type == "keypress") return ev.keyCode;
        else return 0;
    },
    getKeyCode: function (ev) {
        if (!ev) ev = this.getEvent();
        return ev.keyCode;
    },
    stopEvent: function (ev) {
        if (!ev) ev = this.getEvent();
        this.stopPropagation(ev);
        this.preventDefault(ev);
    },
    stopPropagation: function (ev) {
        if (!ev) ev = this.getEvent();
        if (ev.stopPropagation) { ev.stopPropagation(); }
        else { ev.cancelBubble = true; }
    },
    preventDefault: function (ev) {
        if (!ev) ev = this.getEvent();
        if (ev.preventDefault) { ev.preventDefault(); }
        else { ev.returnValue = false; }
    },
    pointerX: function (event) {
        if (!event) event = this.getEvent();
        var doc = document;
        return event.pageX || (event.clientX + (doc.documentElement.scrollLeft || doc.body.scrollLeft));
    },
    pointerY: function (event) {
        if (!event) event = this.getEvent();
        var doc = document;
        return event.pageY || (event.clientY + (doc.documentElement.scrollTop || doc.body.scrollTop));
    },
    observeAndCache: function (ele, methodName, observer, useCapture) {
        if (!this.observers) {
            this.observers = [];
        }
        if (ele.addEventListener) {
            this.observers.push([ele, methodName, observer, useCapture]);
            ele.addEventListener(methodName, observer, useCapture);
        }
        else if (ele.attachEvent) {
            this.observers.push([ele, methodName, observer, useCapture]);
            ele.attachEvent('on' + methodName, observer);
        }
    },
    unloadCache: function () {
        if (!this.observers) return;
        for (var i = 0; i < this.observers.length; i++) {
            this.stopObserving(this.observers[i][0], this.observers[i][1], this.observers[i][2], this.observers[i][3]);
            this.observers[i][0] = null;
        }
        this.observers = false;
    },
    observe: function (ele, methodName, observer, useCapture) {
        useCapture = useCapture || false;
        if (methodName == 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || ele.attachEvent)) methodName = 'keydown';
        this.observeAndCache(ele, methodName, observer, useCapture);
    },
    stopObserving: function (ele, methodName, observer, useCapture) {
        useCapture = useCapture || false;
        if (methodName == 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || ele.detachEvent)) methodName = 'keydown';
        if (ele.removeEventListener) {
            ele.removeEventListener(methodName, observer, useCapture);
        }
        else if (ele.detachEvent) {
            ele.detachEvent('on' + methodName, observer);
        }
    }
};  
/***************************************************************
* Cookie操作对象                                               *
***************************************************************/
 bit.Cookie={
	/**
	 * 生成要求格式的过期时间
	 * @param {integer} days 有效的天数
	 * @param {integer} hours 有效的小时数
	 * @param {integer} minutes 有效的分钟数
	 * @return {datetime} 返回标准GMT时间
	 */
	getExpDate:function(days, hours, minutes) {
	    var expDate = new Date( );
	    if (typeof days == "number" && typeof hours == "number" && 
	        typeof hours == "number") {
	        expDate.setDate(expDate.getDate( ) + parseInt(days));
	        expDate.setHours(expDate.getHours( ) + parseInt(hours));
	        expDate.setMinutes(expDate.getMinutes( ) + parseInt(minutes));
	        return expDate.toGMTString( );
	    }
	},  
	getCookieVal:function(offset) {
	    var endstr = document.cookie.indexOf (";", offset);
	    if (endstr == -1) {
	        endstr = document.cookie.length;
	    }
	    return unescape(document.cookie.substring(offset, endstr));
	},
	/**
	 * 获取对应name的cookie值
	 * @param {String} name 要获取cookie的名称
	 * @return {string} 返回name要获取cookie的值
	 */
	getCookie:function(name) {
	    var arg = name + "=";
	    var alen = arg.length;
	    var clen = document.cookie.length;
	    var i = 0;
	    while (i < clen) {
	        var j = i + alen;
	        if (document.cookie.substring(i, j) == arg) {
	            return this.getCookieVal(j);
	        }
	        i = document.cookie.indexOf(" ", i) + 1;
	        if (i == 0) break; 
	    }
	    return "";
	},
	/**
	 * 以数组形式获取所有cookies
	 * @return {Array} 返回一个二维数组，Array[]['name'],Array[]['value']
	 */
	getCookies:function(){
		 var _Cookie = new Array();
		 var _sp,_name,_value,_tp,_tars,_tarslength,_coo; 
		 
		 if(document.cookie.indexOf(";")!=-1){	          
	          var _item=document.cookie.split("; "); 
	          var _itemlength=_item.length; 
	          for(i=0;i<_itemlength;i++){
	          	_sp = _item[i].split("=");
	          	_name=_sp[0];
	          	_value =_sp[1];
	          	_coo = new Array();
	          	_coo['name']=_name;
	          	_coo['value']=_value;
	          	_Cookie.push(_coo);
	          }
	     } 
	     else if(document.cookie.indexOf("=")!=-1){
	        _sp = document.cookie.split("=");
        	_name=_sp[0];
          	_value =_sp[1];
        	_coo = new Array();
          	_coo['name']=_name;
          	_coo['value']=_value;
          	_Cookie.push(_coo); 
	     }
	     return _Cookie;
	},
	/**
	 * 设置cookies
	 * @param {String} name
	 * @param {String} value
	 * @param {DateTime} expires
	 * @param {String} path
	 * @param {String} domain
	 * @param {String} secure
	 */
	setCookie:function(name, value, expires, path, domain, secure) {
	    document.cookie = name + "=" + escape (value) +
	        ((expires) ? "; expires=" + expires : "") +
	        ((path) ? "; path=" + path : "") +
	        ((domain) ? "; domain=" + domain : "") +
	        ((secure) ? "; secure" : "");
	    
	},
	/**
	 * 通过设置过期时间删除参数确定的cookie
	 * @param {String} name
	 * @param {String} path
	 * @param {String} domain
	 */
	deleteCookie:function(name,path,domain) {
	    if (this.getCookie(name)) {
	        document.cookie = name + "=" +
	            ((path) ? "; path=" + path : "") +
	            ((domain) ? "; domain=" + domain : "") +
	            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	    }
	},
	/**
	 * 清除客户端所与cookies
	 * @method
	 */
	clearCookie:function(){
		cookies = this.getCookies();
		for(i=0;i<cookies.length;i++){
			this.deleteCookie(cookies[i]['name']);
		}
	},
	/**
	 * 获取客户端cookies字符串
	 * @return {String}
	 */
	getCookieString:function(){
		return document.cookie;	
	}
}
bit.Ajax = function(){};
bit.Ajax.prototype ={ 
    /**
    * 获取 XMLHTTP 对象
    * @return {XMLHttpRequest}
    */
    initXMLHTTPRequest:function (){ 
        var xRequest = null;      
        try {
            xRequest = new ActiveXObject("Msxml2.XMLHTTP");
            return xRequest;
        } 
        catch (othermicrosoft) {
            try {
                xRequest = new ActiveXObject("Microsoft.XMLHTTP");
                return xRequest;
            } 
            catch (failed) {            
                try{
                    xRequest = new XMLHttpRequest();
                    return xRequest;
                }
                catch(error){
                    alert(error);
                    return null;
                }
            }
        } 
     },
	 /**
	 *示例： var ajax = new SimpleAjax();  
             if( ajax.initXMLHTTPRequest() !=null){ ajax.sendRequest(requestUrl,"1","GET",function(responseText){alert(responseText);},4); }
	 * 发送AJAX请求
	 * @param {String} url          请求的URL
	 * @param {String} isAsync      是否使用异步
	 * @param {String} httpMethod   提交方式
	 * @param {String} handler      处理函数
	 * @param {String} resultType   Response数据的格式	 
	 */
     sendRequest:function(url,isAsync,httpMethod,handler,resultType){  //发送 异步xml requesst   
        if(!httpMethod) httpMethod = "GET";
        var req = this.initXMLHTTPRequest(); 
        if(req){           
            req.onreadystatechange = function(hanlder){ 
                var READY_STATE_UNINITIALIZED=0;
                var READY_STATE_LOADING=1;
                var READY_STATE_LOADED=2;
                var READY_STATE_INTERACTIVE=3;
                var READY_STATE_COMPLETE=4;
                var RESULT_AS_TEXT=0;
                var RESULT_AS_XML=1;
                var RESULT_AS_STREAM=2;
                var RESULT_AS_ARRAY=4; 
                 
                var ready = req.readyState;
                var result = null;
             
                if(ready==READY_STATE_COMPLETE){            
                    if(req.status==200){    
                        if(resultType== RESULT_AS_TEXT) result= req.responseText;                     
                        else if(resultType== RESULT_AS_XML) result= req.responseXML;
                        else if(resultType== RESULT_AS_STREAM) result= req.responseStream;
                        else if(resultType== RESULT_AS_ARRAY)  result= req.responseBody;
                        handler(result);              
                    }                  
                }
            }
            
            try{
                req.open(httpMethod,url,isAsync);
            }
            catch(error){
                alert(error);
            }         
            req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            req.send(null);  
        }
    }    
}