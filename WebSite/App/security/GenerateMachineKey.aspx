<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="GenerateMachineKey.aspx.cs" Inherits="App_security_GenerateMachineKey" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">





    <table style="width: 100%">
    <tr>
        <td>
            DecryptionKeyDes:&nbsp;
            <asp:Label ID="labDecryptionKeyDES" runat="server" Font-Bold="True"></asp:Label>
        </td>
    </tr>
    <tr>
        <td>
            DecryptionKey3Des:&nbsp;
            <asp:Label ID="labDecryptionKey3DES" runat="server" Font-Bold="True"></asp:Label>
        </td>
    </tr>
    <tr>
        <td>
            ValidationKey:
            <asp:Label ID="labValidationKey" runat="server" Font-Bold="True"></asp:Label>
        </td>
    </tr>
    <tr>
        <td>
            <asp:Button ID="btnGenerate" runat="server" onclick="btnGenerate_Click" 
                Text="Generate" />
        </td>
    </tr>
</table>





</asp:Content>

