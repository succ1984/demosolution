using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Timers;
using BadRequest;
using System.Net;
using System.Text;
namespace BadRequest
{
    public partial class main : ServiceBase
    {
        private Timer m_timer = new Timer(AppSetting.MillSecondsOneSeconds * AppSetting.SecondsOneMinute * AppSetting.Interval);
        /// <summary>
        /// 作为开关，表示上次运行是否已经完成
        /// </summary>
        private bool m_LastRunCompleted = true;
        public main()
        {
            InitializeComponent();
        }

        void m_timer_Elapsed(object sender, ElapsedEventArgs e)
        {
            if (m_LastRunCompleted)
            {
                try
                {
                    LogHelper.Info("工作者事件开始..===============================================================================");
                    DoWork();
                }
                catch (Exception ex)
                {
                    LogHelper.ErrorFormat("出错了：原因：【{0}】", ex.Message);
                    m_LastRunCompleted = true;
                }
                finally
                {
                    m_timer.Enabled = true;
                    LogHelper.Info("工作者事件结束..===============================================================================");
                }
            }
        }

        protected override void OnStart(string[] args)
        {
            LogHelper.Info("服务已经启动...");
            m_timer.Enabled = true;
            m_timer.Start();
            m_timer.Elapsed += m_timer_Elapsed;
        }

        protected override void OnStop()
        {
            m_timer.Stop();
            m_timer.Enabled = false;
            m_timer.Close();
            LogHelper.Info("服务已经停止运行...");
        }


        private void DoWork()
        {
            m_LastRunCompleted = false;

            var  request = WebRequest.Create("http://mobile1.qikan.com/SubjectArticles.aspx?"+DateTime.Now.Ticks);
            var response = request.GetResponse();
            var stream = response.GetResponseStream();
           
            var newFilename = Guid.NewGuid()+".html";
            newFilename = Path.Combine(AppSetting.FileDir, newFilename);
            File.Create(newFilename).Close();

            StreamReader reader = new StreamReader(stream, Encoding.UTF8);
            string szAllText = reader.ReadToEnd();
            reader.Close();

            StreamWriter writer = new StreamWriter(newFilename, false, Encoding.UTF8, 100);
            writer.Write(szAllText);
            writer.Close();

            m_LastRunCompleted = true;
        }
    }
}
