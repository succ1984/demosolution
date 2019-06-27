<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_AysncJson_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
 <script src="../../js/traceTool.js" type="text/javascript"></script>
<script src="../../js/common.js" type="text/javascript"></script>

<script type="text/javascript">
    function callback(obj) {
        if (obj.status == true) {
            trace.write(obj.name);
            trace.warn(obj.sex);
            trace.write(obj.age);
            trace.warn(obj.date);
        }
    }
    jsUtil.getJsonP("Handler.ashx");
    trace.toggle();
</script>



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

