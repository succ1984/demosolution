<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="iframe.aspx.cs" Inherits="App_HtmlDom_iframe" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<div id="divIframe" style="width:200px; height:20px; overflow:hidden;">

    <iframe marginheight="0px" scrolling="no" marginwidth="0px" frameborder="0" width="200px" height="20px" src="frame1.aspx"> 
    </iframe>

</div>


</asp:Content>

