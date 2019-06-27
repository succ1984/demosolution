<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_cSharpDebugUsage_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<h2>C# debug usage</h2>

<ul>
    <li>
        <asp:Button ID="Button1" runat="server" Text="Debug.Assert(bool condition)" 
            onclick="Button1_Click"></asp:Button>
    </li>
    <li>
        <asp:Button ID="Button2" runat="server" 
            Text="Debug.Assert(bool condition, string message)" onclick="Button2_Click"></asp:Button>
    </li>
    <li>
        <asp:Button ID="Button3" runat="server" 
            Text="Debug.Assert(bool condition, string message, string detailMessage)" 
            onclick="Button3_Click"></asp:Button>
    </li>
    <li>
        <asp:Button ID="Button4" runat="server" 
            Text="Debug.Assert(bool condition, string message, string detailMessageFormat, params object[] args)" 
            onclick="Button4_Click"></asp:Button>
    </li>
</ul>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

