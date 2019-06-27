<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <title>模仿京东商城菜单</title>
    <style type="text/css" media="screen">
        li,ul
        {
            margin:0px; padding:0px;
        }
            
        a
        {
            text-decoration:none;
        }
       .shopMenu 
       {
           float:left;
           width:220px;
           position:relative;
       }
       .shopMenu .menu
       {
           list-style-type:none;
           position:relative;
           z-index:6;
           overflow:hidden;
       }
       .menuItem
       {
           font-size:12px;                     
           float:none;
           border-bottom:solid 0px #FFFFFF;
           border-top:solid 0px #FFFFFF;
           border-left:solid 1px #FFFFFF;
           padding-left:8px;           
           height:31px; line-height:31px;
           overflow:hidden;
           position:relative;
           z-index:10;
       }
       .menuCurrent
       {
           border-color:#FF4444;          
           border-width:1px medium 1px 1px;
           border-style:solid none solid solid;     
           padding-left:8px; 
           height:29px; line-height:29px;
           overflow:hidden;           
           background:#FFFFFF;
       }
       .menu li a
       {
            font-weight:700; color:#333333;           
       }
  
       .menucontent
       {
           border:solid 1px #FF4444;          
           display:none;     
           position:absolute; left:219px;top:0px;  
           width:500px;
           z-index:5;
           
       }
       .menucontent .item
       {
            display:none;      
            padding:10px;      
       }
  
    </style>




    <script src="../../js/jquery-1.6.2.js" type="text/javascript"></script>
    <script type="text/javascript" language="javascript">
        jQuery(function($) {
            $(".menuItem").each(function() {
                var cMenuContent = $(".menucontent");
                var _this = $(this);
                var nMenuIndex = _this.index();
                _this.hover(function() {
                    _this.removeClass("menuCurrent").addClass("menuCurrent");
                    if (nMenuIndex == 6 || nMenuIndex == 7) {
                        cMenuContent.css("top", "180px");
                    }
                    else {
                        cMenuContent.css("top", "0px");
                    }
                    cMenuContent.show();
                    $(cMenuContent.find(".item").get(nMenuIndex)).show();
                    _this.show();

                }, function() {
                    _this.removeClass("menuCurrent");
                    cMenuContent.hide();
                    $(cMenuContent.find(".item")).hide();
                });
            });
        });
    
    </script>
  
</head>
<body id="page">
 	
 	
 	<div class="shopMenu"> 	    
 	  
 	      <div class="menuItem">
 	        <a href="javascript:;">服装服饰</a> 	        
 	      </div>  
 	     <div class="menuItem">
 	        <a href="javascript:;">鞋帽箱包</a>
 	      </div> 
 	     <div class="menuItem">
 	        <a href="javascript:;">数码家电</a>
 	      </div> 
 	     <div class="menuItem">
 	        <a href="javascript:;">珠宝配饰</a>
 	      </div> 
 	     <div class="menuItem">
 	        <a href="javascript:;">美容化妆</a>
 	      </div> 
 	     <div class="menuItem">
 	        <a href="javascript:;">运动户外</a>
 	      </div> 
 	     <div class="menuItem">
 	        <a href="javascript:;">母婴用品</a>
 	      </div> 
 	     <div class="menuItem">
 	        <a href="javascript:;">生活家居</a>
 	      </div> 
 	    
 	   <div class="menucontent">
 	        <div class="item">
 	            服装服饰<br />
 	            服装服饰<br />
 	            服装服饰<br />
 	            服装服饰<br />
 	            服装服饰<br />
 	            服装服饰<br />
 	            服装服饰<br />
 	            服装服饰<br />
 	            服装服饰<br />
 	            服装服饰<br />
 	            服装服饰<br />
 	        </div>
 	        <div class="item">
 	            鞋帽箱包<br />
 	             鞋帽箱包<br />
 	              鞋帽箱包<br />
 	               鞋帽箱包<br />
 	                鞋帽箱包<br />
 	                鞋帽箱包<br />
 	                鞋帽箱包<br />
 	                鞋帽箱包<br />
 	        </div>
 	        <div class="item">
 	            数码家电<br />
 	            数码家电<br />
 	            数码家电<br />
 	            数码家电<br />
 	            数码家电<br />
 	            数码家电<br />
 	            数码家电<br />
 	            数码家电<br />
 	            数码家电<br />
 	            数码家电<br />
 	            数码家电<br />
 	        </div>
 	        <div class="item">
 	            珠宝配饰<br />
 	              珠宝配饰<br />
 	                珠宝配饰<br />
 	                  珠宝配饰<br />
 	                    珠宝配饰<br />
 	                      珠宝配饰<br />
 	                        珠宝配饰<br />
 	                          珠宝配饰<br />
 	                  珠宝配饰<br />
 	        </div>
 	        <div class="item">
 	            美容化妆<br />
 	             美容化妆<br />
 	              美容化妆<br />
 	               美容化妆<br />
 	                美容化妆<br />
 	                 美容化妆<br />
 	                  美容化妆<br />
 	                   美容化妆<br />
 	                    美容化妆<br />
 	                    美容化妆<br />
 	                    美容化妆<br />
 	                    美容化妆<br />
 	        </div>
 	        <div class="item">
 	            运动户外<br />
 	            运动户外<br />
 	            运动户外<br />
 	            运动户外<br />
 	            运动户外<br />
 	            运动户外<br />
 	            运动户外<br />
 	            运动户外<br />
 	            运动户外<br />
 	            运动户外<br />
 	            运动户外<br />
 	        </div>
 	        <div class="item">
 	            母婴用品<br />
 	            母婴用品<br />
 	            母婴用品<br />
 	            母婴用品<br />
 	            母婴用品<br />
 	        </div>
 	        <div class="item">
 	            生活家居<br />
 	            生活家居<br />
 	            生活家居<br />
 	            生活家居<br />
 	            生活家居<br />
 	            生活家居<br />
 	            生活家居<br />
 	            生活家居<br />
 	        </div>
 	        
 	   </div>
 	   
 	</div>
 	
 	
 	
</body>
</html>