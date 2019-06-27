using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DragonSource.Utils;
using System.IO;
public partial class App_rar_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
   
    //把应用程序根目录下的js文件打包成在在相对路径下一个js.rar文件
    protected void Button1_Click(object sender, EventArgs e)
    {
        string szDir = Server.MapPath("~/js");
        string szRarName = Server.MapPath("js.rar");
        CompressionHelper.CompressRAR(szDir,Path.GetDirectoryName(szRarName), szRarName);
    }
    //把相对路径下的一个js.rar文件解压缩到应用程序根目录下的upack文件夹
    protected void Button2_Click(object sender, EventArgs e)
    {
        string szDir = Server.MapPath("~/unpack");
        string szRarName = Server.MapPath("js.rar");
        CompressionHelper.UnCompressRAR(szDir, Path.GetDirectoryName(szRarName), szRarName);
    }
}