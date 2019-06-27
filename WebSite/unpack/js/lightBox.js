; (function () {
    var szUA = navigator.userAgent.toLowerCase();
    var s = "";
    var isIE = (s = szUA.match(/msie ([\d.]+)/)) ? s[1] : 0;
    var isIE6 = (s = szUA.match(/msie 6\.0/)) ? true : false;
    var $object = function (id) {
        return "string" == typeof id ? document.getElementById(id) : id;
    };
    var Class = {
        create: function () {
            return function () { this.initialize.apply(this, arguments); }
        }
    };
    var Extend = function (destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    };
    var Bind = function (object, fun) {
        return function () {
            return fun.apply(object, arguments);
        }
    };

    var Each = function (list, fun) {
        for (var i = 0, len = list.length; i < len; i++) { fun(list[i], i); }
    };

    var Contains = function (a, b) {
        return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16);
    };
   
    //OverLay
    var OverLay = Class.create();
    OverLay.prototype = {
        initialize: function (options) {

            this.SetOptions(options);

//            this.Lay = $object(this.options.Lay) || document.body.insertBefore(document.createElement("div"), document.body.childNodes[0]);
            var divMask=$object(this.options.Lay) || document.createElement("div");            
            this.Lay=divMask;
//            document.body.appendChild(divMask);
            
            this.Color = this.options.Color;
            this.Opacity = parseInt(this.options.Opacity);
            this.zIndex = parseInt(this.options.zIndex);
            this.removeWhenClose=this.options.removeWhenClose;

            with (this.Lay.style) { display = "none"; zIndex = this.zIndex; left = top = 0; position = "fixed"; width = height = "100%"; }

            if (isIE6) {
                this.Lay.style.position = "absolute";
                this._resize = Bind(this, function () {
                    var docWidth=Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) + "px";
                    var docHeight= Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";
                    this.Lay.style.width = docWidth;
                    this.Lay.style.height =docHeight;                   
                });
//                this.Lay.innerHTML ="<iframe frameborder=\"0\" scrolling=\"no\" style=\"position:absolute;top:0;left:0;width:100%;height:100%;z-index:"+"-1"+";\" ></iframe>";
            }
        },
        SetOptions: function (options) {
            this.options = {
                Lay: null,
                Color: "#fff",
                Opacity: 50,
                zIndex: 10000,
                removeWhenClose:false  //当关闭时就从文档中移除? true:移除, false:不移除
            };
           this.options= Extend(this.options, options || {});
        },
        Show: function () {
            //document.body.appendChild(this.Lay);
            document.body.insertBefore(this.Lay,document.body.childNodes[0]);
            if (isIE6) {
                 this._resize(); 
                 window.attachEvent("onresize", this._resize); 
                 window.attachEvent("onscroll",this._resize);
            }
            with (this.Lay.style) {
                (isIE && isIE!="10.0") ? filter = "alpha(opacity:" + this.Opacity + ")" : opacity = this.Opacity / 100;
                backgroundColor = this.Color; display = "block";                
            }

        },
        Close: function () {
            this.Lay.style.display = "none";
            if(this.removeWhenClose){
                document.body.removeChild(this.Lay);
            }
            if (isIE6) {
                 window.detachEvent("onresize", this._resize); 
                 window.detachEvent("onscroll", this._resize);
            }
        }
    }; //end OverLay


    /*************************begin LightBox *******************/
    var LightBox = Class.create();
    LightBox.prototype = {
        initialize: function (box, options) {
            this.Box = $object(box);
            this.OverLay = new OverLay(options);///////////////////////////////
            this.SetOptions(options);
            this.Fixed = !!this.options.Fixed;
            this.Over = !!this.options.Over;
            this.Center = !!this.options.Center;
            this.onShow = this.options.onShow;
            this.onClose=this.options.onClose;
            this.draggable=this.options.draggable;
            this.dragHandle=this.options.dragHandle;
            this.dragOption= Extend({handle:this.dragHandle},this.options.dragOption);
            this.dragObj=null;            
            this.closeLink=this.options.closeLink;
            this.removeWhenClose=this.options.removeWhenClose;
            this.Box.style.zIndex = this.OverLay.zIndex + 1;
            this.Box.style.display = "none";
            
            if (isIE6) {
                this.lastScrollTop = this.lastScrollLeft = 0; 
                this._fixed = Bind(this, function () { 
                        this.Center ? this.SetCenter() : this.SetFixed(); 
                        this.Box.innerHTML=this.Box.innerHTML;
                    });               
            }
            var div=document.createElement("div");
            div.innerHTML="<iframe frameborder=\"100\" scrolling=\"no\" style=\"position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:"+"-1"+";filter:alpha(opacity=0);\" src=\"about:blank\" ></iframe>";
            this.coverFrame=div.firstChild; 

            this.hasPosition=false;//表示是否定位过浮层，为true时，不再设置居中属性
        },
        SetOptions: function (options) {//options中可以包含Over中的配置属性
            this.options = {
                Over: true,
                Fixed: false,
                Center: true,

                onShow: function(){},
                onClose:function(){},

                draggable: false,
                dragHandle:this.Box,
                dragOption:{},
                closeLink:"",
                removeWhenClose:false  
            };
           this.options= Extend(this.options, options || {});
        },
        SetFixed: function () {
            var lastScrollTop=this.lastScrollTop;
            var lastScrollLeft=this.lastScrollLeft;
            this.Box.style.top = (document.documentElement.scrollTop || document.body.scrollTop) - lastScrollTop+ this.Box.offsetTop + "px";
            this.Box.style.left = (document.documentElement.scrollLeft || document.body.scrollLeft) - lastScrollLeft + this.Box.offsetLeft + "px";
            this.lastScrollTop = (document.documentElement.scrollTop || document.body.scrollTop); 
            this.lastScrollLeft = (document.documentElement.scrollLeft || document.body.scrollLeft); 
            //IE6 调试信息       
//            if(trace){
//                trace.enabled = true;
//                trace.write("lastScrollTop: "+lastScrollTop);
//                trace.write("lastScrollLeft: "+lastScrollLeft);
//                trace.write("document.documentElement.scrollTop: "+document.documentElement.scrollTop);
//                trace.write("document.documentElement.scrollLeft: "+document.documentElement.scrollLeft);
//                trace.write("document.body.scrollTop: "+document.body.scrollTop);
//                trace.write("document.body.scrollLeft: "+document.body.scrollLeft);
//                trace.write("this.Box.offsetTop: "+this.Box.offsetTop);
//                trace.write("this.Box.offsetLeft: "+this.Box.offsetLeft);
//                trace.write("this.Box.style.top : "+this.Box.style.top );
//                trace.write("this.Box.style.left : "+this.Box.style.left );
//                trace.write("(document.documentElement.scrollTop || document.body.scrollTop) - lastScrollTop : "+((document.documentElement.scrollTop || document.body.scrollTop) - lastScrollTop));
//                trace.write("(document.documentElement.scrollLeft || document.body.scrollLeft) - lastScrollLeft : "+((document.documentElement.scrollLeft || document.body.scrollLeft) - lastScrollLeft));
//                trace.warn("-----------------------------------------------");                
//            }   
        },
        SetCenter: function () {
//            this.Box.style.marginTop = (document.documentElement.scrollTop || document.body.scrollTop) - this.Box.offsetHeight / 2 + "px";
//            this.Box.style.marginLeft = (document.documentElement.scrollLeft || document.body.scrollLeft) - this.Box.offsetWidth / 2 + "px";
              //或许这样更好理解些,绝对定位时的marginTop也就是比固定定位时多了个document.documentElement.scrollTop
              this.Box.style.marginTop = - this.Box.offsetHeight / 2 +(document.documentElement.scrollTop || document.body.scrollTop) + "px";
              this.Box.style.marginLeft = - this.Box.offsetWidth / 2 +(document.documentElement.scrollLeft || document.body.scrollLeft) + "px";
        },

        Show: function (options) {
            var util=LightBox.util;
            
            this.Box.style.position = this.Fixed && !isIE6 ? "fixed" : "absolute";
            this.Over && this.OverLay.Show();
            this.Box.style.display = "block";
            document.body.appendChild(this.Box);//附加到document.body中
    
            if (this.Center && !this.hasPosition) {
                this.Box.style.top = this.Box.style.left = "50%";
                if (this.Fixed) {
                    this.Box.style.marginTop = -this.Box.offsetHeight / 2 + "px";
                    this.Box.style.marginLeft = -this.Box.offsetWidth / 2 + "px";
                } else {
                    this.SetCenter();
                }                
            }
            this.Box.insertBefore(this.coverFrame,this.Box.childNodes[0]);  
            with(this.coverFrame.style){
                    (isIE && isIE!="10.0") ? filter = "alpha(opacity=" + 0 + ")" : opacity = 0;
            }
            if (isIE6) {
//                if(trace){
//                    trace.enabled=true;
//                    trace.write(this.Box.innerHTML);
//                }                     
                (this.Center && !this.hasPosition) ? this.SetCenter() : this.Fixed && this.SetFixed();
                this.Fixed && window.attachEvent("onscroll", this._fixed);
            }

            //修复chrome下弹出层部分文字残缺的bug           
            window.scrollTo((document.documentElement.scrollLeft || document.body.scrollLeft),(document.documentElement.scrollTop || document.body.scrollTop)-1 );
            
            //设置拖动事件
            if(this.draggable){
                this.dragObj=new Drag(this.Box,this.dragOption);                
            }
            //设置"关闭事件"
            if(this.closeLink){
                this.closeLink=util.$(this.closeLink);
                util.addHandler(this.closeLink,"click",Bind(this,function(){
                    this.Close();
                }));
            }
            this.onShow();
            //方便链式调用..
            return this;
        },

        Close: function () {
            this.Box.style.display = "none";
            if(this.removeWhenClose){            
                document.body.removeChild(this.Box);
            }
            this.OverLay.Close();
            this.onClose();
            this.dragObj=null;//释放drag对象内存，防止内存泄漏
            this.dragHandle=null;
            if (isIE6) {
                window.detachEvent("onscroll", this._fixed);        
            }           
        },
        setPosition:function(offset){ //offset格式为{x:**,y:**}..
            this.Box.style.left=offset.x+"px";
            this.Box.style.top=offset.y+"px";
            this.hasPosition=true;
            return this;
        }       
    };
    /*************************end LightBox *******************/
    window.OverLay = OverLay;
    window.LightBox = LightBox;

})();

