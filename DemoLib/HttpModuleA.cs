﻿using System;
using System.Web;
using System.Diagnostics;
namespace CSFramework
{
    public class HttpModuleA : IHttpModule
    {
        /// <summary>
        /// 您将需要在您网站的 web.config 文件中配置此模块，
        /// 并向 IIS 注册此模块，然后才能使用。有关详细信息，
        /// 请参见下面的链接: http://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpModule Members

        public void Dispose()
        {
            //此处放置清除代码。
        }

        public void Init(HttpApplication context)
        {
            // 下面是如何处理 LogRequest 事件并为其
            // 提供自定义日志记录实现的示例
            //context.LogRequest += new EventHandler(OnLogRequest);
            context.BeginRequest += new EventHandler(context_BeginRequest);
            context.EndRequest += new EventHandler(context_EndRequest);
        }



        void context_BeginRequest(object sender, EventArgs e)
        {
            HttpApplication app = sender as HttpApplication;
            HttpContext context = app.Context;
            HttpResponse response = context.Response;
            response.Write("begin request<br/>");
            
        }
        void context_EndRequest(object sender, EventArgs e)
        {
            HttpApplication app = sender as HttpApplication;
            HttpContext context = app.Context;
            HttpResponse response = context.Response;
            response.Write("end request<br/>");
        }
        #endregion

        public void OnLogRequest(Object source, EventArgs e)
        {
            //可以在此放置自定义日志记录逻辑
        }
    }
}
