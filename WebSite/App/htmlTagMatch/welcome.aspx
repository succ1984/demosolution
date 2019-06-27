<%@ Page Language="C#" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_htmlTagMatch_welcome" ValidateRequest="false" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    
   <div style="width:960px; margin:0 auto; padding:15px;">
       <form runat="server">
           <p>
               
               <asp:TextBox ID="txtContent" runat="server" Height="378px" TextMode="MultiLine" 
                   Width="870px"></asp:TextBox>
           </p>
            <p>
                <asp:Button ID="btnSave" runat="server" Text="TidyNet验证" onclick="btnSave_Click" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <asp:Button ID="btnSave2" runat="server" Text="w3c验证" onclick="btnSave2_Click"/>
            </p>
            <p>
                <asp:Literal ID="ltlMessage" runat="server"></asp:Literal>
            </p>

       </form>
        
   </div>
</body>
</html>
