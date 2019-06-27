using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Diagnostics;
public partial class App_cSharpDebugUsage_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        #if debug
                Debug.Assert(1 == 2);
        #endif
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        Debug.Assert(1 == 2, "1==2不成立");
    }
    protected void Button3_Click(object sender, EventArgs e)
    {
        Debug.Assert(1 == 2, "1==2不成立", "1==2真的不成立");
    }
    protected void Button4_Click(object sender, EventArgs e)
    {
        
        Debug.Assert(1 == 2, "1==2不成立", "1==2真的不成立{0},{1},{2}","123","456","789");
        Debug.Write("aa");
        Debug.WriteLine("{0}-{1}", "su", "cc");
    }
}