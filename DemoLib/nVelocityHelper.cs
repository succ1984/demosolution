using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.IO;
using NVelocity;
using NVelocity.App;
using NVelocity.Context;
using NVelocity.Runtime;
using Commons.Collections;
using System.Web;
namespace CSFramework
{
    /// <summary>
    /// NVelocity模板工具类 NVelocityHelper
    /// </summary>
    public class NVelocityHelper
    {
        private static VelocityEngine velocity = null;
        private IContext context = null;
        private string templateDir = "WidgetStyle";
     

        #region 构造函数及初始化函数

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="ps_TemplateDir">模板文件夹路径</param>
        public NVelocityHelper(string ps_TemplateDir)
        {
            templateDir = ps_TemplateDir;
            Init();
        }
        /// <summary>
        /// 无参数构造函数
        /// </summary>
        public NVelocityHelper() { Init(); }

        /// <summary>
        /// 初始化NVelocity模块 
        /// create by liubiqu@hotmail.com 2010-04-14
        /// </summary>
        private void Init()
        {
            if (velocity == null)
            {
                //创建VelocityEngine实例对象
                velocity = new VelocityEngine();

                //使用设置初始化VelocityEngine
                ExtendedProperties props = new ExtendedProperties();
                props.AddProperty(RuntimeConstants.RESOURCE_LOADER, "file");
                props.AddProperty(RuntimeConstants.FILE_RESOURCE_LOADER_PATH, HttpContext.Current.Server.MapPath(templateDir));
                props.AddProperty(RuntimeConstants.INPUT_ENCODING, "utf-8");
                props.AddProperty(RuntimeConstants.OUTPUT_ENCODING, "utf-8");
                props.AddProperty(RuntimeConstants.FILE_RESOURCE_LOADER_CACHE, true);
                props.AddProperty("file.resource.loader.modificationCheckInterval", (Int64)1200);

                velocity.Init(props);
            }

            //为模板变量赋值
            context = new VelocityContext();
        }
        #endregion

        /// <summary>
        /// 给模板变量赋值
        /// </summary>
        /// <param name="key">模板变量</param>
        /// <param name="value">模板变量值</param>
        public void Add(string key, object value)
        {
            //if (context == null)
            //    context = new VelocityContext();
            context.Put(key, value);
        }
        public void Update(string key, object value)
        {
            if (context.ContainsKey(key))
            {
                context.Remove(key);
            }
            Add(key, value);
        }
        /// <summary>
        /// 通过获得模板文件生成结果字符串
        /// </summary>
        /// <param name="ps_TemplateFileName">模板文件名，为从模板目录开始的完整路径。即相对路径。如cms/news_view.htm</param>
        public string GetStringFromVm(string ps_TemplateFileName)
        {
            //从文件中读取模板
            Template template = velocity.GetTemplate(ps_TemplateFileName);
            //合并模板
            StringWriter writer = new StringWriter();
            template.Merge(context, writer);
            //velocity.MergeTemplate(ps_TemplateFileName, "UTF-8", context, writer);
            //输出
            string retValue = writer.GetStringBuilder().ToString();
            writer.Flush();
            writer.Close();
            writer.Dispose();
            return retValue;
        }

        /// <summary>
        /// 生成字符串内容
        /// </summary>
        /// <param name="stringExpression">要解析的字符串数据</param>
        /// <param name="logTag">Log标识</param>
        /// <returns></returns>
        public string GetStringFromSource(string ps_SourceStr)
        {
            StringWriter writer = new StringWriter();
            velocity.Evaluate(context, writer, "log", ps_SourceStr);
            //输出
            string retValue = writer.GetStringBuilder().ToString();
            writer.Flush();
            writer.Close();
            writer.Dispose();
            return retValue;
        }


    }
}
