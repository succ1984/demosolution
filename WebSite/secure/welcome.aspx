<%@ Page Language="C#" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="secure_welcome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
   <p>
    Generate hash passwords:
   </p> 
   <p>
       <asp:TextBox ID="txtPassword" runat="server" Width="351px"></asp:TextBox>
       <asp:DropDownList ID="drpType" runat="server">
           <asp:ListItem>MD5</asp:ListItem>
           <asp:ListItem>SHA1</asp:ListItem>
       </asp:DropDownList>
   </p>
    <p>
        The new password is:<asp:Label ID="labNewPassword" runat="server"></asp:Label>
   </p>
    <p>
       <asp:Button ID="btnGenerate" runat="server" Text="Generate" 
            onclick="btnGenerate_Click" />
   </p>
   
    
    
    
    </form>
</body>
</html>
