using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;
public partial class App_webRequest_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        WebClient myWebClient = new WebClient();
        myWebClient.DownloadFile("http://images.europe.creative.com/images/products/450x350/pdt_16994.png", "d:\\1.jpg");
    }
}
