<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_cookies_welcome" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<script language="javascript" type="text/javascript">
    
    function getCookie(c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }

    function setCookie(c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    }

    function checkCookie(cookieName) {
        var szValue = getCookie(cookieName)
        if (szValue != null && szValue != "")
        { alert('Welcome again ' + szValue + '!') }
        else {
            szValue = prompt('Please enter your cookie value:', "")
            if (szValue != null && szValue != "") {
                setCookie('cookieName', szValue, 365)
            }
        }
    }

    window.onload = function() {
        // alert(getCookie("cookieTest"));
        checkCookie("cookieTest");
    }

</script>

</asp:Content>

