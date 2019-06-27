using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CSFramework
{
    public class CustomPageAdpater:System.Web.UI.Adapters.PageAdapter
    {
        public override System.Web.UI.PageStatePersister GetStatePersister()
        {
            if (Page.EnableViewState)
            {
                return new CSFramework.CachePageStatePersister(Page);
            }
            else
            {
                return base.GetStatePersister();
            }
        }
    }
}
