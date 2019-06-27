<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_viewstate_welcome" ViewStateEncryptionMode="Never" EnableEventValidation="false" %>
<%@ MasterType VirtualPath="~/layout/main.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

    <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" 
    DataKeyNames="ID,Id1" DataSourceID="SqlDataSource1" AllowPaging="True" 
        AllowSorting="True">
        <Columns>
            <asp:BoundField DataField="ID" HeaderText="ID" InsertVisible="False" 
                ReadOnly="True" SortExpression="ID" />
            <asp:BoundField DataField="Title" HeaderText="Title" 
                SortExpression="Title" />
            <asp:BoundField DataField="JoinerCount" HeaderText="JoinerCount" 
                SortExpression="JoinerCount" />
            <asp:BoundField DataField="MaxJoiner" HeaderText="MaxJoiner" 
                SortExpression="MaxJoiner" />
            <asp:BoundField DataField="StartDateTime" HeaderText="StartDateTime" 
                SortExpression="StartDateTime" />
            <asp:BoundField DataField="EndDateTime" HeaderText="EndDateTime" 
                SortExpression="EndDateTime" />
            <asp:BoundField DataField="CreateUser" HeaderText="CreateUser" 
                SortExpression="CreateUser" />
            <asp:BoundField DataField="CreateUserType" HeaderText="CreateUserType" 
                SortExpression="CreateUserType" />
            <asp:BoundField DataField="CreateUserUrl" HeaderText="CreateUserUrl" 
                SortExpression="CreateUserUrl" />
            <asp:BoundField DataField="CreateUserID" HeaderText="CreateUserID" 
                SortExpression="CreateUserID" />
            <asp:BoundField DataField="Category" HeaderText="Category" 
                SortExpression="Category" />
            <asp:BoundField DataField="Source" HeaderText="Source" 
                SortExpression="Source" />
            <asp:BoundField DataField="LogoUrl" HeaderText="LogoUrl" 
                SortExpression="LogoUrl" />
            <asp:BoundField DataField="ProvinceID" HeaderText="ProvinceID" 
                SortExpression="ProvinceID" />
            <asp:BoundField DataField="ProvinceName" HeaderText="ProvinceName" 
                SortExpression="ProvinceName" />
            <asp:BoundField DataField="CityID" HeaderText="CityID" 
                SortExpression="CityID" />
            <asp:BoundField DataField="CityName" HeaderText="CityName" 
                SortExpression="CityName" />
            <asp:BoundField DataField="Address" 
                HeaderText="Address" SortExpression="Address" />
            <asp:BoundField DataField="ActivityUrl" HeaderText="ActivityUrl" 
                SortExpression="ActivityUrl" />
            <asp:BoundField DataField="EntryItem" 
                HeaderText="EntryItem" SortExpression="EntryItem" />
            <asp:BoundField DataField="State" 
                HeaderText="State" SortExpression="State" />
            <asp:BoundField DataField="Telephone" 
                HeaderText="Telephone" SortExpression="Telephone" />
            <asp:BoundField DataField="Cellphone" HeaderText="Cellphone" 
                SortExpression="Cellphone" />
            <asp:BoundField DataField="TrafficMethod" HeaderText="TrafficMethod" 
                SortExpression="TrafficMethod" />
            <asp:BoundField DataField="MapUrl" HeaderText="MapUrl" 
                SortExpression="MapUrl" />
            <asp:BoundField DataField="ActivityContent" HeaderText="ActivityContent" 
                SortExpression="ActivityContent" />
            <asp:BoundField DataField="ContactPerson" HeaderText="ContactPerson" 
                SortExpression="ContactPerson" />
            <asp:BoundField DataField="CreateDateTime" HeaderText="CreateDateTime" 
                SortExpression="CreateDateTime" />
            <asp:BoundField DataField="ViewTimes" 
                HeaderText="ViewTimes" 
                SortExpression="ViewTimes" />
            <asp:BoundField DataField="Comment" HeaderText="Comment" 
                SortExpression="Comment" />
            <asp:BoundField DataField="UpdateDateTime" HeaderText="UpdateDateTime" 
                SortExpression="UpdateDateTime" />
            <asp:BoundField DataField="UpdateUser" HeaderText="UpdateUser" 
                SortExpression="UpdateUser" />
            <asp:BoundField DataField="ParentCategory" HeaderText="ParentCategory" 
                SortExpression="ParentCategory" ReadOnly="True" />
            <asp:BoundField DataField="PlayStatus" HeaderText="PlayStatus" 
                SortExpression="PlayStatus" />
            <asp:BoundField DataField="Id1" HeaderText="Id1" 
                SortExpression="Id1" ReadOnly="True" />
            <asp:BoundField DataField="Brand" HeaderText="Brand" 
                SortExpression="Brand" />
            <asp:BoundField DataField="Serial" HeaderText="Serial" 
                SortExpression="Serial" />
            <asp:BoundField DataField="BrandName" HeaderText="BrandName" 
                SortExpression="BrandName" />
            <asp:BoundField DataField="SerialName" 
                HeaderText="SerialName" SortExpression="SerialName" />
            <asp:CheckBoxField DataField="IsCanDrive" HeaderText="IsCanDrive" 
                SortExpression="IsCanDrive" />
        </Columns>
    </asp:GridView>

<asp:SqlDataSource ID="SqlDataSource1" runat="server" 
    ConnectionString="<%$ ConnectionStrings:ActivityPlatform %>" 
    
        SelectCommand="SELECT * FROM ActivityBase INNER JOIN CarBasedActivity ON ActivityBase.ID = CarBasedActivity.Id" 
        ProviderName="System.Data.SqlClient"></asp:SqlDataSource>

    <asp:Button ID="btnPostBack" runat="server" onclick="btnPostBack_Click" 
        Text="PostBack" />

</asp:Content>

