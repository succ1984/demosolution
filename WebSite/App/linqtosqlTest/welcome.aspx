<%@ Page Title=""  Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_linqtosqlTest_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <h2>News</h2>
<div class="list">
    <asp:GridView ID="gvNews" runat="server" AutoGenerateColumns="False" 
        DataKeyNames="nCategoryID" DataSourceID="LinqDataSource1" Width="100%">
        <Columns>
            <asp:BoundField DataField="nCategoryID" HeaderText="nCategoryID" 
                InsertVisible="False" ReadOnly="True" SortExpression="nCategoryID" />
            <asp:BoundField DataField="nParentCategoryID" HeaderText="nParentCategoryID" 
                SortExpression="nParentCategoryID" />
            <asp:BoundField DataField="szCategoryName" HeaderText="szCategoryName" 
                SortExpression="szCategoryName" />
            <asp:BoundField DataField="szDescription" HeaderText="szDescription" 
                SortExpression="szDescription" />
            <asp:BoundField DataField="nOrder" HeaderText="nOrder" 
                SortExpression="nOrder" />
        </Columns>
    </asp:GridView>
    <asp:LinqDataSource ID="LinqDataSource1" runat="server" 
        ContextTypeName="CSFramework.DataAccess.dbNewsDataContext" EntityTypeName="" 
        TableName="Category">
    </asp:LinqDataSource>
</div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

