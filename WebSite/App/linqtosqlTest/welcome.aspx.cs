using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CSFramework;
using CSFramework.DataAccess;
using System.IO;
using System.Text;
public partial class App_linqtosqlTest_welcome : System.Web.UI.Page
{

    dbNewsDataContext dbNews = new dbNewsDataContext();
    protected void Page_Load(object sender, EventArgs e)
    {        
        if (!Page.IsPostBack)
        {            
            dbNews.InitializeDataBase();           
        }
    }
    private void BindData()
    {
        
    }
}