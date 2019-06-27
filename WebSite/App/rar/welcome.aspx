<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_rar_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    
    <asp:Button ID="Button1" runat="server" Text="压缩" onclick="Button1_Click" />
    

    &nbsp;&nbsp;
    

    <asp:Button ID="Button2" runat="server" Text="解压缩" onclick="Button2_Click" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

  