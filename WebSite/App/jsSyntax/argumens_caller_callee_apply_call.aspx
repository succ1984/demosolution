<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="argumens_caller_callee_apply_call.aspx.cs" Inherits="App_jsSyntax_argumens_caller_callee_apply_call" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<script src="../../js/common.js" type="text/javascript"></script>
<script src="../../js/traceTool.js" type="text/javascript"></script>

<script type="text/javascript">

    trace.enabled = true;

    function fnArguments(n1, n2, n3) {
        var nArgumentLength = arguments.length;
        var nFnLength = fnArguments.length;
        trace.write("ArgumentLength: " + nArgumentLength);
        trace.warn("fnLength: " + nFnLength);
        if (nArgumentLength > 0) {
            trace.write(arguments[0]);
        }
    }
    /*
     *  arguments不是数组(Array类)
    */
    Array.prototype.selfvalue = 1;
    function testAguments(){
        //alert("arguments.selfvalue="+arguments.selfvalue);
    }

    function callerDemo() {
        if (callerDemo.caller) {
           var a= callerDemo.caller.toString();
           // alert(a);
        } else {
            //alert("this is a top function");            
        }
    }
    function handleCaller() {
        callerDemo();
    }

    /*
    * 演示函数的callee属性.
    * 说明:arguments.callee:初始值就是正被执行的 Function 对象,用于匿名函数
    */
    function calleeDemo() {
        //alert(arguments.callee);
    }

    /*
    *将callee用于递归计算
    **/
    var sum = function (n) {
        if (n <= 1) {
            return 1;
        }
        else {
            return n * arguments.callee(n - 1);
        }
    }
    /*
    *斐波那契数列，又称黄金分割数列，指的是这样一个数列：0、1、1、2、3、5、8、13、21、……在数学上，斐波纳契数列以如下被以递归的方法定义：F0=0，F1=1，Fn=F(n-1)+F(n-2)（n>=2，n∈N*）在现代物理、准晶体结构、化学等领域，斐波纳契数列都有直接的应用，为此，美国数学会从1960年代起出版了《斐波纳契数列》季刊，专门刊载这方面的研究成果。
    */
    function fibonacci(num) {
        if (num <= 2) {
            return 1;
        } else {
            return arguments.callee(num - 1) + arguments.callee(num - 2)
        }
    }



    function Base() {
        this.name = "acheng";
        this.showName = function () {
            alert(this.name);
        }
    }
    
    function Extend() {
        Base.apply(this, arguments);//用apply或call的方法可以实现js中类的继承
        this.age = 29;
    }
    //Extend.prototype = new Base();




    jsUtil.domReady(function () {
        fnArguments();
        fnArguments(1, 2, 3);
        fnArguments(1, 2, 3, 4, 5);

        testAguments();

        callerDemo();
        handleCaller();

        calleeDemo();
        //alert(sum(4));


        //实例化一个base
        var oBase = new Base();
        oBase.showName();

        var oExtend = new Extend();
        oExtend.showName();

        alert(oExtend.age);

        trace.warn("fibonacci(50): " + fibonacci(10));

    });
   

</script>




</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

