<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="login.aspx.cs" Inherits="login" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">


    <table style="width: 100%">
    <tr>
        <td>
            UserName:</td>
        <td>
            <asp:TextBox ID="txtUserName" runat="server" Width="400px"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" 
                ControlToValidate="txtUserName" ErrorMessage="*"></asp:RequiredFieldValidator>
        </td>
    </tr>
    <tr>
        <td>
            Password:</td>
        <td>
            <asp:TextBox ID="txtPassword" runat="server" TextMode="Password" Width="400px"></asp:TextBox>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" 
                ControlToValidate="txtPassword" ErrorMessage="*"></asp:RequiredFieldValidator>
        </td>
    </tr>
    <tr>
        <td>
            save passwords?</td>
        <td>
            <asp:DropDownList ID="drpPasswordSave" runat="server">
                <asp:ListItem Value="-1">Don&#39;t save my passwords</asp:ListItem>
                <asp:ListItem>5 mins</asp:ListItem>
                <asp:ListItem>1 hour</asp:ListItem>
                <asp:ListItem>1 day</asp:ListItem>
                <asp:ListItem>30 days</asp:ListItem>
                <asp:ListItem>1 year</asp:ListItem>
            </asp:DropDownList>
        </td>
    </tr>
    <tr>
        <td>
            &nbsp;</td>
        <td>
            <asp:Button ID="btnLogin" runat="server" onclick="btnLogin_Click" 
                Text="Login" />
        </td>
    </tr>
    <tr>
        <td>
            &nbsp;</td>
        <td>
            <asp:Label ID="labMsg" runat="server"></asp:Label>
        </td>
    </tr>
</table>


</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
    <script language="javascript" type="text/javascript">
      
    </script>
</asp:Content>



