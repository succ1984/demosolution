<%@ Page Language="C#" AutoEventWireup="true" CodeFile="frameset.aspx.cs" Inherits="App_HtmlDom_frameset" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<%--<frameset id="main" cols="30%,70%">
    <frame id="frameLeft" name="left" src="frame1.aspx"></frame>
    <frame id="frameRight" name="right" src="frame2.aspx"></frame>
</frameset>
--%>

<frameset rows="10%,*" id="parent">

   <frame id="child1" src="frame1.aspx">****</frame>

   <frameset id="child2">

      <frame id="child3" src="frame2.aspx"></frame>

      <frame id="child4"></frame>

   </frameset>

</frameset>

<%--其中child1和child2是parent的子框架。

 

获得frame(包括嵌套的)对象：

在child1中获得child3--->parent.chlid3（不能用parent.child2.child3!）

在chlid3中获得child1--->parent.child1--%>

</html>