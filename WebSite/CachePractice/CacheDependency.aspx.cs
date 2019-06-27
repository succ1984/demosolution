using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Web.Caching;
using System.IO;
using System.Data;

public partial class CachePractice_CacheDependency : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            GetData();
        }
    }


    private void GetData()
    {
        DataTable tableData = new DataTable();
        if (Cache["data"] == null)
        {
            DataSet ds = new DataSet();
            string filePath = Server.MapPath("~/App_Data/XmlData.xml");
            ds.ReadXml(filePath);
            tableData = ds.Tables[0];
            CacheDependency cdy = new CacheDependency(filePath);
            Cache.Insert("data", tableData, cdy);
            if (cdy.HasChanged)
            {
                System.Diagnostics.Debug.WriteLine("Xml已变更");
            }
        }
        else
        {
            tableData = (DataTable)Cache["data"];
        }
        rpLiss.DataSource = tableData;
        rpLiss.DataBind();
    }
}