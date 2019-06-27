using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Reflection;

namespace ConsoleApp
{
    [Developer("test11","111",Reviewed=false)]   
    public class CustomAttribute
    {
        public static void GetAttribute(Type t)
        {


            //Get instance of the attribute.    
            DeveloperAttribute MyAttribute = (DeveloperAttribute)Attribute.GetCustomAttribute(t, typeof(DeveloperAttribute));

            if (null == MyAttribute)
            {
                Console.WriteLine("The attribute was not found.");
            }
            else
            {
                //Get the Name value.    
                Console.WriteLine("The Name Attribute is: {0}.", MyAttribute.Name);
                //Get the Level value.    
                Console.WriteLine("The Level Attribute is: {0}.", MyAttribute.Level);
                //Get the Reviewed value.
                Console.WriteLine("The Reviewed Attribute is: {0}.", MyAttribute.Reviewed);
            }
        }

        public static void GetAttributes(Type t)
        {
            DeveloperAttribute[] MyAttribute =
            (DeveloperAttribute[])Attribute.GetCustomAttributes(t, typeof(DeveloperAttribute));

            if (null == MyAttribute)
            {
                Console.WriteLine("The attribute was not found.");
            }
            else
            {
                for (int i = 0; i < MyAttribute.Length; i++)
                {
                    //Get the Name value.    
                    Console.WriteLine("The Name Attribute is: {0}.", MyAttribute[i].Name);
                    //Get the Level value.  
                    Console.WriteLine("The Level Attribute is: {0}.", MyAttribute[i].Level);
                    //Get the Reviewed value.
                    Console.WriteLine("The Reviewed Attribute is: {0}.", MyAttribute[i].Reviewed);
                }
            }
        }


        public static void GetAttributeOnDifferentScope(Type t)
        {

            DeveloperAttribute att;

            //Get the class-level attributes.

            //Put the instance of the attribute on the class level in the att object.
            att = (DeveloperAttribute)Attribute.GetCustomAttribute(t, typeof(DeveloperAttribute));

            if (null == att)
            {
                Console.WriteLine("No attribute in class {0}.\n", t.ToString());
            }
            else
            {
                Console.WriteLine("The Name Attribute on the class level is: {0}.", att.Name);
                Console.WriteLine("The Level Attribute on the class level is: {0}.", att.Level);
                Console.WriteLine("The Reviewed Attribute on the class level is: {0}.\n", att.Reviewed);
            }

            //Get the method-level attributes.

            //Get all methods in this class, and put them
            //in an array of System.Reflection.MemberInfo objects.
            MemberInfo[] MyMemberInfo = t.GetMethods();
            PropertyInfo[] myProperties = t.GetProperties();
            //Loop through all methods in this class that are in the 
            //MyMemberInfo array.
            
            for (int i = 0; i < MyMemberInfo.Length; i++)
            {
                att = (DeveloperAttribute)Attribute.GetCustomAttribute(MyMemberInfo[i], typeof(DeveloperAttribute));
                if (null == att)
                {
                    Console.WriteLine("No attribute in member function {0}.\n", MyMemberInfo[i].ToString());
                }
                else
                {
                    Console.WriteLine("The Name Attribute for the {0} member is: {1}.", MyMemberInfo[i].ToString(), att.Name);
                    Console.WriteLine("The Level Attribute for the {0} member is: {1}.", MyMemberInfo[i].ToString(), att.Level);
                    Console.WriteLine("The Reviewed Attribute for the {0} member is: {1}.\n", MyMemberInfo[i].ToString(), att.Reviewed);
                }
            }
        }


    }

    [AttributeUsage(AttributeTargets.All,AllowMultiple=true)]
    public class DeveloperAttribute : System.Attribute
    {

        //Private fields.
        private string name;
        private string level;
        private bool reviewed;

        //This constructor defines two required parameters: name and level.

        public DeveloperAttribute(string name, string level)
        {
            this.name = name;
            this.level = level;
            this.reviewed = false;
        }

        //Define Name property.
        //This is a read-only attribute.
       
        public virtual string Name
        {
            get { return name; }
        }

        //Define Level property.
        //This is a read-only attribute.

        public virtual string Level
        {
            get { return level; }
        }

        //Define Reviewed property. 
        //This is a read/write attribute. 

        public virtual bool Reviewed
        {
            get { return reviewed; }
            set { reviewed = value; }
        }
    }
}
