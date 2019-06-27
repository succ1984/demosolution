using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DragonSource.Utils;
public partial class App_validateImage_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnSave_Click(object sender, EventArgs e)
    {
        string szCodeDefault = ConvertHelper.GetRequestString("txtValidateCode");
        labDefault.Text = ValidatecodeTool.ValidateInputcode(szCodeDefault).ToString();

        string szCodeA = ConvertHelper.GetRequestString("txtValidateCodeA");
        labA.Text = ValidatecodeTool.ValidateInputcode("A", szCodeA, true).ToString();

        string szCodeB = ConvertHelper.GetRequestString("txtValidateCodeB");
        labB.Text = ValidatecodeTool.ValidateInputcode("B", szCodeB, true).ToString();
    }
}