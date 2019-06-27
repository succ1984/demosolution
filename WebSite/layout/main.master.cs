using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class layout_main : System.Web.UI.MasterPage
{
    string szBaseServer ="~";
    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e); 
        string szPostFix = DateTime.Now.ToString("yyyyMMddHHmmssss");
        SetPageTitle("DemoSolution Site");
        AddCssFile("/css/master.css");
        AddCssFile("/css/boxy.css?" + szPostFix);
        if (Request.UserAgent.ToLower().IndexOf("msie 6.0") > 0)
        {
            AddScriptFile("/css/iepng/DD_belatedPN.js");
        }
             
        AddScriptFile("/js/jquery-1.6.4.js");
        AddScriptFile("/js/common.js?"+szPostFix);  
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        

    }


  
    #region common operations in Header
    protected void SetPageTitle(string szPageTitle)
    {
        Page.Header.Title = szPageTitle;
    }
    public void AddMeta(string szMetaName, string szValue)
    {
        AddBRInHeader();
        HtmlHead head = (HtmlHead)Page.Header;
        HtmlMeta meta = new HtmlMeta();
        meta.Name = szMetaName;
        meta.Content = szValue;
        head.Controls.Add(meta);
    }

    public void AddCssFile(string szCssFile)
    {
        AddBRInHeader();
        HtmlLink link = new HtmlLink();
        link.Attributes.Add("href", szCssFile);
        link.Attributes.Add("rel", "stylesheet");
        link.Attributes.Add("type", "text/css");
        Page.Header.Controls.Add(link);
    }

    public void AddScriptFile(string szScriptFile)
    {
        AddBRInHeader();
        HtmlGenericControl script = new HtmlGenericControl("script");
        script.Attributes.Add("language", "javascript");
        script.Attributes.Add("type", "text/javascript");
        script.Attributes.Add("src", szScriptFile);
        Page.Header.Controls.Add(script);
    }
    public void AddScriptFileAtBottom(string szScriptFile)
    {
        string szScript = "<script language=\"javascript\" type=\"text/javascript\" src=\"{0}\"></script>";
        string szNewLine="\n\r";
        szScript = string.Format(szScript, szScriptFile);
        if (!string.IsNullOrEmpty(ltlJs.Text))
        {
            ltlJs.Text += szNewLine;
        }
        ltlJs.Text += szScript;
    }
    public void AddComment(string szComment)
    {
        AddBRInHeader();
        LiteralControl ltlComment = new LiteralControl(szComment);
        Page.Header.Controls.Add(ltlComment);

    }
    public void AddBRInHeader()
    {
        LiteralControl ltlBR = new LiteralControl("\r\n");
        Page.Header.Controls.Add(ltlBR);
    }

    private HtmlMeta FindMeta(string szMetaName)
    {
        HtmlMeta meta = null;
        foreach (Control c in Page.Header.Controls)
        {
            if (c.GetType() == typeof(HtmlMeta))
            {
                if (((HtmlMeta)c).Name == szMetaName)
                {
                    meta = (HtmlMeta)c;
                    break;
                }
            }
        }
        return meta;
    }
    #endregion

}