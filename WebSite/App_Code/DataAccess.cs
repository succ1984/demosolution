using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.ObjectBuilder;
using System.Data.Common;

public class DataAccess
{
    public DataAccess() { }








    public static List<Category> GetCategoriesByParentID(int nParentID)
    {
        List<Category> listCategory = new List<Category>();
        //Creative.WWW.ProductsGuid.LINQtoSQL.UPDDataContext context = new Creative.WWW.ProductsGuid.LINQtoSQL.UPDDataContext();
        //string error = "";
        //var lst = context.API_spProductGetCategories_Cached(1, 1, 61, nParentID, 2, ref error);
        //foreach (var c in lst)
        //{
        //    Category obj = new Category()
        //    {
        //        CategoryId=c.nProductCategoryID??0,
        //        CategoryTitle=c.szProductCategoryName                    
        //    };
        //    listCategory.Add(obj);
        //}
        Database db = DatabaseFactory.CreateDatabase("WWSQL");
        string szSpName = "API_spProductGetCategories_Cached";
        DbCommand dbCommand = db.GetStoredProcCommand(szSpName);
        db.AddInParameter(dbCommand, "nLanguageID", DbType.Int32, 1);
        db.AddInParameter(dbCommand, "nCountryID", DbType.Int32, 1);
        db.AddInParameter(dbCommand, "nSiteID", DbType.Int32, 61);
        db.AddInParameter(dbCommand, "nProductCategoryID", DbType.Int32, nParentID);
        db.AddInParameter(dbCommand, "nProductCategoryTypeID", DbType.Int32, 2);
        DataSet ds = db.ExecuteDataSet(dbCommand);
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            DataRow row = ds.Tables[0].Rows[i];
            Category obj = new Category();
            obj.CategoryId = Convert.ToInt32(row["nProductCategoryID"]);
            obj.CategoryTitle = row["szProductCategoryName"].ToString();
            listCategory.Add(obj);
        }
        return listCategory;
    }



    public static List<Product> GetMasterProductsByCategory(int nCategoryID)
    {
        List<Product> list = new List<Product>();
        Database db = DatabaseFactory.CreateDatabase("WWSQL");
        string szSpName = "dbo.API_spProductGetMastersInCategory_Cached";
        DbCommand dbCommand = db.GetStoredProcCommand(szSpName);
        db.AddInParameter(dbCommand, "@nProductCategoryID", DbType.Int32, nCategoryID);
        db.AddInParameter(dbCommand, "@nLanguageID", DbType.Int32, 1);
        db.AddInParameter(dbCommand, "@nCountryID", DbType.Int32, 1);
        db.AddInParameter(dbCommand, "@nSiteID", DbType.Int32, 61);
        db.AddInParameter(dbCommand, "@nProductCategoryTypeID", DbType.Int32, 2);

        DataSet ds = db.ExecuteDataSet(dbCommand);
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            DataRow row = ds.Tables[0].Rows[i];
            Product obj = new Product();
            obj.ProductId = Convert.ToInt32(row["nProductID"]);
            obj.ProductName = row["szProductName"].ToString();
            obj.ProdcutStory = row["szOneLineDescription"].ToString();
            obj.ProductNumber = row["szProductNumber"].ToString();
            obj.ProductModelNumber = row["szModelNumber"].ToString();
            obj.Rank = Convert.ToInt32(row["nRank"]);
            list.Add(obj);
        }
        return list;
    }

    public static List<Product> GetChildrenPdtsByMasterID(int nMasterID)
    {
        List<Product> listChildPdts = new List<Product>();
        Database db = DatabaseFactory.CreateDatabase("WWSQL");
        string szSpName = "dbo.API_spProductGetChildren";
        DbCommand dbCommand = db.GetStoredProcCommand(szSpName);
        db.AddInParameter(dbCommand, "@nProductID", DbType.Int32, nMasterID);
        db.AddInParameter(dbCommand, "@nProductRelatedTypeID", DbType.Int32, 5);
        db.AddInParameter(dbCommand, "@nLanguageID", DbType.Int32, 1);
        db.AddInParameter(dbCommand, "@nCountryID", DbType.Int32, 1);
        db.AddInParameter(dbCommand, "@nSiteID", DbType.Int32, 61);

        DataSet ds = db.ExecuteDataSet(dbCommand);
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            DataRow row = ds.Tables[0].Rows[i];
            Product obj = new Product();
            obj.ProductId = Convert.ToInt32(row["nProductID"]);
            obj.ProductName = row["szProductName"].ToString();
            obj.ProdcutStory = row["szOneLineDescription"].ToString();
            obj.ProductNumber = row["szProductNumber"].ToString();
            obj.ProductModelNumber = row["szModelNumber"].ToString();
            listChildPdts.Add(obj);
        }
        return listChildPdts;
    }






    #region Log

    public static bool LogInsert(string szRMANumber, DateTime dtActionTime, string szADLoginID, string szEvent)
    {
        bool blReturn = false;
        Database db = DatabaseFactory.CreateDatabase("CCC");
        string szSql = @"INSERT INTO [tb_Log]
                         VALUES('{0}','{1}',{2},'{3}')";
        szSql = string.Format(szSql, szRMANumber, dtActionTime, Convert.ToInt32(szADLoginID), szEvent);
        DbCommand comm = db.GetSqlStringCommand(szSql);
        int nRowCount = db.ExecuteNonQuery(comm);
        blReturn = nRowCount > 0;
        return blReturn;
    }

    public static DataTable LogByCaseID(string szRmaNumber)
    {
        DataTable dtReturn = null;
        Database db = DatabaseFactory.CreateDatabase("CCC");
        string szSql = @"SELECT l.*,ad.szLoginID,ad.szRealName,ad.szDisplayName
                        FROM [tb_Log] l,tb_ADlogin ad
                        WHERE l.ADloginFK=ad.nADLoginID
                        AND  l.szCaseFK='{0}'
                        ORDER BY dtActionDate DESC";
        szSql = string.Format(szSql, szRmaNumber);
        DbCommand comm = db.GetSqlStringCommand(szSql);
        dtReturn = db.ExecuteDataSet(comm).Tables[0];
        return dtReturn;
    }




    #endregion


}





public class Category
{
    public int CategoryId;
    public string CategoryTitle;
    public int Rank;

    public List<Category> GetChildren()
    {
        return DataAccess.GetCategoriesByParentID(CategoryId);
    }
}

public class Product
{
    public string ProductName;
    public int ProductId;
    public string ProdcutStory;
    public decimal Price;
    public int CategoryId;
    public string ProductImg;
    public int Rank;
    public string ProductNumber;
    public string ProductModelNumber;

    public bool HasChidren
    {
        get
        {
            bool blReturn = false;
            blReturn = DataAccess.GetChildrenPdtsByMasterID(ProductId).Count > 0;
            return blReturn;
        }
    }

}