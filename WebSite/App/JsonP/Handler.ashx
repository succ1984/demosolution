<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        string szReturn = string.Empty;
        string szCallBack = context.Request.Params["callback"];
        string szJson = "{\"status\":true,\"name\":\"succ\",\"sex\":\"male\",\"age\":\"29\",\"date\":\"2013-07-10\"}";
        szReturn =string.Format("{0}({1});",szCallBack,szJson);               
        context.Response.Write(szReturn);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}