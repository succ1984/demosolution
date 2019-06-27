<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true"
    CodeFile="welcome.aspx.cs" Inherits="App_clientHeight_offsetHeight_scrollHeight_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <style type="text/css">
        .wrap{
            overflow:hidden;
        }
        .outerBox
        {
            padding: 15px;
            margin: 30px;
            border: 10px solid #000000;
            background-color:#555555;
            overflow:hidden;
        }
        .innerBox
        {
            color: red;
            margin: 20px;
            padding: 10px;
            border: 5px solid #000000;
            height: 50px;  width:800px;
            background-color:#FFFFFF;          
            overflow:auto;
        } 
        .btn{
            background-color:#CCCCCC; color:Red;
            padding:5px; font-size:13px;
        }
        pre{
           background-color:#CCCCCC;
        }
              
    </style>
    <script src="../../js/jquery-1.6.4.js" type="text/javascript"></script>
    <script type="text/javascript">
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
                var w = el.offsetWidth;
                var h = el.offsetHeight;
                var x = y = 0;
                while (el) {
                    x += el.offsetLeft;
                    y += el.offsetTop;
                    el = el.parentNode;
                }
                return { top: x, left: y, width: w, height: h };
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
            }
        };
    
        function checkElementSize() {
            var oOuterBox = get.toElement("outerBox");
            var oInnerBox = get.toElement("innerBox");
            var oResult = get.toElement("result");
            var arrTemp = [];
            arrTemp[arrTemp.length] = "OuterBox.width:{0}, InnerBox.width:{1}";
            arrTemp[arrTemp.length] = "OuterBox.height:{2}, InnerBox.height:{3}";
           
            var szResultFormat = arrTemp.join("<br/>");
            arrTemp = null;
            oResult.innerHTML = szResultFormat.replace("{0}", get.getComputedStyle(oOuterBox, "width"))
                                              .replace("{1}", get.getComputedStyle(oInnerBox, "width"))
                                              .replace("{2}", get.getComputedStyle(oOuterBox, "height"))
                                              .replace("{3}", get.getComputedStyle(oInnerBox, "height"))                                              
                                              ;
        }
		function checkClientHeight() {
		    var oOuterBox = get.toElement("outerBox");
		    var oInnerBox = get.toElement("innerBox");
		    var oResult = get.toElement("result");
		    var arrTemp = [];
		    arrTemp[arrTemp.length] = "OuterBox.clientHeight:{0}, InnerBox.clientHeight:{1}";
		    arrTemp[arrTemp.length] = "OuterBox.offsetHeight:{2}, InnerBox.offsetHeight:{3}";
		    arrTemp[arrTemp.length] = "OuterBox.scrollHeight:{4}, InnerBox.scrollHeight:{5}";
		    arrTemp[arrTemp.length] = "inner.height:{6}, InnerBox.computedHeight:{7}";
		    var szResultFormat = arrTemp.join("<br/>");
		    arrTemp = null;
		    oResult.innerHTML = szResultFormat.replace("{0}", oOuterBox.clientHeight)
                                              .replace("{1}", oInnerBox.clientHeight)
                                              .replace("{2}", oOuterBox.offsetHeight)
                                              .replace("{3}", oInnerBox.offsetHeight)
                                              .replace("{4}", oOuterBox.scrollHeight)
                                              .replace("{5}", oInnerBox.scrollHeight)
                                              .replace("{6}", oInnerBox.style.height)
                                              .replace("{7}", get.getComputedStyle(oInnerBox, "height"))
		                                      ;
		   
		}
    </script>
    <pre>
      .outerBox
        {
            padding: 15px;
            margin: 30px;
            border: 10px solid #000000;
            background-color:#555555;
            overflow:hidden;
        }
        .innerBox
        {
            color: red;
            margin: 20px;
            padding: 10px;
            border: 5px solid #000000;
            height: 50px;
            background-color:#FFFFFF;            
        } 
    </pre>
    <div id="outerBox" class="outerBox">
        <div class="innerBox" id="innerBox">
        <p style="width:2000px;">
       1. clientHeight和offsetHeight的值由什么决定？

假如我们有以下的DIV，主要显示的文字为"This is the main body of DIV"。
<%--
如上图所示，clientHeight的值由DIV内容的实际高度和CSS中的padding值决定，而offsetHeight的值由DIV内容的实际高度，CSS中的padding值，scrollbar的高度和DIV的border值决定；至于CSS中的margin值，则不会影响clientHeight和offsetHeight的值。

2. CSS中的Height值对clientHeight和offsetHeight有什么影响？

首先，我们看一下CSS中Height定义的是什么的高度。如在本文最后部分“APPENDIX示例代码”（注：以下称为“示例代码”）中，innerDIVClass的Height值设定为50px，在IE下计算出来的值如下所示。也就是说，在IE里面，CSS中的Height值定义了DIV包括padding在内的高度（即offsetHeight的值）；在Firefox里面，CSS中的Height值只定义的DIV实际内容的高度，padding并没有包括在这个值里面(70 = 50 + 10 * 2)。

in IE:
innerDiv.clientHeight: 46
innerDiv.offsetHeight: 50
outerDiv.clientHeight: 0
outerDiv.offsetHeight: 264

in Firfox:
innerDiv.clientHeight: 70
innerDiv.offsetHeight: 74
outerDiv.clientHeight: 348
outerDiv.offsetHeight: 362--%>
</p>
        </div>
    </div>
   
    <div id="result">
    </div>
    <div class="wrap">
        <input type="button" onclick="checkElementSize()" value="checkElementSize" class="btn" />
        <input type="button" onclick="checkClientHeight()" value="checkClientHeight" class="btn" />
    </div>
    

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" runat="Server">
</asp:Content>
