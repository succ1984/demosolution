/***************************
*dealerMap1.2
*@author chenqiang
*@date 二月 15, 2012
***************************/
function BitSoftMap(mapid)
{
    this.Map = null;
    this.Skin = null;
    this.Data = [];
    this.TempI = 0;
    this.mapid = mapid;
    this.EditMarker = null;
    this.markers = [];

    this.Map = createMap(this.mapid);

    addMapControl(this.Map);

    // 加载地图
    this.LoadMap = function (viewType)
    {
        if (viewType)
        {
            addMapControl(this.Map, viewType);
        }
    };

    // 添加数据
    this.AddData = function (Lat, Lng, Content, Isedit)
    {
        var mapinfo = {};
        mapinfo.Lat = Lat;
        mapinfo.Lng = Lng;
        mapinfo.Content = Content;
        mapinfo.Isedit = 0;

        if (Isedit)
        {
            mapinfo.Isedit = 1;
        };

        if (Lat.toString().indexOf("0") != 0 && Lng.toString().indexOf("0") != 0)
        {
            this.Data.push(mapinfo);
        }


    };

    // 清除数据
    this.ClearData = function ()
    {
        this.Data = [];
    };

    // 设置地图
    this.SetMap = function (zoomLevel)
    {
        if (!this.Map)
        {
            this.Map = this.LoadMap(true);
        }

        for (var i = 0; i < this.Data.length; i++)
        {
            var data = this.Data[i];

            //标注展示
            this.OneMarker(data, zoomLevel);
        }
    };

    //一个经销商标记
    this.OneMarker = function (data, zoomLevel) {
        var zoom = 12;
        if (zoomLevel && zoomLevel > 0) {
            zoom = zoomLevel;
        }

        var lat = data.Lat, lng = data.Lng, content = data.Content, Isedit = data.Isedit;
        var map = this.Map;

        var marker = null;

        // 无标记
        if ((!lat || lat == 0) || (!lat || lat == 0)) {
            marker = "noMap";
            this.markers.push(marker);
            this.TempI++;
            return;
        }

        var Bmarker = new BitAutoMarker();
        if (this.Skin == 0) {
            marker = Bmarker.$createrOneMarker(new BMap.Point(lng, lat), content);
            map.addOverlay(marker);
        }
        else if (this.Skin == 1) {
            marker = Bmarker.$createrMarker(this.TempI, new BMap.Point(lng, lat), content);
            map.addOverlay(marker);
        }
        else if (this.Skin == 2) {
            marker = Bmarker.$createrOneMarkerNoConent(new BMap.Point(lng, lat), content);
            map.addOverlay(marker);
        }
        else {
            var point = new BMap.Point(lng, lat);
            marker = Bmarker.$createrOneMarker(point, "");

            map.addOverlay(marker);

            if (Isedit == 1) {
                marker.enableDragging(true);

                // 地图加载完毕后
                map.addEventListener("tilesloaded", function (e) {
                    var overlays = e.target.getOverlays();
                    if (overlays != null && overlays.length > 0) {
                        WriteData(point.lat, point.lng);
                    }

                    if (content) {
                        //                        marker.openInfoWindow(createInfoWindow(content));

                        marker = Bmarker.$createrOneMarker(new BMap.Point(lng, lat), content);
                        map.addOverlay(marker);
                    }

                });

                // 拖拽标记结束
                marker.addEventListener("dragend", function (e) {
                    WriteData(e.point.lat, e.point.lng);

                    if (content) {
                        //marker.openInfoWindow(createInfoWindow(content));
                        marker = Bmarker.$createrOneMarker(new BMap.Point(lng, lat), content);
                        map.addOverlay(marker);
                    }
                });
            }
        }

        var point = new BMap.Point(lng, lat);
        map.centerAndZoom(point, zoom);

        this.markers.push(marker);
        this.TempI++;
    };

    //自动计算窗体显示的大小
    this.AutoZoom = function ()
    {
        if (this.Data.length <= 0)
        {
            return;
        }

        var mapObj = this.Map;
        var points = [];
        for (var i = 0; i < this.Data.length; i++)
        {
            var data = this.Data[i];
            points.push(new BMap.Point(data.Lng, data.Lat));
        }

        var vp = mapObj.getViewport(points);
        mapObj.setViewport(vp);
    };

    // 弹出序列号的消息框
    this.pop = function (index)
    {
        var overlays = this.Map.getOverlays();
        var BitEvent = new BitAutoEvent();
        BitEvent.trigger(overlays[index], "click");
    }

    // 设置标记
    this.DoMark = function (content)
    {
        var map = this.Map;
        if (typeof (WriteData) != "function" || typeof (ClearData) != "function")
        {
            alert("请定义WriteData函数和ClearData函数。"); return;
        };

        //  鼠标事件
        map.addEventListener("click", function (e)
        {
            ClearData();
            map.clearOverlays();

            var Bmarker = new BitAutoMarker();


            var marker = Bmarker.$createrOneMarker(e.point, "");

            if (content)
            {
                marker = Bmarker.$createrOneMarker(e.point, content);
                //                map.addOverlay(marker);
                //                marker.openInfoWindow(createInfoWindow(content));
            }

            marker.enableDragging(true);
            map.addOverlay(marker);

            // 拖拽标记结束
            marker.addEventListener("dragend", function (e)
            {
                WriteData(e.point.lat, e.point.lng);
            });

            WriteData(e.point.lat, e.point.lng);


        });
    };

    // 检索功能
    this.Geocoder = function (address)
    {
        if (address == "")
        {
            alert("请输入地址！");
            return;
        }
        else
        {
            var map = this.Map;
            if (typeof (l_search) == "undefined")
            {
                l_option = {
                    onSearchComplete: function (results)
                    {
                        if (l_search.getStatus() == BMAP_STATUS_SUCCESS)
                        {
                            var level = l_search._json.content.level || 17;
                            var poi = results.getPoi(0);
                            map.centerAndZoom(poi.point, level)
                        }
                    }
                };

                l_search = new BMap.LocalSearch(map, l_option)
            }

            l_search.search(address)
        }
    };

    //设置缩放
    this.getZoom = function ()
    {
        return this.Map.getZoom();
    };

    // 设置缩放
    this.setZoom = function (zoom)
    {
        return this.Map.setZoom(zoom);
    };

    // 清楚标记
    this.RemoveMarker = function ()
    {
        var map = this.Map;
        map.clearOverlays();
        if (typeof (ClearData) != "function")
        {
            alert("请定义WriteData函数或ClearData函数。");
            return;
        };
        ClearData();
    }


}


