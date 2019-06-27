using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading;
using System.Diagnostics;

namespace ConsoleApp
{
   /// <summary>
   /// 展示3种调用委托的技术
   /// </summary>
    public class MulThread
    {

        public delegate int TakesAWhileDelegate(int data, int ms);
        /// <summary>
        
        /// </summary>
        public MulThread()
        {
            Method1();

            Method2();

            Method3();

            Method4();
        }
        /// <summary>
        /// 投票
        /// </summary>
        public void Method1()
        {
            TakesAWhileDelegate d = TakesAWhile;
            IAsyncResult ar = d.BeginInvoke(1, 3000, null, null);
            while (!ar.IsCompleted)
            {
                Console.WriteLine(".");
                Thread.Sleep(50);
            }
            int result = d.EndInvoke(ar);
            Console.WriteLine("Result is: {0}", result);
        }
        /// <summary>
        /// 等待句柄
        /// </summary>
        public void Method2()
        {
            TakesAWhileDelegate d = TakesAWhile;
            IAsyncResult ar = d.BeginInvoke(1, 3000, null, null);
            while (true)
            {
                if (ar.AsyncWaitHandle.WaitOne(50, false))
                {
                    Console.WriteLine("Can get the result..");
                    break;
                }
            }
            int result = d.EndInvoke(ar);
            Console.WriteLine("Result is: {0}", result);
        }
        /// <summary>
        /// 异步回调,除了单独定义一个方法，并给它传递BeginInvoke()方法之外，Lambda表达式也非常适合这种情况
        /// </summary>
        public void Method3()
        {
            TakesAWhileDelegate dl = TakesAWhile;
            IAsyncResult ar = dl.BeginInvoke(1, 3000, TakesAWhileCompleted, dl);
            for (int i = 0; i < 100; i++)
            {
                Console.Write(".");
                Thread.Sleep(50);
            }
        }

        public void Method4()
        {
            TakesAWhileDelegate dl = TakesAWhile;
            IAsyncResult ar = dl.BeginInvoke(1, 3000, p =>
            {                
                int result=dl.EndInvoke(p);
                Console.WriteLine("Result is: {0}",result );
            }, dl);
            for (int i = 0; i < 100; i++)
            {
                Console.Write(".");
                Thread.Sleep(50);
            }
        }

        static void TakesAWhileCompleted(IAsyncResult ar)
        {
            if (ar == null)
            {
                throw new ArgumentNullException("ar");
            }
            TakesAWhileDelegate dl = ar.AsyncState as TakesAWhileDelegate;
            Trace.Assert(dl != null, "Invalid object type");
            int result = dl.EndInvoke(ar);
            Console.WriteLine("Result is: {0}", result);
        }



        static int TakesAWhile(int data, int ms)
        {
            Console.WriteLine("TakesAWhile started..");
            Thread.Sleep(ms);
            Console.WriteLine("TakesAWhile completed..");
            return ++data;
        }

       
    }
}
