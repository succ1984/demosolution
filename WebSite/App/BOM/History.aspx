<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="History.aspx.cs" Inherits="App_BOM_History" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<script language="javascript" type="text/javascript">
    jQuery(function() {
        window.history.foward();
        window.history.back();
        window.history.go(-1);
    });

</script>
</asp:Content>

