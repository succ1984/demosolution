using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using TidyNet;
using DoctypeEncodingValidation;
public partial class App_htmlTagMatch_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    /// <summary>
    /// 验证内容是否符合HTML规范
    /// </summary>
    /// <param name="content"></param>
    /// <param name="returnMessage"></param>
    /// <returns></returns>
    private void CheckHtmlIsValid(string content, out TidyMessageCollection returnMessage)
    {

        if (!string.IsNullOrEmpty(content))
        {
            string htmlContainerFormat = "<!DOCTYPE html><html><head><title>aaa</title></head><body>{0}</body>";
            content = string.Format(htmlContainerFormat, content);
            Tidy tidy = new Tidy();
            /* Set the options you want */
            tidy.Options.DocType = DocType.Omit;
            tidy.Options.DropEmptyParas = true;
            tidy.Options.DropFontTags = true;
            tidy.Options.LogicalEmphasis = true;
            tidy.Options.Xhtml = true;
            tidy.Options.XmlOut = true;
            tidy.Options.MakeClean = true;
            tidy.Options.TidyMark = false;
            tidy.Options.QuoteNbsp = false;
            tidy.Options.NumEntities = true;
            tidy.Options.CharEncoding = CharEncoding.UTF8;
            /* Declare the parameters that is needed */
            TidyMessageCollection tmc = new TidyMessageCollection();
            MemoryStream input = new MemoryStream();
            MemoryStream output = new MemoryStream();
            byte[] bytes = Encoding.UTF8.GetBytes(content);
            input.Write(bytes, 0, bytes.Length);
            input.Position = 0;
            tidy.Parse(input, output, tmc);
            string result = Encoding.UTF8.GetString(output.ToArray());
            //set the return values
            returnMessage = tmc;
        }
        else
        {
            returnMessage = new TidyMessageCollection();
        }

    }
    private string GetMessagge(TidyMessageCollection coll, bool tripHtml = false)
    {
        string szReturn = string.Empty;
        StringBuilder sb = new StringBuilder();
        System.Collections.IEnumerator myEnumerator = coll.GetEnumerator();
        while (myEnumerator.MoveNext())
        {
            var message = (TidyMessage)myEnumerator.Current;
            if (message.Level == MessageLevel.Warning || message.Level == MessageLevel.Error)
            {
                sb.AppendFormat("<pre>{0}</pre>", message.ToString().Replace("<", "&lt;").Replace(">", "&gt;"));
            }

        }
        szReturn = sb.ToString();
        return szReturn;
    }

    protected void btnSave_Click(object sender, EventArgs e)
    {
        string content = txtContent.Text;
        string returnResult;
        TidyMessageCollection returnMessage;
        CheckHtmlIsValid(content, out returnMessage);
        ltlMessage.Text = GetMessagge(returnMessage);
    }


    private void CheckViaW3cService(string content)
    {
        if (!string.IsNullOrEmpty(content))
        {
            string htmlContainerFormat = "<!DOCTYPE html><html><head><title>aaa</title></head><body>{0}</body>";
            content = string.Format(htmlContainerFormat, content);

            CSFramework.AutoSumbitForm autoForm = new CSFramework.AutoSumbitForm();
            ArrayList bytesArray = new ArrayList();
            bytesArray.Add(autoForm.CreateFieldData("fragment", content));
            bytesArray.Add(autoForm.CreateFieldData("prefill", "0"));
            //bytesArray.Add(autoForm.CreateFieldData("charset", "(detect automatically)"));
            bytesArray.Add(autoForm.CreateFieldData("doctype", "HTML5"));
            bytesArray.Add(autoForm.CreateFieldData("prefill_doctype", "0"));
            bytesArray.Add(autoForm.CreateFieldData("group", "0"));
           // bytesArray.Add(autoForm.CreateFieldData("user-agent", " W3C_Validator/1.3 http://validator.w3.org/services"));

            byte[] bytes = autoForm.JoinBytes(bytesArray);
            // 返回的内容
            byte[] responseBytes;
            bool uploaded = autoForm.UploadData("http://validator.w3.org/check", bytes, out responseBytes);
            string resposeText = System.Text.Encoding.UTF8.GetString(responseBytes);
            ltlMessage.Text = resposeText;

        }
    }


    private void W3cValidate(string content)
    {
        if (!string.IsNullOrEmpty(content))
        {
            string htmlContainerFormat = "<!DOCTYPE html><html><head><title>aaa</title></head><body>{0}</body>";
            content = string.Format(htmlContainerFormat, content);
            string szUrl = "http://validator.w3.org/check";
            string postData = string.Empty;
            PostDataGenerator postGenerator = new PostDataGenerator();
            postGenerator.AddPostDataPairs("fragment", content);
            postGenerator.AddPostDataPairs("doctype", "HTML5");
            //postGenerator.AddPostDataPairs("output", "soap12");
            postData = postGenerator.ToString();
            CSFramework.HttpHelper helper = new CSFramework.HttpHelper();
            var html=helper.GetHtml(szUrl, postData, true);
            ltlMessage.Text = html;
        }
    }

   

    protected void btnSave2_Click(object sender, EventArgs e)
    {
       // CheckViaW3cService(txtContent.Text);
        W3cValidate(txtContent.Text);
    }


    

}