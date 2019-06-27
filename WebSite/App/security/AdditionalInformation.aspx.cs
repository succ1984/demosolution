using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using System.Security.Permissions;
using System.Security.Principal;
public partial class App_security_AdditionalInformation : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string szDiscountInfo = "your roles are {0}";
        HttpCookie authenticationCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
        FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authenticationCookie.Value);

        if (Request.IsAuthenticated)
        {
            string szDiscount = ((FormsIdentity)HttpContext.Current.User.Identity).Ticket.UserData;
            szDiscountInfo = string.Format(szDiscountInfo, szDiscount);
        }
        else
        {
            szDiscountInfo = string.Format(szDiscountInfo, 0);
            szDiscountInfo += " you are not logged in.";
        }
        labDiscount.Text = szDiscountInfo;

        PrincipalPermission pp = new PrincipalPermission(ticket.Name, "");
    }
}
