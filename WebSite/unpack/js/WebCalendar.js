var nForceX=0;
var nForceY=0;

String.prototype.toDate = function(x, p) {
  if(x == null) x = "/";
  if(this.indexOf("-")>0) x="-";
  
  if(p == null) p = "mdy";
  var a = this.split(x);
  var y = parseInt(a[p.indexOf("y")],10);
  if(isNaN(y)) y = new Date().getFullYear();
  var m = parseInt(a[p.indexOf("m")],10)-1;
  var d = parseInt(a[p.indexOf("d")],10);
  if(isNaN(d)) d = 1;
  return new Date(y, m, d);
}

Date.prototype.format = function(style) {
  var o = {
    "M+" : this.getMonth() + 1, //month
    "d+" : this.getDate(),      //day
    "h+" : this.getHours(),     //hour
    "m+" : this.getMinutes(),   //minute
    "s+" : this.getSeconds(),   //second
    "q+" : Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S"  : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(style)) {
    style = style.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for(var k in o){
    if(new RegExp("("+ k +")").test(style)){
      style = style.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return style;
};

function Calendar(beginYear, endYear,  dateFormatStyle) {
  this.beginYear = 2007;
  this.endYear = 2015;
  this.dateFormatStyle = "MM/dd/yyyy";

  if (beginYear != null && endYear != null){
    this.beginYear = beginYear;
    this.endYear = endYear;
  }

  if (dateFormatStyle != null){
    this.dateFormatStyle = dateFormatStyle
  }

  this.dateControl = null;
  this.panel = this.$("calendarPanel");
  this.form  = null;

  this.date = new Date();
  this.selectedDate=new Date();
  this.year = this.date.getFullYear();
  this.month = this.date.getMonth();


  this.colors = {
  "cur_word"      : "#000000",  
  "cur_bg"        : "#AAAAFF",  
  "sun_word"      : "#FF0000",  
  "sat_word"      : "#FF0000",  
  "td_word_light" : "#333333",  
  "td_word_dark"  : "#CCCCCC",  
  "td_bg_out"     : "#EFEFEF",  
  "td_bg_over"    : "#BBBBBB",  
  "tr_word"       : "#FFFFFF",  
  "tr_bg"         : "#666666",  
  "input_border"  : "#336699",  
  "input_bg"      : "#EFEFEF"   
  }

  this.draw();
  this.bindYear();
  this.bindMonth();
  this.changeSelect();
  this.bindData();
}

Calendar.language = {
  "year"   : "",
  "months" : ['January','February','March','April','May','June','July','August','September','October','November','December'],
  "weeks"  : ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  "clear"  : "CLS",
  "today"  : "TODAY",
  "close"  : "CLOSE"
}

Calendar.prototype.draw = function() {
  calendar = this;

  var mvAry = [];
  mvAry[mvAry.length]  = '    <table width="100%" border="0" cellpadding="0" cellspacing="1" class="CalendarTable">';
  mvAry[mvAry.length]  = '      <tr>';
  mvAry[mvAry.length]  = '        <th nowrap><input style="border: 1px solid ' + calendar.colors["input_border"] + ';background-color:' + calendar.colors["input_bg"] + ';width:16px;height:20px;" name="prevMonth" type="button" id="prevMonth" value="&lt;" />';
  mvAry[mvAry.length]  = '        <select name="calendarYear" id="calendarYear" style="font-size:11px;"></select><select name="calendarMonth" id="calendarMonth" style="font-size:11px;"></select> <input style="border: 1px solid ' + calendar.colors["input_border"] + ';background-color:' + calendar.colors["input_bg"] + ';width:16px;height:20px;" name="nextMonth" type="button" id="nextMonth" value="&gt;" /></th>';
  mvAry[mvAry.length]  = '        <th align="right"><input name="calendarClose" type="button" id="calendarClose" value="r" style="FONT-Family: Webdings; border: 0px ;background-color: white ;width:15px;height:20px;font-size:12px;line-height:18px; color:red; "/></th>';
  mvAry[mvAry.length]  = '      </tr>';
  mvAry[mvAry.length]  = '    </table>';
  mvAry[mvAry.length]  = '    <table id="calendarTable" width="100%" style="border:0px solid #CCCCCC;background-color:#FFFFFF" border="0" cellpadding="3" cellspacing="1">';
  mvAry[mvAry.length]  = '      <tr>';
  for(var i = 0; i < 7; i++) {
    mvAry[mvAry.length]  = '      <th style="font-weight:normal;background-color:' + calendar.colors["tr_bg"] + ';color:' + calendar.colors["tr_word"] + ';"><b>' + Calendar.language["weeks"][i] + '</b></th>';
  }
  mvAry[mvAry.length]  = '      </tr>';
  for(var i = 0; i < 6;i++){
    mvAry[mvAry.length]  = '    <tr align="center">';
    for(var j = 0; j < 7; j++) {
      if (j == 0){
        mvAry[mvAry.length]  = '  <td style="cursor:default;color:' + calendar.colors["sun_word"] + ';"></td>';
      } else if(j == 6) {
        mvAry[mvAry.length]  = '  <td style="cursor:default;color:' + calendar.colors["sat_word"] + ';"></td>';
      } else {
        mvAry[mvAry.length]  = '  <td style="cursor:default;"></td>';
      }
    }
    mvAry[mvAry.length]  = '    </tr>';
  }
  mvAry[mvAry.length]  = '    </table>';
  this.panel.innerHTML = mvAry.join("");

  this.$("prevMonth").onclick = function () {calendar.goPrevMonth(this);}
  this.$("nextMonth").onclick = function () {calendar.goNextMonth(this);}

  this.$("calendarClose").onclick = function () {calendar.hide();}
  this.$("calendarYear").onchange = function () {calendar.update(this);}
  this.$("calendarMonth").onchange = function () {calendar.update(this);}
}

Calendar.prototype.bindYear = function() {
  var cy = this.$("calendarYear");
  cy.length = 0;
  for (var i = this.beginYear; i <= this.endYear; i++){
    cy.options[cy.length] = new Option(i + Calendar.language["year"], i);
  }
}

Calendar.prototype.bindMonth = function() {
  var cm = this.$("calendarMonth");
  cm.length = 0;
  for (var i = 0; i < 12; i++){
    cm.options[cm.length] = new Option(Calendar.language["months"][i], i);
  }
}

Calendar.prototype.goPrevMonth = function(e){
  if (this.year == this.beginYear && this.month == 0){return;}
  this.month--;
  if (this.month == -1) {
    this.year--;
    this.month = 11;
  }
  this.date = new Date(this.year, this.month, 1);
  this.changeSelect();
  this.bindData();
  e.blur();
}

Calendar.prototype.goNextMonth = function(e){
  if (this.year == this.endYear && this.month == 11){return;}
  this.month++;
  if (this.month == 12) {
    this.year++;
    this.month = 0;
  }
  this.date = new Date(this.year, this.month, 1);
  this.changeSelect();
  this.bindData();
  e.blur();
}

Calendar.prototype.changeSelect = function() {
  var cy = this.$("calendarYear");
  var cm = this.$("calendarMonth");
  for (var i= 0; i < cy.length; i++){
    if (cy.options[i].value == this.date.getFullYear()){
      cy[i].selected = true;
      break;
    }
  }
  for (var i= 0; i < cm.length; i++){
    if (cm.options[i].value == this.date.getMonth()){
      cm[i].selected = true;
      break;
    }
  }
}

Calendar.prototype.update = function (e){
  this.year  = parseInt(this.$("calendarYear").options[this.$("calendarYear").selectedIndex].value);
  this.month = parseInt(this.$("calendarMonth").options[this.$("calendarMonth").selectedIndex].value);
  this.date = new Date(this.year, this.month, 1);
  this.bindData();
}

Calendar.prototype.bindData = function () {
  var calendar = this;
  var dateArray = this.getMonthViewArray(this.year, this.month);
  var tds = this.$("calendarTable").getElementsByTagName("td");
  for(var i = 0; i < tds.length; i++) {
  tds[i].style.backgroundColor = calendar.colors["td_bg_out"];
    tds[i].onclick = function () {return;}
    tds[i].onmouseover = function () {return;}
    tds[i].onmouseout = function () {return;}
    if (i > dateArray.length - 1) break;
    tds[i].innerHTML = dateArray[i];
    if (dateArray[i] != "&nbsp;"){
      tds[i].onclick = function () {
        if(this.cellIndex==0 || this.cellIndex==6)
        {
            alert("You can only select a working day");
            return;
        }
        if (calendar.dateControl != null){
          calendar.dateControl.value = new Date(calendar.year,
                                                calendar.month,
                                                this.innerHTML).format(calendar.dateFormatStyle);
        }
        calendar.hide();
      }
      tds[i].onmouseover = function () {
        this.style.backgroundColor = calendar.colors["td_bg_over"];
      }
      tds[i].onmouseout = function () {
        this.style.backgroundColor = calendar.colors["td_bg_out"];
      }
      if (calendar.selectedDate.format(calendar.dateFormatStyle) == new Date(calendar.year, calendar.month, dateArray[i]).format(calendar.dateFormatStyle))
      {
          tds[i].style.backgroundColor = calendar.colors["cur_bg"];
          tds[i].style.color = calendar.colors["cur_word"];
          tds[i].onmouseover = function () {this.style.backgroundColor = calendar.colors["td_bg_over"];}
          tds[i].onmouseout = function () {this.style.backgroundColor = calendar.colors["cur_bg"]; }
      }
    }
  }
}

Calendar.prototype.getMonthViewArray = function (y, m) {
  var mvArray = [];
  var dayOfFirstDay = new Date(y, m, 1).getDay();
  var daysOfMonth = new Date(y, m + 1, 0).getDate();
  for (var i = 0; i < 42; i++) {
    mvArray[i] = "&nbsp;";
  }
  for (var i = 0; i < daysOfMonth; i++){
    mvArray[i + dayOfFirstDay] = i + 1;
  }
  return mvArray;
}

Calendar.prototype.$ = function(id){
  if (typeof(id) != "string" || id == "") return null;
  if (document.getElementById) return document.getElementById(id);
  if (document.all) return document.all(id);
  try {return eval(id);} catch(e){ return null;}
}

Calendar.prototype.getElementsByTagName = function(object, tagName){
  if (document.getElementsByTagName) return document.getElementsByTagName(tagName);
  if (document.all) return document.all.tags(tagName);
}

Calendar.prototype.getAbsPoint = function (e){
  var x = e.offsetLeft;
  var y = e.offsetTop;
  while(e = e.offsetParent){
    x += e.offsetLeft;
    y += e.offsetTop;
  }
  return {"x": x, "y": y};
}

Calendar.prototype.show = function (dateControl, bShowClose) {
  if (dateControl == null){
    throw new Error("arguments[0] is necessary")
  }
  this.dateControl = dateControl;
  if (dateControl.value.length > 0){
    this.date = new Date(dateControl.value.toDate());
    this.selectedDate=this.date;
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.changeSelect();
    this.bindData();
  }
  if (bShowClose == 0){
    this.$("calendarClose").style.display="none";
  }
  var xy = this.getAbsPoint(dateControl);
  this.panel.style.left = xy.x + "px";
  this.panel.style.top = (xy.y + dateControl.offsetHeight) + "px";
  if(nForceX) this.panel.style.left = nForceX+ "px";
  if(nForceY) this.panel.style.top  = nForceY+ "px";
  this.panel.style.display = "block";
  
  try
  {
	  $("calendarFrame").style.height=this.panel.offsetHeight + "px";
	  $("calendarFrame").style.left = xy.x + "px";
	  $("calendarFrame").style.top = (xy.y + dateControl.offsetHeight) + "px";
	  if(nForceX) $("calendarFrame").style.left = nForceX+ "px";
	  if(nForceY) $("calendarFrame").style.top  = nForceY+ "px";
	  $("calendarFrame").style.display="block";
  }
  catch(e){}
}

Calendar.prototype.hide = function() {
  this.panel.style.display = "none";
  try
  {$("calendarFrame").style.display="none";}
  catch(e){}
}

document.write('<div id="calendarPanel" style="position: absolute;display: none;z-index: 9999;background-color: #FFFFFF;border: 1px solid #AAAAAA;width:216px;font-size:11px;"></div>');
document.write('<iframe id="calendarFrame" style="position: absolute;display: none;z-index: 9998;background-color: #FFFFFF;width:216px;"></iframe>');