LightBox.util = {
    idIndex: 0
    ,newID:function () {
        return LightBox.util.idIndex++;
    }
    ,Boxes: {}
    ,extend: function (destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }
    ,$: function (id) {
        return "string" == typeof id ? document.getElementById(id) : id;
    }
    ,getElementsByClassName: function (searchClass, node, tag) {
        var result = [];
        if (document.getElementsByClassName) {
            var nodes = (node || document).getElementsByClassName(searchClass);
            tag = tag || "*";
            if (tag == "*") {
                result = nodes;
            }
            else {
                for (var i = 0; node = nodes[i++]; ) {
                    if (node.tagName === tag.toUpperCase()) {
                        result.push(node)
                    }
                }
            }
            return result;
        } else {
            node = node || document;
            tag = tag || "*";
            var classes = searchClass.split(" "),
              elements = (tag === "*" && node.all) ? node.all : node.getElementsByTagName(tag),
              patterns = [],
              current,
              match;
            var i = classes.length;
            while (--i >= 0) {
                patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
            }
            var j = elements.length;
            while (--j >= 0) {
                current = elements[j];
                match = false;
                for (var k = 0, kl = patterns.length; k < kl; k++) {
                    match = patterns[k].test(current.className);
                    if (!match) break;
                }
                if (match) result.push(current);
            }
            return result;
        }
    }
    ,addHandler: function (element, type, fn) {
        if (element.attachEvent) {
            element.attachEvent("on" + type, fn);
        }
        else if (element.addEventListener) {
            element.addEventListener(type, fn, false);
        }
        else {
            element["on" + type] = fn;
        }
    }
    ,removeHandler: function (element, type, fn) {
        if (element.attachEvent) {
            element.detavhEvent("on" + type, fn);
        }
        else if (element.addEventListener) {
            element.removeEventListener(type, fn, false);
        }
        else {
            element["on" + type] = null;
        }
    }
    ,getEvent: function (event) {
        return event ? event : window.event;
    }
    ,getTarget: function (event) {
        event = LightBox.util.getEvent(event);
        return event.target || event.srcElement;
    }
    ,getOffset:function(elementID){
            element=typeof element=="object"?elementID:document.getElementById(elementID);
            var offsetLeft = 0, offsetTop = 0;
            while (element) {
                offsetLeft += element.offsetLeft;
                offsetTop += element.offsetTop;
                element = element.offsetParent;
            }
        return {x:offsetLeft,y:offsetTop};
    },
     width: function (b) {
         return parseInt(b.offsetWidth);
     },
    height: function (b) {
        return parseInt(b.offsetHeight);
    }
};

