<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_domReady_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <script src="../../js/common.js" type="text/javascript"></script>
    <script type="text/javascript">

        window.onload = function () {
            alert("window loaded");
        }

        jsUtil.domReady(function () {
            alert("dom ready");
        });

    </script>

    <img src="http://world.cnr.cn/tpjj/201307/W020130729440186642395.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440185442545.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440186321291.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440187263517.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440187420806.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440188007130.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440188143475.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440188599606.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440188758260.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440189167938.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440189329530.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440190091535.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440190506526.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440190825897.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440191315112.jpg" alt="" title=""/>
    <img src="http://world.cnr.cn/tpjj/201307/W020130729440191887492.jpg" alt="" title=""/>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

