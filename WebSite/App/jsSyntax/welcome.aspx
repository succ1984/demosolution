<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_jsSyntax_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<style type="text/css">
    .section{
        border:0px solid #000000;
        overflow:hidden;
        font-size:12px;
    }
    .section h2{
        font-size:14px; font-weight:bold;
        margin-top:10px;
    }
    .section p{
        margin-top:10px;
    }
    .section .code{
        background: none repeat scroll 0 0 #F5F5F5;
        border: 1px dotted #778855;
        font-family: "Courier New",monospace;
        font-size: 12px;
        margin: 10px 0 0px;
        padding: 10px;
        width: 580px;
    }
    .section .buttons{
        margin-top:10px;
    }
   
</style>

<div class="section">
    <h2>
        RegExpObject.exec(string)
    </h2>
    <p>
        exec() 方法的功能非常强大，它是一个通用的方法，而且使用起来也比 test() 方法以及支持正则表达式的 String 对象的方法更为复杂。

如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。除了数组元素和 length 属性之外，exec() 方法还返回两个属性。index 属性声明的是匹配文本的第一个字符的位置。input 属性则存放的是被检索的字符串 string。我们可以看得出，在调用非全局的 RegExp 对象的 exec() 方法时，返回的数组与调用方法 String.match() 返回的数组是相同的。

但是，当 RegExpObject 是一个全局正则表达式时，exec() 的行为就稍微复杂一些。它会在 RegExpObject 的 lastIndex 属性指定的字符处开始检索字符串 string。当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把 RegExpObject 的 lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。这就是说，您可以通过反复调用 exec() 方法来遍历字符串中的所有匹配文本。当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。
    </p>
    <pre class="code">
         function testRegExec() {            
            var szTest = "abcW2345defg2w234#w#w";
            var reg = /(w)/igm;
            var result;
            while ((result = reg.exec(szTest)) != null) {
                trace.write(result.join("<br/>"));                
                trace.write("<br/>"+reg.lastIndex+"<br/>");
            }        
        }
        window.onload = function () {           
            trace.show();
            document.getElementById("btnExec").onclick=testRegExec;
        }
    </pre>
    <div class="buttons">
        <input id="btnExec" type="button" class="btnCommon" value="调用"/>
    </div>
</div>




<script src="../../js/traceTool.js" type="text/javascript"></script>
<script type="text/javascript">
//    function testRegExec() {
//        trace.clear();
//        trace.show();              
//        var szTest = "abcW2345defg2w234#w#w";
//        var reg = /(w)/igm;
//        var result;
//        while((result = reg.exec(szTest)) != null) {
//            trace.write(result.join("<br/>"));
//            trace.write("<br/>"+reg.lastIndex+"<br/>");
//        }        
//    }
//    window.onload = function () { 
//        document.getElementById("btnExec").onclick=testRegExec;
    //    }

//    var a = new function () { return "succ" };
//    alert(a);

    var a = new function () { return { name: "succ", age: 29 }; };
    alert(a.name);

</script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="placeHolderInlineJS" Runat="Server">
</asp:Content>

