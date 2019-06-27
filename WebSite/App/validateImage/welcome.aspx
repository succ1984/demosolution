<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_validateImage_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    
    <div>
        <p>
            <input type="text" id="txtValidateCode" name="txtValidateCode" value=""/>
            <img src="/validateImg.ashx" />
            <asp:Label ID="labDefault" runat="server" Text=""></asp:Label>
        </p>
        <p>
             <input type="text" id="txtValidateCodeA" name="txtValidateCodeA" value=""/>
            <img src="/validateImg.ashx?ValidatecodeName=A" />
            <asp:Label ID="labA" runat="server" Text=""></asp:Label>
        </p>
        <p>
             <input type="text" id="txtValidateCodeB" name="txtValidateCodeB" value=""/>
            <img src="/validateImg.ashx?ValidatecodeName=B" />
             <asp:Label ID="labB" runat="server" Text=""></asp:Label>
        </p>
    </div>
    <div style="padding-top:15px;">
         <asp:Button ID="btnSave" runat="server" Text="提交查看.." onclick="btnSave_Click" />
    </div>
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

