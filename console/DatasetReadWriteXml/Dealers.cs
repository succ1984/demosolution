using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Data;
using System.Data.SqlClient;
using System.Data.Common;
using System.IO;
using System.Globalization;

namespace ConsoleApp.DatasetReadWriteXml
{
    public class Dealers
    {
        public Dealers()
        {
            DataSet ds = new DataSet("DealerMemberLevel");
            SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DealerBasicInfoConnString"].ConnectionString);
            string szSql = @"SELECT TOP 10 [DealerID] as dealerID,DealerShortName as dealerName
      
  FROM [DealerBasicInfo].[dbo].[DealerInfo]
SELECT *
  FROM [DealerBasicInfo].[dbo].[MemberLevel]";
            SqlCommand comm = new SqlCommand(szSql, conn);
            comm.CommandType = CommandType.Text;
            SqlDataAdapter da=new SqlDataAdapter(comm);
            da.TableMappings.Add("Table","Dealers");
            da.TableMappings.Add("Table1", "MememberLevels");
            da.Fill(ds);
            // Write the schema and data to an XML file.
            string xmlFilename = "dealers.xml";

            // Use WriteXml to write the document.
            using (MemoryStream ms = new MemoryStream())
            {
                //ds.WriteXml(xmlFilename);
                ds.WriteXml(xmlFilename,XmlWriteMode.IgnoreSchema);
             //   ds.WriteXml(ms,);
            }

            ReadXml.PrintValues(ds, "dealers");
        }
    }
}
