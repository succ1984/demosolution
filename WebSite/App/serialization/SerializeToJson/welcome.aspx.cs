using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Runtime.Serialization;
using System.IO;
using System.Text;
using System.Data;
using System.Runtime.Serialization.Json;



public partial class App_serialization_SerializeToJson_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        string Json = "";
        SearchProduct sp = new SearchProduct();
        sp.ItemCount = 5;
        sp.ImgServer = "http://images.europe.creative.com";
        sp.StoreUrl = "";
        sp.SearchProductList = new List<SearchProductList>();
        for (int i = 0; i < 5; i++)
        {
            SearchProductList p = new SearchProductList();
            p.MasterProductID = Convert.ToInt32(i);
            p.ParentCategoryID = Convert.ToInt32(i);
            p.ProductName = "prodctName" + i.ToString();
            string oneLine = "";
            p.Text = string.IsNullOrEmpty(oneLine) ? "" : oneLine;
            p.Tag = "tag" + i.ToString().Trim();
            sp.SearchProductList.Add(p);
        }
        Json = ToJson<SearchProduct>(sp);
        Response.Write(Json);
    }

    public static string ToJson<T>(T obj)
    {
        System.Runtime.Serialization.Json.DataContractJsonSerializer ds = new System.Runtime.Serialization.Json.DataContractJsonSerializer(typeof(T));
        MemoryStream ms = new MemoryStream();
        ds.WriteObject(ms, obj);
        string strJSON = Encoding.UTF8.GetString(ms.ToArray());
        ms.Close();
        return strJSON;
    }
}

[DataContract]
public class SearchProduct
{
    private string _state;
    private int _itemcount;
    private List<SearchProductList> _searchProductList;
    private string _imgServer;
    private string _storeUrl;

    [DataMember]
    public string State { get { return _state; } set { _state = value; } }
    [DataMember]
    public int ItemCount { get { return _itemcount; } set { _itemcount = value; } }
    [DataMember]
    public List<SearchProductList> SearchProductList { get { return _searchProductList; } set { _searchProductList = value; } }
    [DataMember]
    public string ImgServer { get { return _imgServer; } set { _imgServer = value; } }
    [DataMember]
    public string StoreUrl { get { return _storeUrl; } set { _storeUrl = value; } }
}

[DataContract]
public class SearchProductList
{
    private int _parentCategoryID;
    private int _masterProductID;
    private string _productName;
    private string _text;
    private string _search;
    private string _tag;

    [DataMember]
    public int ParentCategoryID { get { return _parentCategoryID; } set { _parentCategoryID = value; } }
    [DataMember]
    public int MasterProductID { get { return _masterProductID; } set { _masterProductID = value; } }
    [DataMember]
    public string ProductName { get { return _productName; } set { _productName = value; } }
    [DataMember]
    public string Text { get { return _text; } set { _text = value; } }
    [DataMember]
    public string Search { get { return _search; } set { _search = value; } }
    [DataMember]
    public string Tag { get { return _tag; } set { _tag = value; } }
}