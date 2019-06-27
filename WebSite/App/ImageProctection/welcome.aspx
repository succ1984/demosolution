<%@ Page Language="C#" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="ImageProtection.App_ImageProctection_welcome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>
        图片防盗测试
    </title>
    <style type="text/css">
        
        
         body {
             width: 1068px;
             margin: 0 auto;
         }
        div {
            margin-top:10px;
        }
        input {
            padding: 5px;
        }
        .txtUrl {
            width:500px; height:30px; line-height:30px;
            border: 2px solid #ccddee;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
 
        <div>
            <label>防盗图片URL地址：</label>
            <input type="text" class="txtUrl" id="txtUrl" name="txtUrl" value="<%=szImgUrl %>"/>
        </div>
        <div>
            <input type="submit" value="确认" style=" margin-left:174px;" />
        </div>
        
        <div id="divShow" runat="Server">
              <div>
               不防盗的：
               <p>
                   <img src="<%=szUnProtectedUrl %>" />
               </p>
               </div>

               <div>
                   防盗的：
                   <p>
                       <img src="<%=szPortectedUrl %>" />
                   </p>
               </div>
        </div>
     
    </form>
</body>
</html>
