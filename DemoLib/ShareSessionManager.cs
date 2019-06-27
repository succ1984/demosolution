using System;
using System.Collections.Generic;
using System.Text;
using System.Runtime.InteropServices;
using System.ComponentModel;

namespace CSFramework
{
    /// <summary>
    /// 调用Windows底层函数建立或删除共享Session
    /// 本类的功能类似命令：Net Use的功能
    /// </summary>
    public class ShareSessionManager
    {
        /// <summary>
        /// 表示资源类型的常量
        /// </summary>
        private const int RESOURCETYPE_ANY = 0x0;

        /// <summary>
        /// 交互式链接
        /// </summary>
        private const int CONNECT_INTERACTIVE = 0x00000008;

        /// <summary>
        /// 链接提示
        /// </summary>
        private const int CONNECT_PROMPT = 0x00000010;

        /// <summary>
        /// 用指定的帐户登录局域网内计算机，建立文件共享Session
        /// </summary>
        /// <param name="resource">局域网内计算上的共享资源，如："\\192.168.0.111\ymd", 注意后面不要跟"\"符号，否则会报“找不到网络路径”错误</param>
        /// <param name="userName">能访问上述资源的用户名</param>
        /// <param name="password">密码</param>
        /// <remarks> 如果是在服务中调用本方法，服务的登录标识不能是系统内置的Local System或Network Service账户，
        /// 而必须指定为能够登录服务所在计算机的Windows帐户
        /// </remarks>
        public static void AddUse(string resource, string userName, string password)
        {
            NETRESOURCE ConnInf = new NETRESOURCE();

            ConnInf.dwScope = 0;
            ConnInf.dwType = RESOURCETYPE_ANY;
            ConnInf.dwDisplayType = 0;
            ConnInf.dwUsage = 0;
            ConnInf.lpLocalName = null;
            ConnInf.lpRemoteName = resource + "\0";
            ConnInf.lpComment = null;
            ConnInf.lpProvider = null;

            int dwResult = WNetAddConnection2(ref ConnInf, password + "\0", userName + "\0", 0);
            if (dwResult != 0)
            {
                throw new ApplicationException(new Win32Exception(dwResult).Message);
            }
        }

        /// <summary>
        /// 删除已经存在的访问共享文件的Session
        /// </summary>
        /// <param name="resource">局域网内计算上的共享资源，如："\\192.168.0.111\ymd",注意后面不要跟"\"符号，否则会报“找不到网络路径”错误</param>
        /// <param name="isForce">是否强制删除还处于活动状态的共享Session</param>
        public static void DeleteUse(string resource, bool isForce)
        {
            string lpName = resource + "\0";
            int dwResult = WNetCancelConnection2(lpName, 0, isForce);
            if (dwResult != 0)
            {
                throw new Exception(new Win32Exception(dwResult).Message);
            }
        }

        /// <summary>
        /// 帐户登录局域网内计算机，建立文件共享Session
        /// </summary>
        /// <param name="lpNetResource">资源位置</param>
        /// <param name="lpPassword">密码</param>
        /// <param name="lpUsername">用户名</param>
        /// <param name="dwFlags">标志</param>
        /// <returns>0——代表成功</returns>
        [DllImport("mpr.dll", EntryPoint = "WNetAddConnection2W", CharSet = System.Runtime.InteropServices.CharSet.Unicode)]
        private static extern int WNetAddConnection2(ref NETRESOURCE lpNetResource, string lpPassword, string lpUsername, int dwFlags);

        /// <summary>
        /// 删除已经存在的访问共享文件的Session
        /// </summary>
        /// <param name="lpName">资源位置</param>
        /// <param name="dwFlags">标志</param>
        /// <param name="fForce">当资源正被使用时是否强制删除</param>
        /// <returns>0——代表成功</returns>
        [DllImport("mpr.dll", EntryPoint = "WNetCancelConnection2W", CharSet = System.Runtime.InteropServices.CharSet.Unicode)]
        private static extern int WNetCancelConnection2(string lpName, int dwFlags, bool fForce);
    }

    /// <summary>
    /// Win32 API要求的参数的结构类型
    /// </summary>
    [StructLayout(LayoutKind.Sequential)]
    internal struct NETRESOURCE
    {
        /// <summary>
        /// 范围
        /// </summary>
        public int dwScope;

        /// <summary>
        /// 类型
        /// </summary>
        public int dwType;

        /// <summary>
        /// 显示类型
        /// </summary>
        public int dwDisplayType;

        /// <summary>
        /// 用法
        /// </summary>
        public int dwUsage;

        /// <summary>
        /// 本机的映射名
        /// </summary>
        [MarshalAs(UnmanagedType.LPWStr)]
        public string lpLocalName;

        /// <summary>
        /// 远程资源名
        /// </summary>
        [MarshalAs(UnmanagedType.LPWStr)]
        public string lpRemoteName;

        /// <summary>
        /// 注释
        /// </summary>
        [MarshalAs(UnmanagedType.LPWStr)]
        public string lpComment;

        /// <summary>
        /// 提供者
        /// </summary>
        [MarshalAs(UnmanagedType.LPWStr)]
        public string lpProvider;
    }
}