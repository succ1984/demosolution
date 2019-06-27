using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

using System.Threading;
using System.Net;


namespace winformDemo
{
    public partial class MulThread : Form
    {
        private delegate int MyMethod();
        public MulThread()
        {
            InitializeComponent();
        }

        private void btnGetConent_Click(object sender, EventArgs e)
        {
            MyMethod my = method;
            IAsyncResult asyncResult = my.BeginInvoke(MethodCompleted, my);
        }
        private int method()
        {
            Thread.Sleep(10000);
            return 100;
        }
        private void MethodCompleted(IAsyncResult asyncResult)
        {
            if (asyncResult == null) return;
            txtContent.Text= (asyncResult.AsyncState as
            MyMethod).EndInvoke(asyncResult).ToString();
        }





        private void btnGetBaiDu_Click(object sender, EventArgs e)
        {
            HttpWebRequest request = (HttpWebRequest)HttpWebRequest.Create("http://www.baidu.com");
            request.BeginGetResponse(requestCompleted, request);
        }

        private void requestCompleted(IAsyncResult asyncResult)
        {
            if (asyncResult == null)
            {
                return;
            }
            HttpWebRequest request = asyncResult.AsyncState as HttpWebRequest;
            HttpWebResponse response =(HttpWebResponse)request.EndGetResponse(asyncResult);           
            System.IO.StreamReader sr = new
       System.IO.StreamReader(response.GetResponseStream());
            txtContent.Text = sr.ReadToEnd();
        }

    }
}
