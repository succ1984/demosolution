﻿<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="dragdropWithResize.aspx.cs" Inherits="App_drag_drop_dragdropWithResize" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<div id="drag">
    <div class="title">
        <h2>这是一个可以拖动的窗口</h2>
        <div>
            <a class="min" href="javascript:;" title="最小化"></a>
            <a class="max" href="javascript:;" title="最大化"></a>
            <a class="revert" href="javascript:;" title="还原"></a>
            <a class="close" href="javascript:;" title="关闭"></a>
        </div>
    </div>
    <div class="resizeL"></div>
    <div class="resizeT"></div>
    <div class="resizeR"></div>
    <div class="resizeB"></div>
    <div class="resizeLT"></div>
    <div class="resizeTR"></div>
    <div class="resizeBR"></div>
    <div class="resizeLB"></div>
    <div class="content">
        ① 窗口可以拖动；<br />
        ② 窗口可以通过八个方向改变大小；<br />
        ③ 窗口可以最小化、最大化、还原、关闭；<br />
        ④ 限制窗口最小宽度/高度。
    </div>    
</div>



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">

<style type="text/css">
/*body,div,h2{margin:0;padding:0;}
body{background:url(img/bg.jpg);font:12px/1.5 \5fae\8f6f\96c5\9ed1;color:#333;}*/
body{ font:12px/1.5 \5fae\8f6f\96c5\9ed1; };
div,h2{margin:0;padding:0;}
#drag{position:absolute;top:100px;left:100px;width:300px;height:160px;background:#e9e9e9;border:1px solid #444;border-radius:5px;box-shadow:0 1px 3px 2px #666;}
#drag .title{position:relative;height:27px;margin:5px;}
#drag .title h2{font-size:14px;height:27px;line-height:24px;border-bottom:1px solid #A1B4B0;}
#drag .title div{position:absolute;height:19px;top:2px;right:0;}
#drag .title a,a.open{float:left;width:21px;height:19px;display:block;margin-left:5px;background:url(img/tool.png) no-repeat;}
a.open{position:absolute;top:10px;left:50%;margin-left:-10px;background-position:0 0;}
a.open:hover{background-position:0 -29px;}
#drag .title a.min{background-position:-29px 0;}
#drag .title a.min:hover{background-position:-29px -29px;}
#drag .title a.max{background-position:-60px 0;}
#drag .title a.max:hover{background-position:-60px -29px;}
#drag .title a.revert{background-position:-149px 0;display:none;}
#drag .title a.revert:hover{background-position:-149px -29px;}
#drag .title a.close{background-position:-89px 0;}
#drag .title a.close:hover{background-position:-89px -29px;}
#drag .content{overflow:auto;margin:0 5px;}
#drag .resizeBR{position:absolute;width:14px;height:14px;right:0;bottom:0;overflow:hidden;cursor:nw-resize;background:url(img/resize.png) no-repeat;}
#drag .resizeL,#drag .resizeT,#drag .resizeR,#drag .resizeB,#drag .resizeLT,#drag .resizeTR,#drag .resizeLB{position:absolute;background:#000;overflow:hidden;opacity:0;filter:alpha(opacity=0);}
#drag .resizeL,#drag .resizeR{top:0;width:5px;height:100%;cursor:w-resize;}
#drag .resizeR{right:0;}
#drag .resizeT,#drag .resizeB{width:100%;height:5px;cursor:n-resize;}
#drag .resizeT{top:0;}
#drag .resizeB{bottom:0;}
#drag .resizeLT,#drag .resizeTR,#drag .resizeLB{width:8px;height:8px;background:#FF0;}
#drag .resizeLT{top:0;left:0;cursor:nw-resize;}
#drag .resizeTR{top:0;right:0;cursor:ne-resize;}
#drag .resizeLB{left:0;bottom:0;cursor:ne-resize;}
</style>
<script type="text/javascript">
    /*-------------------------- +
    获取id, class, tagName
    +-------------------------- */
    var get = {
        byId: function (id) {
            return typeof id === "string" ? document.getElementById(id) : id
        },
        byClass: function (sClass, oParent) {
            var aClass = [];
            var reClass = new RegExp("(^| )" + sClass + "( |$)");
            var aElem = this.byTagName("*", oParent);
            for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
            return aClass
        },
        byTagName: function (elem, obj) {
            return (obj || document).getElementsByTagName(elem)
        }
    };
    var dragMinWidth = 250;
    var dragMinHeight = 124;
    /*-------------------------- +
    拖拽函数
    +-------------------------- */
    function drag(oDrag, handle) {
        var disX = dixY = 0;
        var oMin = get.byClass("min", oDrag)[0];
        var oMax = get.byClass("max", oDrag)[0];
        var oRevert = get.byClass("revert", oDrag)[0];
        var oClose = get.byClass("close", oDrag)[0];
        handle = handle || oDrag;
        handle.style.cursor = "move";
        handle.onmousedown = function (event) {
            var event = event || window.event;
            disX = event.clientX - oDrag.offsetLeft;
            disY = event.clientY - oDrag.offsetTop;

            document.onmousemove = function (event) {
                var event = event || window.event;
                var iL = event.clientX - disX;
                var iT = event.clientY - disY;
                var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
                var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;

                iL <= 0 && (iL = 0);
                iT <= 0 && (iT = 0);
                iL >= maxL && (iL = maxL);
                iT >= maxT && (iT = maxT);

                oDrag.style.left = iL + "px";
                oDrag.style.top = iT + "px";

                return false
            };

            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
                this.releaseCapture && this.releaseCapture()
            };
            this.setCapture && this.setCapture();
            return false
        };
        //最大化按钮
        oMax.onclick = function () {
            oDrag.style.top = oDrag.style.left = 0;
            oDrag.style.width = document.documentElement.clientWidth - 2 + "px";
            oDrag.style.height = document.documentElement.clientHeight - 2 + "px";
            this.style.display = "none";
            oRevert.style.display = "block";
        };
        //还原按钮
        oRevert.onclick = function () {
            oDrag.style.width = dragMinWidth + "px";
            oDrag.style.height = dragMinHeight + "px";
            oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
            oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
            this.style.display = "none";
            oMax.style.display = "block";
        };
        //最小化按钮
        oMin.onclick = oClose.onclick = function () {
            oDrag.style.display = "none";
            var oA = document.createElement("a");
            oA.className = "open";
            oA.href = "javascript:;";
            oA.title = "还原";
            document.body.appendChild(oA);
            oA.onclick = function () {
                oDrag.style.display = "block";
                document.body.removeChild(this);
                this.onclick = null;
            };
        };
        //阻止冒泡
        oMin.onmousedown = oMax.onmousedown = oClose.onmousedown = function (event) {
            this.onfocus = function () { this.blur() };
            (event || window.event).cancelBubble = true
        };
    }
    /*-------------------------- +
    改变大小函数
    +-------------------------- */
    function resize(oParent, handle, isLeft, isTop, lockX, lockY) {
        handle.onmousedown = function (event) {
            var event = event || window.event;
            var disX = event.clientX - handle.offsetLeft;
            var disY = event.clientY - handle.offsetTop;
            var iParentTop = oParent.offsetTop;
            var iParentLeft = oParent.offsetLeft;
            var iParentWidth = oParent.offsetWidth;
            var iParentHeight = oParent.offsetHeight;

            document.onmousemove = function (event) {
                var event = event || window.event;

                var iL = event.clientX - disX;
                var iT = event.clientY - disY;
                var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
                var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;
                var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
                var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;

                isLeft && (oParent.style.left = iParentLeft + iL + "px");
                isTop && (oParent.style.top = iParentTop + iT + "px");

                iW < dragMinWidth && (iW = dragMinWidth);
                iW > maxW && (iW = maxW);
                lockX || (oParent.style.width = iW + "px");

                iH < dragMinHeight && (iH = dragMinHeight);
                iH > maxH && (iH = maxH);
                lockY || (oParent.style.height = iH + "px");

                if ((isLeft && iW == dragMinWidth) || (isTop && iH == dragMinHeight)) document.onmousemove = null;

                return false;
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            };
            return false;
        }
    };
    window.onload = window.onresize = function () {
        var oDrag = document.getElementById("drag");
        var oTitle = get.byClass("title", oDrag)[0];
        var oL = get.byClass("resizeL", oDrag)[0];
        var oT = get.byClass("resizeT", oDrag)[0];
        var oR = get.byClass("resizeR", oDrag)[0];
        var oB = get.byClass("resizeB", oDrag)[0];
        var oLT = get.byClass("resizeLT", oDrag)[0];
        var oTR = get.byClass("resizeTR", oDrag)[0];
        var oBR = get.byClass("resizeBR", oDrag)[0];
        var oLB = get.byClass("resizeLB", oDrag)[0];

        drag(oDrag, oTitle);
        //四角
        resize(oDrag, oLT, true, true, false, false);
        resize(oDrag, oTR, false, true, false, false);
        resize(oDrag, oBR, false, false, false, false);
        resize(oDrag, oLB, true, false, false, false);
        //四边
        resize(oDrag, oL, true, false, false, true);
        resize(oDrag, oT, false, true, true, false);
        resize(oDrag, oR, false, false, false, true);
        resize(oDrag, oB, false, false, true, false);

        oDrag.style.left = (document.documentElement.clientWidth - oDrag.offsetWidth) / 2 + "px";
        oDrag.style.top = (document.documentElement.clientHeight - oDrag.offsetHeight) / 2 + "px";
    }
</script>

</asp:Content>

