using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace CSFramework
{
    public class AutoSumbitForm
    {
        Encoding encoding = Encoding.UTF8;
        public byte[] JoinBytes(ArrayList byteArrays)
        {
            int length = 0;
            int readLength = 0;
            // 加上结束边界
            string endBoundary = Boundary + "-- ";
            byte[] endBoundaryBytes = encoding.GetBytes(endBoundary);
            byteArrays.Add(endBoundaryBytes);
            foreach (byte[] b in byteArrays)
            {
                length += b.Length;
            }
            byte[] bytes = new byte[length];
            // 遍历复制
            foreach (byte[] b in byteArrays)
            {
                b.CopyTo(bytes, readLength);
                readLength += b.Length;
            }
            return bytes;
        }
        public bool UploadData(string uploadUrl, byte[] bytes, out byte[] responseBytes)
        {
            WebClient webClient = new WebClient();
            webClient.Headers.Add("Content-Type", ContentType);
            
            webClient.Headers.Add("User-Agent", HttpContext.Current.Request.UserAgent);
            try
            {
                responseBytes = webClient.UploadData(uploadUrl,"POST", bytes);
                return true;
            }
            catch (WebException ex)
            {
                Stream resp = ex.Response.GetResponseStream();
                responseBytes = new byte[ex.Response.ContentLength];
                resp.Read(responseBytes, 0, responseBytes.Length);
            }
            return false;
        }
            /// 获取普通表单区域二进制数组
        public byte[] CreateFieldData(string fieldName, string fieldValue)
        {
              string textTemplate = Boundary + " Content-Disposition: form-data; name=\"{0}\" {1} ";
              string text = String.Format(textTemplate, fieldName, fieldValue);
              byte[] bytes = encoding.GetBytes(text);
              return bytes;
        }
        public byte[] CreateFieldData(string fieldName, string filename, string contentType, byte[] fileBytes)
        {
              string end = " ";
              string textTemplate = Boundary + " Content-Disposition: form-data; name=\"{0}\"; filename=\"{1}\" Content-Type: {2} ";
              // 头数据
              string data = String.Format(textTemplate, fieldName, filename, contentType);
              byte[] bytes = encoding.GetBytes(data);
              // 尾数据
              byte[] endBytes = encoding.GetBytes(end);
              // 合成后的数组
              byte[] fieldData = new byte[bytes.Length + fileBytes.Length + endBytes.Length];
              bytes.CopyTo(fieldData, 0); // 头数据
              fileBytes.CopyTo(fieldData, bytes.Length); // 文件的二进制数据
              endBytes.CopyTo(fieldData, bytes.Length + fileBytes.Length); // 
              return fieldData;
        }
        public string Boundary
        {
            get
            {
            string[] bArray, ctArray;
            string contentType = ContentType;
            ctArray = contentType.Split(';');
            if (ctArray[0].Trim().ToLower() == "multipart/form-data")
            {
                bArray = ctArray[1].Split('=');
                return "--" + bArray[1];
            }
            return null;
            }
        }
        public string ContentType
        {
            get
            {
                if (HttpContext.Current == null)
                {
                    return "multipart/form-data; boundary=---------------------------7d5b915500cee";
                }
                return HttpContext.Current.Request.ContentType;
            }
        }

     }

}
