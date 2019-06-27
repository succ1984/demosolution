using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using DragonSource.Utils;
using CSFramework;
namespace ImageProtection
{
    public partial class App_ImageProctection_welcome : System.Web.UI.Page
    {
        protected string szImgUrl = "http://www.imagetest.com/nyxb201406-l.jpg";
        protected string szUnProtectedUrl = string.Empty;
        protected string szPortectedUrl = string.Empty;
        protected void Page_Load(object sender, EventArgs e)
        {

            string szInputUrl = ConvertHelper.GetRequestString("txtUrl");
            //处理首次访问
            if (!string.IsNullOrEmpty(szInputUrl))
            {
                szImgUrl = szInputUrl;
            }

            if (!string.IsNullOrEmpty(szImgUrl))
            {
                szUnProtectedUrl = szImgUrl;
                szPortectedUrl = CSFramework.ImageProtection.GetProtectedImageUrl(szImgUrl);
                divShow.Visible = true;
            }
            else
            {
                divShow.Visible = false;
            }

        }


       



    }
}
