using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using CSFramework;

namespace ConsoleApp
{
    class Program
    {
        
        static void Main(string[] args)
        {
          
            //TestPriceFormat();

            //GetProjectPath.Output();

           // DatasetReadWriteXml.ReadXml.DemonstrateReadWriteXMLDocumentWithStreamReader();
           //new DatasetReadWriteXml.Dealers();
           //DatasetReadWriteXml.ReadXml.ReadXmlSchema();

            //CustomAttribute.GetAttribute(typeof(CustomAttribute));
           // CustomAttribute.GetAttributes(typeof(CustomAttribute));
          //  CustomAttribute.GetAttributeOnDifferentScope(typeof(CustomAttribute));
           // new WebRequest1();
            //new MulThread();

            //run();

            //ninenineTable.Output();

            //SuSuo.Output(101, 20000);

           //shuixianhua.Output();
           // MathExample1.OutPut();
            //MathExample1.Output2();

            //MathExample1.Output3();

            //MathExample1.Output4();

            Console.WriteLine("正在导入数据..");
            double dReturn=SqlBulkCopyExample.DoWork();
            Console.WriteLine("数据导入完成，共用时{0}秒", dReturn);
            Console.ReadLine();
        }



        #region 引用类型参数是按引用传递吗？        
       
        public class test
        {
            public string s = null;
            public int i = 0;
        }

        public static void run()
        {
            test instance = new test();
            instance.s = "first";
            instance.i = 1;
            Console.WriteLine("调用前：instance.s: "+instance.s);
            Console.WriteLine("调用前：instance.i: " + instance.i);

            //callByValue(instance);
            callByValue2(instance);
            //callByReference(ref instance);

            Console.WriteLine("调用前：instance.s: " + instance.s);
            Console.WriteLine("调用前：instance.i: " + instance.i);
        }

        public static void callByValue(test t)
        {
            t.s = "changed";
            t.i = 2;
        }
        public static void callByValue2(test t)
        {
            test tmp = new test();
            tmp.s = "changed";
            tmp.i = 2;
            t = tmp; 
        }

        public static void callByReference(ref test t)
        {
            test tmp = new test();
            tmp.s = "changed";
            tmp.i = 2;
            t = tmp;
        }  

        #endregion







        private static void TestPriceFormat()
        {
            decimal dPrice1 = 12345;          
            
            Console.WriteLine("price=" + dPrice1);

            Console.WriteLine("车辆售价1000W以内: " + Utility.FormatCarPrice(22));
            Console.WriteLine("车辆售价1000W以内: " + Utility.FormatCarPrice(256.8890m));
            Console.WriteLine("车辆售价1000W以上: " + Utility.FormatCarPrice(2009));

            Console.WriteLine("降价: " + Utility.FormatLowerPrice(256.8890m));
            Console.WriteLine("降价: " + Utility.FormatLowerPrice(3333333333333333333m));

            Console.WriteLine("礼包与订金: " + Utility.FormatPresentOrSubscribePrice(256234342.4890m));
            Console.WriteLine("礼包与订金: " + Utility.FormatPresentOrSubscribePrice(2225));

            Console.WriteLine("汽车用品: " + Utility.FormatMerchadisePrice(2225));
            Console.WriteLine("汽车用品: " + Utility.FormatMerchadisePrice(222500023264));
            Console.WriteLine("其他未尽情况: " + Utility.FormatOtherPrice(222500023264));
            Console.WriteLine("其他未尽情况: " + Utility.FormatOtherPrice(222501.9999999m));

            Console.WriteLine("单车或单项数字 精确到个位，不加千分位标识，写作\"9887\": " + Utility.FormatSingleItemNumber(2222));
            Console.WriteLine("单车或单项数字 精确到个位，不加千分位标识，写作\"9887\": " + Utility.FormatSingleItemNumber(2525252));


            Console.WriteLine("10000以内 精确到个位，不加千分位标识，写作\"8887\" " + Utility.FormatAggregateNumber(1000));
            Console.WriteLine("10000以上 精确到0.01万，四舍五入 10001 写作： " + Utility.FormatAggregateNumber(10001));
            Console.WriteLine("10000以上 精确到0.01万，四舍五入  12000 写作： " + Utility.FormatAggregateNumber(12000));
            Console.WriteLine("10000以上 精确到0.01万，四舍五入  14900 写作： " + Utility.FormatAggregateNumber(14900));
            Console.WriteLine("10000以上 精确到0.01万，四舍五入  14951 写作： " + Utility.FormatAggregateNumber(14951));
            Console.WriteLine("10000以上 精确到0.01万，四舍五入  956666666 写作： " + Utility.FormatAggregateNumber(956666666));

        }




    }
}
