<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="setClearTimeOutInterval.aspx.cs" Inherits="App_jsSyntax_setClearTimeOutInterval" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <script src="../../js/common.js" type="text/javascript"></script>
    <script src="../../js/traceTool.js" type="text/javascript"></script>

    <script type="text/javascript">
        
//        setTimeout(function () {
//            //processing 
//            setTimeout(arguments.callee, interval);
//        }, interval); 


    </script>

    <script type="text/javascript">
        
        fibonacci = function (n) {
            var memo = { 0: 0, 1: 0 };         //计算结果缓存
            var shell = function (n) {
                var result = memo[n];
                if (typeof result != "number")｛    //如果值没有被计算则进行计算
                      memo[n] = shell(n - 1) + shell(n - 2);
                    ｝
                return memo[n];
            }
            return shell(n);
        }

        function employee(name, job, born) {
            this.name = name;
            this.job = job;
            this.born = born;
        }

        var bill = new employee("Bill Gates", "Engineer", 1985);

        document.write(bill.constructor);

        var szTest = "abcdefag";
        alert(szTest.constructor);
        alert(szTest.constructor.name);
        Array.prototype.getMaxCountChar = function () {

        }

        jsUtil.domReady(function () {
            trace.enabled = true;
            trace.write("fibonacci(50): " + fibonacci(50));
        });
        
    </script>




    <div id="divTest">
    
    </div>


</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

