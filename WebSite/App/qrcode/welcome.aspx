<%@ Page Language="C#" AutoEventWireup="true" %>

<%@ Import Namespace="DragonSource.Utils" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <div style="width:960px;margin:0 auto;">
        
        <img src="<%=GetQRCodeURL() %>"  alt="二维码" title="二维码"/>

    </div>
    
    <script runat="server" language="C#">
        
        private string GetQRCodeURL()
        {
            return QRCodeHelper.GenerateUrl("http://qrcode.qikan.com/QrCodeHandler.ashx", ErrorCorrectionLevel.M, "hello, world..欢迎你世界",
                QuietZoneModules.Zero, 8);
        }
    
    </script>
</body>
</html>
