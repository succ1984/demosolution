
using System;
using System.IO;
using log4net;

namespace ServiceMonitor
{
    /// <summary>
    /// 
    /// </summary>
    public class LogHelper
    {
        public static readonly ILog logger = LogManager.GetLogger("System");
        public static readonly ILog LoggerInfo = LogManager.GetLogger("ProgramLog");

        public static void SetConfig()
        {
            log4net.Config.XmlConfigurator.Configure();
        }

        public static void SetConfig(FileInfo oFileInfo)
        {
            log4net.Config.XmlConfigurator.ConfigureAndWatch(oFileInfo);
        }


        #region Error

      
        public static void Error(object msg)
        {
            logger.Error(msg);
        }
        public static void Error(Exception ex)
        {
            logger.Error(ex);
        }
        public static void ErrorFormat(string format, object arg0)
        {
            logger.ErrorFormat(format, arg0);
        }
        public static void ErrorFormat(string format, params object[] args)
        {
            logger.ErrorFormat(format, args);
        }

        #endregion

        #region Debug
      
        public static void Debug(object msg)
        {
            logger.Debug(msg);
        }

        #endregion

        #region Info

        public static void Info(object msg)
        {
            msg = msg + Environment.NewLine;
            LoggerInfo.Info(msg);
        }
        public static void Info(object msg, Exception ex)
        {
            LoggerInfo.Info(msg, ex);
        }
        public static void InfoFormat(string format, object arg0)
        {
            LoggerInfo.InfoFormat(format, arg0);
        }
        public static void InfoFormat(string format, params object[] args)
        {
            LoggerInfo.InfoFormat(format, args);
        }


        #endregion
        

    }  
}

