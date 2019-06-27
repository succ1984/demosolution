<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_keyEvent_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<script src="../../js/traceTool.js" type="text/javascript"></script>
<script type="text/javascript">

    trace.enabled = true;
    var keystring = ""; //记录按键的字符串

    function $(s) {
        return document.getElementById(s) ? document.getElementById(s) : s;
    }

    function keypress(e) {
        trace.write("keypress");
        var currKey = 0, CapsLock = 0, e = e || event;
        currKey = e.keyCode || e.which || e.charCode;
        CapsLock = currKey >= 65 && currKey <= 90;
        switch (currKey) {
            //屏蔽了退格、制表、回车、空格、方向键、删除键 
            case 8: case 9: case 13: case 32: case 37: case 38: case 39: case 40: case 46:

                keyName = ""; break;
            default:
                {
                    keyName = String.fromCharCode(currKey); break;
                }
        }
        keystring = keyName;
       
    }

    function keydown(e) {
        trace.write("keydown");
        var e = e || event;
        var currKey = e.keyCode || e.which || e.charCode;
        if ((currKey > 7 && currKey < 14) || (currKey > 31 && currKey < 47)) {
            switch (currKey) {
                case 8: keyName = "[退格]"; break;
                case 9: keyName = "[制表]"; break;
                case 13: keyName = "[回车]"; break;
                case 32: keyName = "[空格]"; break;
                case 33: keyName = "[PageUp]"; break;
                case 34: keyName = "[PageDown]"; break;
                case 35: keyName = "[End]"; break;
                case 36: keyName = "[Home]"; break;
                case 37: keyName = "[方向键左]"; break;
                case 38: keyName = "[方向键上]"; break;
                case 39: keyName = "[方向键右]"; break;
                case 40: keyName = "[方向键下]"; break;
                case 46: keyName = "[删除]"; break;
                default: keyName = ""; break;
            }
            keystring = keyName;
        }
        var szValue = $("txtTestKeyCode").value;
        if (szValue.length > 1) {
            $("txtTestKeyCode").value = szValue.substring(0, 1);
        }
        $("spKeyName").innerHTML = "KeyName: " + keystring;
        $("spKeyCode").innerHTML = "KeyCode: " + currKey;
    }

    function keyup(e) {
        trace.write("keyup");
        $("spKeyName").innerHTML = "KeyName: " + keystring;
        
    }

    document.onkeypress = keypress;
    document.onkeydown = keydown;
    document.onkeyup = keyup;

</script>

 

<input type="text" id="txtTestKeyCode" />

<br/>请按下任意键查看键盘响应键值：
<br />
<span id="spKeyName"></span>
<br />
<span id="spKeyCode"></span>






</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

