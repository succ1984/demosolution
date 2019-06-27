using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DoctypeEncodingValidation
{
    public class PostDataGenerator
    {
        private Dictionary<string, string> dicPostData = new Dictionary<string, string>();
        public PostDataGenerator()
        {

        }

        public void AddPostDataPairs(string key, string value)
        {
            dicPostData.Add(key, value);
        }

        public override string ToString()
        {
            string szReturn = string.Empty;
            StringBuilder sb = new StringBuilder();
            foreach (var key in dicPostData.Keys)
            {
                string oneString = key + "=" + dicPostData[key] + "&";
                sb.Append(oneString);
            }
            szReturn = sb.ToString().TrimEnd('&');
            return szReturn;
        }

    }
}