// 创建map对象
function createMap(mapId)
{
    if (document.getElementById(mapId))
    {
        document.getElementById(mapId).innerHTML = "";
    }
    else
    {
        alert("当前页面未发现" + mapId);
        return;
    }

    var map = new BMap.Map(mapId);
    var point = new BMap.Point(106.08, 36.94);
    map.centerAndZoom(point, 4);
    setMapEvent(map);

    return map;
}


//缩放控件
var ctrl_nav = new BMap.NavigationControl();

//缩略图控件
var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });

// 縮放比例控件
var ctrl_scal = new BMap.ScaleControl()

// 地图类型控件
var ctrl_type = new BMap.MapTypeControl();

//向地图添加控件
function addMapControl(mapObj, viewType)
{

    if (viewType)
    {
        ctrl_nav.setType(BMAP_NAVIGATION_CONTROL_LARGE);

        // 添加控件
        mapObj.addControl(ctrl_nav);
        mapObj.addControl(ctrl_ove);
        mapObj.addControl(ctrl_scal);
        mapObj.addControl(ctrl_type);
    }
    else
    {
        ctrl_nav.setType(BMAP_NAVIGATION_CONTROL_ZOOM);
        mapObj.addControl(ctrl_nav);
    }
}

//地图事件设置函数：
function setMapEvent(map)
{
    map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
    map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard(); //启用键盘上下左右键移动地图
}

