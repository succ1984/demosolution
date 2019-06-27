using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApp
{
    /// <summary>
    /// 
    /// </summary>
    public class MathExample1
    {
        /// <summary>
        /// 一个整数，它加上100后是一个完全平方数，再加上168又是一个完全平方数，请问该数是多少？
        /// </summary>
        public static void OutPut()
        {
            double x;
            double y;
            for (int i = 1; i < 100000; i++)
            {
                x = Math.Sqrt(i + 100);
                y = Math.Sqrt(i + 100 + 168);
                if (x * x == i + 100 && y * y == i + 268)
                {
                    Console.Write(i + "\t ");
                }

            }
            Console.ReadKey();
        }

        /// <summary>
        /// 一球从100米高度自由落下，每次落地后反跳回原高度的一半；再落下，求它在第10次落地时，共经过多少米？第10次反弹多高？
        /// </summary>
        public static void Output2()
        {
            double h = 100;

            double sum = 0;
            for (int i = 1; i <= 10; i++)
            {
                sum += h * 2;
                h /= 2;
            }
            Console.Write("第十次的时候小球落地的高度是h=" + h);
            Console.Write("总共经过了" + sum + 100);
        }

        ///猴子吃桃问题：猴子第一天摘下若干个桃子，当即吃了一半，还不瘾，又多吃了一个　　
        ///第二天早上又将剩下的桃子吃掉一半，又多吃了一个。以后每天早上都吃了前一天剩下　　
        ///的一半零一个。到第10天早上想再吃时，见只剩下一个桃子了。求第一天共摘了多少。
        public static void Output3()
        {
            int x1 = 0;
            int x2 = 1;
            int day = 9;
            while (day > 0)
            {
                x1 = (x2 + 1) * 2;
                x2 = x1;
                day--;
            }
            Console.Write("桃子的总数是:" + x1);
        }

        ///
        ///打印出如下图案（菱形）
        ///*
        ///***
        ///*****
        ///*******
        ///*****
        ///***
        public static void Output4()
        {
            for (int i = 0; i <= 4; i++)
            {
                for (int j = 1; j <= 2 * i - 1; j++)
                {
                    Console.Write("*");
                }
                Console.Write("\n");
            }
            for (int i = 3; i > 0; i--)
            {
                for (int j = 1; j <= 2 * i - 1; j++)
                {
                    Console.Write("*");
                }
                Console.Write("\n");
            }
        }



    }
}