//options中的内容也可以包含Lightbox中的配置属性的，因为程序中我会自动对其扩展，然后再传给LightBox中的参数
LightBox.alert = function (options) {
    //create a shortcut
    var util = LightBox.util;

    var defaults = {
        removeWhenClose:true,
        title: "提示",
        content: "",
        btnText: "确定",
        dialogClassName: "scDialogWrapper",
        contentClassName: "scDialogContent",
        btnClassName: "scDialogBtn",
        closeClassName: "scClose",
        callback: function () { }
    };
    if (arguments.length == 1 && (typeof options == "string")) {
       defaults= util.extend(defaults, { content: options });
    }
    else if (typeof options == "object") {
       defaults=  util.extend(defaults, options);
    }
    else {
        alert("Invalid arguments...");
        return false;
    }
    var szDialogWrapper = "<div id=\"{dialogID}\" class=\"ui-dialog {dialogClassName}\">" + "<div class=\"ui-dialog-titlebar\">" + "<span class=\"ui-dialog-title\" id=\"ui-id-1\">" + "{title}</span>" + "<a class=\"ui-dialog-titlebar-close {closeClassName}\" href=\"#\">" + "<span class=\"ui-icon-closethick\">" + "关闭</span></a>" + "</div>" + "<div scrollleft=\"0\" scrolltop=\"0\" class=\"ui-dialog-content {contentClassName}\" style=\"\">" + "{content}" + "</div>" + "<div class=\"ui-dialog-buttonpane\">" + "<div class=\"ui-dialog-buttonset\">" + "<button class=\"ui_bottom_y ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only {btnClassName}\"" + "type=\"button\">" + "<span class=\"ui-button-text\">" + "{btnText}</span></button>" + "</div>" + "</div>" + "</div>";
    var createDialogBox = function (defaults) {
        var box = document.createElement("div");
        var id = "lb-Dialog-" + util.newID();
        box.innerHTML = szDialogWrapper.replace("{dialogID}", id)
                                      .replace("{title}", defaults.title)
                                      .replace("{content}", defaults.content)
                                      .replace("{btnText}", defaults.btnText)
                                      .replace("{dialogClassName}", defaults.dialogClassName)
                                      .replace("{contentClassName}", defaults.contentClassName)
                                      .replace("{closeClassName}", defaults.closeClassName)
                                      .replace("{btnClassName}", defaults.btnClassName);
        document.body.appendChild(box.firstChild);
        return id;
    };
    var dialogID = createDialogBox(defaults);    
    var oDialog = util.$(dialogID);
    var oBtn = util.getElementsByClassName(defaults.btnClassName, oDialog)[0];
    var oClose = util.getElementsByClassName(defaults.closeClassName, oDialog)[0];
    var oDragHandle = util.getElementsByClassName("ui-dialog-titlebar", oDialog)[0];

    util.addHandler(oBtn, "click", function () {
        dialog.Close();
        defaults.callback && defaults.callback();
    });
    util.addHandler(oClose, "click", function () {
        dialog.Close();
    });
    var dialog = new LightBox(dialogID,util.extend({dragHandle:oDragHandle},defaults));    
    util.Boxes[dialogID] = dialog;
    dialog.Show();

    return dialog;
};       //end LightBox.alert
LightBox.confirm = function (options) {
    //create a shortcut
    var util = LightBox.util;
    var defaults = {
        removeWhenClose:true,
        title: "确认提示",
        content: "",
        btnConfirmText: "确定",
        btnCancelText: "取消",
        dialogClassName: "scDialogWrapper",
        contentClassName: "scDialogContent",
        btnConfirmClassName: "scDialogBtnConfirm",
        btnCancelClassName: "scDialogBtnCancel",
        closeClassName: "scClose",
        /*result will be true or false*/
        callbackOk: function () { },
        callbackCancel: function () { }        
    };
    if (arguments.length == 1 && (typeof options == "string")) {
      defaults= util.extend(defaults, { content: options });
    }
    else if (typeof options == "object") {
      defaults=util.extend(defaults, options);
    }
    else {
        alert("Invalid arguments...");
        return false;
    }
    var szDialogWrapper = "<div id=\"{dialogID}\" class=\"ui-dialog {dialogClassName}\">" + "<div class=\"ui-dialog-titlebar\">" + "<span class=\"ui-dialog-title\" id=\"ui-id-1\">" + "{title}</span>" + "<a class=\"ui-dialog-titlebar-close {closeClassName}\" href=\"#\">" + "<span class=\"ui-icon-closethick\">" + "关闭</span></a>" + "</div>" + "<div scrollleft=\"0\" scrolltop=\"0\" class=\"ui-dialog-content {contentClassName}\" style=\"\">" + "{content}" + "</div>" + "<div class=\"ui-dialog-buttonpane\">" + "<div class=\"ui-dialog-buttonset\">" + "<button class=\"ui_bottom_y ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only {btnConfirmClassName}\"" + "type=\"button\">" + "<span class=\"ui-button-text\">" + "{btnConfirmText}" + "</span>" + "</button>" + "<button aria-disabled=\"false\" role=\"button\" class=\"ui_bottom_b ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only {btnCancelClassName}\"" + "type=\"button\">" + "<span class=\"ui-button-text\">{btnCancelText}</span>" + "</button>" + "</div>" + "</div>" + "</div>";
    var createDialogBox = function (defaults) {
        var box = document.createElement("div");
        var id = "lb-Dialog-" + util.newID();
        box.innerHTML = szDialogWrapper.replace("{dialogID}", id)
                                      .replace("{title}", defaults.title)
                                      .replace("{content}", defaults.content)

                                      .replace("{btnConfirmText}", defaults.btnConfirmText)
                                      .replace("{btnCancelText}", defaults.btnCancelText)

                                      .replace("{dialogClassName}", defaults.dialogClassName)
                                      .replace("{contentClassName}", defaults.contentClassName)
                                      .replace("{closeClassName}", defaults.closeClassName)

                                      .replace("{btnConfirmClassName}", defaults.btnConfirmClassName)
                                      .replace("{btnCancelClassName}", defaults.btnCancelClassName);
        document.body.appendChild(box.firstChild);
        return id;
    };
    var dialogID = createDialogBox(defaults); 
    var oDialog = util.$(dialogID);
    var oBtnConfirm = util.getElementsByClassName(defaults.btnConfirmClassName, oDialog)[0];
    var oBtnCancel = util.getElementsByClassName(defaults.btnCancelClassName, oDialog)[0];
    var oClose = util.getElementsByClassName(defaults.closeClassName, oDialog)[0];
    var oDragHandle = util.getElementsByClassName("ui-dialog-titlebar", oDialog)[0];
    util.addHandler(oBtnConfirm, "click", function () {
        dialog.Close();
        defaults.callbackOk && defaults.callbackOk();
    });
    util.addHandler(oBtnCancel, "click", function () {
        dialog.Close();
        defaults.callbackCancel && defaults.callbackCancel();
    });

    util.addHandler(oClose, "click", function () {
        dialog.Close();
    });

    var dialog = new LightBox(dialogID,util.extend({dragHandle:oDragHandle},defaults));   
    util.Boxes[dialogID] = dialog;
    dialog.Show();
 
    return dialog;   
    
}; //end LightBox.confirm

