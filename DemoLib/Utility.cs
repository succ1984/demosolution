using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MSXML2;

using System.Text.RegularExpressions;
using System.Reflection;
using System.Globalization;

namespace CSFramework
{
    public class Utility
    {
        public Utility()
        {
        }

        #region ExistURL (check if a URL exsit)

        public static bool UrlExistsUsingHttpWebRequest(string url)
        {
            try
            {
                System.Net.HttpWebRequest myRequest = (System.Net.HttpWebRequest)System.Net.WebRequest.Create(url);
                myRequest.Method = "HEAD";
                myRequest.Timeout = 100;
                System.Net.HttpWebResponse res = (System.Net.HttpWebResponse)myRequest.GetResponse();
                return (res.StatusCode == System.Net.HttpStatusCode.OK);
            }
            catch (System.Net.WebException we)
            {
                System.Diagnostics.Trace.Write(we.Message);
                return false;
            }
        }



        //public static bool UrlExistsUsingXmlHttp(string url)
        //{

        //    MSXML2.XMLHTTP _xmlhttp = new MSXML2.XMLHTTP30Class();
        //    _xmlhttp.open("HEAD", url, false, null, null);
        //    _xmlhttp.send("");
        //    return (_xmlhttp.status == 200);
        //}



        //public static bool UrlExistsUsingSockets(string url)
        //{
        //    if (url.StartsWith("http://"))
        //    {
        //        url = url.Remove(0, "http://".Length);
        //    }
        //    try
        //    {
        //        System.Net.IPHostEntry ipHost = System.Net.Dns.Resolve(url);
        //        return true;
        //    }
        //    catch (System.Net.Sockets.SocketException se)
        //    {
        //        System.Diagnostics.Trace.Write(se.Message);
        //        return false;
        //    }
        //}

        public static string StripSQLInjection(string sql)
        {
            if (!string.IsNullOrEmpty(sql))
            {
                //过滤 ' --  
                string pattern1 = @"(\%27)|(\')|(\-\-)";

                //防止执行 ' or  
                string pattern2 = @"((\%27)|(\'))\s*((\%6F)|o|(\%4F))((\%72)|r|(\%52))";

                //防止执行sql server 内部存储过程或扩展存储过程  
                string pattern3 = @"\s+exec(\s|\+)+(s|x)p\w+";

                //过滤关键字
                string pattern4 = @"select|insert|delete|from|count\(|drop table|update|truncate|asc\(|mid\(|char\(|xp_cmdshell|exec master|netlocalgroup administrators|:|net user|""|or|and|having|=|alert";

                //过滤关键字符
                string pattern5 = @"[-|;|,|/|\(|\)|\[|\]|}|{|%|\@|*|!|']";

                sql = Regex.Replace(sql, pattern1, string.Empty, RegexOptions.IgnoreCase);
                sql = Regex.Replace(sql, pattern2, string.Empty, RegexOptions.IgnoreCase);
                sql = Regex.Replace(sql, pattern3, string.Empty, RegexOptions.IgnoreCase);
                sql = Regex.Replace(sql, pattern4, string.Empty, RegexOptions.IgnoreCase);
                sql = Regex.Replace(sql, pattern5, string.Empty, RegexOptions.IgnoreCase);
            }
            return sql;
        }
        #endregion

        /// <summary>
        /// 车辆售价 
        /// 1000万以内，精确到0.01万，写作“129.80万”元
        /// 1000万以上，精确到万，写作1295万
        /// </summary>
        /// <param name="dPrice"></param>
        /// <returns></returns>
        public static string FormatCarPrice(decimal dPrice)
        {
            string szReturn = string.Empty;
            if (dPrice >= 1000)
            {
                szReturn = dPrice.ToString("F0");
            }
            else
            {
                szReturn = dPrice.ToString("F2");
            }
            return szReturn;
        }
        /// <summary>
        /// 降价 无论多少 精确到0.01万，写作"12.80万"元
        /// </summary>
        /// <param name="dPrice"></param>
        /// <returns></returns>
        public static string FormatLowerPrice(decimal dPrice)
        {
            string szReturn = string.Empty;
            szReturn = dPrice.ToString("F2");
            return szReturn;
        }
        /// <summary>
        /// 礼包及定金 精确到元，写作“2，121，290元”
        /// </summary>
        /// <param name="dPrice"></param>
        /// <returns></returns>
        public static string FormatPresentOrSubscribePrice(decimal dPrice)
        {
            string szReturn = string.Empty;
            szReturn = dPrice.ToString("N0");
            return szReturn;
        }
        /// <summary>
        /// 汽车用品价格 精确到0.01元，写作“1290.90”元（不加千位符)
        /// </summary>
        /// <param name="dPrice"></param>
        /// <returns></returns>
        public static string FormatMerchadisePrice(decimal dPrice)
        {
            string szReturn = string.Empty;
            szReturn = dPrice.ToString("F2");
            return szReturn;
        }
        /// <summary>
        /// 其他未尽情况 精确到元，写作“2，121，290元”
        /// </summary>
        /// <param name="dPrice"></param>
        /// <returns></returns>
        public static string FormatOtherPrice(decimal dPrice)
        {
            string szReturn = string.Empty;
            szReturn = dPrice.ToString("N0");
            return szReturn;
        }

