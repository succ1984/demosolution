
using System;
using System.IO;

using DragonSource.Utils;
public partial class App_SendMail_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
   
    protected void btnPlain_Click(object sender, EventArgs e)
    {
        string szSubject = txtSubject.Text;
        string szContent = txtMailContent.Text;
        bool bReturn = MailHelper.SendTxtMail("155113995@qq.com", szContent, szSubject, "acheng<suchangcheng1984@163.com>");
    }
    protected void btnHtml_Click(object sender, EventArgs e)
    {
        string szSubject = txtSubject.Text;
        StreamReader reader=File.OpenText(Server.MapPath("mailTemplate2.htm"));
        string szContent = reader.ReadToEnd();
        reader.Close();
        bool bReturn = MailHelper.SendHtmlMail("155113995@qq.com", szContent, szSubject, "acheng<suchangcheng1984@163.com>");
    }
  
}