using System;
using System.Configuration;
using System.IO;
using System.Web;

namespace CSFramework
{
    public class ImageProtectionHandler : IHttpHandler
    {
        /// <summary>
        /// 您将需要在您网站的 web.config 文件中配置此处理程序，
        /// 并向 IIS 注册此处理程序，然后才能进行使用。有关详细信息，
        /// 请参见下面的链接: http://go.microsoft.com/?linkid=8101007
        /// </summary>
        #region IHttpHandler Members

        public bool IsReusable
        {
            // 如果无法为其他请求重用托管处理程序，则返回 false。
            // 如果按请求保留某些状态信息，则通常这将为 false。
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            var request = context.Request;
            var response = context.Response;
            var server = context.Server;
           

            if (ImageProtection.CheckEncryptKey(request))
            {
                response.ContentType = "image/jpg";
                var imgPath = server.MapPath(request.Url.AbsolutePath);
                response.WriteFile(imgPath);
            }
            else
            {
                OutPutDefaultImg(context);
            }


        }

        private void OutPutDefaultImg(HttpContext context)
        {
            context.Response.ContentType = "image/jpg";
            var imgDefaultPath = context.Server.MapPath("/imgDefault.jpg");
            context.Response.WriteFile(imgDefaultPath);
        }

        

        #endregion
    }

    
}