        /// <summary>
        /// 单车或单项数字 精确到个位，不加千分位标识，写作"9887"
        /// </summary>
        /// <param name="nNumber"></param>
        /// <returns></returns>
        public static string FormatSingleItemNumber(int nNumber)
        {
            string szReturn = string.Empty;
            szReturn = nNumber.ToString("F0");
            return szReturn;
        }
        /// <summary>
        /// 汇总数字
        /// 10000以内 精确到个位，不加千分位标识，写作"8887"
        /// 10000以上 精确到0.01万，四舍五入 写作"12.20万"
        /// </summary>
        /// <param name="nNumber"></param>
        /// <returns></returns>
        public static string FormatAggregateNumber(int nNumber)
        {
            string szReturn = string.Empty;
            if (nNumber < 10000)
            {
                szReturn = nNumber.ToString("F0");
            }
            else
            {
                decimal dNumber = Convert.ToDecimal(nNumber) / 10000m;
                szReturn = string.Format("{0:F2}万", dNumber);
            }
            return szReturn;
        }


        public string EncodeXml(string szXml)
        {
            string szReturn = string.Empty;
            szReturn = szXml
                          .Replace("<", "&lt;")
                          .Replace(">", "&gt;")
                          .Replace("&", "&amp;")
                          .Replace("'", "&apos;")
                          .Replace("\"", "&quot;");
            return szReturn;
        }

        /// <summary>
        /// 把一个字符串中的 低序位 ASCII 字符 替换成 &#x 字符
        /// 转换 ASCII 0 - 8 -> &#x0 - &#x8
        /// 转换 ASCII 11 - 12 -> &#xB - &#xC
        /// 转换 ASCII 14 - 31 -> &#xE - &#x1F
        /// </summary>
        /// <param name="tmp"></param>
        /// <returns></returns>
        public static string ReplaceLowOrderASCIICharacters(string tmp)
        {
            StringBuilder info = new StringBuilder();
            foreach (char cc in tmp)
            {
                int ss = (int)cc;
                if (((ss >= 0) && (ss <= 8)) || ((ss >= 11) && (ss <= 12)) || ((ss >= 14) && (ss <= 32)))
                {
                    info.AppendFormat("&#x{0:X};", ss);
                }
                else info.Append(cc);
            }
            return info.ToString();
        }
        /// <summary>
        /// 把一个字符串中的下列字符替换成 低序位 ASCII 字符
        /// 转换 &#x0 - &#x8 -> ASCII 0 - 8
        /// 转换 &#xB - &#xC -> ASCII 11 - 12
        /// 转换 &#xE - &#x1F -> ASCII 14 - 31
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public static string GetLowOrderASCIICharacters(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return string.Empty;
            }
            int pos, startIndex = 0, len = input.Length;
            if (len <= 4)
            {
                return input;
            }
            StringBuilder result = new StringBuilder();
            while ((pos = input.IndexOf("&#x", startIndex)) >= 0)
            {
                bool needReplace = false;
                string rOldV = string.Empty, rNewV = string.Empty;
                int le = (len - pos < 6) ? len - pos : 6;
                int p = input.IndexOf(";", pos, le);
                if (p >= 0)
                {
                    rOldV = input.Substring(pos, p - pos + 1);
                    // 计算 对应的低位字符
                    short ss;
                    if (short.TryParse(rOldV.Substring(3, p - pos - 3), NumberStyles.AllowHexSpecifier, null, out ss))
                    {
                        if (((ss >= 0) && (ss <= 8)) || ((ss >= 11) && (ss <= 12)) || ((ss >= 14) && (ss <= 32)))
                        {
                            needReplace = true;
                            rNewV = Convert.ToChar(ss).ToString();
                        }
                    }
                    pos = p + 1;
                }
                else pos += le;
                string part = input.Substring(startIndex, pos - startIndex);
                if (needReplace) result.Append(part.Replace(rOldV, rNewV));
                else result.Append(part);
                startIndex = pos;
            }
            result.Append(input.Substring(startIndex));
            return result.ToString();
        }
        /// <summary>
        /// 处理低位非打印字符
        /// </summary>
        /// <param name="szText"></param>
        /// <returns></returns>
        public string ReplaceLowerNoPrintAscII(string szText)
        {
            return
            System.Text.RegularExpressions.Regex.Replace(szText, @"[\x00-\x08]|[\x0B-\x0C]|[\x0E-\x1F]", "");
        }




    }
}
