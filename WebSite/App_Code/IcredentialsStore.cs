using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Web.Security;
using System.Xml;
/// <summary>
/// Summary description for IcredentialsStore
/// </summary>
public interface IcredentialsStore
{
    bool Authenticate(string szUserName, string szPassword);
    List<string> GetAllRolesByUserName(string szUserName);
}


public class DefaultCredentialStore:IcredentialsStore
{
    public DefaultCredentialStore()
    {

    }

    public bool Authenticate(string szUserName, string szPassword)
    {
        bool blValid = false;
        blValid = FormsAuthentication.Authenticate(szUserName, szPassword);
        return blValid;
    }

    public List<string> GetAllRolesByUserName(string szUserName)
    {
        List<string> listRoles = new List<string>();

        return listRoles;
    }
}


public class XmlCredentialStore : IcredentialsStore
{   
    private string _szUserFile;
    public XmlCredentialStore(string szUserFile)
    {
        _szUserFile = szUserFile;
    }

    public bool Authenticate(string szUserName,string szPassword)
    {
        bool blValid = false;
        XmlDocument xmlDoc = new XmlDocument();
        XmlNamespaceManager nameSpaceManager = new XmlNamespaceManager(xmlDoc.NameTable);
        try
        {
            xmlDoc.Load(_szUserFile);
        }
        catch (Exception ex)
        {
            blValid = false;
        }
        XmlNode users = xmlDoc.GetElementsByTagName("users")[0];
        string szHashingAlgorithm = users.Attributes["passwordFormat"].Value;
        string szPasswordToCompare;
        if (szHashingAlgorithm != null && szHashingAlgorithm != "Clear")
        {
            szPasswordToCompare = FormsAuthentication.HashPasswordForStoringInConfigFile(szPassword, szHashingAlgorithm);
        }
        else
        {
            szPasswordToCompare = szPassword;
        }
        string szUserXPath="/users/user[@username='"+szUserName+"' and @password='"+szPasswordToCompare+"']";
        // string szUserXPath = "descendant::user[@username='"+szUserName+"' and @password='"+szPasswordToCompare+"']";       
        XmlNode nodeUser = users.SelectSingleNode(szUserXPath);
        if (nodeUser != null)
        {
            blValid = true;
        }
        return blValid;
    }

    public List<string> GetAllRolesByUserName(string szUserName)
    {
        List<string> listRoles = new List<string>();
        XmlDocument xmlUsers = new XmlDocument();
        try
        {
            xmlUsers.Load(_szUserFile);            
            string szXPath = "/users/user[@username='{0}']/roles/role";
            szXPath = string.Format(szXPath, szUserName);
            XmlNodeList nodeRoles = xmlUsers.SelectNodes(szXPath);
            foreach (XmlNode node in nodeRoles)
            {
                listRoles.Add(node.InnerText);
            }
        }
        catch (Exception ex)
        {

        }       
        return listRoles;
    }
}