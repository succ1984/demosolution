

/*
                <div class="select_menu">  
                    <div class="select_hiddenBox">
                        <input type="hidden" class="s_text"/>
                        <input type="hidden" class="s_value"/> 
                    </div>
                    <div class="select_display">
                        <div class="select_label"></div>
                        <div class="select_arrow">Type</div>  
                    </div>                    
                    <ul class="select_list">
                        <li><a href="javascript:;" value="Singapore"  >Singapore</a></li>  
                        <li><a href="javascript:;" value="Australia" >Australia</a></li>
                        <li><a href="javascript:;" value="Taiwan">Taiwan</a></li> 
                        <li><a href="javascript:;" value="China">China</a></li> 
                    </ul> 
                </div> 

*/

(function ($) {
    function elementContains(parent, child) {
        var bReturn = false;
        while (child != null && child.tagName != "") {
            if (child == parent) {
                bReturn = true;
                break;
            }
            else {
                child = child.parentNode;
            }
        }
        return bReturn;
    }


    var methods = {
        init: function (options) {
            return this.each(function () {
                var defaults = {
                    defaultItem: { text: "", value: "" }
                    , optionFormat: '<li><a href="javascript:;" value="{1}">{0}</a></li>'
                    , maxItemLength: 26
                    , listBackColor: "#FFFFFF"
                    , selectedItem: { "value": "", "class": "selected" }
                    , change: function () { }
                };
                defaults = $.extend(true, defaults, options);
                var _this = $(this);
                var hidText = _this.find(".s_text");
                var hidValue = _this.find(".s_value");
                var divLab = _this.find(".select_label");
                var divArrow = _this.find(".select_arrow");
                var optionList = _this.find(".select_list");
                _this.attr("tabindex", "-1");
                var nWinHeight = $(window).height(); var nDocHeight = $(document).height();
                var optionHeight = $(optionList.children()[0]).outerHeight();



                if (defaults.defaultItem.value != "") {
                    var defaultItem = defaults.optionFormat.replace("{0}", defaults.defaultItem.text).replace("{1}", defaults.defaultItem.value);
                    optionList.prepend(defaultItem);
                    divLab.html(defaults.defaultItem.text);
                    hidText.val(defaults.defaultItem.text);
                    hidValue.val(defaults.defaultItem.value);
                }
                else {
                    var firstItem = optionList.find("a:first");
                    if (firstItem.length == 1) {
                        var itemText = firstItem.text();
                        var itemValue = firstItem.attr("value");
                        divLab.html(itemText);
                        hidText.val(itemText);
                        hidValue.val(itemValue);
                    }
                }
                if (defaults.selectedItem["value"] != "") {
                    var optionSelect = optionList.find("a[value='" + defaults.selectedItem["value"] + "']");
                    if (optionSelect.length > 0) {
                        optionSelect.toggleClass(defaults.selectedItem["class"]);
                        divLab.html(optionSelect.text());
                        hidText.val(optionSelect.text());
                        hidValue.val(optionSelect.attr("value"));
                    }
                }


                $([divArrow[0], divLab[0]]).bind("click.customSelect", function () {
                    var bakBorderOld = optionList.css("border");
                    optionList.toggle();
                    optionList.css("background-color", defaults.listBackColor);
                    //position the dropDownList and set the list width/height(optional)
                    var divLableft = divLab.offset().left;
                    var divLabAvaiTop = divLab.offset().top - $(document).scrollTop();
                    var nAvaiDownHeight = nWinHeight - (divLab.outerHeight(true) + divLabAvaiTop);
                    var nAvaiUpHeight = divLabAvaiTop;
                    var listDirec = "down"; // or up
                    var bIsHeightChanged = false;
                    var nListWidth = divLab.innerWidth() + divArrow.innerWidth();
                    var nListHeight = optionList.innerHeight();
                    if (nListHeight > nAvaiDownHeight & nListHeight < nAvaiUpHeight) {
                        listDirec = "up";
                    }
                    else if (nListHeight >= nAvaiDownHeight & nListHeight >= nAvaiUpHeight) {
                        if (nAvaiDownHeight >= nAvaiUpHeight) {
                            listDirec = "down";
                            optionList.height(nAvaiDownHeight);
                        }
                        else {
                            listDirec = "up";
                            optionList.height(nAvaiUpHeight);
                        }
                        bIsHeightChanged = true;
                    }
                    if (bIsHeightChanged) {
                        optionList.css("overflow-y", "scroll");
                    }
                    else {
                        optionList.css("overflow-y", "visible");
                        optionList.css("height", "auto");
                    }
                    optionList.width(nListWidth);
                    optionList.css("left", divLableft);
                    if (listDirec == "down") {
                        var labBorderWidth = parseInt(divLab.parent().css("border-bottom-width").replace("px", ""));
                        if (labBorderWidth != NaN) {
                            optionList.css("top", divLab.offset().top + divLab.innerHeight(true) - labBorderWidth);
                        }
                        else {
                            optionList.css("top", divLab.offset().top + divLab.innerHeight(true));
                        }
                    }
                    else if (listDirec == "up") {
                        if (bIsHeightChanged) {
                            optionList.css("top", divLab.offset().top - nAvaiUpHeight);
                        }
                        else {
                            optionList.css("top", divLab.offset().top - nListHeight);
                        }
                    }

                    //set the selected value if it has value
                    var currValue = hidValue.val();
                    var currItem = optionList.find("a[value='" + currValue + "']");
                    optionList.find("a").removeClass("selected");
                    if (!currItem.hasClass("selected")) {
                        currItem.addClass("selected");
                    }
                    //set the Height by the maxItemLength
                    var optionLength = optionList.children().length;
                    if (optionLength > defaults.maxItemLength && !bIsHeightChanged) {
                        var maxItemHeight = optionHeight * (defaults.maxItemLength + 1);
                        if (maxItemHeight > nAvaiDownHeight) {
                            maxItemHeight = nAvaiDownHeight;
                        }
                        optionList.height(maxItemHeight);
                        optionList.css("overflow-y", "scroll");
                    }
                });
                optionList.find("a").bind("click.customSelect", function () {
                    var _thisOption = $(this);
                    var selectedText = _thisOption.text();
                    var selectedValue = _thisOption.attr("value");
                    // Not sure if this is the correct place to change -- CK2
                    // location.href = selectedValue;
                    divLab.html(selectedText);
                    hidText.val(selectedText);
                    hidValue.val(selectedValue);
                    optionList.hide();
                    _this.data("data", { "text": selectedText, "value": selectedValue });
                    _this.validationEngine("validateField", _this);
                    defaults["change"]();
                });
                optionList.find("a").bind("mouseover.customSelect", function () {
                    optionList.find("a").removeClass("selected");
                    if (!$(this).hasClass("selected")) {
                        $(this).addClass("selected");
                    }
                });

                $(document).bind("click.customSelect", function (event) {
                    var objTarget = event.target || event.srcElement;
                    if (elementContains(_this[0], objTarget)) {
                        return false;
                    }
                    else {
                        optionList.hide();
                    }
                });


            });
        } /*end init*/
        , getData: function () {
            var _this = $(this);
            var hidText = _this.find(".s_text");
            var hidValue = _this.find(".s_value");
            var data = _this.data("data");
            if (data == null || data == "undefined") {
                data = { "text": hidText.val(), "value": hidValue.val() };
            }
            return data;
        } /*end getData*/
    }; /*end method*/
    $.fn.CustomSelect = function (method) {
        if (typeof (method) == 'string' && method.charAt(0) != '_' && methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist.');
        }
    };

})(jQuery);


/*****************
    enhance for the checkboxes,radios
*******/
function setupLabel() {
    if ($('.label_check input').length) {
        $('.label_check').each(function () {
            $(this).removeClass('c_on');
        });
        $('.label_check input:checked').each(function () {
            $(this).parent('label').addClass('c_on');
        });
    };
    if ($('.label_radio input').length) {
        $('.label_radio').each(function () {
            $(this).removeClass('r_on');
        });
        $('.label_radio input:checked').each(function () {
            $(this).parent('label').addClass('r_on');
        });
    };
}
jQuery(function ($) {
    $('.label_check,.label_radio').bind("click", function () {       
        setupLabel();
    });
    setupLabel();
});
