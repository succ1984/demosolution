﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class toSqlString : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void btnConvert_Click(object sender, EventArgs e)
    {
        

        string szText = txtString.Text
                                 .Replace("'", "''");

        txtResult.Text = szText;
    }
}