<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frame1.aspx.cs" Inherits="App_HtmlDom_frame1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <a href= "http://www.baidu.com" target="right">百度一下</a>        
        <input type="button" onclick="JumpOffFrameset()" value="跳出框架" />
        
        
        <input type="button" onclick="GetChild3()" value="get child3" />
    </div>
    </form>
    
    <script language="javascript" type="text/javascript">
        function JumpOffFrameset() {
            if (window.top != window.self) {
                window.top.location = "http://www.baidu.com";
            }
        }


        function GetChild3() {
            var child3=window.parent.document.getElementById("child3");
        }
    
    
    </script>
</body>
</html>
