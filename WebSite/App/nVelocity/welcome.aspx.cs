using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using CSFramework;
public partial class App_nVelocity_welcome : System.Web.UI.Page
{

    private NVelocityHelper nVelocity = new NVelocityHelper("/app/nVelocity/template");
    protected void Page_Load(object sender, EventArgs e)
    {
       
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        nVelocity.Add("PageTitle", "TestTitle");
        nVelocity.Add("Content", "TestContent");
        nVelocity.Add("Foot","TestFoot");
        string szText = nVelocity.GetStringFromVm("template.html");
        divContent.InnerHtml=szText;
    }
}