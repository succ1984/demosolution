<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_SendMail_welcome"  ValidateRequest="false"%>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div>
        
        标题：<asp:TextBox ID="txtSubject" runat="server">回复：你的快递来了</asp:TextBox>
        <br />
        内容：<asp:TextBox ID="txtMailContent" runat="server" Height="200px" 
            TextMode="MultiLine" Width="85%">请在些输入邮件内容</asp:TextBox>
&nbsp;<br />
        <asp:Button ID="btnPlain" runat="server" onclick="btnPlain_Click" 
            Text="发送文本邮件" />
&nbsp;
       
        <asp:Button ID="btnHtml" runat="server" onclick="btnHtml_Click" 
            Text="发送超文本(HTML)邮件" />
    </div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

