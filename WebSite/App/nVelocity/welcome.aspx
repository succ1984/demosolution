<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_nVelocity_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">





    <asp:Button ID="btnTranslate" runat="server" onclick="Button1_Click" Text="getByTemplateFile">
    </asp:Button>


    <div id="divContent" runat="server">
        
    
    </div>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

