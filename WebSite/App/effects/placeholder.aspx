<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="placeholder.aspx.cs" Inherits="App_effects_placeholder" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <script src="../../js/common.js" type="text/javascript"></script>
    <script src="../../js/traceTool.js" type="text/javascript"></script>
    <script type="text/javascript">
        jsUtil.domReady(function () {
            placeHolder("txtContent", "请准确描述您的投诉理由，以便客服及时作出判断");
        });
        function placeHolder(txtID, placeHolderText) {
            var oText = typeof (txtID) == 'object' ? txtID : document.getElementById(txtID);
            var fnFocus = function (e) {
                if (oText.value == placeHolderText || oText.value.replace(/^\s+|\s+$/g, "").length == 0) {
                    oText.value = "";
                }
            }
            var fnBlur = function (e) {
                if (oText.value == placeHolderText || oText.value.replace(/^\s+|\s+$/g, "").length == 0) {
                    oText.value = placeHolderText;
                }
            }
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
        }
    
    </script>
    <textarea id="txtContent" name="txtContent"></textarea>

    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

