


var marquee = function (oContainer, oScroll, opts) {
    var _this = this;
    this.setting = {
        nInterval: 40,
        timer: 0,
        dir: "bt"  /*bt:bottom to top, rl:right to left*/
    };
    if (opts && typeof opts == 'object') {
        this.setting = Extend(this.setting, opts);
    }

    oContainer = typeof (oContainer) == "string" ? document.getElementById(oContainer) : oContainer;
    oScroll = typeof (oScroll) == "string" ? document.getElementById(oScroll) : oScroll;
    var oCopyScroll = oScroll.cloneNode(true);
    oScroll.parentNode.appendChild(oCopyScroll);
    function setPosition() {
        switch (_this.setting.dir) {
            case "bt":
                oContainer.scrollTop = 0;
                break;
            case "rl":
                oContainer.scrollLeft = 0;
                break;
            case "tb":
                oContainer.scrollTop = oCopyScroll.offsetHeight;
                break;
            case "lr":
                oContainer.scrollLeft = oCopyScroll.offsetWidth;
                break;
            default:
                alert("You didn't set the 'dir' property for your function, or didn't support the dir you set,\r\n please check..");
                break;
        }
    }
    function bottomToTopMove() {
        if (oCopyScroll.offsetHeight <= oContainer.scrollTop) {
            oContainer.scrollTop -= oCopyScroll.offsetHeight;
        }
        else {
            oContainer.scrollTop++;
        }
    }
    function rightToLeftMove() {
        if (oCopyScroll.offsetWidth <= oContainer.scrollLeft) {
            oContainer.scrollLeft -= oCopyScroll.offsetWidth;
        }
        else {
            oContainer.scrollLeft++;
        }
//        var szDebug = "oCopyScroll.offsetWidth: {0},<br/> oContainer.scrollLeft: {1}".replace("{0}", oCopyScroll.offsetWidth)
//                                                                                        .replace("{1}", oContainer.scrollLeft);
//        debug(szDebug);
    }
    function topToBottomMove() {
        if (oContainer.scrollTop == 0) {
            oContainer.scrollTop = oCopyScroll.offsetHeight; 
        }
        else {
            oContainer.scrollTop--;
        }
        //        var szDebug = "oCopyScroll.offsetHeight: {0},<br/> oContainer.scrollTop: {1}".replace("{0}", oCopyScroll.offsetHeight)
        //                                                                                     .replace("{1}", oContainer.scrollTop);
        //        debug(szDebug);
    }
    function leftToRightMove() {
        if (oContainer.scrollLeft==0) {
            oContainer.scrollLeft = oCopyScroll.offsetWidth;
        }
        else {
            oContainer.scrollLeft--;
        }
//        var szDebug = "oCopyScroll.offsetWidth: {0},<br/> oContainer.scrollLeft: {1}".replace("{0}", oCopyScroll.offsetWidth)
//                                                                                        .replace("{1}", oContainer.scrollLeft);
//        debug(szDebug);
    }




    function doMove() {
        var fnMove = function () { };
        switch (_this.setting.dir) {
            case "bt":
                fnMove = bottomToTopMove;
                break;
            case "rl":
                fnMove = rightToLeftMove;
                break;
            case "tb":
                fnMove = topToBottomMove;
                break;
            case "lr":
                fnMove = leftToRightMove;
                break;
            default:
                alert("You didn't set the 'dir' property for your function, or didn't support the dir you set,\r\n please check..");
                break;
        }
        _this.setting.timer = setInterval(fnMove, _this.setting.nInterval);
    }
    oContainer.onmouseover = function () {
        clearInterval(_this.setting.timer);
    }
    oContainer.onmouseout = function () {
        doMove();
    }
    /**
    Helper functions
    */
    function Extend(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }
    function debug(szText) {
        var oDebug = document.getElementById("divDebug");
        if (oDebug) {
            oDebug.innerHTML = szText;
        }
    }
    /**end helper**/
    setPosition();
    return doMove();
}


