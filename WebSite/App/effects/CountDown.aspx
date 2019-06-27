<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="CountDown.aspx.cs" Inherits="App_effects_CountDown" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<div class="jishi_box">
    倒计时 <em id="emCounterDays">2</em>天<em id="emCounterHours">07</em>时<em id="emCounterMinutes">45</em>分<em id="emCounterSeconds">56</em>秒
</div>

<script src="../../js/common.js" type="text/javascript"></script>
<script type="text/javascript">

function countDown(dtStartTime,dtEndTime,nInterval,fnCallBack){
    if (!(typeof dtStartTime == "object" && dtStartTime.constructor == Date)
    || !(typeof dtEndTime == "object" && dtEndTime.constructor == Date)) {
        alert("The valid params...");
        return false;
    }
    var seconds = 1000;
    var minutes = 60000;
    var hours = 3600000;
    var days = 86400000;
    var t=0;
   /* var years = days * 365;*/

    var nRemainDays = 0, nRemainHours = 0, nRemainMinutes = 0, nRemainSeconds = 0;
    var nStartMilliSec = dtStartTime.getTime();
    var nEndMilliSec = dtEndTime.getTime();

    var fnTick = function (nStartMilliSec, nEndMilliSec) {
        var oReturn = { isExpire: false, days: 0, hours: 0, minutes: 0, seconds: 0 };
        var nDiff = nEndMilliSec - nStartMilliSec;
        if (nDiff >= 0) {
            nRemainDays = Math.floor(nDiff / days);
            nDiff -= nRemainDays * days;
            nRemainHours = Math.floor(nDiff / hours);
            nDiff -= nRemainHours * hours;
            nRemainMinutes = Math.floor(nDiff / minutes);
            nDiff -= nRemainMinutes * minutes;
            nRemainSeconds = Math.floor(nDiff / seconds);
            oReturn = { isExpire: false,
                days: formatZero(nRemainDays)
                , hours: formatZero(nRemainHours)
                , minutes: formatZero(nRemainMinutes)
                , seconds: formatZero(nRemainSeconds)
            };

        }
        else {
            oReturn.isExpire = true;
        }
        return oReturn;
    }

    function formatZero(num) {
        return num < 10 ? ('0' + num) : num;
    }


    t = setTimeout(function () {
        nStartMilliSec += nInterval;
        var oResult = fnTick(nStartMilliSec, nEndMilliSec);
        if (typeof fnCallBack == "function") {
            fnCallBack.call(this, oResult);
        }
        if (!oResult.isExpire) {
            t=setTimeout(arguments.callee, nInterval);
        }
        else {
            clearTimeout(t);
        }
    }, nInterval);
}


jsUtil.domReady(function () {
    //"2013-08-12 18:36:01", "2013-08-12 19:00:00"
    countDown(new Date(2013, 08, 12, 20, 00, 00), new Date(2013, 08, 12, 20, 01, 10), 1000, function (oResult) {
        if (!oResult.isExpire) {
            document.getElementById("emCounterDays").innerHTML = oResult.days;
            document.getElementById("emCounterHours").innerHTML = oResult.hours;
            document.getElementById("emCounterMinutes").innerHTML = oResult.minutes;
            document.getElementById("emCounterSeconds").innerHTML = oResult.seconds;
        }
        else {
            alert("促销已经过期");
        }
    });




});

</script>




</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

