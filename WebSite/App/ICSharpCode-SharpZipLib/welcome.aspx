<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_ICSharpCode_SharpZipLib_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <asp:Button ID="Button1" runat="server" Text="ZipFilesFolder" 
        onclick="Button1_Click" />


    <br />
    <asp:Button ID="Button2" runat="server" onclick="Button2_Click" 
        Text="DownloadZipToBrowser" />
    <br />
    <asp:Button ID="Button3" runat="server" onclick="Button3_Click" 
        Text="ExtractZipFile" />


</asp:Content>

