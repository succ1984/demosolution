using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApp
{
    public class SuSuo
    {

        /// <summary>
        /// 输出low到High之间的所有素数及其总数
        /// </summary>
        /// <param name="low"></param>
        /// <param name="up"></param>
        public static void Output(int low,int up)
        {
            bool flag = false;
            int i; 
            int h = 0;
            int j;
            for (i = low; i <= up; i++)
            {
                flag = true;
                for (j = 2; j <= i / 2; j++)
                {
                    if (i % j == 0)
                    {
                        flag = false;
                        break;
                    }
                }
                if (flag == true)
                {
                    Console.Write("  " + i);
                    h++;
                }
            }
            Console.Write(" \n" + "h=" + h);
        }
    }
}
