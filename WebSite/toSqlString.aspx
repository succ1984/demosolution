<%@ Page Language="C#" AutoEventWireup="true" CodeFile="toSqlString.aspx.cs" Inherits="toSqlString" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
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
    </div>
    </form>
</body>
</html>
