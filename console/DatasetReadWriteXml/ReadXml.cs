using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
namespace ConsoleApp.DatasetReadWriteXml
{
    class ReadXml
    {


        public static void DemonstrateReadWriteXMLDocumentWithStreamReader()
        {
            // Create a DataSet with one table and two columns.
            DataSet OriginalDataSet = new DataSet("dataSet");
            OriginalDataSet.Namespace = "NetFrameWork";
            DataTable table = new DataTable("table");
            DataColumn idColumn = new DataColumn("id",
                Type.GetType("System.Int32"));
            idColumn.AutoIncrement = true;

            DataColumn itemColumn = new DataColumn("item");
            table.Columns.Add(idColumn);
            table.Columns.Add(itemColumn);
            OriginalDataSet.Tables.Add(table);

            // Add ten rows.
            DataRow newRow;
            for (int i = 0; i < 10; i++)
            {
                newRow = table.NewRow();
                newRow["item"] = "item " + i;
                table.Rows.Add(newRow);
            }
            OriginalDataSet.AcceptChanges();

            // Print out values of each table in the DataSet 
            // using the function defined below.
            PrintValues(OriginalDataSet, "Original DataSet");

            // Write the schema and data to an XML file.
            string xmlFilename = "XmlDocument.xml";

            // Use WriteXml to write the document.
            OriginalDataSet.WriteXml(xmlFilename);

            // Dispose of the original DataSet.
            OriginalDataSet.Dispose();

            // Create a new DataSet.
            DataSet newDataSet = new DataSet("New DataSet");

            // Read the XML document into the DataSet.
            newDataSet.ReadXml(xmlFilename);

            // Print out values of each table in the DataSet 
            // using the function defined below.
            PrintValues(newDataSet, "New DataSet");
        }



        public static void PrintValues(DataSet dataSet, string label)
        {
            Console.WriteLine("\n" + dataSet.DataSetName);
            foreach (DataTable table in dataSet.Tables)
            {
                Console.WriteLine(table.TableName);
                foreach (DataColumn column in table.Columns)
                {
                    Console.Write(column.ColumnName);
                    if (!column.Equals(table.Columns[table.Columns.Count - 1]))
                    {
                        Console.Write("\t");
                    }
                    else
                    {
                        Console.WriteLine();
                    }                    
                }
                foreach (DataRow row in table.Rows)
                {
                    foreach (DataColumn column in table.Columns)
                    {
                       Console.Write(row[column]+"\t");
                    }
                    Console.WriteLine();
                }
                Console.WriteLine();
            }
        }


        public static void ReadXmlSchema()
        {
            DataSet ds = new DataSet();
            ds.ReadXmlSchema("xmlTest.xml");

            string szXmlSchemal = "xmlTestSchema";
            ds.WriteXmlSchema(szXmlSchemal);
        }




    }
}
