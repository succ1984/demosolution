<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_divDropDown_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<style type="text/css">
    /*--模拟下拉列表框--*/
.SearchDiv {PADDING-LEFT: 38px; FLOAT: left; WIDTH: 360px; LINE-HEIGHT: 24px; HEIGHT: 24px }
.SearchDiv li { FLOAT: left; MARGIN-RIGHT: 5px; POSITION: relative }
.SearchDiv .selector {PADDING-RIGHT: 0px; PADDING-LEFT: 7px; FLOAT: left; PADDING-BOTTOM: 0px; LINE-HEIGHT: 22px; PADDING-TOP: 0px; HEIGHT: 22px }
.SearchDiv .category { FLOAT: left; WIDTH: 95px; height:22px; line-height:22px;}
.SearchDiv .trigger { FLOAT: left; WIDTH: 16px; HEIGHT: 22px }
.SearchDiv input.text {PADDING-RIGHT: 4px; PADDING-LEFT: 4px; FLOAT: left; PADDING-BOTTOM: 2px; WIDTH: 150px; COLOR: #ccc; LINE-HEIGHT: 18px; PADDING-TOP: 2px; HEIGHT: 18px }
HTML .SearchDiv input.text { MARGIN-RIGHT: -5px }
.SearchDiv input.button {FLOAT: left; WIDTH: 59px; CURSOR: pointer; HEIGHT: 24px; }
.SearchDiv A:link { COLOR: #0067b6 }
.SearchDiv A:visited { COLOR: #0067b6 }
.DropList { MARGIN-TOP: 24px; Z-INDEX: 2; LEFT: 0px; OVERFLOW: hidden; WIDTH: 118px; POSITION: absolute }
.DropList LI { FLOAT: none; WIDTH: 118px; HEIGHT: 2em }
.DropList LI A { PADDING-RIGHT: 10px; DISPLAY: block; PADDING-LEFT: 10px; PADDING-BOTTOM: 0px; WIDTH: 98px; LINE-HEIGHT: 2; PADDING-TOP: 0px; HEIGHT: 2em }
.DropList LI A:link {}
.DropList LI A:visited {}
.DropList LI A:hover {}
.DropList LI A:active {}


.SearchDiv .category {}
.SearchDiv .trigger {BACKGROUND: url('nav.png') #eee no-repeat 0px -200px; TEXT-INDENT: -9999px;}
.SearchDiv input.text { BORDER-RIGHT: #b4b4b4 1px solid; BORDER-TOP: #b4b4b4 1px solid; BORDER-LEFT: #b4b4b4 1px solid; COLOR: #ccc;BORDER-BOTTOM: #b4b4b4 1px solid;}
HTML .SearchDiv input.text {}
.SearchDiv input.button { BORDER-TOP-WIDTH: 0px; BORDER-LEFT-WIDTH: 0px; FONT-SIZE: 0px; BACKGROUND: url('searchbutton.png') #eee no-repeat; BORDER-BOTTOM-WIDTH: 0px; TEXT-INDENT: -9999px; BORDER-RIGHT-WIDTH: 0px }
.SearchDiv A:link { COLOR: #0067b6 }
.SearchDiv A:visited { COLOR: #0067b6 }
.DropList { BORDER-RIGHT: #b4b4b4 1px solid; BORDER-TOP: #b4b4b4 1px solid; BACKGROUND: #fff; BORDER-LEFT: #b4b4b4 1px solid; BORDER-BOTTOM: #b4b4b4 1px solid; }
.DropList LI {}
.DropList LI A {}
.DropList LI A:link { COLOR: #333 }
.DropList LI A:visited { COLOR: #333 }
.DropList LI A:hover { BACKGROUND: #e4ebee; TEXT-DECORATION: none }
.DropList LI A:active { BACKGROUND: #e4ebee; TEXT-DECORATION: none }


</style>


<script type="text/javascript" language="javascript">
    function gets_id(objName) {
        if (document.getElementById) {
            return eval('document.getElementById("' + objName + '")');
        } else if (document.layers) {
            return eval("document.layers['" + objName + "']");
        } else {
            return eval('document.all.' + objName);
        }
    }
    //打开DIV层
    function disp_cc() {
        if (gets_id('DropList').style.display == 'none') {
            gets_id('DropList').style.display = '';
        }
        else {
            gets_id('DropList').style.display = 'none';
        }
        window.event.cancelBubble = true;
        return false;
    }
    //赋值
    function gets_value(str) {
        gets_id('CateGory').value = str;
        //document.getElementById('class').value=str;
        gets_id('DropList').style.display = 'none';
    }

    document.onclick = function() {        
        var dropList = gets_id("DropList");
        if (dropList != null && dropList.style.display == '') {
            dropList.style.display = 'none';
        }
    }

   


</script>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">


<ul class="SearchDiv wrapfix">
<li>
    <p class="selector">
        <input id="CateGory" class="category" onclick="disp_cc();" type="text" name="CateGory" value="所有分类" ondblclick="return CateGory_ondblclick()" />
        <a class="trigger" onclick="disp_cc();" href="#">+</a>
    </p>

    <ul id="DropList" class="DropList" style="display: none;">
        <li><a onclick="gets_value('所有分类')" href="#">所有分类</a></li>
        <li><a onclick="gets_value('网络软件')" href="#">网络软件</a></li>
        <li><a onclick="gets_value('系统工具')" href="#">系统工具</a></li>
        <li><a onclick="gets_value('应用软件')" href="#">应用软件</a></li>
        <li><a onclick="gets_value('聊天联络')" href="#">聊天联络</a></li>
        <li><a onclick="gets_value('图形图像')" href="#">图形图像</a></li>
    </ul>
</li>
<li>
    <input class="text" onfocus="this.value='';this.style.color='#333';" type="text" name="keyword" value="关键字如&quot;大福网络&quot;..." maxlength="100" />
</li>
<li>
    <input class="button" type="submit" name="Submit" value="搜索" />
</li>
</ul>





</asp:Content>

