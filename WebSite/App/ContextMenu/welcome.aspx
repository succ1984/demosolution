<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_unenableContextMenu_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">



<p>
    document.oncontextmenudocument.oncontextmenudocument.oncontextmenudocument.oncontextmenu
    <br />
    document.oncontextmenudocument.oncontextmenudocument.oncontextmenudocument.oncontextmenu
    <br />
    document.oncontextmenudocument.oncontextmenudocument.oncontextmenudocument.oncontextmenu
    <br />
    document.oncontextmenudocument.oncontextmenudocument.oncontextmenudocument.oncontextmenu
    <br />
    document.oncontextmenudocument.oncontextmenudocument.oncontextmenudocument.oncontextmenu
    <br />
    document.oncontextmenudocument.oncontextmenudocument.oncontextmenudocument.oncontextmenu
    <br />
    document.oncontextmenudocument.oncontextmenudocument.oncontextmenudocument.oncontextmenu
    <br />
    document.oncontextmenudocument.oncontextmenudocument.oncontextmenudocument.oncontextmenu
    <br />

  

</p>

  <div id="divContextMenu" class="contextMenu">
        <ul>
            <li><a href="javascript:;">右键菜单 1</a> </li>
            <li><a href="javascript:;">右键菜单 2</a> </li>
            <li>
                <a href="javascript:;">右键菜单 3</a>
            </li>
            <li><a href="javascript:;">右键菜单 4</a> </li>
            <li><a href="javascript:;">右键菜单 5</a> </li>
            <li><a href="javascript:;">右键菜单 6</a> </li>
        </ul>
   </div>


   <style type="text/css">
    div,ul,li
    {
        margin:0px; padding:0px;
    }
    a
    {
        cursor:pointer;  text-decoration:none;
        outline:none;
        blur:expression(this.onFocus=this.blur());       
    }
    .contextMenu
    {
        width:150px;
        background-color:Gray;
        /*display:none;*/
        position:absolute; z-index:2; left:-9999px;Top:0px;
        
    }
    .contextMenu ul
    {
        
    }
    .contextMenu ul li
    {
        list-style:none;
        line-height:22px;
    }
    .contextMenu ul li a
    {
         color:#000000;
    }
    .contextMenu ul li a:hover
    {
        color:Blue;
    }
    
</style>
<script src="../../js/common.js" type="text/javascript"></script>
<script src="../../js/bitauto/base.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript">
    var get = {
        toElement: function (el) {
            var objReturn = null;
            if (typeof el == "object") {
                objReturn = el;
            }
            else {
                objReturn = document.getElementById(el);
            }
            return objReturn;
        },
        getWindowRect: function () {
            var doc = document.documentElement || document.body;
            var w = doc.scrollWidth;
            var h = doc.scrollHeight;
            var x = doc.offsetLeft;
            var y = doc.offsetTop;
            var clientRect = this.getClientRect();
            w = Math.max(w, clientRect.width);
            h = Math.max(h, clientRect.height);
            return {
                width: w,
                height: h,
                offsetLeft: x,
                offsetTop: y
            };
        },
        getClientRect: function () {
            var doc = document.documentElement || document.body;
            var w = doc.clientWidth;
            var h = doc.clientHeight;
            var x = doc.scrollLeft;
            var y = doc.scrollTop;
            return {
                width: w,
                height: h,
                ScrollLeft: x,
                ScrollTop: y
            };
        },
        getRect: function (el) {
            el = this.toElement(el);
            var w = el.offsetWidth || this.getComputedStyle(el, "width");
            var h = el.offsetHeight || this.getComputedStyle(el, "height");

            var x = y = 0;
            while (el.nodeType != 9) {
                x += el.offsetLeft;
                y += el.offsetTop;
                el = el.parentNode;
            }
            return { top: x, left: y, width: w, height: h };
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
        parseStyle: function () {

        },
        getWidth: function () {
            
        }
    };
    var eventTools = {
        addEvent: function (element, type, fn) {
            if (element.attachEvent) {
                element.attachEvent("on" + type, fn);
            }
            else {
                element.addEventListener(type, fn, false);
            }
        },
        removeEvent: function (element, type, fn) {
            if (element.detachEvent) {
                element.detachEvent("on" + type, fn);
            }
            else {
                element.removeEventListener(type, fn, false);
            }
        },
        killEvent: function (event) {
            if (event && event.stopPropagation) {
                event.stopPropagation();
                event.preventDefault();
            }
            else {
                window.event.cancelBubble = true;
                window.event.returnValue = false;
            }
        }
    };
    (function (w, d) {
        var nPageX, nPageY, oXY = { x: 0, y: 0 },
        oContextMenu = get.toElement("divContextMenu"),
        aLinks = d.getElementsByTagName("a"),
        oP = d.getElementsByTagName("p")[0];
        var clientRect = get.getClientRect();
        var menuRect = get.getRect(oContextMenu);
        d.onmousedown = function (event) {
            event = window.event || event;
            if (event.button == 2) {
                nPageX = event.clientX;
                nPageY = event.clientY;
                if (nPageX + menuRect.width > clientRect.width) {
                    nPageX = nPageX - menuRect.width;
                }
                if (nPageY + menuRect.height > clientRect.height) {
                    nPageY = nPageY - menuRect.height;
                }
                oContextMenu.style.top = nPageY + "px";
                oContextMenu.style.left = nPageX + "px";
                oContextMenu.style.display = "block";
                if (event.preventDefault) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    event.returnValue = false;
                    event.cancelBubble = true;
                }
            }
        };
        //        d.onmouseup = function (event) {
        //            event = window.event || event;
        //            if (event.clientX != oXY.x && event.clientY != oXY.y) {
        //                oContextMenu.style.display = "none";
        //            }
        //        };
        d.onclick = function (event) {
            var event = event || window.event;
            var target = event.target || event.srcElement;
           
            if (jsUtil.elementContain(oContextMenu, target)) {
                return false;
            }
            oContextMenu.style.display = "none";
        }
        d.oncontextmenu = function () {
            return false;
        };
        w.onload = function () {
             eventTools.addEvent(oContextMenu,"click",function(event){
                event = event || window.event;
                var target = event.srcElement || event.target;
                if (target.nodeName.toLowerCase() == "a") {
                    alert(target.innerHTML);
                    eventTools.killEvent(event);
                }
                else if (target.nodeName.toLowerCase() == "#text") {
                    alert(target.nodeValue);
                    eventTools.killEvent(event);
                }
            });
        }
      
    })(window, document.documentElement || document.body);

    
</script>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">


</asp:Content>

