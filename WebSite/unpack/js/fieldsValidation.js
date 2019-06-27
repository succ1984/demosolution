var szNewLine = "<br/>";

function checkFirstName(field, rules, i, options) {
    var szErrorMsg = "";
    if (field.val() == "") {
        szErrorMsg = options.allrules.firstname.alertText;
    }
    return szErrorMsg;
}

function checkLastName(field, rules, i, options) {
    var szErrorMsg = "";
    if (field.val() == "") {
        szErrorMsg = options.allrules.lastname.alertText;
    }
    return szErrorMsg;
}
function checkEmail(field, rules, i, options) {
    var szErrorMsg = "";
    if (field.val() == "") {
        szErrorMsg = options.allrules.email.alertText;
    } else {
        var pattern = new RegExp(options.allrules.email.regex);
        if (!pattern.test(field.attr('value'))) {
            szErrorMsg = options.allrules.email.alertTextInvalid;
        }
    }
    return szErrorMsg;
}

function checkCountry(field, rules, i, options) {
    var szErrorMsg = "";
    if (field.CustomSelect("getData")["value"] == "-1") {
        szErrorMsg = options.allrules.country.alertText;
    }
    return szErrorMsg;
}
function checkLanguage(field, rules, i, options) {
    var szErrorMsg = "";
    if (field.CustomSelect("getData")["value"] == "-1") {
        szErrorMsg = options.allrules.language.alertText;
    }
    return szErrorMsg;
}
function checkPdtCategory(field, rules, i, options) {
    var szErrorMsg = "";
    if (field.CustomSelect("getData")["value"] == "-1") {
        szErrorMsg = options.allrules.pdtCategory.alertText;
    }
    return szErrorMsg;
}

function checkCompanyName(field, rules, i, options) {
    var szErrorMsg = "";
    if (field.val() == "") {
        szErrorMsg = options.allrules.company.alertText;
    }
    return szErrorMsg;
}

function checkPdtNeedBy(field, rules, i, options) {
    var szErrorMsg = "";
    if (field.val() == "") {
        szErrorMsg = options.allrules.pdtNeedBy.alertText;
    }
    return szErrorMsg;
}
function checkQuantity(field, rules, i, options) {
    var szErrorMsg = "";
    if (field.val() == "") {
        szErrorMsg = options.allrules.quantity.alertText;
    }
    else {
        var pattern = new RegExp(options.allrules.quantity.regex);
        if (!pattern.test(field.val())) {
            szErrorMsg = options.allrules.quantity.alertTextInvalid;
        }
    }
    return szErrorMsg;
}

function checkOrderNumber(field, rules, i, options) {
    var szErrorMsg = "";
    if (field.val() == "") {
        szErrorMsg = options.allrules.orderNumber.alertText;
    }
    return szErrorMsg;
}



