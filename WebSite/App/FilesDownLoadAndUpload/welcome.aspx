<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_FilesDownLoadAndUpload_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <p>
    <asp:FileUpload ID="FileUpload1" runat="server" />
   </p>
    
    <p>
    <asp:Button ID="Button1" runat="server" Text="Upload" onclick="Button1_Click" />
    </p>
    
    
    <p>
    
        <asp:Image ID="Image1" runat="server" ImageUrl="~/Handler/ajax.ashx?type=5" />
    </p>

</asp:Content>

