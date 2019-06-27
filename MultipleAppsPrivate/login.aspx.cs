using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Web.Security;

public partial class login : System.Web.UI.Page
{
      protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnLogin_Click(object sender, EventArgs e)
    {
        string szUserName = txtUserName.Text.Trim();
        string szPassword = txtPassword.Text.Trim();
        bool bIsValid = false;

        //IcredentialsStore credentialStore = new DefaultCredentialStore();
       // IcredentialsStore credentialStore = new XmlCredentialStore(Server.MapPath("/xml/UserCredentials.xml"));
        bIsValid = FormsAuthentication.Authenticate(szUserName, szPassword);
        if (bIsValid)
        {
            labMsg.Text = "Successful";
            //FormsAuthentication.RedirectFromLoginPage(szUserName,true);
            //create a new authentication cookie
            HttpCookie authenticationCookie = FormsAuthentication.GetAuthCookie(szUserName, true);
            //set the expire date of the authentication cookie
            authenticationCookie.Expires = DateTime.Now.AddDays(1);
            bool isSliding=FormsAuthentication.SlidingExpiration;
            //add the cookie to the HTTP response
            Response.Cookies.Add(authenticationCookie);
            //redirect the user back their original request url
            Response.Redirect(FormsAuthentication.GetRedirectUrl(szUserName, true));
        }
        else
        {
            labMsg.Text = "Please enter the valid username/password";
        }
    }
}
