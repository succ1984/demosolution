using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DragonSource.Utils;

public partial class App_ajax_test : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string szOpt = ConvertHelper.GetRequestString("opt");
        if (szOpt == "ajax")
        {
            string szReturn = "{\"name\":\"succ\"}";
            Response.ContentType = "application/json";
            Response.Write(szReturn);
            //Response.End();
        }
    }
}