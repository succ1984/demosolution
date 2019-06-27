using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
public partial class secure_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnGenerate_Click(object sender, EventArgs e)
    {
        string szPassword = txtPassword.Text.Trim();
        string szPwdType = drpType.SelectedValue;
        string szNewPwd=FormsAuthentication.HashPasswordForStoringInConfigFile(szPassword, szPwdType);
        labNewPassword.Text = szNewPwd;
    }
}
