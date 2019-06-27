using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


using System.Web.Security;
using System.Security.Cryptography;
using System.Text;
public partial class App_security_GenerateMachineKey : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.IsAuthenticated)
        {

        }
    }
    protected void btnGenerate_Click(object sender, EventArgs e)
    {
        labDecryptionKeyDES.Text = CreateMachineKey(16);
        labDecryptionKey3DES.Text = CreateMachineKey(64);
        labValidationKey.Text = CreateMachineKey(128);
    }


    public static string CreateMachineKey(int nLength)
    {
        string szReturn = string.Empty;
        //create a byte array
        byte[] random = new byte[nLength / 2];
        //create a cryptographically strong random number generator
        RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
        //fill the byte array
        rng.GetBytes(random);
        //create a stringbuilder to hold the result
        StringBuilder machineKey = new StringBuilder(nLength);
        //loop through the byte array and append to the stringbuilder
        for (int i = 0; i < random.Length; i++)
        {
            machineKey.Append(string.Format("{0:X2}", random[i]));
        }
        szReturn = machineKey.ToString();
        return szReturn;
    }
}
