<%@ Control Language="C#" AutoEventWireup="true" CodeFile="loginview.ascx.cs" Inherits="usercontrols_loginview" %>


<div id="divAnonymous" class="anonymous" runat="server">
    <asp:Literal ID="ltlAnonymous" runat="server"></asp:Literal>    
</div>




<div id="divLogged" class="logged" runat="server">     
     <span class="welcomeInfo">
        welcome, <asp:Literal ID="ltlUserName" runat="server"></asp:Literal>
     </span>
     <span class="logout">
        <a href="/logout.aspx">Logout</a>
     </span>
</div>

