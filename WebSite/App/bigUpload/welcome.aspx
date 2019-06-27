<%@ Page Language="C#" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_bigUpload_welcome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server" enctype="multipart/form-data" method="post">
    <div>
        <input type="file" id="fileUpload" name="fileUpload" />
        
        <asp:Button ID="btnSave" runat="server" Text="OK.." onclick="btnSave_Click" 
            style="height: 21px" />
    </div>
    </form>
</body>
</html>
