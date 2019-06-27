<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_Maps_welcome" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <script src="../../js/mapAPI/dealerMapLoad1.2.js" type="text/javascript"></script>
<script src="../../js/mapAPI/dealerMap1.2.js" type="text/javascript"></script>
P>地图的展示</P>
<div id="mymap0"  style="display:none;border:1px solid #949694;width:500px;height:400px;background-color:Black"></div>
<P>&nbsp;</P>
<script type="text/javascript">
    function aaa() {
        var mymap0 = new BitSoftMap("mymap0");
        //mymap0.LoadMap("1"); //显示全工具，默认是小工具条
        mymap0.AddData(39.838109, 116.393567, '北京公司'); //填充数据
        mymap0.Skin = 0;
        mymap0.SetMap(); //加载标注
        document.getElementById("mymap0").style.display = "";
    }
</script>
<input type="button" value="打开" onclick="aaa()" />
<p>冯立雷的地图例子：</p>
<p class="code">
&nbsp;&nbsp;&nbsp; var mymap1 = new BitSoftMap("mymap1");<BR>&nbsp;&nbsp;&nbsp; mymap1.LoadMap("1"); //显示全工具，默认是小工具条<BR>&nbsp;&nbsp;&nbsp; mymap1.AddData(39.838109, 116.393567, '北京公司');//填充数据<BR>&nbsp;&nbsp;&nbsp; mymap1.AddData(39.938109, 116.333567, '上海公司');<BR>&nbsp;&nbsp;&nbsp; mymap1.AddData(39.938109, 116.383567, '上海11公司');<BR>&nbsp;&nbsp;&nbsp; mymap1.Skin = 1;//0前台黄底展示，1为带标记展示。不设置为普通展示。<BR>&nbsp;&nbsp;&nbsp; mymap1.SetMap();//加载标注<BR>&nbsp;&nbsp;&nbsp; mymap1.AutoZoom(); //自动计算窗体显示的大小&nbsp;&nbsp;&nbsp; 
</p>

<p>示例如下：</p>
<div id="mymap1"  style="overflow:hidden;border:1px solid #949694;width:500px;height:400px;background-color:Black"></div>
<script type="text/javascript">
    var mymap1 = new BitSoftMap("mymap1");
    mymap1.LoadMap("1"); //显示全工具，默认是小工具条
    mymap1.AddData(39.838109, 116.393567, '北京公司'); //填充数据
    mymap1.AddData(39.938109, 116.333567, '上海公司');
    mymap1.AddData(39.938109, 116.383567, '上海11公司');
    mymap1.Skin = 1;
    mymap1.SetMap(); //加载标注
    mymap1.AutoZoom(); //自动计算窗体显示的大小
</script>
<p  class="code">点击示例如下：mymap1.pop(0);mymap1.pop(1);</p>
<p>
<input type="button" value="点击请求mymap1.pop(0)" onclick="mymap1.pop(0);" />
<input type="button" value="点击请求mymap1.pop(1)" onclick="mymap1.pop(1);" />
</p>
<p>修改或增加地图的例子：</p>
<p  class="code">
    &nbsp;var mymap2 = new BitSoftMap("mymap2");<BR>&nbsp;&nbsp;&nbsp; mymap2.AddData(39.938109, 116.323567, '北京易车互联信息技术有限公司','edit'); <BR>&nbsp;&nbsp;&nbsp; mymap2.SetMap(14);<BR>&nbsp;&nbsp;&nbsp; mymap2.DoMark("北京易车互联信息技术有限公司"); //增加标注<BR>&nbsp;&nbsp;&nbsp; function WriteData(x, y) {<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; document.getElementById("message").innerHTML = "纬度度数:" + x + ",经度度数:" + y;<BR>&nbsp;&nbsp;&nbsp; }<BR>&nbsp;&nbsp;&nbsp; function ClearData() {<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; document.getElementById("message").innerHTML = "";<BR>&nbsp;&nbsp;&nbsp; }
</p>

<p>示例如下：</p>
<p>修改地图的例子：</p>
<div id="mymap2"  style="overflow:hidden;border:1px solid #949694;width:400px;height:300px;background-color:Black"></div>
<script type="text/javascript">

    //写数据
    function WriteData(x, y) {
        document.getElementById("message").innerHTML = "纬度度数:" + x + ",经度度数:" + y;
    }
    //清空数据
    function ClearData() {
        document.getElementById("message").innerHTML = "";
    }

    var mymap2 = new BitSoftMap("mymap2");
    mymap2.AddData(39.938109, 116.323567, '北京易车互联信息技术有限公司', 'edit');
    //mymap2.Skin = 2;
    mymap2.SetMap(14);
    mymap2.DoMark("北京易车互联信息技术有限公司"); //增加标注
</script>
<p>&nbsp;</p>
<p>增加地图的例子：</p>
     <p  class="code">
    &nbsp;var mymap3 = new BitSoftMap("mymap3");<BR>&nbsp;&nbsp;&nbsp; mymap3.SetMap(14);<BR>&nbsp;&nbsp;&nbsp; mymap3.DoMark("北京易车互联信息技术有限公司"); //增加标注<BR>&nbsp;&nbsp;&nbsp; function WriteData(x, y) {<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; document.getElementById("message").innerHTML = "纬度度数:" + x + ",经度度数:" + y;<BR>&nbsp;&nbsp;&nbsp; }<BR>&nbsp;&nbsp;&nbsp; function ClearData() {<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; document.getElementById("message").innerHTML = "";<BR>&nbsp;&nbsp;&nbsp; }
