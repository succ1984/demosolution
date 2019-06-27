using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Web.Security;
using System.Security.Principal;
using System.Xml;
public partial class login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        GenericIdentity identity = new GenericIdentity("", "");
        GenericPrincipal principal=new GenericPrincipal(identity,new string[]{});
    }
    protected void btnLogin_Click(object sender, EventArgs e)
    {
        bool blIsPersistent = false;
        string szUserName = txtUserName.Text.Trim();
        string szPassword = txtPassword.Text.Trim();
        bool bIsValid = false;
        string szUserData = string.Empty ;
        //IcredentialsStore credentialStore = new DefaultCredentialStore();
        IcredentialsStore credentialStore = new XmlCredentialStore(Server.MapPath("/xml/UserCredentials.xml"));
        bIsValid = credentialStore.Authenticate(szUserName, szPassword);
        if (bIsValid)
        {
            labMsg.Text = "Successful";           
            string szRoles=string.Empty;
            List<string> listRoles = credentialStore.GetAllRolesByUserName(szUserName);
            foreach (string szRole in listRoles)
            {
                szRoles += szRole;
                szRoles += ";";
            }

            DateTime dtSavePasswords = DateTime.MinValue;
            if (drpPasswordSave.SelectedValue != "-1")
            {
                blIsPersistent = true;
                switch (drpPasswordSave.SelectedValue)
                {
                    case "5 mins":
                        dtSavePasswords = DateTime.Now.AddMinutes(5);
                        break;
                    case "1 hour":
                        dtSavePasswords = DateTime.Now.AddHours(1);
                        break;
                    case "1 day":
                        dtSavePasswords = DateTime.Now.AddDays(1);
                        break;
                    case "30 days":
                        dtSavePasswords = DateTime.Now.AddDays(30);
                        break;
                    case "1 year":
                        dtSavePasswords = DateTime.Now.AddYears(1);
                        break;
                    default:
                        break;
                }
            }
            else
            {
                blIsPersistent = false;
                dtSavePasswords = DateTime.Now.AddMinutes(30);
            }
            szUserData = string.Format("<roles>{0}</roles>",szRoles);
            string szUserHostAddress = Request.UserHostAddress;
            //add ip address to userData to prevent cookie from stealing,but it has its limits.
            szUserData += string.Format("<IP>{0}</IP>",szUserHostAddress);
            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(2,szUserName,DateTime.Now,dtSavePasswords,
                blIsPersistent,szUserData);
            string szEncryptedTicket = FormsAuthentication.Encrypt(ticket);
            HttpCookie cookieAuthentication = new HttpCookie(FormsAuthentication.FormsCookieName, szEncryptedTicket);
            cookieAuthentication.Domain=FormsAuthentication.CookieDomain;
            if (blIsPersistent)
            {
                cookieAuthentication.Expires = dtSavePasswords;
            }
            cookieAuthentication.Value = szEncryptedTicket;            
            HttpContext.Current.Response.Cookies.Add(cookieAuthentication);           
            string szUrl = FormsAuthentication.GetRedirectUrl(szUserName, blIsPersistent);
            Response.Redirect(szUrl, true);
            
        }
        else
        {
            labMsg.Text = "Please enter the valid username/password";
        }



        
       
    }
}
