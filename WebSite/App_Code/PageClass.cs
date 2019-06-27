using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.IO;
using System.Threading;
using System.Collections.Specialized;
using System.Collections;

using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.ObjectBuilder;
using System.Data.Common;
/// <summary>
/// Summary description for PageCalss
/// </summary>
public class PageClass:System.Web.UI.Page
{
    protected override PageStatePersister PageStatePersister
    {
        get
        {

            return new CSFramework.DataBasePageStatePersister(this.Page);
        }
    }   
   
}


