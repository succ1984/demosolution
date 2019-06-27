using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.ServiceProcess;
using System.Text;
using System.Timers;
using System.Xml;
using System.Xml.Linq;
namespace ServiceMonitor
{
    public partial class main : ServiceBase
    {
        private Timer m_timer = new Timer(1000 * AppSetting.SecondsOneMinute * AppSetting.Interval);
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
                    LogHelper.Info("监控事件开始..===============================================================================");
                    StartMonitor();
                }
                catch (Exception ex)
                {
                    LogHelper.ErrorFormat("出错了：原因：【{0}】", ex.Message);
                    m_LastRunCompleted = true;
                }
                finally
                {
                    m_timer.Enabled = true;

                    LogHelper.Info("监控事件结束..===============================================================================");
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


        private void StartMonitor()
        {
            m_LastRunCompleted = false;

            var allServices = ServiceController.GetServices();
            List<MonitorService> listServices = GetAllNeedMonitorServices();
            //if (allServices.Length > 0)
            //{
            //    LogHelper.InfoFormat("检测到该服务器上共有{0}个服务,其中有{1}个在监控列表里", allServices.Length, listServices.Count);
            //    OutputMonitorService(listServices);
            //}
            foreach (var service in listServices)
            {
                var serviceController = ServiceController.GetServices().SingleOrDefault(p => p.DisplayName == service.Name);
                if (serviceController != null && serviceController.Status != ServiceControllerStatus.Running)
                {
                    serviceController.Start();
                    LogHelper.InfoFormat("服务：【{0}】 已经重启启动",service.Name);
                }
            }

            m_LastRunCompleted = true;
        }

        private void OutputMonitorService(List<MonitorService> list)
        {
            foreach (var service in list)
            {
                LogHelper.InfoFormat("{0}", service.Name);
            }
        }

        private List<MonitorService> GetAllNeedMonitorServices()
        {
            List<MonitorService> listReturn = new List<MonitorService>();

            string szXmlFile = Path.Combine(AppSetting.ApplicationStartDirPath, "AllServicesNeedToMonitor.xml");
            XDocument xDoc = XDocument.Load(szXmlFile);
            var allServices= xDoc.Root.Elements();
            foreach (var service in allServices)
            {
                listReturn.Add(new MonitorService
                {
                    Name=service.Attribute(XName.Get("Name","")).Value,
                });
            }
            return listReturn;
        }

      
    }


    public class MonitorService
    {
        public string Name { get; set; }
    }




}
