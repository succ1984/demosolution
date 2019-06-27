<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="window.aspx.cs" Inherits="App_BOM_window" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<div id="divWindow">


</div>

<script type="text/javascript" language="javascript">
    document.write("document.write()");
    document.writeln("document.writeln()");
    document.title = "aa";
</script>
<script language="javascript" type="text/javascript">
    jQuery(function() {
        alert(document.title);
        alert(document.URL);
        alert(document.domain);
    });

</script>





</asp:Content>

