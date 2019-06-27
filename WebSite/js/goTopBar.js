

//var sideBarCollection = window.sideBarCollection || function () { };
//sideBarCollection.goTop = function () {
//    var doc = document.documentElement || document.body;
//    window.scrollTo(0, 0);
//}
//sideBarCollection.goBottom = function () {
//    var doc = document.documentElement || document.body;
//    var scrollHeight = Math.max(doc.scrollHeight, doc.offsetHeight, doc.clientHeight);
//    window.scrollTo(0, scrollHeight - doc.clientHeight);
//}

//sideBarCollection.goToElement = function (elementID) {
//    var doc = document.documentElement || document.body;
//    var element = typeof (elementID) == "string" ? document.getElementById(elementID) : elementID;
//    var offsetLeft = 0, offsetTop = 0;
//    while (element) {
//        offsetLeft += element.offsetLeft;
//        offsetTop += element.offsetTop;
//        element = element.offsetParent;
//    }
//    window.scrollTo(offsetLeft, offsetTop);
//}

 window.sideBarCollection={
    goTop:function() {
        var doc = document.documentElement || document.body;
        window.scrollTo(0, 0);
    },
    goBottom:function() {
        var doc = document.documentElement || document.body;
        var scrollHeight = Math.max(doc.scrollHeight, doc.offsetHeight, doc.clientHeight);
        window.scrollTo(0, scrollHeight - doc.clientHeight);
    },
    goToElement:function(elementID,marginTop) {
        var doc = document.documentElement || document.body;
            
        var element =typeof(elementID)=="string"?document.getElementById(elementID):elementID;
        var offsetLeft = 0, offsetTop = 0;
        while (element) {
            offsetLeft += element.offsetLeft;
            offsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        if(marginTop){
                offsetTop-=marginTop;
        }
        window.scrollTo(offsetLeft, offsetTop);
    }
}//end sideBarCollection