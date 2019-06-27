using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceProcess;
using System.Text;

namespace ServiceMonitor
{
    static class Program
    {
        /// <summary>
        /// 应用程序的主入口点。
        /// </summary>
        static void Main()
        {
            string configFilePath = Path.Combine(AppSetting.ApplicationStartDirPath, "log4net.config");
            var fileInfo = new FileInfo(configFilePath);
            LogHelper.SetConfig(fileInfo);
            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[] 
			{ 
				new main() 
			};
            ServiceBase.Run(ServicesToRun);
        }
    }
}
