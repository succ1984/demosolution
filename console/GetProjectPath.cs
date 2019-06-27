using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;
using System.Diagnostics;
using System.IO;
namespace ConsoleApp
{
    public class GetProjectPath
    {
        public static void Output()
        {
            Console.WriteLine(Environment.CurrentDirectory);
            Console.WriteLine(Assembly.GetExecutingAssembly().Location);
            Console.WriteLine(System.AppDomain.CurrentDomain.BaseDirectory);

            Console.WriteLine(System.AppDomain.CurrentDomain.SetupInformation.ApplicationBase);

            Console.WriteLine(System.AppDomain.CurrentDomain.BaseDirectory);
        }
        
    }
}
