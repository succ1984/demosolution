using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using DragonSource.Utils;

using DragonSource.Utils.Logging;
public partial class App_Logs_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //1.添加一个日志对象
        LoggingManager.AddLog<FileLog>("test");
        //2.从LoggingManager中获取一个日志对象，执行日志信息的添加,日志名称test相当于一个分类，它会在日志文件夹下边建立一个子文件夹来存放该分类的日志，日志文件以时间来做文件名称，如：2014-06-10.txt, 同时你也可以用这种方式创建多个不同名称的日志对象
        var loggerTest = LoggingManager.GetLog<FileLog>("test");
        loggerTest.LogMessage("aaaa", MessageType.Info);

        loggerTest.LogMessage("bbbb", MessageType.Debug);

        loggerTest.LogMessage("aaaa", MessageType.Error);

        loggerTest.LogMessage("aaaa", MessageType.General);

        loggerTest.LogMessage("aaaa", MessageType.Trace);

        loggerTest.LogMessage("aaaa", MessageType.Warn);

        loggerTest.LogMessage("aaaa", MessageType.Warn);

        loggerTest.LogMessage("hello, {0}! {1} are you doing?", MessageType.Info, "sushee", "What");

        //3.在不用时，（可以选择）释放日志所占资源
        loggerTest.Dispose();
        //也可释放所有日志对象占有资源
        LoggingManager.Destroy();

    }
}


public class LogHelper
{
    private FileLog m_Logger = new FileLog();
    public LogHelper(string loggerName)
    {
        LoggingManager.AddLog<FileLog>(loggerName);
        m_Logger = LoggingManager.GetLog<FileLog>(loggerName);
    }

    public void Debug(string szMsg)
    {
        m_Logger.LogMessage(szMsg, MessageType.Debug);
    }

    public void Error(string szMsg)
    {
        m_Logger.LogMessage(szMsg, MessageType.Error);
    }

    public void Info(string szMsg)
    {
        m_Logger.LogMessage(szMsg, MessageType.Info);
    }

    public void Warn(string szMsg)
    {
        m_Logger.LogMessage(szMsg, MessageType.Warn);
    }

    ~LogHelper()
    {
        m_Logger.Dispose();
    }
}