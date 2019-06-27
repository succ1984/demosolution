if( typeof(bit)=='undefined')    bit ={version:  "1.0.0",created: "2007.07.30"}; 
/***************************************************************
* 简化函数                                                     *
***************************************************************/ 
if(typeof($)=="undefined")
$ = function() {
  var elements = new Array();
  for (var i = 0; i < arguments.length; i++) {
    var element = arguments[i];
    if (typeof element == 'string')
      element = document.getElementById(element);

    if (arguments.length == 1)
      return element;

    elements.push(element);
  }
  return elements;
}; 
/***************************************************************
* Drag 拖动类                                                   *
***************************************************************/  
 bit.Drag={
    "obj":null,
	"init":function(a, aRoot){
			a.onmousedown=bit.Drag.start;
			a.root = aRoot;
			if(isNaN(parseInt(a.root.style.left)))a.root.style.left="0px";
			if(isNaN(parseInt(a.root.style.top)))a.root.style.top="0px";
			a.root.onDragStart=new Function();
			a.root.onDragEnd=new Function();
			a.root.onDrag=new Function();
		},
	"start":function(a){	
			var b= bit.Drag.obj=this;
			a=bit.Drag.fixE(a);
			var c=parseInt(b.root.style.top);
			var d=parseInt(b.root.style.left);
			b.root.onDragStart(d,c,a.clientX,a.clientY);
			b.lastMouseX=a.clientX;
			b.lastMouseY=a.clientY;
			document.onmousemove=bit.Drag.drag;
			document.onmouseup=bit.Drag.end;
			return false;
		},	
	"drag":function(a){
			a=bit.Drag.fixE(a);
			var b=bit.Drag.obj;
			var c=a.clientY;
			var d=a.clientX;
			var e=parseInt(b.root.style.top);
			var f=parseInt(b.root.style.left);
			var h,g;
			h=f+d-b.lastMouseX;
			g=e+c-b.lastMouseY;
			b.root.style.left=h+"px";
			b.root.style.top=g+"px";			
			b.lastMouseX=d;
			b.lastMouseY=c;  
		 
			b.root.onDrag(h,g,a.clientX,a.clientY);
			return false;
		},
	"end":function(){			
			document.onmousemove=null;
			document.onmouseup=null;
			bit.Drag.obj.root.onDragEnd(parseInt(bit.Drag.obj.root.style.left),parseInt(bit.Drag.obj.root.style.top));
			bit.Drag.obj=null;
		},
	"fixE":function(a){
			if(typeof a=="undefined")a=window.event;
			if(typeof a.layerX=="undefined")a.layerX=a.offsetX;
			if(typeof a.layerY=="undefined")a.layerY=a.offsetY;
			return a;
		}
};

