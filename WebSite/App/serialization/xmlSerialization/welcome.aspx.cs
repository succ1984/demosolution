using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Serialization;

using System.IO;

public partial class App_serialization_xmlSerialization_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }


    
    public class CategoryViewConfig
    {
        
        private List<ViewConfig> _ViewConfig;
        private int _nStoreID;
        private List<CategoryMenu> _szBrowseOtherMenu;

        [XmlElement]
        public List<ViewConfig> ViewConfig
        {
            get { return _ViewConfig; }
            set { _ViewConfig = value; }
        }

        [XmlAttribute]       
        public int StoreID { get { return _nStoreID; } set { _nStoreID = value; } }

        [XmlElement]
        public List<CategoryMenu> BrowseOtherMenu { get { return _szBrowseOtherMenu; } set { _szBrowseOtherMenu = value; } }

        public CategoryViewConfig()
        { }

        public CategoryViewConfig(int nStoreID)
        {
            _nStoreID = nStoreID;
        }

        public void SaveXml()
        {
            string filePath = System.AppDomain.CurrentDomain.BaseDirectory.ToString() + "xml/Category_config_" + _nStoreID + ".xml";
            using (System.IO.StreamWriter writer = new System.IO.StreamWriter(filePath))
            {
                System.Xml.Serialization.XmlSerializer xs = new System.Xml.Serialization.XmlSerializer(this.GetType());
                xs.Serialize(writer, this);
                writer.Close();                
            }
        }

        //public CategoryViewConfig LoadXml()
        //{
        //    return LoadXml(true);
        //}

        //public CategoryViewConfig LoadXml(bool bCache)
        //{
        //    string szCacheKey = "CategoryConfig_" + _nStoreID;
        //    if (bCache)
        //    {
        //        if (CreativeStore.Cache.Check(szCacheKey))
        //        {
        //            return (CategoryViewConfig)CreativeStore.Cache.Read(szCacheKey);
        //        }
        //    }

        //    string filePath = System.AppDomain.CurrentDomain.BaseDirectory.ToString() + "xml/Category_config_" + _nStoreID + ".xml";
        //    if (!System.IO.File.Exists(filePath))
        //        return null;
        //    using (System.IO.StreamReader reader = new System.IO.StreamReader(filePath))
        //    {
        //        System.Xml.Serialization.XmlSerializer xs = new System.Xml.Serialization.XmlSerializer(this.GetType());
        //        object obj = xs.Deserialize(reader);
        //        reader.Close();
        //        CreativeStore.Cache.Add(szCacheKey, obj, 3600);
        //        return (CategoryViewConfig)obj;
        //    }
        //}

        //public ViewConfig LoadXml(int nCategoryID)
        //{
        //    CategoryViewConfig cvc = LoadXml();
        //    foreach (ViewConfig c in cvc.ViewConfig)
        //    {
        //        if (c.CategoryID == nCategoryID)
        //        {
        //            if (c.BrowseOtherMenu == null || c.BrowseOtherMenu.Count == 0)
        //            {
        //                c.BrowseOtherMenu = cvc.BrowseOtherMenu;
        //            }
        //            return c;
        //        }
        //    }
        //    return new ViewConfig();
        //}
    }

    public class ViewConfig
    {
        private int _nCategoryID;
        private string _szCategoryName;
        private List<CategoryMenu> _CategoryMenu;
        private bool _bMenuFromSubcategory;
        private bool _bHasAccessories;
        private int _nItemHeight;
        private int _nItemLimit;
        private int _nItemMaxHeight;
        private string _szSubcategoryID_MaxHeight;
        private string _szAccessoriesID;
        private int _nDefaultAttribute;
        private bool _bDisplayAdvisor = false;
        private bool _bDisplayCompare = false;
        private List<CategoryMenu> _arrBrowseOtherMenu;
        private List<CategoryMenu> _arrFilterByPrice;

        private string _szAdvisorInfoText;
        private string _szFindInfoText;

        [XmlElement]
        public int CategoryID { get { return _nCategoryID; } set { _nCategoryID = value; } }

        [XmlElement]
        public string CategoryName { get { return _szCategoryName; } set { _szCategoryName = value; } }

        [XmlElement]
        public List<CategoryMenu> CategoryMenu { get { return _CategoryMenu; } set { _CategoryMenu = value; } }

        [XmlElement]
        public bool MenuFromSubcategory { get { return _bMenuFromSubcategory; } set { _bMenuFromSubcategory = value; } }

        [XmlElement]
        public bool HasAccessories { get { return _bHasAccessories; } set { _bHasAccessories = value; } }

        [XmlElement]
        public int ItemHeight { get { return _nItemHeight; } set { _nItemHeight = value; } }

        [XmlElement]
        public int ItemLimit { get { return _nItemLimit; } set { _nItemLimit = value; } }

        [XmlElement]
        public string AccessoriesID { get { return _szAccessoriesID; } set { _szAccessoriesID = value; } }

        [XmlElement]
        public int ItemMaxHeight { get { return _nItemMaxHeight; } set { _nItemMaxHeight = value; } }

        [XmlElement]
        public string SubcategoryID_MaxHeight { get { return _szSubcategoryID_MaxHeight; } set { _szSubcategoryID_MaxHeight = value; } }

        [XmlElement]
        public int DefaultAttribute { get { return _nDefaultAttribute; } set { _nDefaultAttribute = value; } }

        [XmlElement]
        public bool DisplayAdvisor { get { return _bDisplayAdvisor; } set { _bDisplayAdvisor = value; } }

        [XmlElement]
        public bool DisplayCompare { get { return _bDisplayCompare; } set { _bDisplayCompare = value; } }

        [XmlElement]
        public List<CategoryMenu> BrowseOtherMenu { get { return _arrBrowseOtherMenu; } set { _arrBrowseOtherMenu = value; } }

        [XmlElement]
        public List<CategoryMenu> FilterByPrice { get { return _arrFilterByPrice; } set { _arrFilterByPrice = value; } }

        [XmlElement]
        public string AdvisorInfoText { get { return _szAdvisorInfoText; } set { _szAdvisorInfoText = value; } }

        [XmlElement]
        public string FindInfoText { get { return _szFindInfoText; } set { _szFindInfoText = value; } }
    }

    public class CategoryMenu
    {
        private string _szName;
        private string _szUrl;
        private string _szId;

        [XmlElement]
        public string Name { get { return _szName; } set { _szName = value; } }
        [XmlElement]
        public string Url { get { return _szUrl; } set { _szUrl = value; } }
        [XmlElement]
        public string Id { get { return _szId; } set { _szId = value; } }
    }






}