/**
*Invoke method:
*              1.Lightbox.prompt(titile,defaultValue)
*              2.Lightbox.prompt(options)
**/
LightBox.prompt = function (options) {
    //create a shortcut
    var util = LightBox.util;
    var defaults = {
        removeWhenClose:true,
        title: "询问提示",
        content: "",
        btnConfirmText: "确定",
        btnCancelText: "取消",
        dialogClassName: "scDialogWrapper",
        contentClassName: "scDialogContent",

        dialogTxtClassName: "scDialogTxt",
        defaultValue: "",

        btnConfirmClassName: "scDialogBtnConfirm",
        btnCancelClassName: "scDialogBtnCancel",
        closeClassName: "scClose",
        /*result will be true or false*/
        callbackOk: function (txt) { },
        callbackCancel: function () { }
    };
    if (arguments.length == 1 && (typeof options == "string")) {
       defaults= util.extend(defaults, { content: options });
    }
    else if (arguments.length == 2 && (typeof options == "string") && typeof arguments[1] == "string") {
       defaults= util.extend(defaults, { content: options, defaultValue: arguments[1] });
    }
    else if (typeof options == "object") {
       defaults= util.extend(defaults, options);
    }
    else {
        alert("Invalid arguments...");
        return false;
    }
    var szDialogWrapper = "<div id=\"{dialogID}\" class=\"ui-dialog {dialogClassName}\">" + "<div class=\"ui-dialog-titlebar\">" + "<span class=\"ui-dialog-title\">" + "{title}</span>" + "<a class=\"ui-dialog-titlebar-close {closeClassName}\" href=\"#\">" + "<span class=\"ui-icon-closethick\">" + "关闭</span></a>" + "</div>" + "<div scrollleft=\"0\" scrolltop=\"0\" class=\"ui-dialog-content {contentClassName}\" style=\"\">" + "<p>{content}</p>" + "<p><input class=\"{dialogTxtClassName}\" type=\"text\" value=\"{defaultValue}\" /></p>" + "</div>" + "<div class=\"ui-dialog-buttonpane\">" + "<div class=\"ui-dialog-buttonset\">" + "<button class=\"ui_bottom_y ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only {btnConfirmClassName}\"" + "type=\"button\">" + "<span class=\"ui-button-text\">" + "{btnConfirmText}" + "</span>" + "</button>" + "<button aria-disabled=\"false\" role=\"button\" class=\"ui_bottom_b ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only {btnCancelClassName}\"" + "type=\"button\">" + "<span class=\"ui-button-text\">{btnCancelText}</span>" + "</button>" + "</div>" + "</div>" + "</div>";
    var createDialogBox = function (defaults) {
        var box = document.createElement("div");
        var id = "lb-Dialog-" + util.newID();
        box.innerHTML = szDialogWrapper.replace("{dialogID}", id)
                                      .replace("{title}", defaults.title)
                                      .replace("{content}", defaults.content)

                                      .replace("{btnConfirmText}", defaults.btnConfirmText)
                                      .replace("{btnCancelText}", defaults.btnCancelText)

                                      .replace("{dialogClassName}", defaults.dialogClassName)
                                      .replace("{contentClassName}", defaults.contentClassName)

                                      .replace("{dialogTxtClassName}", defaults.dialogTxtClassName)
                                      .replace("{defaultValue}", defaults.defaultValue)

                                      .replace("{closeClassName}", defaults.closeClassName)

                                      .replace("{btnConfirmClassName}", defaults.btnConfirmClassName)
                                      .replace("{btnCancelClassName}", defaults.btnCancelClassName);
        document.body.appendChild(box.firstChild);
        return id;
    };
    var dialogID = createDialogBox(defaults);
    var oDialog = util.$(dialogID);
    var oBtnConfirm = util.getElementsByClassName(defaults.btnConfirmClassName, oDialog)[0];
    var oBtnCancel = util.getElementsByClassName(defaults.btnCancelClassName, oDialog)[0];
    var oClose = util.getElementsByClassName(defaults.closeClassName, oDialog)[0];
    var oText = util.getElementsByClassName(defaults.dialogTxtClassName, oDialog)[0];
    var oDragHandle = util.getElementsByClassName("ui-dialog-titlebar", oDialog)[0];
    util.addHandler(oBtnConfirm, "click", function () {
        dialog.Close();
        defaults.callbackOk && defaults.callbackOk(oText.value);
    });
    util.addHandler(oBtnCancel, "click", function () {
        dialog.Close();
        defaults.callbackCancel && defaults.callbackCancel();
    });

    util.addHandler(oClose, "click", function () {
        dialog.Close();
    });
    var dialog = new LightBox(dialogID,util.extend({dragHandle:oDragHandle},defaults));   
    util.Boxes[dialogID] = dialog;
    dialog.Show();
    
    return dialog; 
}; //end LightBox.prompt

