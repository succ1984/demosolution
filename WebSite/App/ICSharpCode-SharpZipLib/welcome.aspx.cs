using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using ICSharpCode.SharpZipLib.Core;
using ICSharpCode.SharpZipLib.Zip;
using System.IO;
using csf = CSFramework;
public partial class App_ICSharpCode_SharpZipLib_welcome : System.Web.UI.Page
{
    csf.SharpZipHelper objHelper = new csf.SharpZipHelper();
  
    protected void Page_Load(object sender, EventArgs e)
    {
         
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        string szOutPut = Server.MapPath("~/files/zipfileForTemp.zip");
        string szFolder = Server.MapPath("~/files/temp");
        objHelper.ZipFolder(szOutPut, "", szFolder);        
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        List<string> zipFileList = new List<string>();
        zipFileList.Add(Server.MapPath("~/files/temp/Debug.txt"));
        zipFileList.Add(Server.MapPath("~/files/temp/Debug1.txt"));
        zipFileList.Add(Server.MapPath("~/files/temp/Debug2.txt"));
        objHelper.DownloadZipToBrowser(zipFileList, this.Page);
    }
    protected void Button3_Click(object sender, EventArgs e)
    {
        string szZipFileName = Server.MapPath("~/files/files.zip");
        string szOutputFolder = Server.MapPath("~/files/files");
        objHelper.ExtractZipFile(szZipFileName,string.Empty,szOutputFolder);
    }
}
