
/*
    load xml document function for cross-browsers,
    return:xmlDoc
*/
function loadXmlDoc(szXmlPath) {
    var xmlDoc;
    try {//Internet Explorer   
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    }
    catch (e) {
        try {//Firefox, Mozilla, Opera, etc.     
            xmlDoc = document.implementation.createDocument("", "", null);
        }
        catch (e) {
            alert(e.message);
        }
    }

    try {
        xmlDoc.async = false;
        xmlDoc.load(szXmlPath);
        return xmlDoc;
    }
    catch (e) {
        try //Google Chrome  
             {
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET", szXmlPath, false);
            xmlhttp.send(null);
            xmlDoc = xmlhttp.responseXML;
            return xmlDoc;
        }
        catch (e) {
            alert(e.message);

        }
        return (null);
    }
}
/*
    Parse XmlDoc ,
    szXmlString is like 
                text="<bookstore>"
                text=text+"<book>";
                text=text+"<title>Harry Potter</title>";
                text=text+"<author>J K. Rowling</author>";
                text=text+"<year>2005</year>";
                text=text+"</book>";
                text=text+"</bookstore>";
*/
function LoadXmlString(szXmlString) {
    var xmlDoc;
    try { //Internet Explorer   
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(szXmlString);
    }
    catch (e) {
        try { //Firefox, Mozilla, Opera, etc.        
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(szXmlString, "text/xml");
        }
        catch (e) {
            alert(e.message) 
         }
     }
     return xmlDoc;
}