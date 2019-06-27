using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


public partial class App_CheckUrlIfExsit_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string szUrl = "http://www.baidu.com";
        bool blExist=CSFramework.Utility.UrlExistsUsingHttpWebRequest(szUrl);
    }
}
