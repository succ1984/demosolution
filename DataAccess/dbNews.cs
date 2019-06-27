namespace CSFramework.DataAccess
{

    using System.Data.Linq;
    using System.Data.Linq.Mapping;
    using System.Data;
    using System.Collections.Generic;
    using System.Reflection;
    using System.Linq;
    using System.Linq.Expressions;
    using System.ComponentModel;
    using System;
    using System.IO;
   public partial class dbNewsDataContext
    {      
         
       public void InitializeDataBase()
       {
           
           //ɾ������category
           IList<Category> listCategory = this.Category.ToList<Category>();
           this.Category.DeleteAllOnSubmit(this.Category);
           //this.SubmitChanges();
           //����һЩ�µ�category
           for (int i = 1; i <= 10; i++)
           {               
               this.Category.InsertOnSubmit(new Category
               {
                   szCategoryName="����"+i,
                   szDescription="This is ����"+i+"��˵��"
               });               
           }
           this.SubmitChanges();
         
       }
    }
}
