using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApp
{
    /// <summary>
    /// 打印出所有的“水仙花数”，所谓“水仙花数”是指一个三位数，其各位数字立方和等于该数
    /// </summary>
    public class shuixianhua
    {
        public static void Output()
        {
            int i, j, k;
            int h = 0;
            for (int n = 100; n < 1000; n++)
            {
                i = n / 100;
                j = n / 10 % 10;
                k = n % 10;
                if (Math.Pow(i, 3) + Math.Pow(j, 3) + Math.Pow(k, 3) == n)
                {
                    Console.Write(" " + n);
                    h++;
                    if (h % 5 == 0)
                    {
                        Console.WriteLine("\n");
                    }
                }
            }
        }
    }
}
