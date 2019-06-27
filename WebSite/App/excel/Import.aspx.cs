using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Aspose.Cells;
using DragonSource.Utils;
public partial class App_excel_Import : System.Web.UI.Page
{


    protected void Page_Load(object sender, EventArgs e)
    {
        //要导入的Excel表格的路径地址
        string szFileName = Server.MapPath("bookImport2014-06-11.xls");
        
        List<BookInfoImportData> listReturn = new List<BookInfoImportData>();
        Workbook workBook = new Workbook(szFileName, new LoadOptions(LoadFormat.Excel97To2003));
        Worksheet bookSheet = workBook.Worksheets[0];
        Cells cells = bookSheet.Cells;
        //从i=1开始，排除掉表头列
        for (int i = 1; i <= cells.MaxDataRow; i++)
        {
            BookInfoImportData oBookInfo = new BookInfoImportData();

            Row row = cells.Rows[i];
            oBookInfo.ISBN = row[0].StringValue;
            oBookInfo.LongNominateInfor = row[1].StringValue;
            oBookInfo.ShortNominateInfor = row[2].StringValue;
            oBookInfo.Category = row[3].StringValue;

            listReturn.Add(oBookInfo);
        }

        //或者直接导入到一个DataTable表格
        DataTable tbBookInfoData=cells.ExportDataTableAsString(1, 0, cells.MaxDataRow, cells.MaxDataColumn);

        Response.Write(listReturn.ToXML());
    }



    /// <summary>
    /// 电子书excel导入信息实体
    /// </summary>
    public class BookInfoImportData
    {
        /// <summary>
        /// ISBN号
        /// </summary>
        public string ISBN { get; set; }
        /// <summary>
        /// 短推荐语
        /// </summary>
        public string ShortNominateInfor { get; set; }
        /// <summary>
        /// 长推荐语
        /// </summary>
        public string LongNominateInfor { get; set; }
        /// <summary>
        /// 类别
        /// </summary>
        public string Category { get; set; }
     

    }





}