/***************************************************************
* 弹出对话框                                                   *
***************************************************************/
bit.Dialog={ 
    backgroundColor:"#000000",
    opacity:10, 
    cssLink:"sysdialog/SysDialog.css",
    init:function(opacity,bgColor,css){        
        this.opacity = opacity;
        if(bgColor) this.backgroundColor = bgColor;
        if(css) {        
            this.cssLink = css;
            this.addCssLink();
        }
    },
    alert:function(msg,fCallback){
        this.showDialog(msg,fCallback,"系统提示",false,null,false);
    },
    confirm:function(msg,fCallback,cancelCallback){
        this.showDialog(msg,fCallback,"系统提示",true,cancelCallback,false);
    
    },  
    showDialog:function(msg, fCallback, text, hasCancel, cancelCallback, isPrompt){   
        this.addCssLink();
        var divDialog = bit.DOM.createElement("DIV", "dvSystemMsg");
        document.body.appendChild(divDialog );
        text=text||"系统提示";
        var content ="";
        var cancelHtml="";
        
        //是否显示取消 和 输入内容框
        if(hasCancel){
            cancelHtml='<input type="button" value="取 消" class="syBtn" id="btnSysMsgCancel"/>';
        }
        if(isPrompt){
            msg = msg + ':&nbsp;<input type="text" id="txtPromptInput" /><p class="swEroMsg">&nbsp;&nbsp;&nbsp;&nbsp;<span id="spnEroMsg"></span></p>'
        }
        
        //消息窗体内容
        content +='<div class="sysWin" style="position:absolute;z-index:999" id="sysMsgWin"><h2>' +'<div class="fLe"></div>' +'<b class="icoSw" id="icoSw"></b>' +'<span>'+ text +'</span>' +'<div class="fRi"></div>' +'<a href="javascript:return false;();" title="关闭" class="clsWin" id="btnSysInfoClose"></a>' +'</h2>' +'<div class="bdy">' +'<div class="bdyCtn">' +'<table class="swTb">' +'<tr>' +'<th><b class="icoIfo" id="icoIfo"></b></th>' +'<td>' +'<span class="swTit">'+ msg +'</span>' +'</td>' +'</tr>' +'</table>' +'<div class="clear"></div>' +'</div>' +'</div>' +'<div class="bot">' +'<div class="fLe"></div>' +cancelHtml +'<input type="button" value="确 定" class="syBtn" id="btnSysMsgOk" />' +'<div class="fRi"></div>' +'</div></div>';
        
        //背景内容
        var backgroundWidth="100%"; 
        var backgroundHeight = bit.DOM.getWindowRect().height+"px";
        var backgroundOpacity= "-moz-opacity:"+ this.opacity/100 +";filter:alpha(opacity="+ this.opacity +");";
        content +='<div id="sysMsgBackground" style="position:absolute;z-index:998;top:0;left:0;width:'+ backgroundWidth +';height:'+ backgroundHeight +';'+ backgroundOpacity +'background-color:'+ this.backgroundColor +'">';
       // content += '<iframe src="about:blank" border="0" style="POSITION: absolute; BORDER-WIDTH: 0px;TOP: 0px; LEFT: 0px; WIDTH: 100%; HEIGHT: 100%; FILTER: chroma(color=#ffffff);"></iframe>';
        content +='</div>';
        divDialog.innerHTML=content;
        
        //消息窗体位置
        //var ag=divDialog.firstChild;
        var divMsgWin = $('sysMsgWin'); 
        var clientRect = bit.DOM.getClientRect()
        var x=( clientRect.width  - divMsgWin.offsetWidth )/2; 
      
        var y=( clientRect.height - divMsgWin.offsetHeight)/2 + clientRect.top;
        divMsgWin.style.left=x + "px";
        divMsgWin.style.top=y + "px";   
         
        
        //拖动初始化
        bit.Drag.init(divMsgWin.getElementsByTagName("H2")[0], divMsgWin);
        
        //焦点
        $("btnSysMsgOk").focus();
        if(isPrompt){
            window.setTimeout('$("txtPromptInput").focus();', 1);
        }
        
        //按钮事件
        $("btnSysInfoClose").onclick=function(){ 
            bit.Event.stopObserving(window,"resize",bit.Dialog.resize,false);
            bit.Event.stopObserving(window,"scroll",bit.Dialog.resize,false);
            bit.DOM.hide(divDialog); 
            
            return false;
        };
        if($("btnSysMsgCancel")){
            $("btnSysMsgCancel").onclick=function(){
                $("btnSysInfoClose").onclick();
                if(cancelCallback){cancelCallback();}
            }
        }
        $("btnSysMsgOk").onclick=function(){
            if(!fCallback){
                $("btnSysInfoClose").onclick();
            }
            else{
                var r=null;
                try{
                    var param=null;
                    if($("txtPromptInput")){
                        param=$("txtPromptInput").value;
                    }
                    r=fCallback(param);
                    if(isPrompt&&r&&r.msg){
                        $("spnEroMsg").innerHTML=r.msg;
                        $("txtPromptInput").select();
                        return;
                    }
                }
                catch(exp){}
                if(!r){
                    $("btnSysInfoClose").onclick();
                }
            }
        }; 
        
        bit.Event.observe(window,"resize",this.resize,false);
        bit.Event.observe(window,"scroll",this.resize,false);
        return false;
    },
    resize:function(){
        //信息窗体位置
        if($('dvSystemMsg').style.dispaly=="none") return;
        var divMsgWin = $('sysMsgWin'); 
        var clientRect = bit.DOM.getClientRect()
        var x=( clientRect.width  - divMsgWin.offsetWidth )/2;
        var y=( clientRect.height - divMsgWin.offsetHeight)/2 + clientRect.top;
        divMsgWin.style.left=x + "px";
        divMsgWin.style.top=y + "px";  
        
        //背景位置
        $('sysMsgBackground').style.width = "100%";
        $('sysMsgBackground').style.height =  bit.DOM.getWindowRect().height+"px";
        
    },
    addCssLink:function(){
        //if($('linkSysDialog')) return ;
        var links = document.getElementsByTagName("link");
        for( var i=0;i<links.length;i++){
            if(links[i].id=="linkSysDialog" ||  links[i].href.toLowerCase()==this.cssLink.toLowerCase()) return;
        }
        
        var linkCSS = bit.DOM.createElement("link", "linkSysDialog");
        linkCSS.rel="stylesheet";
        linkCSS.type="text/css";
        linkCSS.href= this.cssLink;
        document.body.appendChild(linkCSS );
    }
}    