/****LightBox.include  
    用Iframe加载外部URL
*/
LightBox.include = function (options) {
    //create a shortcut
    var util = LightBox.util;
    var defaults = {
        removeWhenClose: true,
        title: " ",
        frameUrl: "",
        width: 678,
        height:310,
        dialogClassName: "scDialogWrapper",
        contentClassName: "scDialogContent",
        closeClassName: "scClose"
        /*result will be true or false*/
    };
    if (arguments.length == 4 && (typeof options == "string") && typeof arguments[1] == "string" && typeof arguments[2] == "number" && typeof arguments[3] == "number") {
        defaults = util.extend(defaults, {
            frameUrl:options,
            title:arguments[1],
            width:arguments[2],
            height:arguments[3]
        });
    }
    else if (typeof options == "object") {
        defaults = util.extend(defaults, options);
    }
    else if (typeof options == "string") {
        defaults = util.extend(defaults, {
            frameUrl: options,
        });
    }
    var szDialogWrapper = "<div id=\"{dialogID}\" class=\"ui-dialog {dialogClassName}\" style=\"width:{width}px;height:{height}px\">" + "<div class=\"ui-dialog-titlebar\">" + "<span class=\"ui-dialog-title\">" + "{title}</span>" + "<a class=\"ui-dialog-titlebar-close {closeClassName}\" href=\"#\">" + "<span class=\"ui-icon-closethick\">" + "关闭</span></a>" + "</div>" + "<div scrollleft=\"0\" scrolltop=\"0\" class=\"ui-dialog-content {contentClassName}\" style=\"\">" + "<iframe frameborder=0 scrolling=\"no\" border=\"0\" src=\"{frameUrl}\" width=\"100%\" height=\"100%\"></iframe>" + "</div>" + "</div>";
    var createDialogBox = function (defaults) {
        var box = document.createElement("div");
        var id = "lb-Dialog-" + util.newID();
        box.innerHTML = szDialogWrapper.replace("{dialogID}", id)
                                      .replace("{title}", defaults.title)
        
                                      .replace("{dialogClassName}", defaults.dialogClassName)
                                      .replace("{contentClassName}", defaults.contentClassName)
                                      .replace("{closeClassName}", defaults.closeClassName)
                                      .replace("{frameUrl}", defaults.frameUrl)
                                      .replace(new RegExp("{width}","ig"), defaults.width)
                                      .replace(new RegExp("{height}","ig"), defaults.height);
        document.body.appendChild(box.firstChild);
        return id;
    };
    var dialogID = createDialogBox(defaults);
    var oDialog = util.$(dialogID);
    var oClose = util.getElementsByClassName(defaults.closeClassName, oDialog)[0];
    
    var oDragHandle = util.getElementsByClassName("ui-dialog-titlebar", oDialog)[0];
    var oContentWrapper = util.getElementsByClassName("ui-dialog-content", oDialog)[0];
    oContentWrapper.style.width = defaults.width+"px";
    oContentWrapper.style.height = defaults.height - util.height(oDragHandle) + "px";
    util.addHandler(oClose, "click", function () {
        dialog.Close();
    });
    var dialog = new LightBox(dialogID, util.extend({ dragHandle: oDragHandle }, defaults));
    util.Boxes[dialogID] = dialog;
    dialog.Show();
    return dialog;
};//end LightBox.include()

