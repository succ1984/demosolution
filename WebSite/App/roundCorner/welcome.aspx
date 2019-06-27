<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_roundCorner_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">

<style type="text/css">
.tab li,.tab li span
{
    background-image: url("../../images/icon2011111802.png");
    background-repeat: no-repeat;    
}
.tab li
{   
    background-color: #CCCCCC;
    background-position: right -59px;
    color: #CC3300;
    font-size: 14px;
    font-weight: bold;
    height: 24px;
    line-height: 24px;
    margin-right: 3px;
    overflow: hidden;
    padding: 3px 12px 0;
    position: relative;
}
.tab .curr {
    background-position: right -31px;
    color: #FFFFFF;
}
.tab li, .tab a, .tab-item {
    cursor: pointer;
    float: left;
    text-align: center;
}

.tab .curr span {
    background-position: 0 -31px;
}

.tab span {
    background-position: 0 -59px;
    height: 27px;
    left: 0;
    position: absolute;
    top: 0;
    width: 10px;
    z-index: 1;
}

</style>


<ul class="tab">
	<li clstag="shangpin|keycount|product|allzixun" class="">全部购买咨询<span></span></li>
	<li clstag="shangpin|keycount|product|shangpinzx" class="">商品咨询<span></span></li>
	<li clstag="shangpin|keycount|product|kupeizx" class="">库存配送<span></span></li>
	<li clstag="shangpin|keycount|product|zhifuzx" class="">支付<span></span></li>
	<li clstag="shangpin|keycount|product|fapiaozx" class="curr">发票保修<span></span></li>
	<li clstag="shangpin|keycount|product|zhifubz" class="">支付帮助<span></span></li>
	<li clstag="shangpin|keycount|product|peisongbz" class="">配送帮助<span></span></li>
	<li clstag="shangpin|keycount|product|fqa" class="">常见问题<span></span></li>
</ul>



</asp:Content>
