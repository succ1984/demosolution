
(function (window) {
    'use strict';
    var UA = (function () {
        var szUA = window.navigator.userAgent.toLowerCase(), s = "";
        return {
            isIE: (s=szUA.match(/msie ([\d.]+)/)) ? s[1] : 0,
            isFirefox: (s=szUA.match(/firefox\/([\d.]+)/)) ? s[1] : 0,
            isChrome: (s=szUA.match(/chrome\/([\d.]+)/)) ? s[1] : 0,
            isSafari: (s = szUA.match(/version\/([\d.]+).*safari/)) ? s[1] : 0,
            isOpera: (s=szUA.match(/opr\/([\d.]+)/)) ? s[1] : 0,
            toString: szUA
        };
    })();
    //Expose UA to window
    window.UA = UA;
})(this);     //end UA
/******************
** jsLib begin
**/
(function () {
    var jsLib = window.jsLib || {};
    window.JU = jsLib;
    /*********************************************************************************************
    *domReady begin
    */
    
    jsLib.domReady = function () {
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
            } 
            else {
                doc.isReady && doReady(doc);
                if (!!window.ActiveXObject) {
                    doc.attachEvent("onreadystatechange", function() {
                                    if (doc.readyState === "complete") {
                                        doc.detachEvent("onreadystatechange", arguments.callee);
                                        doReady(doc);
                                    }
                    });   
                 
                    win.attachEvent('onload', function () {
                        doReady(doc);
                    });

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
                } 
                else {
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
    } ();  
    
    /*domReady end..********************************************************************/

    /***********************************************************************************
    *base begin..
    */
    jsLib.base={
        _this:this
        ,type:(function(obj){
            var copyIsArray
            ,toString = Object.prototype.toString
            ,hasOwn = Object.prototype.hasOwnProperty
            ,class2type = {
                    "[object Boolean]" : "boolean",
                    "[object Number]" : "number",
                    "[object String]" : "string",
                    "[object Function]" : "function",
                    "[object Array]" : "array",
                    "[object Date]" : "date",
                    "[object RegExp]" : "regExp",
                    "[object Object]" : "object"
                };
           return function(obj){
                 return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
           };      
        })()//end type
        ,isWindow:function(obj){
            return obj != null && obj == obj.window;
        }
        ,isArray:function(obj){
           return (Array.isArray || function(obj) {
                return jsLib.base.type(obj) === "array";
            });
        }
        ,isFunction:function(obj){
            return jsLib.base.type(obj)==="function";   
        }
        ,isNumeric:function(obj){
            return !isNaN( parseFloat(obj) ) && isFinite( obj );
        }
        ,isPlainObject: function( obj ) {
            var base=jsLib.base;
            var type=jsLib.base.type;            
		    // Must be an Object.
		    // Because of IE, we also have to check the presence of the constructor property.
		    // Make sure that DOM nodes and window objects don't pass through, as well
		    if ( !obj || type(obj) !== "object" || obj.nodeType || base.isWindow( obj ) ) {
			    return false;
		    }
		    try {
			    // Not own constructor property must be Object
			    if ( obj.constructor &&
				    !hasOwn.call(obj, "constructor") &&
				    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				    return false;
			    }
		    } catch ( e ) {
			    // IE8,9 Will throw exceptions on certain host objects #9897
			    return false;
		    }
		    // Own properties are enumerated firstly, so to speed up,
		    // if last one is own, then all properties are own.
		    var key;
		    for ( key in obj ) {}
		    return key === undefined || hasOwn.call( obj, key );
	    }
	    ,isEmptyObject: function( obj ) {
		    for ( var name in obj ) {
			    return false;
		    }
		    return true;
	    }
	    ,error: function( msg ) {
		    throw new Error( msg );
	    }
        //extract from jQuery
        ,extend:function(){
                var options, name, src, copy, copyIsArray, clone,
		            target = arguments[0] || {},
		            i = 1,
		            length = arguments.length,
		            deep = false;                   

	            // Handle a deep copy situation
	            if ( typeof target === "boolean" ) {
		            deep = target;
		            target = arguments[1] || {};
		            // skip the boolean and the target
		            i = 2;
	            }

	            // Handle case when target is a string or something (possible in deep copy)
	            if ( typeof target !== "object" && !jsLib.base.isFunction(target) ) {
		            target = {};
	            }

	            // extend jQuery itself if only one argument is passed
	            if ( length === i ) {
		            target = this;
		            --i;
	            }

	            for ( ; i < length; i++ ) {
		            // Only deal with non-null/undefined values
		            if ( (options = arguments[ i ]) != null ) {
			            // Extend the base object
			            for ( name in options ) {
				            src = target[ name ];
				            copy = options[ name ];

				            // Prevent never-ending loop
				            if ( target === copy ) {
					            continue;
				            }

				            // Recurse if we're merging plain objects or arrays
				            if ( deep && copy && (jsLib.base.isPlainObject(copy) || (copyIsArray = jsLib.base.isArray(copy)) ) ) {
					            if ( copyIsArray ) {
						            copyIsArray = false;
						            clone = src && jsLib.base.isArray(src) ? src : [];

					            } else {
						            clone = src && jsLib.base.isPlainObject(src) ? src : {};
					            }

					            // Never move original objects, clone them
					            target[ name ] = arguments.callee.call( deep, clone, copy );

				            // Don't bring in undefined values
				            } else if ( copy !== undefined ) {
					            target[ name ] = copy;
				            }
			            }
		            }
	            }//end for

	            // Return the modified object
	            return target;           
        }
        ,bind:function(fn,context){
            return function(){
//                var nArgLength=arguments.length;
//                while(nArgLength-->0){
//                    alert(arguments[nArgLength]);
//                }
                return fn.apply(context,arguments);
            };
        }
        ,bindCurry:function(fn,context){
            var args=Array.prototype.slice.call(arguments,2);
            return function(){
                var innerArgs=Array.prototype.slice.call(arguments);
                var finalArgs=args.concat(innerArgs);
                return fn.apply(context,finalArgs);
            };
        }
        ,contains:function(refNode,otherNode){
            var bReturn=false;
            var node=otherNode.parentNode;
            do{
               if(node===refNode){
                    bReturn=true;
                    break;
               }
               else{
                    node=node.parentNode;
               }
            }while(node!=null);
            return bReturn;
        }
        ,each: function( object, callback, args ) {//extract from jQuery,can deal with array && object
		    var name, i = 0,
			    length = object.length,
			    isObj = length === undefined || jsLib.base.isFunction( object );

		    if ( args ) {
			    if ( isObj ) {
				    for ( name in object ) {
					    if ( callback.apply( object[ name ], args ) === false ) {
						    break;
					    }
				    }
			    } else {
				    for ( ; i < length; ) {
					    if ( callback.apply( object[ i++ ], args ) === false ) {
						    break;
					    }
				    }
			    }
		    // A special, fast, case for the most common use of each
		    } else {
			    if ( isObj ) {
				    for ( name in object ) {
					    if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						    break;
					    }
				    }
			    } else {
				    for ( ; i < length; ) {
					    if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
						    break;
					    }
				    }
			    }
		    }
		    return object;
	    }//end each
        , $: function (id) {
            return "string" == typeof id ? document.getElementById(id) : id;
        }
        , getElementsByClassName: function (searchClass, node, tag) {
            var result = [];
            if (document.getElementsByClassName) {
                var nodes = (node || document).getElementsByClassName(searchClass);
                tag = tag || "*";
                if (tag == "*") {
                    result = nodes;
                }
                else {
                    for (var i = 0; node = nodes[i++]; ) {
                        if (node.tagName === tag.toUpperCase()) {
                            result.push(node)
                        }
                    }
                }
                return result;
            } else {
                node = node || document;
                tag = tag || "*";
                var classes = searchClass.split(" "),
                  elements = (tag === "*" && node.all) ? node.all : node.getElementsByTagName(tag),
                  patterns = [],
                  current,
                  match;
                var i = classes.length;
                while (--i >= 0) {
                    patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
                }
                var j = elements.length;
                while (--j >= 0) {
                    current = elements[j];
                    match = false;
                    for (var k = 0, kl = patterns.length; k < kl; k++) {
                        match = patterns[k].test(current.className);
                        if (!match) break;
                    }
                    if (match) result.push(current);
                }                
                return result.reverse();
            }
        }
        ,nextSibling:function(node, tag) {
            if (!tag) {
                tag = "*";
            }
            if (tag == "*") {
                while ((node.nextSibling.nodeType != 1)) {
                    node = node.nextSibling;
                }
            }
            else {
                while ((node.nextSibling.nodeType != 1) || (node.nextSibling.nodeType == 1 && node.nextSibling.tagName.toLowerCase() !== tag.toLowerCase())) {
                     node = node.nextSibling;
                }
            }
            return node.nextSibling;
        }
        ,addClass: function (el, val) {
        el = this.$(el);
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
    removeClass: function (el, val) {
        el = this.$(el);
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

    }  
        , addHandler: function (element, type, fn) {

            if (element.attachEvent) {
                element.attachEvent("on" + type, fn);
            }
            else if (element.addEventListener) {
                element.addEventListener(type, fn, false);
            }
            else {
                element["on" + type] = fn;
            }
        }
        , removeHandler: function (element, type, fn) {
            if (element.attachEvent) {
                element.detavhEvent("on" + type, fn);
            }
            else if (element.addEventListener) {
                element.removeEventListener(type, fn, false);
            }
            else {
                element["on" + type] = null;
            }
        }

        , getEvent: function (event) {
            return event ? event : window.event;
        }       
        , getTarget: function (event) { //获取触发事件的元素
            event = event ? event : window.event;
            return event.target || event.srcElement;
        }
        ,getRelatedTarget:function(event){//获取相关元素，mouseover时IE相关元素为fomeElement,mouseout时IE相关元素为toElement
            var result=null;
             event = event ? event : window.event;
             if(event.relatedTarget){
                result=event.relatedTarget;
             }
             else if(event.toElement){
                result=event.toElement;
             }
             else if(event.fromElement){
                result=event.fromeElement;
             }
             return result;
        }       
        ,getMouseButton:function(event){ //获取鼠标按键值 0：左键，1：中键，2：右键
           event = event ? event : window.event;
           if(document.implementation.hasFeatrue("MouseEvents","2.0")){
                return event.button;
           }
           else{
                switch(event.button){
                    case 0:
                    case 1:
                    case 3:
                    case 5:
                    case 7:
                        return 0;
                    case 2:
                    case 6:
                        return 2;
                    case 4:
                        return 1;
                }
           }       
        }
        ,pageX:function(event){
            event = event ? event : window.event;           
            var doc = document;
            return event.pageX || (event.clientX + (doc.documentElement.scrollLeft || doc.body.scrollLeft));
        }
        ,pageY:function(event){
            event = event ? event : window.event;
            var doc = document;
            return event.pageY || (event.clientY + (doc.documentElement.scrollTop || doc.body.scrollTop));
        }
        ,getCharCode:function(event){
           event = event ? event : window.event;
           if (event.charCode) return event.charCode;
           else if (event.type == "keypress") return event.keyCode;
           else return 0;
        }
        ,getWheelDelta:function(event){
            /*向前滚动为120的倍数，向后滚动为-120的倍数，IE,opera,chrome,safari支持的事件名称为mousewheel,而Firefox则为：DOMMouseScroll,所以2种事件名称都要添加到事件绑定中*/
            event = event ? event : window.event;
            var nReturn=0;
            if(event.wheelDelta){
                nReturn=UA.isOpera<9.5?-event.wheelDelta:event.wheelDelta;
            }
            else{//firefox
                nReturn=-event.detail * 40;
            }
            return nReturn;
        }
        ,fixedMouse:function(event,target){//返回 true 或 false
            //修复mouseover，mouseout的冒泡行为
            e = event ? event : window.event;
            function contains(p,c){
                return p.contains ?
                       p != c && p.contains(c) :
                       !!(p.compareDocumentPosition(c) & 16);  

            }
            var related,
            type=e.type.toLowerCase();//这里获取事件名字
            if(type=="mouseover"){
                related=e.relatedTarget||e.fromElement;
            }
            else if(type=="mouseout"){
                related=e.relatedTarget||e.toElement;
            }
            else{ 
                 return true;
            }
            //Firefox有时会把XUL元素作为relatedTarget
            return related && related.prefix!='xul' && !contains(target,related) && related!==target;
        }

    };
   /*base end..********************************************************************/
    /*util begin..********************************************************************/
    jsLib.util={        
        stringHelper:(function(){
            function formatLT10(num){
               return num<10?"0"+num:num;
            }
            function getDate(date){
                var year = date.getFullYear()
                    ,month = date.getMonth() + 1
                    ,day = date.getDate();
                return year + "-" + month + "-" + day ;
            }
            function getDateTime(date) {
                var  year = date.getFullYear()
                     ,month = date.getMonth() + 1
                     ,day = date.getDate()
                     ,hh = date.getHours()
                     ,mm = date.getMinutes()
                     ,ss = date.getSeconds();
                return year + "-" + formatLT10(month) + "-" + day + " " + formatLT10(hh) + ":" + formatLT10(mm) + ":" + formatLT10(ss);
            }
            return {
                trim:function(s,trimStr){
                    var regex="";
                    if(!trimStr){
                        trimStr="\\s*";
                    }
                    regex=new RegExp(trimStr,"g");            
                    return s.replace(regex,"");
                }
                ,trimStart:function(s,trimStr){
                    var regex="";
                    if(!trimStr){
                        trimStr="\\s*";
                    }            
                    regex=new RegExp("^"+trimStr,"g");            
                    return s.replace(regex,"");
                }
                ,trimEnd:function(s,trimStr){
                    var regex="";
                    if(!trimStr){
                        trimStr="\\s*";
                    }            
                    regex=new RegExp(trimStr+"$","g");            
                    return s.replace(regex,"");
                }
                //获取url地址参数值
                ,getRequestParam:function(url,key){
                    var sValue = url.match(new RegExp("[\?\&]" + key + "=([^\&]*)(\&?)", "i"));
                    return sValue ? sValue[1] : sValue;
                }
                ,formatJsonDate:function(jsonDateStr,format){
                  //格式化js类型的时间(如"\/Date(1371447559479)\/"),format:0-->"yyyy-MM-dd",format:1-->"yyyy-MM-dd HH:mm:ss
                  // js中 \为转义字符，如要在字符中显示一个\就要输入\\方能表示，其实上面的"\/Date(1371447559479)\/"是想要表示成
                  //"/Date(1371447559479)/",其中用\对/进行了转义
                    var szReturn=""
                        ,date=eval("new " + jsonDateStr.replace(/[\/]/g, ""));
                    if(format==0){
                       szReturn= getDate(date);
                    }else if(format==1){
                        szReturn=getDateTime(date);
                    }
                    return szReturn;
                }
                //统计一个字符串中出现次数最多的字符，及其次数
                ,countMostFrequentChar:function (s) {
                    var memory = {}
                        , result = []
                        , szChar = ""
                        , regex
                        , nLength = s.length
                        , i=0
                        , maxCount = 0
                        , temp = "";
                    for (i = 0; i < s.length; i++) {
                        szChar = s.charAt(i);
                        if (memory[szChar]) {
                            continue;
                        }
                        regex = new RegExp(szChar, "g");
                        temp = s.match(regex).length;
                        if (temp > maxCount) {
                            result.length = 0;
                            result.push({ "char": szChar, "count": temp });
                            maxCount = temp;
                        }
                        else if (temp == maxCount) {
                            result.push({ "char": szChar, "count": temp });
                            maxCount = temp;
                        }
                        //保存统计过的字符，再次遇到该字符则跳过本次统计
                        memory[szChar] = temp;
                    }
                    return result;
                }//end countMostFrequentChar
            
            };//end return        
        })()//end stringHelper
    };
    /*util end..********************************************************************/
   /***********************************************************************************
    *effectes begin..
    */ 
    jsLib.effect = {
        textCounter: function (txtID, count, fnEnd, fnBefore) {
            var oText = typeof (txtID) == 'object' ? txtID : document.getElementById

(txtID);
            if (typeof fnBefore == "function") {
                fnBefore.call(this, count);
            }
            var fnOnKeyup = function (e) {
                var nRemainCount = count;
                var szValue = oText.value;
                if (szValue.length <= count) {
                    nRemainCount = count - oText.value.length;
                }
                else {
                    oText.value = szValue.substring(0, count);
                    nRemainCount = 0;
                }
                if (typeof fnEnd == "function") {
                    fnEnd.call(this, nRemainCount);
                }
            }; //end fnOnKeydown
            if (oText.attachEvent) {
                oText.attachEvent("onkeydown", fnOnKeyup);
                oText.attachEvent("onkeyup", fnOnKeyup);
            }
            else {
                oText.addEventListener("keydown", fnOnKeyup, false);
                oText.addEventListener("keyup", fnOnKeyup, false);
            }
        } //end textCounter

,
        placeHolder: function (txtID, placeHolderText) {
            var oText = typeof (txtID) == 'object' ? txtID : document.getElementById

(txtID);
            var fnFocus = function (e) {
                if (oText.value == placeHolderText || oText.value.replace(/^\s+|\s+$/g, 

"").length == 0) {
                    oText.value = "";
                }
            };
            var fnBlur = function (e) {
                if (oText.value == placeHolderText || oText.value.replace(/^\s+|\s+$/g, 

"").length == 0) {
                    oText.value = placeHolderText;
                }
            };
            if (oText.attachEvent) {
                oText.attachEvent("onfocus", fnFocus);
                oText.attachEvent("onblur", fnBlur);
            }
            else {
                oText.addEventListener("focus", fnFocus, false);
                oText.addEventListener("blur", fnBlur, false);
            }
            //use placeholderText to initialize the text..
            oText.value = placeHolderText;
        } //end placeHolder
,
        countDown: function (dtStartTime, dtEndTime, nInterval, fnCallBack) {
            if (!(typeof dtStartTime == "object" && dtStartTime.constructor == Date)
    || !(typeof dtEndTime == "object" && dtEndTime.constructor == Date)) {
                alert("The valid params...");
                return false;
            }
            var seconds = 1000;
            var minutes = 60000;
            var hours = 3600000;
            var days = 86400000;
            var t = 0;
            /* var years = days * 365;*/

            var nRemainDays = 0, nRemainHours = 0, nRemainMinutes = 0, nRemainSeconds = 

0;
            var nStartMilliSec = dtStartTime.getTime();
            var nEndMilliSec = dtEndTime.getTime();

            var fnTick = function (nStartMilliSec, nEndMilliSec) {
                var oReturn = { isExpire: false, days: 0, hours: 0, minutes: 0, 

seconds: 0 };
                var nDiff = nEndMilliSec - nStartMilliSec;
                if (nDiff >= 0) {
                    nRemainDays = Math.floor(nDiff / days);
                    nDiff -= nRemainDays * days;
                    nRemainHours = Math.floor(nDiff / hours);
                    nDiff -= nRemainHours * hours;
                    nRemainMinutes = Math.floor(nDiff / minutes);
                    nDiff -= nRemainMinutes * minutes;
                    nRemainSeconds = Math.floor(nDiff / seconds);
                    oReturn = { isExpire: false,
                        days: formatZero(nRemainDays)
                        , hours: formatZero(nRemainHours)
                        , minutes: formatZero(nRemainMinutes)
                        , seconds: formatZero(nRemainSeconds)
                    };

                }
                else {
                    oReturn.isExpire = true;
                }
                return oReturn;
            }

            function formatZero(num) {
                return num < 10 ? ('0' + num) : num;
            }


            t = setTimeout(function () {
                nStartMilliSec += nInterval;
                var oResult = fnTick(nStartMilliSec, nEndMilliSec);
                if (typeof fnCallBack == "function") {
                    fnCallBack.call(this, oResult);
                }
                if (!oResult.isExpire) {
                    t = setTimeout(arguments.callee, nInterval);
                }
                else {
                    clearTimeout(t);
                }
            }, nInterval);
        } //end countDown
,
        sideBarCollection: {
            goTop: function () {
                var doc = document.documentElement || document.body;
                window.scrollTo(0, 0);
            },
            goBottom: function () {
                var doc = document.documentElement || document.body;
                var scrollHeight = Math.max(doc.scrollHeight, doc.offsetHeight, 

doc.clientHeight);
                window.scrollTo(0, scrollHeight - doc.clientHeight);
            },
            goToElement: function (elementID, marginTop) {
                var doc = document.documentElement || document.body;

                var element = typeof (elementID) == "string" ? document.getElementById

(elementID) : elementID;
                var offsetLeft = 0, offsetTop = 0;
                while (element) {
                    offsetLeft += element.offsetLeft;
                    offsetTop += element.offsetTop;
                    element = element.offsetParent;
                }
                if (marginTop) {
                    offsetTop -= marginTop;
                }
                window.scrollTo(offsetLeft, offsetTop);
            }
        }//end sideBarCollection
,
        show:function(id){
        var o = typeof (id) == "object" ? id : document.getElementById(id);
        o.style.display="";
    }//end show()
,
        hide:function(id){
        var o = typeof (id) == "object" ? id : document.getElementById(id);
        o.style.display="none";
    }//end hide    
    ,
    tabs:function(containerId,options){
        var base=jsLib.base;
        var container,header,content,headerItems,contentItems
            ,tabLength
            ,_this
            ,bStopAuto=false //是否停止自动切换标志
            ,nextIndex;
            

        _this=this;//保存自身引用
        this.timerID=0;    
        var opts={            
//            containerId:"tab1"            
            defaultIndex:0
            ,headClassName:"tab_Head"
            ,headItemClassName:"item"           
            ,headCurrentClassName:"current"

            ,conClassName:"tab_Con"
            ,conItemClassName:"item"
            ,conCurrentClassName:"current"

            ,eventType:"click"//mouseover
            ,auto:false     //自动切换
            ,interval:5000  //只有当auto为true时才有意义
            ,hoverPause:true  //当mouseover到一tab内容时，停止自动切换
        };
       
        opts=base.extend(opts,options);
        container=base.$(containerId);
        header=base.getElementsByClassName(opts.headClassName,container)[0];
        content=base.getElementsByClassName(opts.conClassName,container)[0];
        headerItems=base.getElementsByClassName(opts.headItemClassName,header);
        contentItems=base.getElementsByClassName(opts.conItemClassName,content);
        for(var j=0;j<headerItems.length;j++){
          (function(j){
                 base.addHandler(headerItems[j],opts.eventType,base.bindCurry(_setTab,null,j));  
          })(j);
        }
        if(opts.hoverPause){
            for(var k=0;k<contentItems.length;k++){
              (function(k){
                     base.addHandler(contentItems[k],"mouseover",base.bind(function(event){
                           if(base.fixedMouse(event,contentItems[k])){
                               bStopAuto=true;
                               clearTimeout(this.timerID);
                            }
                     },_this));  
                     base.addHandler(contentItems[k],"mouseout",base.bind(function(event){
                         if(base.fixedMouse(event,contentItems[k])){
                           bStopAuto=false;
                           autoTab();                          
                           }
                     },_this));
              })(k);
            }
        }
       function _setTab(index){ 
                var oldHeaderItem=headerItems[opts.defaultIndex];
                var oldContentItem=contentItems[opts.defaultIndex];
                base.removeClass(oldHeaderItem,opts.headCurrentClassName);
                base.removeClass(oldContentItem,opts.conCurrentClassName);

                var currHeaderItem=headerItems[index];
                var currConItem=contentItems[index];
                base.addClass(currHeaderItem,opts.headCurrentClassName);
                base.addClass(currConItem,opts.conCurrentClassName);
                opts.defaultIndex=index; 
      }
      this.setTab=function(index){
         if(index<headerItems.length){
            _setTab(index);
          }
      }
      function autoTab(){
         if(bStopAuto){
            clearTimeout(this.timerID);
            return;
         }         
         this.timerID=setTimeout(function(){
           //执行切换动作   
           nextIndex=(opts.defaultIndex+1)==headerItems.length?0:(opts.defaultIndex+1);    
          _setTab(nextIndex);
          this.timerID=setTimeout(autoTab,opts.interval);         
        },opts.interval);
      }
      //初始化
      this.setTab(0);        
      if(opts.auto){
           autoTab();            
      }       
    }//end tabs
    ,loadIframe:function(iframe, callback) {
                iframe = typeof iframe == "string" ? document.getElementById(iframe) : iframe;
                if (iframe.attachEvent) {
                    iframe.attachEvent("onload", function () {
                        callback && callback();
                    });
                }
                else {
                    iframe.onload = function () {
                        callback && callback();
                    }
                }
            }//end loadIrame
    ,loadScript:function (url, callback, charset) {
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
        }//loadScript
    ,loadImage:function(src,callback,errorCallback){        
        var img = new Image();  
        img.onload = function(){
            img.onload = null;
            callback(img);
        }
        if(typeof errorCallback !="undefined"){
            img.onerror=function(){
                img.onerror=null;
                errorCallback(img);
            }
        }
        img.src = src; 
    }
};
/*effect end..********************************************************************/
/***********************************************************************************
*ajax begin..
*/ 
jsLib.ajax={
    getXHR:function(){
        return (function(){
            if(typeof XMLHttpRequest !="undefined"){
                return new XMLHttpRequest();
            }
            else if(typeof ActiveXObject !="undefined"){
                return function(){
                    if(typeof arguments.callee.activeXString!="string"){
                        var versions=

["Microsoft.XMLHTTP","MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"]
                            ,i,len;
                        for(i=0,len=versions.length;i<len;i++){
                            try{
                                new ActiveXObject(versions[i]);
                                arguments.callee.activeXString=versions[i];
                                break;
                            }
                            catch(ex){
                            }                            
                        }
                      return new ActiveXObject(arguments.callee.activeXString);
                    }//end if
                }
            }
            else{
                return function(){
                    throw new Error("No XHR object available.");
                }
            }
        })();
    }//end getXHR
}
/*ajax end..********************************************************************/

})();
/*jsLib end..**/


