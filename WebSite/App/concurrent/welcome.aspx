<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_concurrent_welcome" %>
<%@ MasterType VirtualPath="~/layout/main.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

 <script type="text/javascript">
     function f(i) {
         while (1) {
             document.body.innerHTML += i++ + "<br>";
         }
     }
     Concurrent.Thread.create(f, 0);
     Concurrent.Thread.create(f, 100000);
 </script>



</asp:Content>


<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

