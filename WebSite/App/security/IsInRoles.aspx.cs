using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
using System.Text.RegularExpressions;
public partial class App_security_IsInRoles : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string szMsg = string.Empty;
        string szRoles = string.Empty;
       
        if (Context.User.IsInRole("administrator"))
        {
            szMsg = "You are a member of adminintrator";
        }
        else
        {
            Regex regRoles = new Regex("<roles>(.*)</roles>");
            string szUserData = ((FormsIdentity)Context.User.Identity).Ticket.UserData;
            GroupCollection group = regRoles.Match(szUserData).Groups;
            szRoles = group[1].Value;
            string[] szArrRoles = szRoles.Split(new string[] { ";" }, StringSplitOptions.RemoveEmptyEntries);
            szRoles = string.Empty;
            foreach (string szRole in szArrRoles)
            {
                szRoles += szRole;
                szRoles += ";";
            }
            if(!string.IsNullOrEmpty(szRoles))
            {
                szMsg="Your roles are "+szRoles;
            }
            else
            {
                szMsg="You don't have any roles";
            }
        }       
        labMsg.Text = szMsg;
    }
}
