<%@ Page Language="C#" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_jquerytreeview_welcome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="../../js/jquery.treeview/jquery.treeview.css" rel="stylesheet" type="text/css" />
    <script src="../../js/jquery-1.6.4.js" type="text/javascript"></script>

    <script src="../../js/jquery.treeview/jquery.treeview.js" type="text/javascript"></script>
    <script src="../../js/jquery.treeview/jquery.treeview.async.js" type="text/javascript"></script>
    <script src="../../js/jquery.treeview/jquery.treeview.edit.js" type="text/javascript"></script>
    
</head>
<body>
    <form id="form1" runat="server">
             <div id="treePanel">
                <ul id="treeProducts" class="treeview filetree">
                    
                </ul>
             </div>
    </form>
    <script language="javascript" type="text/javascript">
        jQuery(function() {
            getHtmlTree();
        });
        
        function getHtmlTree() {
            var url = "treeProducts.aspx";
            $("#treeProducts").treeview({
                url: url,
                collapsed: true,
                unique: true,
                ajax: {
                    data: {
                        "additional": function() {
                            return new Date;
                        }
                    },
                    type: "post"
                }
            });
        
        
    }
    
    </script>
</body>
</html>
