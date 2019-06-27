using System;
using System.IO;

using DragonSource.Utils;
public partial class App_serialization_SerializationHelper : System.Web.UI.Page
{
    
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    /// <summary>
    /// 1.将对象序列化为byte数组
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnToBinary_Click(object sender, EventArgs e)
    {
        string szFileSaveTo = AppDomain.CurrentDomain.BaseDirectory + "/Magazine.txt";
        MagazineInfo oInfo = new MagazineInfo
        {
            MagazineName="三联生活周刊",
            Year=2014,
            Issue=5
        };
        byte[] byteReturn = SerializationHelper.ToBinary(oInfo, szFileSaveTo);
        //或者
        //byte[] byteReturn = oInfo.ToBinary(szFileSaveTo);

    }
    /// <summary>
    /// 2.将对象序列化为Xml字符串，并可保存到指定路径地址
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnToXml_Click(object sender, EventArgs e)
    {
        string szFileSaveTo = AppDomain.CurrentDomain.BaseDirectory + "/Magazine.xml";
        MagazineInfo oInfo = new MagazineInfo
        {
            MagazineName = "三联生活周刊",
            Year = 2014,
            Issue = 6
        };
        string szReturn= SerializationHelper.ToXML(oInfo,szFileSaveTo);
    }
    /// <summary>
    /// 3.将对象序列化为Json格式字符串，并可选择保存到指定路径地址
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnToJson_Click(object sender, EventArgs e)
    {
        string szFileSaveTo = AppDomain.CurrentDomain.BaseDirectory + "/Magazine.json";
        MagazineInfo oInfo = new MagazineInfo
        {
            MagazineName = "三联生活周刊",
            Year = 2014,
            Issue = 7
        };
        string szReturn = SerializationHelper.ToJSON(oInfo, szFileSaveTo);
    }
    /// <summary>
    /// 4.将byte数组反序列化为对象
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnToObject_Click(object sender, EventArgs e)
    {
        string szFileSaveTo = AppDomain.CurrentDomain.BaseDirectory + "/Magazine.txt";
        MagazineInfo oInfo = SerializationHelper.ToObject<MagazineInfo>(new FileInfo(szFileSaveTo));

    }
    /// <summary>
    /// 5.将Xml格式字符串反序列化为对象
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnXmlToObject_Click(object sender, EventArgs e)
    {
        string szFileSaveTo = AppDomain.CurrentDomain.BaseDirectory + "/Magazine.xml";
        MagazineInfo oInfo = SerializationHelper.XMLToObject<MagazineInfo>(new FileInfo(szFileSaveTo));
    }
    /// <summary>
    /// 6.将Josn格式字符串反序列化为对象
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    protected void btnJsonToObject_Click(object sender, EventArgs e)
    {
        string szFileSaveTo = AppDomain.CurrentDomain.BaseDirectory + "/Magazine.json";
        MagazineInfo oInfo = SerializationHelper.JSONToObject<MagazineInfo>(new FileInfo(szFileSaveTo));
    }

    protected void btnToCDataXml_Click(object sender, EventArgs e)
    {
        string szFileSaveTo = AppDomain.CurrentDomain.BaseDirectory + "/Magazine_CData.xml";
        MagazineInfo oInfo = new MagazineInfo
        {
            MagazineName = "三联生活周刊",
            Year = 2014,
            Issue = 6
        };
        string szReturn = SerializationHelper.ToXML(oInfo, szFileSaveTo);
    }
}

[Serializable]
public class MagazineInfo
{
    public string MagazineName { get; set; }
    public int Year { get; set; }
    public int Issue { get; set; }

}