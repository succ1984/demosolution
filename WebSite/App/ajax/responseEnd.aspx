<%@ Page Language="C#" AutoEventWireup="true" CodeFile="responseEnd.aspx.cs" Inherits="App_ajax_responseEnd" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script language="javascript" type="text/javascript">
        $(document).ready(function () {
            $("#btnCall").click(function () {

                $.ajax({
                   // dataType: "json",
                    url: "test.aspx?opt=ajax",
                    success: function (data) {
                        alert(data.name);
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(textStatus);
                        alert(errorThrown);
                    }
                });
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <input id="btnCall" type="button" value="callAjax"/>

    </div>
    </form>
</body>
</html>
