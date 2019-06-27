<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="CacheDependency.aspx.cs" Inherits="CachePractice_CacheDependency" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <asp:Repeater ID="rpLiss" runat="server">
        <ItemTemplate>
            <div>
                <label><%#Eval("bookName")%></label> <span style="margin-left:15px;"> <%#Eval("author")%></span>
           </div>
        </ItemTemplate>
    </asp:Repeater>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

