using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class usercontrols_loginview : System.Web.UI.UserControl
{
    protected override void OnInit(EventArgs e)
    {
        string szAnonymous = "<a href=\"/login.aspx\">Login</a>";
        if (this.Page.User.Identity.IsAuthenticated)
        {
            string szUserName = Page.User.Identity.Name;
            ltlUserName.Text = szUserName;
            divAnonymous.Visible = false;
            divLogged.Visible = true;
        }
        else
        {
            ltlAnonymous.Text = szAnonymous;
            divAnonymous.Visible = true;
            divLogged.Visible = false;
        }

    }
    protected void Page_Load(object sender, EventArgs e)
    {

    }
}
