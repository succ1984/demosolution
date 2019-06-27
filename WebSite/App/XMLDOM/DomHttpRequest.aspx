<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="DomHttpRequest.aspx.cs" Inherits="App_XMLDOM_DomHttpRequest" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<style type="text/css">
    #page
    {
        width:900px;
        margin:0 auto;
    }
    .block
    {
        width:280px; 
        margin:10px;
        float:left;
        height:300px;
        
    }
</style>

<div id="page">
    <div id="block1" class="block">
            
    </div>
    
    <div id="block2" class="block">
            
    </div>
    
    <div id="block3" class="block">
            
    </div>
    
    <div id="block4" class="block">
            
    </div>
    
    <div id="block5" class="block">
            
    </div>
    
    <div id="block6" class="block">
            
    </div>
    
    <div id="block7" class="block">
            
    </div>
    
    <div id="block8" class="block">
            
    </div>
    
    <div id="block9" class="block">
            
    </div>
    
    <div id="block10" class="block">
            
    </div>

</div>

<script language="javascript" type="text/javascript">

    function onResponse(xmlhttp) {
        if (xmlhttp.readyState != 4) {
            return;
        }
        if (xmlhttp.status != 200) {
            alert("Problem retrieving XML data");
            return;
        }

        txt = "<table border='1'>";
        x = xmlhttp.responseXML.documentElement.getElementsByTagName("CD");
        for (i = 0; i < x.length; i++) {
            txt = txt + "<tr>";
            xx = x[i].getElementsByTagName("TITLE");
            {
                try {
                    txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
                }
                catch (er) {
                    txt = txt + "<td> </td>";
                }
            }
            xx = x[i].getElementsByTagName("ARTIST");
            {
                try {
                    txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
                }
                catch (er) {
                    txt = txt + "<td> </td>";
                }
            }
            txt = txt + "</tr>";
        }
        txt = txt + "</table>";
        document.getElementById('copy').innerHTML = txt;
    }


    jQuery(function($) {
        $(".block").html("loading...");
        var url = "cd_catalog.xml";
        var nBlockLength = $(".block").length;
        $(".block").each(function() {
            var _this = $(this);
            XmlHttpHelper.transmit(true, "get", "xml", url, successFun, loadingFun, errorFun, null);
        });
        //        for (var i = 0; i < nBlockLength; i++) {            
        //            XmlHttpHelper.transmit(true, "get", "xml", url, successFun, loadingFun, errorFun, null);
        //        }
    });

    function successFun(data) {
        txt = "<table border='1'>";
        x = data.getElementsByTagName("CD");
        for (i = 0; i < x.length; i++) {
            txt = txt + "<tr>";
            xx = x[i].getElementsByTagName("TITLE");
            {
                try {
                    txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
                }
                catch (er) {
                    txt = txt + "<td> </td>";
                }
            }
            xx = x[i].getElementsByTagName("ARTIST");
            {
                try {
                    txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
                }
                catch (er) {
                    txt = txt + "<td> </td>";
                }
            }
            txt = txt + "</tr>";
        }
        txt = txt + "</table>";
        //document.getElementById('copy').innerHTML = txt;
    }
    
    function loadingFun(){
        
    }

    function errorFun() {
        
    }
    
    
    

</script>

</asp:Content>

