<%@ WebHandler Language="C#" Class="pdtSearch" %>

using System;
using System.Web;
using System.Data;
using System.Data.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
public class pdtSearch : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        context.Response.ContentType = "application/json";
        string szReturn = string.Empty;
        string szKey = string.Empty;
        string szLimit = string.Empty;
        string szSearch = "  SELECT top {1} szProductName,Count(*)" +
                              " FROM [tb_API_spProductGetCategoriesAndMasters]" +
                              " WHERE [szProductName] LIKE '{0}%'" +
                              " GROUP BY SzProductName" +
                              " ORDER BY szProductName ASC";
        if (!string.IsNullOrEmpty(context.Request.QueryString["q"]))
        {
            szKey = context.Request.QueryString["q"];
        }
        if (!string.IsNullOrEmpty(context.Request.QueryString["limit"]))
        {
            szLimit = context.Request.QueryString["limit"];
        }
        szSearch = string.Format(szSearch, szKey, szLimit);
        if (!string.IsNullOrEmpty(szKey))
        {
            Database db = DatabaseFactory.CreateDatabase("UPD");
            DbCommand dbCmd = db.GetSqlStringCommand(szSearch);
            IDataReader reader = db.ExecuteReader(dbCmd);
            szReturn = "{";
            szReturn += "\"items\":";
            szReturn += "[";
            int nItemCount = 0;
            while (reader.Read())
            {
                string szItem = "{";
                szItem += "\"value\":";
                szItem += "\"";
                szItem += reader["szProductName"].ToString();
                szItem += "\"";
                szItem += "}";
                szItem += ",";
                szReturn += szItem;
                nItemCount++;
            }
            if (nItemCount != 0)
            {
                szReturn = szReturn.Substring(0, szReturn.Length - 1);
            }
            szReturn += "]";
            szReturn += "}";
        }

        context.Response.Write(szReturn);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}