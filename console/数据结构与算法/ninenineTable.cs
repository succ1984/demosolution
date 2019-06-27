using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsoleApp
{
    /// <summary>
    /// 9*9乘法表
    /// </summary>
    public class ninenineTable
    {

        public static void Output()
        {
            for (int i = 1; i <= 9; i++)
            {
                for (int j = 1; j <= i; j++)
                {
                    Console.Write(i + " * " + j + " = " + i * j+"  ");
                }
                Console.WriteLine();
            }

        }
    }
}
