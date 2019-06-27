using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.IO;
using System.Data;
using System.Data.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.ObjectBuilder;

using System.Web.Script.Serialization;
using System.Xml;
public partial class test : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //string szPath = Server.MapPath("/temp/");
        //Database db = DatabaseFactory.CreateDatabase("AutoSiteV2");
        //string szSql = "SELECT WidgetStyleID,TemplateContent FROM PageWidgetStyle ORDER BY WidgetStyleID";                DbCommand comm = db.GetSqlStringCommand(szSql);
        //DataSet ds = db.ExecuteDataSet(comm);
        //for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        //{
        //    DataRow row = ds.Tables[0].Rows[i];
        //    string szFileName = row[0].ToString();
        //    string szContent = row[1].ToString();
        //    FileStream fs = new FileStream(szPath+szFileName + ".vm", FileMode.OpenOrCreate, FileAccess.ReadWrite);
        //    StreamWriter sw = new StreamWriter(fs, System.Text.Encoding.UTF8);
        //    sw.Write(szContent);
        //    sw.Flush();
        //}

//        string szSql = @"SELECT top(@num) cs.Cs_ID as newcbid,cs_Name as cb_name,count(1)  as num
//                            FROM BusinessOpportunity.[dbo].[OrderBusinessOpportunity] o
//                            INNER JOIN BusinessOpportunity.[dbo].[NewCarMerchandiseSnapShot] s on                                             s.OrderBusinessOpportunityID=o.OrderBusinessOpportunityID
//                            INNER JOIN BusinessOpportunity.dbo.V_Car_Basic c on c.car_id=s.carid
//                            INNER JOIN BusinessOpportunity.dbo.V_Car_Serial cs on cs.cs_id=c.cs_id
//                            WHERE 
//	                            [OrderTypeID]=1 and  OrderBusinessOpportunityCreateTime>dateadd(day,@days,getdate())
//                            group by cs.Cs_ID,cs_Name
//                            order by count(1)
//                            ";
//        Response.Write(szSql);
        XmlDocument xmlDoc = new XmlDocument();
        xmlDoc.Load(Server.MapPath("xml/DialogTemplate.xml"));
        txtAlert.Text = xmlDoc.SelectSingleNode("Root/Alert").InnerText.Replace("\"", "\\\""); ;

        //DateTime dtTime = Convert.ToDateTime("2013-09-09 14:22:55");
        //DateTime dtTime2 = Convert.ToDateTime("2013-09-06 09:59:28");
        DateTime dtTime = Convert.ToDateTime("2013-09-09 16:30:00");
        DateTime dtTime2 = Convert.ToDateTime("2013-09-09 16:35:00");
        Response.Write(""+dtTime.AddDays(-15).ToString()+"<br/>");
        Response.Write("" + dtTime2.AddDays(-15).ToString());
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        int nCarSourceID = Convert.ToInt32(txtCarSourceID.Text);
        string szSql = @"UPDATE [CarSourceInfoExt]
                          SET  CarSourceContent=@CarSourceContent
                          WHERE CarSourceID=@CarSourceID";
        Database db = DatabaseFactory.CreateDatabase("SpecialCarConnectionString");
        DbCommand comm = db.GetSqlStringCommand(szSql);
        db.AddInParameter(comm, "CarSourceContent", DbType.String, txtContent.Text);
        db.AddInParameter(comm, "CarSourceID", DbType.Int32, nCarSourceID);
        if (db.ExecuteNonQuery(comm) > 0)
        {
            labMsg.Text = "保存成功！";
        }
        
    }
    protected void Button1_Click1(object sender, EventArgs e)
    {
        var serializer = new JavaScriptSerializer();
        JsonDateTest obj = new JsonDateTest();
        obj.TimeNow = Convert.ToDateTime("2013-10-31 00:00:00");
        labResult.Text = serializer.Serialize(obj);
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        var serializer = new JavaScriptSerializer();
        JsonDateTest obj = new JsonDateTest();
        obj = (JsonDateTest)serializer.Deserialize("{\"TimeNow\":" + "\"" + textTime.Text + "\"}", obj.GetType());

        labResult.Text = obj.TimeNow.ToString();
    }
}


public class JsonDateTest
{
    public DateTime TimeNow { get; set; }
}