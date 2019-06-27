<%@ Page Language="C#" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_FileService_welcome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        
         body {
             width:1050px;
             margin: 0 auto;
         }    
        
        .row {
            margin-top:15px;
        }
        
        .row h2 {
            background: none repeat scroll 0 0 #fff6ee;
            font-size: 14px;
            margin: 0 0 5px;
            padding: 10px;
        }
        
        .row .content 
        {
            padding: 15px;
        }
        
    </style>
</head>
<body>
    
     <form id="form1" runat="server">
         
        <div class="row">
            <h2>上传文件</h2>
            <div class="content">
                <asp:FileUpload ID="FileUpload1" runat="server" />
                <asp:Button ID="Button1" runat="server" Text="上传" onclick="Button1_Click" />
                <br />
                <asp:Label ID="labMsg" runat="server"></asp:Label>
            </div>
           
        </div>

    </form>
</body>
</html>
