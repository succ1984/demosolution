<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="typeof_instanceof_constructor.aspx.cs" Inherits="App_javascriptTest_typeof" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<pre>

    var szTest = "abc123";
    var nTest = 123;
    var bTest = true;
   
    var oTest = {};
    var dtTest = new Date();
    var arrTest = [];
    var fnTest = function () { ; };
    var oInstance = new fnTest();
    var regTest = /^\d+$/;
</pre>



</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
<style type="text/css">
    pre
    {
        margin-top:20px;
        border:1px dotted #000000;
        background-color:#CCCCCC;
        color:Green;
        padding:20px;
    }
</style>
  <script src="../../js/common.js" type="text/javascript"></script>
<script src="../../js/traceTool.js" type="text/javascript"></script>

<script type="text/javascript">

    var szTest = "abcd";
    var bTest = true;
    var nTest = 111;
    var oNull = null;
    var oUndefined = undefined;

    var arrTest = [];
    var dTest = new Date();
    var rTest = /abc/i;
    function fnTest() {
        alert("test");
    }
    var fnTest1 = function () {
        var dd;
    }


    jsUtil.domReady(function () {

        trace.enabled = true;

        trace.write("typeof szTest: " + jsUtil.fx.getTypeName(szTest));
        trace.warn("typeof bTest: " + jsUtil.fx.getTypeName(bTest));
        trace.write("typeof nTest: " + jsUtil.fx.getTypeName(nTest));
        trace.warn("typeof oNull: " + jsUtil.fx.getTypeName(oNull));
        trace.write("typeof oUndefined: " + jsUtil.fx.getTypeName(oUndefined));
        trace.warn("typeof arrTest: " + jsUtil.fx.getTypeName(arrTest));
        trace.write("typeof dTest: " + jsUtil.fx.getTypeName(dTest));
        trace.warn("typeof rTest: " + jsUtil.fx.getTypeName(rTest));
        trace.write("typeof fnTest: " + jsUtil.fx.getTypeName(fnTest));
        trace.warn("typeof fnTest1: " + jsUtil.fx.getTypeName(fnTest1));
        trace.write("typeof anonymous functions: " + jsUtil.fx.getTypeName(function () { alert("aa"); }));
    });

</script>

<script language="javascript" type="text/javascript">
    
    var szTest = "abc123";
    var nTest = 123;
    var bTest = true;
   
    var oTest = {};
    var dtTest = new Date();
    var arrTest = [];
    var fnTest = function () { ; };
    var oInstance = new fnTest();
    var regTest = /^\d+$/;

    var szTypeOfFormat="typeof <b>{0}</b> is: <strong style='color:red;'>{1}</strong><br/>";
    var szInstanceOfFormat1 = "<b>{0}</b> is an instance of <strong style='color:red;'>{1}</strong><br/>";
    var szTypeFormat = "<b>{0}</b>'s type name is: <strong style='color:red;'>{1}</strong><br/>";
    var szConstructorFormat = "<b>{0}</b>'s constructor is: <strong style='color:red;'>{1}</strong><br/>";
    document.writeln(szTypeOfFormat.replace("{0}", "szTest").replace("{1}", typeof szTest));
    document.writeln(szTypeOfFormat.replace("{0}", "nTest").replace("{1}", typeof nTest));
    document.writeln(szTypeOfFormat.replace("{0}", "bTest").replace("{1}", typeof bTest));
    document.writeln(szTypeOfFormat.replace("{0}", "uTest").replace("{1}", typeof uTest));
    document.writeln(szTypeOfFormat.replace("{0}", "oTest").replace("{1}", typeof oTest));
    document.writeln(szTypeOfFormat.replace("{0}", "dtTest").replace("{1}", typeof dtTest));
    document.writeln(szTypeOfFormat.replace("{0}", "arrTest").replace("{1}", typeof arrTest));
    document.writeln(szTypeOfFormat.replace("{0}", "fnTest").replace("{1}", typeof fnTest));
    document.writeln(szTypeOfFormat.replace("{0}", "regTest").replace("{1}", typeof regTest))
    document.writeln(szTypeOfFormat.replace("{0}", "oInstance").replace("{1}", typeof oInstance))
    document.writeln("<br/>");
    document.writeln("<br/>");

    if (fnTest instanceof Function) {
        document.writeln(szInstanceOfFormat1.replace("{0}", "fnTest").replace("{1}", "Function"));
    }
    if (oInstance instanceof fnTest) {
        document.writeln(szInstanceOfFormat1.replace("{0}", "oInstance").replace("{1}", "fnTest"));
    }
    if (dtTest instanceof Date) {
        document.writeln(szInstanceOfFormat1.replace("{0}", "dtTest").replace("{1}", "Date"));
    }
    if(arrTest instanceof Array){
        document.writeln(szInstanceOfFormat1.replace("{0}", "arrTest").replace("{1}", "Array"));
    }
    if (regTest instanceof RegExp) {
        document.writeln(szInstanceOfFormat1.replace("{0}", "regTest").replace("{1}", "RegExp"));
    }

    document.writeln("<br/>");
    document.writeln("<br/>");
    document.writeln(szTypeFormat.replace("{0}", "szTest").replace("{1}", jsUtil.fx.getTypeName(szTest)));
    document.writeln(szTypeFormat.replace("{0}", "nTest").replace("{1}", jsUtil.fx.getTypeName(nTest)));
    document.writeln(szTypeFormat.replace("{0}", "bTest").replace("{1}", jsUtil.fx.getTypeName(bTest)));
    document.writeln(szTypeFormat.replace("{0}", "null").replace("{1}", jsUtil.fx.getTypeName(null)));
    document.writeln(szTypeFormat.replace("{0}", "undefined").replace("{1}", jsUtil.fx.getTypeName(undefined)));
    document.writeln("<br/>");
    document.writeln(szTypeFormat.replace("{0}", "oTest").replace("{1}", jsUtil.fx.getTypeName(oTest)));
    document.writeln(szTypeFormat.replace("{0}", "dtTest").replace("{1}", jsUtil.fx.getTypeName(dtTest)));
    document.writeln(szTypeFormat.replace("{0}", "arrTest").replace("{1}", jsUtil.fx.getTypeName(arrTest)));
    document.writeln(szTypeFormat.replace("{0}", "fnTest").replace("{1}", jsUtil.fx.getTypeName(fnTest)));
    document.writeln(szTypeFormat.replace("{0}", "oInstance").replace("{1}", jsUtil.fx.getTypeName(oInstance)));
    document.writeln(szTypeFormat.replace("{0}", "regTest").replace("{1}", jsUtil.fx.getTypeName(regTest)));
    document.writeln(szTypeFormat.replace("{0}", "function () { var a = 1; b = 2; }").replace("{1}", jsUtil.fx.getTypeName(function () { var a = 1; b = 2; })));
    document.writeln("<br/>");
    document.writeln("<br/>");
   
</script>


</asp:Content>

