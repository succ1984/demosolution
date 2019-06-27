<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="testDrag.aspx.cs" Inherits="App_drag_drop_testDrag" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<style type="text/css">
   #moveContainer{
        width:800px; height:600px; background-color:#DDDAAA;
        position:relative;left:0px; top:0px;
    }
    #dlgTest{
        width:200px; height:100px; background-color:#CCCCCC;
        position:absolute; z-index:5; left:100px; top:200px;
    }
    #handle{
        overflow:hidden;padding:2px;
        height:25px; background-color:#000000;
        cursor:move;
        color:#FFFFFF; font-size:18px;
    }
    .fixedHead{
        position:fixed; right:0px; top:50%;margin-top:-75px;
        width:220px; height:150px; text-align:left; z-index:1;
        background-color:#000000; color:#FFFFFF;
    }
</style>

<script src="../../js/DragPrototype.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript">

    window.onload = function () {
        var oBox = document.getElementById("dlgTest");
        var oHandle = document.getElementById("handle");
        var oContainer = document.getElementById("moveContainer");
        var oStatus = document.getElementById("spStatus");
        var oDrag = new Drag(oBox, {
            handle: oHandle,
            maxContainer: oContainer,
            limit: false,
            onStart: function () {
                oStatus.innerHTML = "Begin dragging";
            },
            onStop: function () {
                oStatus.innerHTML = "End dragging";
            },
            onMove:function(event){
                oStatus.innerHTML="event.clientX:{0}, event.clientY:{1}".replace("{0}",(event||window.event).clientX).replace("{1}",(event||window.event).clientY)+"<br/>"+                                  
                                  "left:" + this.drag.offsetLeft + ", top:" + this.drag.offsetTop+"<br/>";
            }
        });      
    }

</script>

<div id="moveContainer">
    <div id="dlgTest">
        <h2 id="handle">Move me..</h2>
    </div>
</div>


<div class="fixedHead">
    当前状态：<span id="spStatus"></span>
</div>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

