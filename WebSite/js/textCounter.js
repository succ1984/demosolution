textCounter = window.textCounter || function (txtID, count, fnEnd, fnBefore) {
    var oText = typeof (txtID) == 'object' ? txtID : document.getElementById(txtID);
    if (typeof fnBefore == "function") {
        fnBefore.call(this, count);
    }
    var fnOnKeyup = function (e) {
        var nRemainCount = count;
        var szValue = oText.value;
        if (szValue.length <= count) {
            nRemainCount = count - oText.value.length;
        }
        else {
            oText.value = szValue.substring(0, count);
            nRemainCount = 0;
        }
        if (typeof fnEnd == "function") {
            fnEnd.call(this, nRemainCount);
        }
    } //end fnOnKeydown
    if (oText.attachEvent) {
        oText.attachEvent("onkeydown", fnOnKeyup);
        oText.attachEvent("onkeyup", fnOnKeyup);
    }
    else {
        oText.addEventListener("keydown", fnOnKeyup, false);
        oText.addEventListener("keyup", fnOnKeyup, false);
    }
}//end textCounter