using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
namespace ConsoleApp
{
    public class SqlBulkCopyExample
    {
        public static double DoWork()
        {
            double dReturn = 0;
            Stopwatch sw = new Stopwatch();
            sw.Start();
            string szOriginalConn = ConfigurationManager.ConnectionStrings["DragonDataFacilityConn"].ConnectionString;
            string szDestConn = ConfigurationManager.ConnectionStrings["testConn"].ConnectionString;
            SqlConnection sourceConn = new SqlConnection(szOriginalConn);
            SqlConnection destConn = new SqlConnection(szDestConn);
            string szSourceSelectSql = @"SELECT TitleID,SubTitle,Content
  FROM [MagazineArticle]
  WHERE CreateDate>'2010-01-01' AND CreateDate<'2010-05-01'";
            SqlDataAdapter adapter = new SqlDataAdapter(szSourceSelectSql, sourceConn);
            DataSet ds = new DataSet();
            adapter.Fill(ds);
            if (ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
            {
                SqlBulkCopy bulkCopy = new SqlBulkCopy(destConn);
                bulkCopy.DestinationTableName = "Article";
                bulkCopy.BatchSize = 10;
                bulkCopy.BulkCopyTimeout = 3600;
                bulkCopy.NotifyAfter = 10;
                bulkCopy.SqlRowsCopied += new SqlRowsCopiedEventHandler(bulkCopy_SqlRowsCopied);

                using (destConn)
                {
                    destConn.Open();
                    bulkCopy.WriteToServer(ds.Tables[0]);
                    bulkCopy.Close();
                    destConn.Close();
                }

            }
            sw.Stop();
            dReturn = sw.Elapsed.TotalSeconds;
            return dReturn;
        }

        static void bulkCopy_SqlRowsCopied(object sender, SqlRowsCopiedEventArgs e)
        {
            Console.WriteLine("导入{0}行", e.RowsCopied);
        }
    }
}
