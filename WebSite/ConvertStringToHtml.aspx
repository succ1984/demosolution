<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="ConvertStringToHtml.aspx.cs" Inherits="ConvertStringToHtml"  ValidateRequest="false"%>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

输入string:
    <br />
    <asp:TextBox ID="txtString" runat="server" Height="167px" TextMode="MultiLine" 
        Width="100%"></asp:TextBox>
    <br />
    <asp:Button ID="btnConvert" runat="server" onclick="btnConvert_Click" 
        Text="begin..."></asp:Button>
    <br />
    转化结果：<br />
    <asp:TextBox ID="txtResult" runat="server" Height="167px" TextMode="MultiLine" 
        Width="100%"></asp:TextBox>
<br />



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

