<%@ WebHandler Language="C#" Class="ajax" %>

using System;
using System.Web;
using System.Text;
using System.Xml;
using System.IO;
using System.Net;

using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.ObjectBuilder;
using System.Data.Common;
using System.Data;
public class ajax : IHttpHandler {
    string szType = string.Empty;
    StringBuilder sbReturn = new StringBuilder();
    string szReturn = string.Empty;
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/html";

        //context.Response.StatusCode = 401;
        //context.Response.End();
        
        szType = context.Request.QueryString["type"];
        XmlDocument xmlDoc = new XmlDocument();
        string szFilePath = context.Server.MapPath("../xml/products.xml");
        xmlDoc.Load(szFilePath);
       
        switch (szType)
        {
            case "1":
                sbReturn.Append("text output");
                break;
            case "2":
                szReturn = xmlDoc.OuterXml;
                break;
            case "3":
                WebRequest obRequest = WebRequest.Create("http://www.baidu.com");
                obRequest.Credentials = CredentialCache.DefaultCredentials;                
                HttpWebResponse obResponse = (HttpWebResponse)obRequest.GetResponse();
                Stream rssStream = obResponse.GetResponseStream();
                szReturn = obRequest.ToString();
                szReturn = obRequest.GetResponse().ToString();
                break;  
            case "4":
                string szJson = "";
                break;
            case "5":
                Database db = DatabaseFactory.CreateDatabase("local");                
                string szSqlGetImage = "SELECT * FROM [test] WHERE [id]=1";
                DbCommand comm = db.GetSqlStringCommand(szSqlGetImage);
                DataSet ds = db.ExecuteDataSet(comm);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    if (ds.Tables[0].Rows[0]["image"] != DBNull.Value)
                    {
                        byte[] byteImage = (byte[])ds.Tables[0].Rows[0]["image"];
                        if (byteImage.Length > 0)
                        {
                            context.Response.ContentType = "application/octet-stream";
                            context.Response.BinaryWrite(byteImage);
                        }
                    }
                   
                }
                
                break;
            default:
                break;
        }
        
        context.Response.Write(szReturn);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}