using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class FormatString : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnConvert_Click(object sender, EventArgs e)
    {
        string szResult = string.Empty;
   
        string szText = txtString.Text
                                 .Replace("\"", "\\\"")
                                 .Replace(Environment.NewLine,"");
       


        txtResult.Text = szText;
    }
}