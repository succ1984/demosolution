<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="lightBox.aspx.cs" Inherits="App_effects_lightBox" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
     <link href="ibitauto_2012_common.css" rel="stylesheet" type="text/css" />
     <style type="text/css">
        .buttons{   
            border:1px solid #CDCDCD;
            margin-bottom:10px;
        }
        
       .scDialogWrapper
       {
           width:300px; overflow:hidden;
       }
       .scDialogContent
       {
           word-break:break-all;
           word-wrap:break-word;
       }
        .scDialogContent p
        {
            margin-top:10px;
        }
       .scDialogTxt
       {
           width:95%;
           border:1px solid #cccccc;
           height:18px; line-height:18px;
           padding:5px;
       }
            
    </style>
    
    <script src="../../js/jsLib.js" type="text/javascript"></script>
    <script src="../../js/lightBox.js" type="text/javascript"></script>
    <script type="text/javascript">
        JU.domReady(function () {
            //            LightBox.alert("abc");
            //            LightBox.alert({
            //                title: "提示",
            //                content: "抱歉，你不能重复提交投诉！",
            //                btnText: "确定"
            //            });
            //            LightBox.alert({
            //                title: "提示",
            //                content: "抱歉，你不能重复提交投诉！",
            //                btnText: "确定",
            //                callback: function () {
            //                    LightBox.alert("你点击了确定按钮哦!");
            //                }
            //            });


            //            LightBox.confirm({
            //                title: "确认提示",
            //                content: "你确定要删除该订单吗？"
            //            });
            //            LightBox.confirm({
            //                title: "确认提示",
            //                content: "你确定要删除该订单吗？",
            //                callbackOk: function () {
            //                    LightBox.alert("你选择了确定");
            //                },
            //                callbackCancel: function () {
            //                    LightBox.alert("你选择了取消");
            //                }
            //            });

            LightBox.prompt("请输入你的电话号码");

            LightBox.prompt("亲,请输入你的电话号码:", "13436300382");

            LightBox.prompt({
                title:"询问信息",
                content:"亲,请输入你的电话号码:",
                defaultValue: "13436300382",
                callbackOk:function(txt){
                    LightBox.alert("亲，你刚输入了:  " + txt);
                }
            });



        });
    </script>
    <%--<div class="ui-dialog">
        <div class="ui-dialog-titlebar">
            <span class="ui-dialog-title" id="ui-id-1">
                这里是标题</span>
            <a class="ui-dialog-titlebar-close" href="#">
                <span class="ui-icon-closethick">
                    关闭</span></a>
        </div>
        <div scrollleft="0" scrolltop="0" class="ui-dialog-content" style="">
            <p>
                这里是内容1</p>
            <p>
                这里是内容2</p>
        </div>
        <div class="ui-dialog-buttonpane">
            <div class="ui-dialog-buttonset">
                <button aria-disabled="false" role="button" class="ui_bottom_y ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    type="button">
                    <span class="ui-button-text">
                        黄</span></button>
                <button aria-disabled="false" role="button" class="ui_bottom_b ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    type="button">
                    <span class="ui-button-text">
                        蓝</span></button>
                <button aria-disabled="false" role="button" class="ui_bottom_h ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    type="button">
                    <span class="ui-button-text">
                        灰</span></button>
            </div>
            <!--		   <div class="bottom_an"><strong><input type="button" onclick="" class="bottom_yt" value="提交"/></strong></div>
		   <div class="bottom_an_c"><strong><input type="button" onclick="" class="bottom_yt" value="取消"/></strong></div>
		   <div class="bottom_an_b"><strong><input type="button" onclick="" class="bottom_yt" value="取消"/></strong></div>
-->
        </div>
    </div>--%>

    <!--alert-->
   <%-- <div id="{dialogID}" class="ui-dialog {dialogClassName}">
        <div class="ui-dialog-titlebar">
            <span class="ui-dialog-title" id="ui-id-1">
                {title}</span>
            <a class="ui-dialog-titlebar-close {closeClassName}" href="#">
                <span class="ui-icon-closethick">
                    关闭</span></a>
        </div>
        <div scrollleft="0" scrolltop="0" class="ui-dialog-content {contentClassName}" style="">
           {content}
        </div>
        <div class="ui-dialog-buttonpane">
            <div class="ui-dialog-buttonset">
                <button class="ui_bottom_y ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only {btnClassName}" 
                    type="button">
                    <span class="ui-button-text">
                        {btnText}</span></button>               
            </div>         
        </div>
    </div>--%>
    <!--confirm-->
     <%--<div id="{dialogID}" class="ui-dialog {dialogClassName}">
        <div class="ui-dialog-titlebar">
            <span class="ui-dialog-title" id="ui-id-1">
                {title}</span>
            <a class="ui-dialog-titlebar-close {closeClassName}" href="#">
                <span class="ui-icon-closethick">
                    关闭</span></a>
        </div>
        <div scrollleft="0" scrolltop="0" class="ui-dialog-content {contentClassName}" style="">
           {content}
        </div>
        <div class="ui-dialog-buttonpane">
            <div class="ui-dialog-buttonset">
                <button class="ui_bottom_y ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only {btnConfirmClassName}" 
                    type="button">
                    <span class="ui-button-text">
                        {btnConfirmText}
                    </span>
                </button>
                <button aria-disabled="false" role="button" class="ui_bottom_b ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only {btnCancelClassName}"
                    type="button">
                    <span class="ui-button-text">{btnCancelText}</span>
               </button>
            </div>         
        </div>
    </div>--%>
    <!--prompt-->
    <%--<div id="{dialogID}" class="ui-dialog {dialogClassName}">
        <div class="ui-dialog-titlebar">
            <span class="ui-dialog-title">
                {title}</span>
            <a class="ui-dialog-titlebar-close {closeClassName}" href="#">
                <span class="ui-icon-closethick">
                    关闭</span></a>
        </div>
        <div scrollleft="0" scrolltop="0" class="ui-dialog-content {contentClassName}" style="">
           <p>{content}</p>
           <p><input class="{dialogTxtClassName}" type="text" value="{defaultValue}" /></p>          
        </div>
        <div class="ui-dialog-buttonpane">
            <div class="ui-dialog-buttonset">
                <button class="ui_bottom_y ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only {btnConfirmClassName}" 
                    type="button">
                    <span class="ui-button-text">
                        {btnConfirmText}
                    </span>
                </button>
                <button aria-disabled="false" role="button" class="ui_bottom_b ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only {btnCancelClassName}"
                    type="button">
                    <span class="ui-button-text">{btnCancelText}</span>
               </button>
            </div>         
        </div>
    </div>--%>

    <!--loadIframe-->
    <%--<div id="{dialogID}" class="ui-dialog {dialogClassName}">
        <div class="ui-dialog-titlebar">
            <span class="ui-dialog-title">
                {title}</span>
            <a class="ui-dialog-titlebar-close {closeClassName}" href="#">
                <span class="ui-icon-closethick">
                    关闭</span></a>
        </div>
        <div scrollleft="0" scrolltop="0" class="ui-dialog-content {contentClassName}" style="">
          <iframe src="{frameUrl}" width="{width}px" height="{height}px" style="width:{width}px;height:{height}px;"></iframe>        
        </div>
    </div>--%>
    <!--loadTip-->
     <div id="{dialogID}" class="ui-dialog {dialogClassName}">
       
        <div class="ui-dialog-content {contentClassName}" style="">
            <p>{tipText}</p>  
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

