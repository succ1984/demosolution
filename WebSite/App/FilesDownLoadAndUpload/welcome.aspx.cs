using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using CSFramework;
using System.Data;
using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.ObjectBuilder;
using System.Data.Common;

public partial class App_FilesDownLoadAndUpload_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //OutputImage();
        //DownLoadFile();
       // DownLoadFileWithBuffer();
       // DownLoadFileWithSpeedLimit();
        
    }

    private void OutputImage()
    {
        Response.ContentType = "image/png";
        Response.AddHeader("Content-Disposition", "attachment:filename=icon2011111802.png");
        string fullpath = HttpContext.Current.Server.MapPath("~/images/icon2011111802.png");
        using (System.Drawing.Bitmap bitmaip = new System.Drawing.Bitmap(fullpath))
        {
            using (System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(bitmaip))
            {
                //add watermark to the image
                
                g.DrawString("pngExample", new System.Drawing.Font("宋体", 14f), System.Drawing.Brushes.YellowGreen, bitmaip.Width, bitmaip.Height);
            }
            bitmaip.Save(Response.OutputStream, System.Drawing.Imaging.ImageFormat.Jpeg);

        }
    }

    private void DownLoadFile()
    {
        string szFilePath = Server.MapPath("~/images/icon2011111802.png");
        FileStream fs = new FileStream(szFilePath, FileMode.Open);
        byte[] bytes = new byte[fs.Length];
        fs.Read(bytes, 0, bytes.Length);
        fs.Close();
        Response.ContentType = "application/octet-stream";
        Response.AddHeader("Content-Disposition", "attachment; filename=cc.jpg");
        Response.BinaryWrite(bytes);              
    }

    private void DownLoadFileWithBuffer()
    {
        string szFilePath = Server.MapPath("~/images/icon2011111802.png");
        byte[] byteBuffer = new byte[1000];
        int nLength;      
        FileStream fs = new FileStream(szFilePath, FileMode.Open);          
        Response.ContentType = "application/octet-stream";
        Response.AddHeader("Content-Disposition", "attachment; filename=cc.jpg");        
        long lngDataToRead = fs.Length;        
        while (lngDataToRead > 0)
        {
            if (Response.IsClientConnected)
            {
                nLength = fs.Read(byteBuffer, 0, 1000);
                Response.OutputStream.Write(byteBuffer, 0, nLength);
                Response.Flush();
                byteBuffer = new byte[1000];
                lngDataToRead = lngDataToRead - nLength;
            }
            else
            {
                lngDataToRead = -1;
            }
        }
        fs.Close();
    }

    private void DownLoadFileWithSpeedLimit()
    {
        string szFileName = "icon2011111802.png";
        string szFullPath=Server.MapPath("~/images/icon2011111802.png");
        FileCommon.ResponseFile(Page.Request, Page.Response, szFileName, szFullPath, 1);
    }

    private void SaveImageToDataBase()
    {
        Database db = DatabaseFactory.CreateDatabase("local");
        string szSql = @"
                        UPDATE [test] 
                        SET image=@image 
                        WHERE [id]=1";
        HttpPostedFile postedFile = FileUpload1.PostedFile;
        byte[] byteImage = new byte[postedFile.ContentLength];
        postedFile.InputStream.Read(byteImage, 0, postedFile.ContentLength);        
        DbCommand comm = db.GetSqlStringCommand(szSql);
        db.AddInParameter(comm, "@image",DbType.Binary, byteImage);       
        db.ExecuteNonQuery(comm);       

    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        SaveImageToDataBase();       
    }
}
