/**
*js调试跟踪小工具
*调用方法：
*         trace.write(message)
*         trace.warn(message)
*         trace.clear()
*         trace.show()
*/
var trace = trace || {};
trace.enabled = false;
trace._panel = null;
trace.getInstance = function () {
    var tracePanel = this._panel;
    var closeElement = null;
    var doc = document.documentElement || document.body;
    if (!tracePanel) {
        tracePanel = document.createElement("div");
        var style = document.createElement("style");
        style.type = "text/css"; // _margin-left: 0; _left:expression(documentElement.scrollLeft-465)
        var styleText = [".globalTracePanel{display:none;width:950px;height:200px;overflow-y:scroll;border:2px solid #333666;position:fixed;z-index:99996;left:50%;margin-left:-465px;bottom:0px;padding:10px;background-color:#000000;opacity:0.8;filter:alpha(opacity=80);color:#FFFFFF;}",

"* html,* html body{background-image:url(about:blank);background-attachment:fixed}",

"* html .globalTracePanel{display:none;width:950px;height:200px;overflow-y:scroll;border:2px solid #333666;padding:10px;background-color:#000000;opacity:0.8;filter:alpha(opacity=80);color:#FFFFFF;position:absolute;top:expression(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight)}",



".linkClose{position:fixed;bottom:222px;right:50%;margin-right:-509px;z-index:99997;font-size:1.2em;color:#0000FF;cursor:pointer;background-color:#000000;color:#FFFFFF;}",

"* html .linkClose{position:absolute;right:50%;margin-right:-509px;z-index:99997;font-size:1.2em;color:#0000FF;cursor:pointer;background-color:#000000;color:#FFFFFF;top:expression(document.documentElement.scrollTop+document.documentElement.clientHeight-this.parentElement.offsetHeight-this.offsetHeight)}}"

].join("");
        if (document.all) {
            style.styleSheet.cssText = styleText;
        }
        else {
            var styleTextNode = document.createTextNode(styleText);
            style.appendChild(styleTextNode);
        }
        document.getElementsByTagName("head")[0].appendChild(style);
        tracePanel.className = "globalTracePanel";
        tracePanel.id = "globalTracePanel";
        document.getElementsByTagName("body")[0].appendChild(tracePanel);
       
           
        
        if (!document.getElementById("btnGlobalTracePanel_close")) {
            closeElement = document.createElement("a");
            closeElement.id = "btnGlobalTracePanel_close";
            closeElement.className = "linkClose";
            closeElement.onclick = function () {
                trace.hide();
                return false;
            }
            closeElement.innerHTML = "关闭(X)";
            tracePanel.appendChild(closeElement);
        }
        this._panel = tracePanel;
    }

    return tracePanel;
}
trace.write = function (message) {
    var bWranMessage = arguments[1] ? Boolean(arguments[1]) : false;
    var tracePanel = this.getInstance();
    var lineElement = document.createElement("p");
    if (bWranMessage) {
        lineElement.style.color = "#FF0000";
    }
    lineElement.innerHTML = message;
    tracePanel.appendChild(lineElement);
    if (this.enabled) {
        tracePanel.style["display"] = "block";
        tracePanel.style.zoom = 1;
    }
    var panelScrollHeight = tracePanel.scrollHeight;
    var panelHeight = tracePanel.offsetHeight || tracePanel.clientHeight;
    if (panelScrollHeight > panelHeight) {
        tracePanel.scrollTop = panelScrollHeight - panelHeight;
    }
}
trace.warn = function (message) {
    this.write(message,true);
}
trace.clear = function () {
    this.getInstance().innerHTML = "";
}
trace.show = function () {
    this.getInstance().style["display"] = "block";
}
trace.hide = function () {
    this.getInstance().style["display"] = "none";
}

trace.toggle = function () {
    if (this.isShow) {
        this.hide();
    }
    else {
        this.show();
    }
}