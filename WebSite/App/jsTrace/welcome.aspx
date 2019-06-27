<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_jsTrace_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<style type="text/css">
  <%-- *html,*html body{background-image:url(about:blank);background-attachment:fixed;} --%>
</style>
<script src="../../js/traceTool.js" type="text/javascript"></script>
<script type="text/javascript">
    window.onload = function () {
        var btnWrite = document.getElementById("btnWrite");
        var btnClear = document.getElementById("btnClear");
        var btnWarn = document.getElementById("btnWarn");
        var btnShow = document.getElementById("btnShow");
        var btnHide = document.getElementById("btnHide");
        btnWrite.onclick = function () {
            trace.write("This is a write message");
            trace.write("navigator.appName: " + navigator.appName);
            trace.warn("navigator.appVersion: " + navigator.appVersion);
            trace.write("navigator.userAgent: " + navigator.userAgent);
        }
        btnWarn.onclick = function () {
            trace.warn("This is a warn message");
        }
        btnClear.onclick = function () {
            trace.clear();
        }
        btnShow.onclick = function () {
            trace.show();
        }
        btnHide.onclick = function () {
            trace.hide();
        }

    }

</script>

<input type="button" id="btnWrite" value="Write"/>

<input type="button" id="btnWarn" value="Warn"/>

<input type="button" id="btnClear" value="Clear"/>

<input type="button" id="btnShow" value="ShowTraceInfo"/>

<input type="button" id="btnHide" value="HideTraceInfo"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

