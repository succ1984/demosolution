<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="baiduMap.aspx.cs" Inherits="App_Maps_baiduMap" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
<style type="text/css">
.lr{
    clear:both;  padding:20px;
}
.myMap{
    float: none;
    height: 352px;
    overflow: hidden;
    width: 379px;
    border: 1px solid #999999;
    margin-top:50px;    
}

</style>

<script src="../../js/mapAPI/dealerMapLoad1.2.js" type="text/javascript"></script>
<script src="../../js/mapAPI/dealerMap1.2.js" type="text/javascript"></script>
<div class="lr">
    <input type="button" id="btnRandom" value="随机10个点" />
</div>
<div id="map1" class="myMap">

</div>


<div id="map2" class="myMap">


</div>


<script language="javascript" type="text/javascript">
    var mapHotDealerData = [
        {
            x: 43.86566107965456,
            y: 125.39462327957153,
            content: "长春市经济开发区自由大路7133号",
            index: "1"
        },
        {
            x:30.723760447062258 ,
            y: 114.23879027366638,
            content: "武汉盘龙城经济开发区盘龙汽车城",
            index: "2"
        },
        {
            x:40.075744033944524 ,
            y: 116.3118427991867,
            content: "北京市欧德宝国际汽车城T1号店",
            index: "3"
        },
        {
            x:30.601866929545657 ,
            y: 103.97392272949219,
            content: "成都市武侯区武侯大道铁佛段71号",
            index: "4"
        },
        {
            x:39.86681356012955 ,
            y: 116.3506007194519,
            content: "菜户营店:丽泽桥向西200米 花乡店:花乡桥东200米路南",
            index: "5"
        },
        {
            x: 39.9371661,
            y: 116.319334,
            content: "北京市海淀区紫竹院南路7号",
            index: "6"
        },
        {
            x:39.05335 ,
            y: 117.232503,
            content: "天津市河西区解放南路613号环渤海汽车城",
            index: "7"
        },
        {
            x:26.564990165895913 ,
            y: 106.75216555595398,
            content: "贵阳市见龙洞路56号",
            index: "8"
        },
        {
            x:26.56496137738887 ,
            y: 106.75289511680603,
            content: "贵州省贵阳市南明区见龙洞路29号（机场高速路旁）",
            index: "9"
        },
        {
            x: 40.04240884114698,
            y: 116.33104205131531,
            content: "清河小营安宁庄东路--方庄芳古园--成寿寺路133号",
            index: "10"
        }
    ];
    function getBitMap(){
        var myMap = new BitSoftMap("map1");
      // myMap.LoadMap();
        for (var i = 0; i < mapHotDealerData.length; i++) {
            var item = mapHotDealerData[i];
            myMap.AddData(item.x,item.y,item.content);
        }
        myMap.Skin = 2;
        myMap.SetMap();
        myMap.AutoZoom();       


        //myMap.Map.setMinZoom(4);
    }
    /*****
    **直接调用Baidu Map里的原生方法
    **/
    function getBitMap1() {  
        //创建地图实例      
        var map = new BMap.Map("map1");
        var points=[];
        var point = new BMap.Point(116.404, 39.915);
        map.centerAndZoom(point, 4);
        map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
        map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard(); //启用键盘上下左右键移动地图
        var ctrl_nav = new BMap.NavigationControl();
        //向地图添加缩放控件
        ctrl_nav.setType(BMAP_NAVIGATION_CONTROL_ZOOM);
        map.addControl(ctrl_nav);
        for (var i = 0; i < mapHotDealerData.length; i++) {
            var item=mapHotDealerData[i];
            map.addOverlay(getMarker(item));
            var point = new BMap.Point(item.y, item.x);
            map.centerAndZoom(point, 12);
            points.push(new BMap.Point(item.y, item.x));
        }
        var vp = map.getViewport(points);
        map.setViewport(vp);      
    }

    function getMarker(data){
          //创建图标
        var icon = new BMap.Icon("http://image.bitauto.com/dealer/dealersite/200909/mapletter/" + (data.index) + ".png", new BMap.Size(21, 34));
        icon.anchor = new BMap.Size(10, 32);
        // 阴影图标
//        var shadowIcon = new BMap.Icon("http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/shadow50.png", new BMap.Size(37, 34));
//        shadowIcon.anchor = new BMap.Size(10, 34);
        var point = new BMap.Point(data.y,data.x);
        var marker = new BMap.Marker(point, { icon: icon, raiseOnDrag: true });
        if(data.content!=null && data.content!="undefined"  && data.content!="") {
            // 设置文本标注
//            var x = 6;
//            if (data.index.toString().length >= 2) {
//                x = 3;
//            }
//            var label = new BMap.Label(data.index, { "offset": new BMap.Size(x, 5) });
//            label.setStyle({ color: "#000000", border: "none", backgroundColor: "transparent" });
//            marker.setLabel(label);
        }
        marker.addEventListener("click", function (e) {
            var opts = {
                offset: new BMap.Size(5, -15)
            }
            var infoWindow = new BMap.InfoWindow(data.content, opts);
            this.openInfoWindow(infoWindow);
        });
        return marker;
    }


   function getRadomMap() {
//       var map = new BMap.Map("map2");
//       var point = new BMap.Point(116.404, 39.915);
//       map.centerAndZoom(point, 15);  // 编写自定义函数，创建标注   
//       function addMarker(point, index) {  // 创建图标对象   
//           var myIcon = new BMap.Icon("markers.png", new BMap.Size(23, 25), {
//               // 指定定位位置。   
//               // 当标注显示在地图上时，其所指向的地理位置距离图标左上    
//               // 角各偏移10像素和25像素。您可以看到在本例中该位置即是   
//               // 图标中央下端的尖角位置。    
//               offset: new BMap.Size(10, 25),
//               // 设置图片偏移。   
//               // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您   
//               // 需要指定大图的偏移位置，此做法与css sprites技术类似。    
//               imageOffset: new BMap.Size(0, 0 - index * 25)   // 设置图片偏移    
//           });
//           // 创建标注对象并添加到地图   
//           var marker = new BMap.Marker(point, { icon: myIcon });
//           map.addOverlay(marker);
//       }
//       // 随机向地图添加10个标注    
//       var bounds = map.getBounds();
//       var lngSpan = bounds.maxX - bounds.minX;
//       var latSpan = bounds.maxY - bounds.minY;
//       for (var i = 0; i < 10; i++) {
//           var point = new BMap.Point(bounds.minX + lngSpan * (Math.random() * 0.7 + 0.15),
//                                    bounds.minY + latSpan * (Math.random() * 0.7 + 0.15));
//           addMarker(point, i);
//       }
   }
   window.onload = function () {
       document.getElementById("btnRandom").onclick = getRadomMap;
       //getBitMap();
       getBitMap1();
   }
</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

