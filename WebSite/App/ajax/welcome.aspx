<%@ Page Language="C#" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_ajax_welcome" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Jquery Testing</title>

    <script src="../../js/jquery-1.6.4.js" type="text/javascript"></script>
    <style type="text/css">
        *
        {
            margin:0px; padding:0px;
        }
        body
        {
            font-size:12px;
            color:Black;
        }
        a
        {
             text-decoration:none;
        }
        img
        {
            border:none;
        }
    .button-row
    {
            
    }
     .button-row
    {     
      color:Gray;       
    }
      
      .button-row ul
      {
          list-style:none outside;
          float:left; width:100%;
          margin:0px; padding:0px;
      }
        .button-row ul li
        {
            float:left;
            width:auto;
            padding:5px 10px;
        }
    
    </style>
    <script type="text/javascript" language="javascript">
        var szUrl = "handler/ajax.ashx";
        var szCatType = "1";
        var result = $("#result");
        jQuery(function() {
            $("#btnText").click(fnText);
            $("#btnScript").click(fnScript);
            $("#btnXml").click(fnXml);
            $("#btnHtml").click(fnHtml);
        })


        function fnHtml() {
            $.ajax({
                url: szUrl,
                data: { "type": 3, "s": Math.random() },
                success: function(data,textStatus) {
                    $("#result").text(data);
                }
            });
        }

        function fnXml() {
            szUrl = "../../xml/Products.xml";
           
            $.ajax({
                url: szUrl,
                dataType: "xml",
                success: responseXml
            });
        }
        function responseXml(data, txtStatus) {
           
            $("#result").text(data.xml.toString());  
        }

        function fnScript() {
            $.ajax({
                url: "script/test.js",
                dataType: "script",
                success: function(data) { $("#result").append(data); }
            });
        }
        
        


        function fnText() {

            $.ajax({
                url: szUrl,
                data: { "type": "1", "s": Math.random() },
                dataType: "text",
                beforeSend: function(xhr) {
                    $("#result").html("<br/>loading data,please wait....xhr.readyState=" + xhr.readyState);
                },
                success: function(data, textStatus) {
                    $("#reslut").text("");
                    $("#result").append("<br/>Successdata:");
                    $("#result").append("<br/>status:" + textStatus);
                },
                complete: function(xhr, textStatus) {
                    $("#result").append("<br/>completed request....xhr.readyState=" + xhr.readyState);
                    $("#result").append(",textStatus=" + textStatus);
                },
                error: function(xhr, textStatus, errorThrown) {
                    $("#result").append("<br/>There are some errors...below:");
                    $("#result").append(textStatus || errorThrown);                    
                }


            });
        }
    
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div style=" margin:0 auto; width:90%;">
        <div id="result" style=" border:solid 1px #ffccdd;  height:200px; padding:10px; padding-top:20px; overflow:auto;">
        
        </div>
        
        <div class="button-row" style="padding:20px auto;">
            <p>some types that we can retrieve data from jquery ajax</p>
            <ul>
                <li>
                    <input id="btnText" type="button" value="text" />
                </li>
                <li>
                    <input id="btnXml" type="button" value="xml" />
                </li>
                <li>
                    <input id="btnHtml" type="button" value="html" />
                </li>
                <li>
                    <input id="btnJson" type="button" value="json" />
                </li>
                <li>
                    <input id="btnScript" type="button" value="script" />
                </li>
            </ul>
            
        </div>
        
    </div>
    </form>
</body>
</html>
