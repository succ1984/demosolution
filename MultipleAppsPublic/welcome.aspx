<%@ Page Language="C#" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="welcome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <script language="javascript" type="text/javascript">
// <!CDATA[

      

// ]]>
    </script>
</head>
<body>
    <form id="form1" runat="server">
        
        <div id="adminOptionsDiv" runat="server" visible="false">
            (
            <a href="http://a.mydemo.com">
                Go to private site
            </a>
            |
            Add a product
            |
            Delete a product
            |
            Add a category
            |
            Delete a category
            )
        </div>
        <div class="welcome">
        <p>
             Welcome to the ecommerce site
        </p>
        <h2>
            You can buy all sorts of exciting things here
        </h2>
        <ul style=" list-style-type:circle">
            <li>
            Hats
            </li>       
               <li>
            Hats
            </li> 
            <li>
            Gloves
            </li> 
            <li>
            Shoes
            </li> 
            <li>
            Omaments
            </li> 
           <li>
            Soft Drinks
            </li>      
        </ul>
        
        <p class="btnRow">
            <input type="button" id="btnSignOut" runat="server" value="Sign Out" visible="false" onserverclick="btnSignOut_Click" />
        </p>
        
        </div>
   
    </form>
</body>
</html>
