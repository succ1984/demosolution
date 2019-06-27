<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DragMarker.aspx.cs" Inherits="App_Maps_DragMarker" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style type="text/css">
        * {
            margin: 0px;padding: 0px;
        }
        #bMap {
            width:600px; height:400px;
        }
    </style>
    <script src="../../js/jquery-1.7.2.min.js" type="text/javascript"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=1LpRbbj5r3w8lbMZiYatzD26"></script>
</head>
<body>
    <div class>
        
    </div>
    <div id="bMap">
        
    </div>
    
    <script type="text/javascript">
        var map = new BMap.Map("bMap");
        //右上角，仅包含平移和缩放按钮。
        map.addControl(new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_SMALL }));
        var point = new BMap.Point(116.400244, 39.92556);
        map.centerAndZoom(point, 12);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        marker.enableDragging();    //可拖拽
        map.enableScrollWheelZoom(); //可以鼠标滚动 缩放比例尺

        marker.addEventListener("dragend", function (e) {
            var p = marker.getPosition(); //获取marker的位置
            alert("marker的位置是" + p.lng + "," + p.lat);
        });

    </script>

</body>
</html>
