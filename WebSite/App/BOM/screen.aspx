<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="screen.aspx.cs" Inherits="App_BOM_screen" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">




<div id="divScreen">

</div>


<script language="javascript" type="text/javascript">

    jQuery(function() {
        var screen = window.screen;
        var availWidth = screen.availWidth;
        var availHeight = screen.availHeight;
        var szMsg = "Your screen availWidth is {0} ,availHeight is {1}<br/>Width is {2},Height is {3},colorDepth is {4}";
        document.getElementById("divScreen").innerHTML = szMsg.replace("{0}", availWidth).replace("{1}", availHeight).replace("{2}", screen.width).replace("{3}", screen.height).replace("{4}", screen.colorDepth);
      
    });

</script>


</asp:Content>

