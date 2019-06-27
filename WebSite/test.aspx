<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="test.aspx.cs" Inherits="test" ValidateRequest="false" %>

<%@ Register Assembly="CKEditor.NET" Namespace="CKEditor.NET" TagPrefix="CKEditor" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
     <script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
    <script type="text/javascript" src="js/ckfinder/ckfinder.js"></script>

carsoure: <asp:TextBox ID="txtCarSourceID" runat="server"></asp:TextBox>
<br /><br /><br />
    <CKEditor:CKEditorControl ID="txtContent" runat="server" BasePath="/js/ckeditor" 
         ContentsCss="/js/ckeditor/contents.css"></CKEditor:CKEditorControl>
 

    <br />
    <asp:Label ID="labMsg" runat="server" Text=""></asp:Label>
    <asp:Button ID="Button1" runat="server" onclick="Button1_Click" Text="保存...">
    </asp:Button>

    <br />
    <asp:TextBox ID="textTime" runat="server"></asp:TextBox>
  <%--  <asp:Button ID="Button1" runat="server" Text="Serialize" 
        onclick="Button1_Click1"></asp:Button>



    <asp:Button ID="Button2" runat="server" Text="Deserialize" 
        onclick="Button2_Click"></asp:Button>--%>



    <br />
    <br />
    <asp:Label ID="labResult" runat="server" ForeColor="Red"></asp:Label>





<br />
Alert:<br />
<asp:TextBox ID="txtAlert" runat="server" Height="142px" TextMode="MultiLine" 
    Width="469px"></asp:TextBox>





</asp:Content>

