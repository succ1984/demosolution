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
           
           //删除所有category
           IList<Category> listCategory = this.Category.ToList<Category>();
           this.Category.DeleteAllOnSubmit(this.Category);
           //this.SubmitChanges();
           //插入一些新的category
           for (int i = 1; i <= 10; i++)
           {               
               this.Category.InsertOnSubmit(new Category
               {
                   szCategoryName="分类"+i,
                   szDescription="This is 分类"+i+"的说明"
               });               
           }
           this.SubmitChanges();
         
       }
    }
}
