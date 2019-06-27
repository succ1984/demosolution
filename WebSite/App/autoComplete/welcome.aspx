<%@ Page Language="C#" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_autoComplete_welcome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head id="Head1" runat="server">    
    <title></title>
    <link href="../../css/autoSuggest.css" rel="stylesheet" type="text/css" />
    <script src="../../js/jquery-1.6.2.js" type="text/javascript"></script>
    <script src="../../js/jquery.autoSuggest.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript">
        jQuery(function($) {
            //            var data = { items: [
            //                                    { value: "21", name: "Mick Jagger" },
            //                                    { value: "43", name: "Johnny Storm" },
            //                                    { value: "46", name: "Richard Hatch" },
            //                                    { value: "54", name: "Kelly Slater" },
            //                                    { value: "55", name: "Rudy Hamilton" },
            //                                    { value: "79", name: "Michael Jordan" }
            //                                ]
            //            };

            $("#txtProduct").autoSuggest("../../Handler/pdtSearch.ashx", {
                selectedItemProp: "value", //name of object property
                selectedValuesProp: "value", //name of object property
                searchObjProps: "value", //comma separated list of object property names
                asHtmlID: "txtProduct",
                minChars: 1,
                retrieveLimit: 10,
                resultsHighlight: false,
                //                selectionLimit: 3,
                //                limitText:'',
                retrieveComplete: function(data) {
                    return data.items;
                },
                resultClick: function(data) {
                    $(".as-selection-item ").remove();
                    //                    var valueControl = $(".as-values:eq(0)");                    
                    //                    var szValues = valueControl.val();
                    //                    var arrValues = szValues.split(",");
                    //                    if (arrValues.length > 0) {
                    //                        var szLastValue = arrValues[arrValues.length - 2];
                    //
                    //                    }                    
                    $(".as-results").css("display","none");
                    $("input[id*='txtProduct']").val(data.attributes.value);                  
                    return false;

                }
            });



        });
       
    
    </script>
    <style type="text/css">
        .container
        {
           margin:0 auto;
           width:960px;
        }
        #blockSearch
        {
            width:400px;
        }
       
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">
        <div id="blockSearch">
            <input type="text" id="txtProduct" value="" />        
        </div>
    </div>
    
    </form>
</body>
</html>