/***LightBox.loadTip()

**/
LightBox.loadTip = function (options) {
    //create a shortcut
    var util = LightBox.util;
    var defaults = {
        removeWhenClose: true,
        dialogClassName: "scDialogWrapper",
        contentClassName: "scDialogContent",
        tipText:"正在加载, 请稍等..."
    };
    if (typeof options == "string") {
        defaults = util.extend(defaults, {
            tipText: options
        });
    }
    var szDialogWrapper = "<div id=\"{dialogID}\" class=\"ui-dialog {dialogClassName}\">"+""+"<div class=\"ui-dialog-content {contentClassName}\" style=\"\">"+"<p>{tipText}</p>"+"</div>"+"</div>";
    var createDialogBox = function (defaults) {
        var box = document.createElement("div");
        var id = "lb-Dialog-" + util.newID();
        box.innerHTML = szDialogWrapper.replace("{dialogID}", id)
                                      .replace("{dialogClassName}", defaults.dialogClassName)
                                      .replace("{contentClassName}", defaults.contentClassName)
                                      .replace("{tipText}", defaults.contentClassName);
        document.body.appendChild(box.firstChild);
        return id;
    };
    var dialogID = createDialogBox(defaults);
    var dialog = new LightBox(dialogID,defaults);
    util.Boxes[dialogID] = dialog;
    dialog.Show();
    return dialog;
};//end LightBox.loadTip()



