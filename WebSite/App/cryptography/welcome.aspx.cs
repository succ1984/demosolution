using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using DragonSource.Utils;

public partial class App_cryptography_welcome : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //Des指定密钥
        var szDesKey = "8888aaaa";
        //测试加密与解密字符串时要用到的字符串
        var szSayHi = "hello,world!";
        //测试加密与解密文件时要用到的文件
        var fileDefault = Server.MapPath("flatfileDefault.txt");
        var fileSpecefic = Server.MapPath("flatFileSpecific.txt");

        var fileDefaultEncrypt = Server.MapPath("encrypt/flatfileDefault.txt");
        var fileSpecificEncrypt = Server.MapPath("encrypt/flatFileSpecific.txt");

        var fileDefaultDescrypt = Server.MapPath("descrypt/flatfileDefault.txt");
        var fileSpecificDescrypt=Server.MapPath("descrypt/flatFileSpecific.txt");

        //MD5加密字符串,使用系统默认编码
        var md5Default=CryptographyHelper.MD5Hash(szSayHi);
        //MD5加密字符串,使用UTF-8编码
        var md5Specific=CryptographyHelper.MD5Hash(szSayHi, System.Text.Encoding.UTF8);

        // DES使用默认密钥加密字符串
        var desDefault= CryptographyHelper.Encrypt(szSayHi);
        //DES使用指定密钥加密字符串,密钥最多8位，超过截断，不够自动补足‘2’到8位
        var desSpecific=CryptographyHelper.Encrypt(szSayHi, szDesKey);
        //DES使用默认密钥解密字符串
        var unpackDefault = CryptographyHelper.Decrypt(desDefault);
        //DES使用指定密钥解密字符串
        var unpackSpecific = CryptographyHelper.Decrypt(desSpecific,szDesKey);

        // DES使用默认密钥加密文件
        CryptographyHelper.EncryptFile(fileDefault, fileDefaultEncrypt);
        //DES使用默认密钥解密文件
        CryptographyHelper.DecryptFile(fileDefaultEncrypt, fileDefaultDescrypt);

        // DES使用指定密钥加密文件
        CryptographyHelper.EncryptFile(fileSpecefic,fileSpecificEncrypt,szDesKey);
        //DES使用指定密钥解密文件
        CryptographyHelper.DecryptFile(fileSpecificEncrypt, fileSpecificDescrypt,szDesKey);
    }
}