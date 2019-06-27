
placeHolder = window.placeHolder || function (txtID, placeHolderText) {
    var oText = typeof (txtID) == 'object' ? txtID : document.getElementById(txtID);
    var fnFocus = function (e) {
        if (oText.value == placeHolderText || oText.value.replace(/^\s+|\s+$/g, "").length == 0) {
            oText.value = "";
        }
    }
    var fnBlur = function (e) {
        if (oText.value == placeHolderText || oText.value.replace(/^\s+|\s+$/g, "").length == 0) {
            oText.value = placeHolderText;
        }
    }
    if (oText.attachEvent) {
        oText.attachEvent("onfocus", fnFocus);
        oText.attachEvent("onblur", fnBlur);
    }
    else {
        oText.addEventListener("focus", fnFocus, false);
        oText.addEventListener("blur", fnBlur, false);
    }
    //use placeholderText to initialize the text..
    oText.value = placeHolderText;
}