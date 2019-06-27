using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using DragonSource.Utils;

namespace ServiceMonitor
{
    public class AppSetting
    {
        /// <summary>
        /// 获取程序的开始文件夹路径
        /// </summary>
        /// <returns></returns>
        public static string ApplicationStartDirPath
        {
            get
            {
                   string assemblyFilePath = Assembly.GetExecutingAssembly().Location;
                   string assemblyDirPath = Path.GetDirectoryName(assemblyFilePath);
                   return assemblyDirPath;
            }
         
        }
        /// <summary>
        /// 
        /// </summary>
        public static int SecondsOneMinute
        {
            get
            {
                return ConfigHelper.GetConfigInt("SecondsOneMinute");
            }
        }
        /// <summary>
        /// 间隔多少分钟运行1次
        /// </summary>
        public static int Interval
        {
            get
            {
                return ConfigHelper.GetConfigInt("Interval");
            }
        }
    }
}
