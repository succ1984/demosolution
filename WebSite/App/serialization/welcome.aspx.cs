using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Soap;
using System.Runtime.Serialization.Formatters.Binary;
using System.Xml.Serialization;
using System.Runtime.InteropServices;


public partial class App_serialization_welcome : System.Web.UI.Page
{
    IFormatter formatter = new BinaryFormatter();
    protected void Page_Load(object sender, EventArgs e)
    {
        Car myCar = new Car("Christine", 150, "Red");
        FileStream fsCar = File.Create(AppDomain.CurrentDomain.BaseDirectory + "/Car.txt");
        // Use a SOAP formatter object to serialize the object.             
        formatter.Serialize(fsCar, myCar);
        fsCar.Close();
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        FileStream fsCar = File.Open(AppDomain.CurrentDomain.BaseDirectory + "/Car.txt", FileMode.Open);
        Car objCar = (Car)formatter.Deserialize(fsCar);

    }
}



[Serializable]
public class Car
{
    [NonSerialized] //Runtime will not serialize this field 
    private string mNickName;
    private string mColor;
    private int mTopSpeed;
    //Reference to another object 
    private Radio mRadio;
    public Car(string nickName, int topSpeed, string color)
    {
        mNickName = nickName;
        mTopSpeed = topSpeed;
        mColor = color;
        mRadio = new Radio();
    }

}
[Serializable]
public class Radio
{
    private int mVolume = 5;
}