</p>
      <div id="mymap3"  style="overflow:hidden;border:1px solid #949694;width:400px;height:300px;background-color:Black"></div>
<script type="text/javascript">
    /***************增加地图标点*******************************/
    var mymap3 = new BitSoftMap("mymap3");
    mymap3.SetMap(14);
    mymap3.DoMark("北京易车互联信息技术有限公司"); //增加标注
    //    function WriteData(x, y) {
    //        document.getElementById("message").innerHTML = "纬度度数:" + x + ",经度度数:" + y;
    //    }
    //    function ClearData() {
    //        document.getElementById("message").innerHTML = "";
    //    }
    /***************增加地图标点完*******************************/
    /***************展示地图标点*******************************/
    //var mymap1 = new BitSoftMap("mymap");
    //mymap1.AddData(39.938109, 116.323567, '北京易车互联信息技术有限公司');
    //mymap1.Skin = 0;
    //mymap1.SetMap();
    /***************展示地图标点完*******************************/ 
</script>

<!--<div id="mapObj" style="width: 400px; height: 300px"></div>
<div id="mapObj2" style="width: 400px; height: 300px"></div>
<div id="mapObj3" style="width: 400px; height: 300px"></div>-->
<script type="text/javascript">
    //    var mapObj = null;
    //    function mapInit(id) {
    //        var mapoption = new MMapOptions();
    //        mapoption.toolbar = MConstants.ROUND; //设置地图初始化工具条，ROUND:新版圆工具条   
    //        mapoption.overviewMap = MConstants.SHOW; //设置鹰眼地图的状态，SHOW:显示，HIDE:隐藏（默认）   
    //        mapoption.scale = MConstants.SHOW; //设置地图初始化比例尺状态，SHOW:显示（默认），HIDE:隐藏。   
    //        mapoption.zoom = 13; //要加载的地图的缩放级别   
    //        mapoption.center = new MLngLat(116.397428, 39.90923); //要加载的地图的中心点经纬度坐标   
    //        mapoption.language = MConstants.MAP_CN; //设置地图类型，MAP_CN:中文地图（默认），MAP_EN:英文地图   
    //        mapoption.fullScreenButton = MConstants.SHOW; //设置是否显示全屏按钮，SHOW:显示（默认），HIDE:隐藏   
    //        mapoption.centerCross = MConstants.SHOW; //设置是否在地图上显示中心十字,SHOW:显示（默认），HIDE:隐藏   
    //        mapoption.toolbarPos = new MPoint(20, 20); //设置工具条在地图上的显示位置
    //        mapObj = new MMap(id, mapoption); //地图初始化

    //        $("#imgId").remove();
    //        mapObj.addEventListener(mapObj, MOUSE_CLICK, onClick);
    //    }

    //    //点击地图事件
    //    function onClick(e) {
    //        var markerOption = new MMarkerOptions();
    //        //标注图片或SWF的url，默认为蓝色气球图片
    //        markerOption.imageUrl = "http://image.bitauto.com/dealer/membersite/skins/default/images0407/marker.png";
    //        //是否使用图片代理形式   
    //        //如果imageUrl属性的图片资源所在域名下没有crossdomain.xml，则需要用代理形式添加该图片资源   
    //        markerOption.picAgent = false;
    //        //设置图片相对于加点经纬度坐标的位置。九宫格位置。默认BOTTOM_CENTER代表正下方   
    //        markerOption.imageAlign = MConstants.BOTTOM_CENTER;
    //        //拖动结束后是否有弹跳效果,ture，有弹跳效果；false，没有弹跳效果（默认）   
    //        //当有弹跳效果的时候，marker的imageAlign属性必须为BOTTOM_CENTER，否则弹跳效果显示不正确   
    //        markerOption.isBounce = true;
    //        //是否在地图中显示信息窗口，true，可以显示（默认）；false，不显示   
    //        markerOption.canShowTip = false;
    //        //通过经纬度坐标及参数选项确定标注信息
    //        var Mmarker = new MMarker(new MLngLat(e.eventX, e.eventY), markerOption);
    //        //对象编号，也是对象的唯一标识   
    //        Mmarker.id = "marker1";
    //        //向地图添加覆盖物
    //        mapObj.addOverlay(Mmarker, true);
    //    }
    //    mapInit("mapObj");
    //mapInit("mapObj2");
    //mapInit("mapObj3");
</script>   
<br />
<span id="message"></span>
<br />
<input type="button" value="点击定位的请求" onclick="mymap3.Geocoder('北京');" />
<input type="button" value="请求清除" onclick="mymap3.RemoveMarker();" />
<input type="button" value="设置zoom" onclick="mymap2.setZoom(12);" />

<input type="button" value="获取zoom" onclick="alert(mymap2.getZoom(12));" />



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

