<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SerializationHelper.aspx.cs" Inherits="App_serialization_SerializationHelper" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        input {
            margin-right:20px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <p>
            <asp:Button ID="btnToBinary" runat="server" Text="转化为二进制数组" 
                onclick="btnToBinary_Click" />
            <asp:Button ID="btnToObject" runat="server" Text="将二进制数组反序列化对象" 
                onclick="btnToObject_Click" />
        </p>
        
        <p>
            <asp:Button ID="btnToXml" runat="server" Text="转化为Xml" 
                onclick="btnToXml_Click" />
            <asp:Button ID="btnToCDataXml" runat="server" Text="转化为Xml，其中节点内容用CData包裹" 
                onclick="btnToCDataXml_Click" />
            <asp:Button ID="btnXmlToObject" runat="server" Text="将Xml反序列化对象" 
                onclick="btnXmlToObject_Click" />
        </p>

        <p>
            <asp:Button ID="btnToJson" runat="server" Text="转化为Json" 
                onclick="btnToJson_Click" />
            <asp:Button ID="btnJsonToObject" runat="server" Text="将Json反序列化对象" 
                onclick="btnJsonToObject_Click" />
        </p>
        
        
        
        

    </div>
    </form>
</body>
</html>
