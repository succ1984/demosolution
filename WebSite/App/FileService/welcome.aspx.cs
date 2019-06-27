using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using DragonSource.Utils;
using DragonUtility.IO.FileService.Client;
public partial class App_FileService_welcome : System.Web.UI.Page
{
      //下面这2个变量，你可以选择在web.config文件appSettings中指定，也可以自己写在代码中，只要合法，合法的意思就是这些路径是由服务器分配给你的
    protected string szBasePath = ConfigHelper.GetAppSettingValue("DragonEditor_ImageBasePath",false);
    protected string szShowBasePath = ConfigHelper.GetAppSettingValue("DragonEditor_ImageShowBasePath",false);
    
    protected string szFileName, szExtName, szFilePath, szShowPath, szReturn;

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    /// <summary>
    /// 上传文件
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void Button1_Click(object sender, EventArgs e)
    {
        FileRepositoryServiceClient client = new FileRepositoryServiceClient();
        //指定上传的文件名称，格式为：{服务器端分配给你的路径}/{自定义的文件名称(如果你很懒，可以直接向下面用FileUpload1.FileName)}
        szFilePath = szBasePath + "/" + FileUpload1.FileName;
        
        string szNewFilePath = "";

        bool bReturn = client.CreateImageFile(szFilePath, FileUpload1.PostedFile.InputStream, out szNewFilePath);
        if (bReturn)
        {
            /*
             * 上传成功后文件的http访问地址即为：上传目录的http根地址+分配给你的目录地址(order)+上传成功后传出的新文件名(szNewFilePath)
             * 如果文件上传成功,out参数传出的是返回的文件名称（是经过服务器端处理的），处理的原理是：如果服务器上不存在此文件，则原样输出，如果已经存在，则返回原文件名+一个相对唯一的时间字符串，
             */
            string szMsg = "上传成功,上传后的地址为:" + szShowBasePath + "/" + szBasePath + "/" + szNewFilePath;
            labMsg.Text = szMsg;
        }
        else
        {
            /*
             上传失败的话，out参数传出的就是错误信息，可供参考使用。
             */
            string szMsg = "上传失败,错误信息为" + szNewFilePath;
            labMsg.Text = szMsg;
        }   
    }
}