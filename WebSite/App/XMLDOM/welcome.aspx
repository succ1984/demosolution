<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_XMLDOM_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">


<script src="LoadXmLDoc.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript">
    var szXMLPath="BookStore.xml";
    function BR() {
        document.write("<br/>");
    }
    function HR() {
        document.write("<hr/>");
    }
    function NewSection() {
        document.write("<br/>====================================================================================<br/>");
    }
    function getAttrs(xmlElement) {
        var szAttrs = "";
        var arrNodeAttrs = xmlElement.attributes;
        for (var i = 0; i < arrNodeAttrs.length; i++) {
            var attr = arrNodeAttrs[i];
            var szAttr = attr.nodeName;
            szAttr += ":";
            szAttr += attr.nodeValue;           
            szAttrs += szAttr;
            if (i != arrNodeAttrs.length - 1) {
                szAttrs += ",";
            }
        }
        if (szAttrs.length > 0) {
            szAttrs = "(" + szAttrs + ")";
        }
        return szAttrs;

    }
    /*
    use jQuery read xml
    */
    function ReadXMLDocInJQuery() {
//        var text = "<bookstore>";
//        text = text + "<book>";
//        text = text + "<title>Harry Potter</title>";
//        text = text + "<author>J K. Rowling</author>";
//        text = text + "<year>2005</year>";
//        text = text + "</book>";
//        text = text + "</bookstore>";
//        var xmlDoc = LoadXmlString(text);
        var xmlDoc = loadXmlDoc(szXMLPath);
        $("author", xmlDoc).each(function() {
            document.write($(this).text());
            BR();
        });

        $.each($("book", xmlDoc), function(i, domElem) {
            HR();
            document.write(i);
            var category = $(domElem).attr("category");
            document.write("(cateogry:" + category + ")");
            BR();
            var title = $(domElem).find("title").text();
            var author = $(domElem).find("author").text();
            var year = $(domElem).find("year").text();
            var price = $(domElem).find("price").text();
            document.write("title:" + title);
            BR();
            document.write("author:" + author); BR();
            document.write("year:" + year); BR();
            document.write("price:" + price); BR();
        });        
    }

    /*
      print all nodes
    */
    function ReadXmlDocInJs() {
        var xmlDoc = loadXmlDoc(szXMLPath);
        if (xmlDoc) {           
            document.write(xmlDoc.documentElement.nodeName.bold());
            BR(); BR();

                    var books = xmlDoc.getElementsByTagName("book");
                    for (var i = 0; i < books.length; i++) {
                        var book = books[i];
                        document.write(book.nodeName.bold());
                        document.write(getAttrs(book));            
                        BR();
                        document.write(book.getElementsByTagName("title")[0].childNodes[0].nodeValue);
                        document.write(getAttrs(book.getElementsByTagName("title")[0]));
                        BR();
                        document.write(book.getElementsByTagName("author")[0].childNodes[0].nodeValue);
                        BR();
                        document.write(book.getElementsByTagName("year")[0].childNodes[0].nodeValue);
                        BR();
                        document.write(book.getElementsByTagName("price")[0].childNodes[0].nodeValue);
                        BR();
                        if (i != books.length - 1) {
                            HR();
                        }
                    }
        }
    }
   

        /*
            navigating node
        */

    function navigatingNodes() {
        var xmlDoc = loadXmlDoc(szXMLPath);
        var rootNode = xmlDoc.documentElement;
        var nodeFirst = rootNode.firstChild;
        document.write(nodeFirst.nodeName + getAttrs(nodeFirst));
        BR();
        if (nodeFirst.firstChild) {
            document.write(nodeFirst.firstChild.firstChild.nodeValue);
            BR();
            document.write(nodeFirst.nextSibling.firstChild.firstChild.nodeValue);
            BR();
           document.write(nodeFirst.nextSibling.firstChild.nextSibling.firstChild.nodeValue);
        }
    }



        /*
            get attribute node
        */
    function getNodeAttribute() {
                var xmlDoc = loadXmlDoc(szXMLPath);
                var nodeBooks = xmlDoc.getElementsByTagName("book");
                for (var i = 0; i < nodeBooks.length; i++) {
                    var nodeAttrCategory = nodeBooks[i].getAttribute("category");
                    document.write(nodeAttrCategory);
                    BR();
                }
    }


        /*
            set attribute
        */
    function setNodeAttribute() {
            var xmlDoc = loadXmlDoc(szXMLPath);
            var nodeTitles = xmlDoc.getElementsByTagName("title");
            for (var i = 0; i < nodeTitles.length; i++) {
                nodeTitles[i].setAttribute("lang", "English");
            }

            for (var i = 0; i < nodeTitles.length; i++) {
                document.write(nodeTitles[i].firstChild.nodeValue);
                document.write("(lang:");
                document.write(nodeTitles[i].getAttribute("lang"));
                document.write(")");
                BR();
            }
        }

        function ReadXMLFromDesignatedDoc(xmlDoc) {
            if (xmlDoc) {
                document.write(xmlDoc.documentElement.nodeName.bold());
                BR(); BR();

                var books = xmlDoc.getElementsByTagName("book");
                for (var i = 0; i < books.length; i++) {
                    var book = books[i];
                    document.write(book.nodeName.bold());
                    document.write(getAttrs(book));
                    BR();
                    try {
                        document.write(book.getElementsByTagName("title")[0].childNodes[0].nodeValue);
                        document.write(getAttrs(book.getElementsByTagName("title")[0]));
                        BR();
                    }
                    catch (e) {
                    }
                    
                    try{
                    document.write(book.getElementsByTagName("edition")[0].childNodes[0].nodeValue);
                    document.write(getAttrs(book.getElementsByTagName("edition")[0]));
                    BR();
                    }
                    catch(e){
                    }
                    
                    
                    document.write(book.getElementsByTagName("author")[0].childNodes[0].nodeValue);
                    document.write(getAttrs(book.getElementsByTagName("author")[0]));
                    BR();
                    document.write(book.getElementsByTagName("year")[0].childNodes[0].nodeValue);
                    document.write(getAttrs(book.getElementsByTagName("year")[0]))
                    BR();
                    document.write(book.getElementsByTagName("price")[0].childNodes[0].nodeValue);
                    document.write(getAttrs(book.getElementsByTagName("price")[0]))
                    BR();
                    for (var j = 0; j < book.childNodes.length; j++) {
                        var childNode = book.childNodes[j];
                        if (childNode.nodeType == 8) {
                            document.write("comment cotent is:"+childNode.nodeValue);
                        }
                    }
//                    var lastChild = book.lastChild;
//                    if (lastChild) {
//                        document.write(lastChild.nodeValue);
//                        BR();
//                    }
                    if (i != books.length - 1) {
                        HR();
                    }
                }
            }
        }


        /*
            removeChild,removeAttribute
        */

        function removeNodeAndAttribute() {
            var xmlDoc = loadXmlDoc(szXMLPath);
            //delete first node
            var nodeFirst = xmlDoc.documentElement.childNodes[0];
            xmlDoc.documentElement.removeChild(nodeFirst);
            ReadXMLFromDesignatedDoc(xmlDoc);
            NewSection();
            //delete lastNode
            var nodeLast = xmlDoc.documentElement.lastChild;
            nodeLast.parentNode.removeChild(nodeLast);
            ReadXMLFromDesignatedDoc(xmlDoc);
            //delete text node
            var nodeTitle = xmlDoc.getElementsByTagName("title")[0];
            nodeTitle.removeChild(nodeTitle.firstChild);
            ReadXMLFromDesignatedDoc(xmlDoc);
            //cleart text node,set nodeValue="";
            var nodeAuthor = xmlDoc.getElementsByTagName("author")[0];
            nodeAuthor.childNodes[0].nodeValue = "succ";
            ReadXMLFromDesignatedDoc(xmlDoc);
            //delete attribute node
            var nodeAttrLang = xmlDoc.getElementsByTagName("title")[0];
            if (nodeAttrLang) {
                var szLang = nodeAttrLang.getAttribute("lang");
                if (szLang) {
                    nodeAttrLang.removeAttribute("lang");
                }
            }
            ReadXMLFromDesignatedDoc(xmlDoc);

            //remove all attributes node from book
            var xmlDoc = loadXmlDoc(szXMLPath);
            var books = xmlDoc.getElementsByTagName("book");
            for (var i = 0; i < books.length; i++) {
                while (books[i].attributes.length > 0) {
                    books[i].removeAttributeNode(books[i].attributes[0]);
                }
            }
            ReadXMLFromDesignatedDoc(xmlDoc);
        }


        /*
            Create Nodes,
            {
                createElement,
                createAttribute,setAttribute
                createTextNode
                createCDATASection,
                createComment
            }
        */
        function createNodes() {
            var xmlDoc = loadXmlDoc(szXMLPath);

            var nodeNewElement = xmlDoc.createElement("book");
            var attrNew = xmlDoc.createAttribute("font");
            attrNew.nodeValue = "12";
            nodeNewElement.setAttributeNode(attrNew);
            var childNewTitle = xmlDoc.createElement("title");
            var textTitle = xmlDoc.createTextNode("Custome title");            
            childNewTitle.appendChild(textTitle);

            var childNewAuthor = xmlDoc.createElement("author");
            childNewAuthor.setAttribute("Birthday", "1984-07-20");   
            var textAuthor = xmlDoc.createTextNode("chang_cheng");
            childNewAuthor.appendChild(textAuthor);

            var childNewYear = xmlDoc.createElement("year");
            var textYear = xmlDoc.createTextNode("2012");
            childNewYear.appendChild(textYear);

            var childNewPrice = xmlDoc.createElement("price");                    
            var textPrice = xmlDoc.createTextNode("$200.00");
            childNewPrice.appendChild(textPrice);

            nodeNewElement.appendChild(childNewTitle);
            nodeNewElement.appendChild(childNewAuthor);
            nodeNewElement.appendChild(childNewYear);
            nodeNewElement.appendChild(childNewPrice);

            xmlDoc.documentElement.appendChild(nodeNewElement);
            xmlDoc.documentElement.insertBefore(nodeNewElement,xmlDoc.getElementsByTagName("book")[0]);
            ReadXMLFromDesignatedDoc(xmlDoc);
            var books = xmlDoc.getElementsByTagName("book");
            for (var i = 0; i < books.length; i++) {
                var book = books[i];
                var newCDATASection = xmlDoc.createCDATASection("This is a CDATASection.");
                book.appendChild(newCDATASection);
            }
            for (var i = 0; i < books.length; i++) {
                var book = books[i];
                var newComment = xmlDoc.createComment("Here is comment node");
                book.appendChild(newComment);
            }
            ReadXMLFromDesignatedDoc(xmlDoc);
            
        }

        /*
            parentNode.appendChild(newNode),insertBefore(newNode,referNode),parentNode.removeChild
            node.setAttribute("attributeName","attributeValue")
            textNode.insertData(startIndex,""),textNode.nodeValue=""
            
        */
        function AddNodes() {
            var xmlDoc = loadXmlDoc(szXMLPath);

            var referNode = xmlDoc.documentElement.childNodes[0];
            var newNode = xmlDoc.createElement("edition");
            newNode.setAttribute("lineNum", "1");
            var textNewNode = xmlDoc.createTextNode("1.0.0.0");
            textNewNode.nodeValue = "";
            textNewNode.insertData(0, "9527");
            newNode.appendChild(textNewNode);
            referNode.insertBefore(newNode, referNode.childNodes[1]);
            
            ReadXMLFromDesignatedDoc(xmlDoc);
            
            
        }

        /*
            parentNode.replaceChild(newNode,oldNode);
            textNode.replaceData(offset,length,string);
             nodeValue to replace...   
        */
        function replaceChild() {
            var xmlDoc = loadXmlDoc(szXMLPath);

            var oldNode = xmlDoc.documentElement.firstChild;

            var nodeNewElement = xmlDoc.createElement("book");
            var attrNew = xmlDoc.createAttribute("font");
            attrNew.nodeValue = "12";
            nodeNewElement.setAttributeNode(attrNew);
            var childNewTitle = xmlDoc.createElement("title");
            var textTitle = xmlDoc.createTextNode("Custome title");
            childNewTitle.appendChild(textTitle);

            var childNewAuthor = xmlDoc.createElement("author");
            childNewAuthor.setAttribute("Birthday", "1984-07-20");
            var textAuthor = xmlDoc.createTextNode("chang_cheng");
            childNewAuthor.appendChild(textAuthor);

            var childNewYear = xmlDoc.createElement("year");
            var textYear = xmlDoc.createTextNode("2012");
            textYear.replaceData(0, 10, "2012-04-09");
            childNewYear.appendChild(textYear);

            var childNewPrice = xmlDoc.createElement("price");
            var textPrice = xmlDoc.createTextNode("$200.00");
            textPrice.nodeValue = "Euros 250";
            childNewPrice.appendChild(textPrice);

            nodeNewElement.appendChild(childNewTitle);
            nodeNewElement.appendChild(childNewAuthor);
            nodeNewElement.appendChild(childNewYear);
            nodeNewElement.appendChild(childNewPrice);
            xmlDoc.documentElement.replaceChild(nodeNewElement, oldNode);
            ReadXMLFromDesignatedDoc(xmlDoc);
        }
        /*
            cloneNode(bool),bool indicated if the new node will clone all subemlents and attributes from oldnode
        */
        function cloneNode() {
            var xmlDoc = loadXmlDoc(szXMLPath);
            var oldNode = xmlDoc.documentElement.lastChild;
            var newNode = oldNode.cloneNode(true);
            xmlDoc.documentElement.appendChild(newNode);
            ReadXMLFromDesignatedDoc(xmlDoc);
        }
        
        

        /*
            Test function 
        */
//        ReadXMLDocInJQuery();
//        NewSection();
//        ReadXmlDocInJs();
//        NewSection();
//        getNodeAttribute();
//        NewSection();
//        setNodeAttribute();
//        NewSection();
//        navigatingNodes();
        //removeNodeAndAttribute();
        //createNodes();
        //AddNodes();
        //replaceChild();
        cloneNode();
    

    

</script>


</asp:Content>

