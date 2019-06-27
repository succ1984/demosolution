using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ConvertStringToHtml : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnConvert_Click(object sender, EventArgs e)
    {
        string szResult = string.Empty;
        string szLineFormat = "\"{0}\"+";
        string szLastLineFormat = "\"{0}\"";
        string szText = txtString.Text.Replace("\"", "\\\"");
        var arrString = szText.Split(new string[] { "\r\n" }, StringSplitOptions.None);
        for (int i = 0; i < arrString.Length; i++)
        {
            if (i == arrString.Length - 1)
            {
                szResult += string.Format(szLastLineFormat, arrString[i].Trim());
            }
            else
            {
                szResult += string.Format(szLineFormat, arrString[i].Trim());
            }
        }
        txtResult.Text = szResult;
    }
}