// 标记图标
function BitAutoMarker()
{
    // 创建图标
    this.$setIcon = function (index)
    {
        var imgUrl = "http://image.bitauto.com/dealer/dealersite/200909/mapletter/" + (index + 1) + ".png";
        var icon = new BMap.Icon(imgUrl, new BMap.Size(21, 34));
        icon.anchor = new BMap.Size(10, 32);
        return icon;
    };

    // 创建序号标记
    this.$createrMarker = function (i, point, content)
    {
        var marker = new BMap.Marker(point, { icon: this.$setIcon(i) });  // 创建标注 

        var BitEvent = new BitAutoEvent();

        // 打开信息窗口
        BitEvent.addListener(marker, "click", function ()
        {
            this.openInfoWindow(createInfoWindow(content));
        });

        return marker;
    };

    // 创建普通标记
    this.$createrOneMarker = function (point, content)
    {
        //创建图标
        var icon = new BMap.Icon("http://image.bitauto.com/dealer/membersite/skins/default/images0407/marker.png", new BMap.Size(19, 32));
        icon.anchor = new BMap.Size(10, 32);

        // 阴影图标
        var shadowIcon = new BMap.Icon("http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/shadow50.png", new BMap.Size(37, 34));
        shadowIcon.anchor = new BMap.Size(10, 34);

        // 创建标注  
        var marker = new BMap.Marker(point, { icon: icon, shadow: shadowIcon, raiseOnDrag: true });

        if (content != undefined && content != null && content != "")
        {
            // 设置文本标注
            var label = new BMap.Label(content, { "offset": new BMap.Size(15, -20) });
            marker.setLabel(label);
        }

        return marker;
    }
    this.$createrOneMarkerNoConent = function (point, content) {
        //创建图标
        var icon = new BMap.Icon("../../images/bgMap.png", new BMap.Size(21, 34));
        icon.anchor = new BMap.Size(10, 32);

        // 阴影图标
        var shadowIcon = new BMap.Icon("http://maps.gstatic.cn/intl/zh-CN_cn/mapfiles/shadow50.png", new BMap.Size(37, 34));
        shadowIcon.anchor = new BMap.Size(10, 34);

        // 创建标注  
        // var marker = new BMap.Marker(point, { icon: icon, shadow: shadowIcon, raiseOnDrag: true });
        var marker = new BMap.Marker(point, { icon: icon, shadow: shadowIcon, raiseOnDrag: true });
        if (content != undefined && content != null && content != "") {
            // 设置文本标注
            var x = 6;
            if (content.toString().length >= 2) {
                x = 3;
            }
            var label = new BMap.Label(content, { "offset": new BMap.Size(x, 5) });
            label.setStyle({ color: "#000000", border: "none", backgroundColor: "transparent" });
            marker.setLabel(label);
        }
        var BitEvent = new BitAutoEvent();
        BitEvent.addListener(marker, "click", function () {
            this.openInfoWindow(createInfoWindow(content));
        });
        return marker;
    }
}

// 创建信息窗口对象
function createInfoWindow(content)
{
    var opts = {
        offset: new BMap.Size(5, -15)
    }

    var infoWindow = new BMap.InfoWindow(content, opts);

    return infoWindow
}

// 重新封装事件
function BitAutoEvent()
{
    MapsEventListener._guid = 1;
    MapsEventListener.DOM_EVENT = 1;
    MapsEventListener.MAP_EVENT = 2;

    this.addListener = function (instance, eventName, handler)
    {
        instance.addEventListener(eventName, handler);
        return new MapsEventListener(instance, eventName, handler, MapsEventListener.MAP_EVENT);
    };

    this.trigger = function (instance, eventName)
    {
        var listeners = instance._e_ || {};
        for (var i in listeners)
        {
            if (listeners[i]._eventName == eventName)
            {
                var args = Array.prototype.slice.call(arguments, 2);
                listeners[i]._handler.apply(instance, args);
            }
        }
    };

    function MapsEventListener(instance, eventName, handler, eventType)
    {
        this._instance = instance;
        this._eventName = eventName;
        this._handler = handler;
        this._eventType = eventType;
        this._guid = MapsEventListener._guid++;
        this._instance._e_ = this._instance._e_ || {};
        this._instance._e_[this._guid] = this;
    }

}