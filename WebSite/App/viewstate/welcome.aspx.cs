using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Text;
public partial class App_viewstate_welcome:System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        
       
    }
    protected void btnPostBack_Click(object sender, EventArgs e)
    {
        string szViewStateContent = Request["__VIEWSTATE_KEY"];

        //no decode viewstate
        Response.Write(szViewStateContent+"<br/>");
        //decoded viewstate
        szViewStateContent = Encoding.Default.GetString(Convert.FromBase64String(szViewStateContent));
        Response.Write(szViewStateContent + "<br/>");
    }
}
