using System;
using System.Runtime.Serialization;
using System.Xml;
using System.IO;

public partial class App_serialization_DataContract : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string szPath = Server.MapPath("~/xml/dataContract.xml");//txt,xml
        WriteObject(szPath);
        ReadObject(szPath);
    }

    public static void WriteObject(string fileName)
    {

        Person p1 = new Person("Zighetti", "Barbara", 101);
        FileStream writer = new FileStream(fileName, FileMode.Create);
        DataContractSerializer ser =
            new DataContractSerializer(typeof(Person));
        ser.WriteObject(writer, p1);
        writer.Close();
    }

    public static void ReadObject(string fileName)
    {
        FileStream fs = new FileStream(fileName,
        FileMode.Open);
        XmlDictionaryReader reader =
            XmlDictionaryReader.CreateTextReader(fs, new XmlDictionaryReaderQuotas());
        DataContractSerializer ser = new DataContractSerializer(typeof(Person));

        // Deserialize the data and read it from the instance.
        Person deserializedPerson =
            (Person)ser.ReadObject(reader, true);
        reader.Close();
        fs.Close();
        string szTest = (String.Format("{0} {1}, ID: {2}",
        deserializedPerson.FirstName, deserializedPerson.LastName,
        deserializedPerson.ID));
    }
}


// You must apply a DataContractAttribute or SerializableAttribute
// to a class to have it serialized by the DataContractSerializer.
[DataContract(Name = "Customer", Namespace = "http://www.contoso.com")]
class Person : IExtensibleDataObject
{
    [DataMember()]
    public string FirstName;
    [DataMember]
    public string LastName;
    [DataMember()]
    public int ID;

    public Person(string newfName, string newLName, int newID)
    {
        FirstName = newfName;
        LastName = newLName;
        ID = newID;
    }

    private ExtensionDataObject extensionData_Value;

    public ExtensionDataObject ExtensionData
    {
        get
        {
            return extensionData_Value;
        }
        set
        {
            extensionData_Value = value;
        }
    }
}


