using System;
using System.Configuration;
using System.Web;

namespace CSFramework
{
    /// <summary>
    /// 图片防盗帮助类,加密密钥可由web.config或者app.config文件中的appSettings节点key为ImageProtection_EncryptKey的值(value)来覆盖
    /// </summary>
    public sealed class ImageProtection
    {
        /// <summary>
        /// 产生一个带图片防盗后缀参数的图片URL地址<![CDATA[
        /// 如：RequestImageUrl="http://www.imagetest.com/nyxb201406-l.jpg",将会产生一个类似“http://www.imagetest.com/nyxb201406-l.jpg?k=b9a3ded8f18ab8de1c2e0937bd54cc45”之类的输出，注意是类似，并不是一成不变的
        /// ]]>
        /// </summary>
        /// <param name="RequestImageUrl">Image的请求地址,如<![CDATA[http://flip.qikan.com.cn/qkFlipPage/2014/nyxb/2014/nyxb2014__06/Level_000/0091_0000_0000.jpg
        /// ]]></param>
        /// <returns></returns>
        public static string GetProtectedImageUrl(string RequestImageUrl)
        {
            string szReturn = string.Empty;

            RequestImageUrl = "http://img.qikan.com.cn" + RequestImageUrl;

            var imgUrl = new Uri(RequestImageUrl);
            string szPostfixParam = GenerateKey(imgUrl);
            if (!RequestImageUrl.Contains("?"))
            {
                szReturn = string.Format("{0}?k={1}", RequestImageUrl, szPostfixParam);
            }
            else
            {
                szReturn = string.Format("{0}&k={1}", RequestImageUrl, szPostfixParam);
            }

            return szReturn;
        }

        /// <summary>
        /// 验证图片防盗字符串是否正确
        /// </summary>
        /// <param name="request">当前请求</param>
        /// <returns></returns>
        public static bool CheckEncryptKey(HttpRequest request)
        {
            bool bReturn = false;

            string authkey = request.QueryString["k"];
            if (authkey == GenerateKey(request.Url))
            {
                bReturn = true;
            }

            return bReturn;
        }

        /// <summary>
        /// 图片防盗帮助类,加密密钥可由web.config或者app.config文件中的appSettings节点Key:ImageProtection_EncryptKey的键值来覆
        /// </summary>
        /// <param name="url"></param>
        /// <returns></returns>
        private static string GenerateKey(Uri url)
        {
            string szReturn = string.Empty;
            //获取加密密钥
            string szEncryptKey = "b2b";
            string szConfigEncryptKey = ConfigurationManager.AppSettings["ImageProtection_EncryptKey"];
            if (!string.IsNullOrEmpty(szConfigEncryptKey))
            {
                szEncryptKey = szConfigEncryptKey;
            }

            if (url != null)
            {
                string szRequestAbsolutePath = url.AbsolutePath;
                string KeyFormat =
                    (
                    szRequestAbsolutePath.Substring(0, szRequestAbsolutePath.LastIndexOf('/'))
                    + szRequestAbsolutePath.Substring(szRequestAbsolutePath.LastIndexOf('/'), 5)
                    + szEncryptKey
                    + DateTime.Now.ToString("yyyyMMdd")
                    ).ToLower();

                szReturn = szEncryptKey.Substring(0, 1) +
                           MD5Encrypt(KeyFormat).ToLower().Substring(1);
            }
            return szReturn;
        }

        #region helper functions





        private static string MD5Encrypt(string szContent)
        {
            return System.Web.Security.FormsAuthentication.HashPasswordForStoringInConfigFile(szContent,
                System.Web.Configuration.FormsAuthPasswordFormat.MD5.ToString());
        }

        #endregion

    }
}