function Drag() {
    //初始化
    this.initialize.apply(this, arguments);
}
Drag.prototype = {
    //初始化
    initialize: function (drag, options) {
        this.drag = this.$(drag);
        this._x = this._y = 0;
        this._moveDrag = this.bind(this, this.moveDrag);
        this._stopDrag = this.bind(this, this.stopDrag);

        this.setOptions(options);

        this.handle = this.$(this.options.handle);
        this.maxContainer = this.$(this.options.maxContainer);

        this.maxTop = Math.max(this.maxContainer.clientHeight, this.maxContainer.scrollHeight) - this.drag.offsetHeight;
        this.maxLeft = Math.max(this.maxContainer.clientWidth, this.maxContainer.scrollWidth) - this.drag.offsetWidth;

        this.limit = this.options.limit;
        this.lockX = this.options.lockX;
        this.lockY = this.options.lockY;
        this.lock = this.options.lock;

        this.onStart = this.options.onStart;
        this.onMove = this.options.onMove;
        this.onStop = this.options.onStop;

        this.handle.style.cursor = "move";

        this.changeLayout();

        this.addHandler(this.handle, "mousedown", this.bind(this, this.startDrag))
    },
    changeLayout: function () {
        this.drag.style.top = this.drag.offsetTop + "px";
        this.drag.style.left = this.drag.offsetLeft + "px";
//        this.drag.style.position = "absolute";
        this.drag.style.margin = "0";
    },
    startDrag: function (event) {
        var event = event || window.event;

        this._x = event.clientX - this.drag.offsetLeft;
        this._y = event.clientY - this.drag.offsetTop;

        this.addHandler(document, "mousemove", this._moveDrag);
        this.addHandler(document, "mouseup", this._stopDrag);

        event.preventDefault && event.preventDefault();
        this.handle.setCapture && this.handle.setCapture();

        this.onStart()
    },
    moveDrag: function (event) {
        var event = event || window.event;

        var iTop = event.clientY - this._y;
        var iLeft = event.clientX - this._x;

        if (this.lock) return;

        this.limit && (iTop < 0 && (iTop = 0), iLeft < 0 && (iLeft = 0), iTop > this.maxTop && (iTop = this.maxTop), iLeft > this.maxLeft && (iLeft = this.maxLeft));

        this.lockY || (this.drag.style.top = iTop + "px");
        this.lockX || (this.drag.style.left = iLeft + "px");

        event.preventDefault && event.preventDefault();

        this.onMove();
    },
    stopDrag: function () {
        this.removeHandler(document, "mousemove", this._moveDrag);
        this.removeHandler(document, "mouseup", this._stopDrag);

        this.handle.releaseCapture && this.handle.releaseCapture();

        this.onStop();
    },
    //参数设置
    setOptions: function (options) {
        this.options =
		{
		    handle: this.drag, //事件对象
		    limit: true, //锁定范围
		    lock: false, //锁定位置
		    lockX: false, //锁定水平位置
		    lockY: false, //锁定垂直位置
		    maxContainer: document.documentElement || document.body, //指定限制容器
		    onStart: function () { }, //开始时回调函数
		    onMove: function () { }, //拖拽时回调函数
		    onStop: function () { }  //停止时回调函数
		};
        for (var p in options) this.options[p] = options[p];
    },
    //获取id
    $: function (id) {
        return typeof id === "string" ? document.getElementById(id) : id;
    },
    //添加绑定事件
    addHandler: function (oElement, sEventType, fnHandler) {
        return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler);
    },
    //删除绑定事件
    removeHandler: function (oElement, sEventType, fnHandler) {
        return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler);
    },
    //绑定事件到对象
    bind: function (object, fnHandler) {
        return function() {
            return fnHandler.apply(object, arguments);
        };
    }
};