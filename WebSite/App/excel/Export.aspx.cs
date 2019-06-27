using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Aspose.Cells;

public partial class App_excel_Export : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var listExcelHeaderName = new List<string>
        {
            "ISBN",
            "长推荐语",
            "短推荐语",
            "类别"
        };
        var listExport = new List<BookInfoImportData>
        {
            new BookInfoImportData
            {
                ISBN="1003-9580",
                ShortNominateInfor="化龙追仙传：仙妖魔争霸",
                LongNominateInfor="化龙追仙：奇幻漂流",
                Category="武侠"
            },
            new BookInfoImportData
            {
                ISBN="1003-9581",
                ShortNominateInfor="逆天少年：黑帮老大",
                LongNominateInfor="逆天少年：绝世黑帮老大",
                Category="现言"
            }
        };
        
        Workbook workBook = new Workbook();
        Worksheet bookSheet = workBook.Worksheets[0];
        Cells cells = bookSheet.Cells;

        //设置Excel列头
        for (int i = 0; i < listExcelHeaderName.Count; i++)
        {
            cells[0, i].PutValue(listExcelHeaderName[i]);
        }
        //存储Excel内容
        for (int i = 0; i < listExport.Count; i++)
        {
            var oBookInfo = listExport[i];
            //行号
            var nRowIndex = i + 1;
            cells[nRowIndex, 0].PutValue(oBookInfo.ISBN);
            cells[nRowIndex, 1].PutValue(oBookInfo.LongNominateInfor);
            cells[nRowIndex, 2].PutValue(oBookInfo.ShortNominateInfor);
            cells[nRowIndex, 3].PutValue(oBookInfo.Category);
        }
        //Note:该组件了还提供了诸如：ExportDataTable，ExportTypeArray 等形式的导出功能，PutValue只是其中一种"最笨"的方式，但同时也最能帮助你理解这个组件

        //保存excel文件下输出流,并以附加的形式供下载
        var szFileName = string.Format("{0}{1}.xls", "testBookInfo", DateTime.Now.ToString("yyyyMMddHHmmsssss"));
        workBook.Save(Response, szFileName, ContentDisposition.Attachment, new HtmlSaveOptions(SaveFormat.Excel97To2003));



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