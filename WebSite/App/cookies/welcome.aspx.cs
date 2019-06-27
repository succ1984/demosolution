using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Collections.Specialized;

public partial class App_cookies_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        HttpCookie cookieTest = new HttpCookie("cookieTest");
        cookieTest.Expires = DateTime.Now.AddYears(100);
        cookieTest.Path = "/";
        NameValueCollection coll = new NameValueCollection();
        coll.Add("key1", "value1");
        coll.Add("key2", "value2");
        coll.Add("key3", "value3");
        cookieTest.Values.Add(coll);


        HttpCookie cookieTest2 = new HttpCookie("cookieTest2");
        cookieTest.Expires = DateTime.Now.AddYears(100);
        cookieTest.Path = "/";
        NameValueCollection coll2 = new NameValueCollection();
        coll2.Add("key1", "value1");
        coll2.Add("key2", "value2");
        coll2.Add("key3", "value3");        
        cookieTest2.Values.Add(coll2);

        Response.Cookies.Set(cookieTest);
        Response.Cookies.Set(cookieTest2);
       


        //HttpCookie cookie = Response.Cookies["cookieTest"] as HttpCookie;
        //if (cookie != null)
        //{
        //    string szCookieName = cookie.Name;
        //    string szCookieValue = cookie.Value;
        //    string szCookiePath = cookie.Path;
        //    string szCookieExpire = cookie.Expires.ToString();
        //    string szValue2 = string.Empty;
        //    if (cookie.Values.Count > 0)
        //    {
        //        szValue2 = cookie.Values["key2"].ToString();
        //    }
        //    Response.Write(szCookieValue);
        //    Response.Write("<br/>" + szValue2);
        //}
    }
}
