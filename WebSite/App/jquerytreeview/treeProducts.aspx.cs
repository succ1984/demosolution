using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

public partial class App_jqueryTreeview_treeProducts : System.Web.UI.Page
{
   
        protected int nPdtCount = 0;
        string szNameValueStart = "{", szNameValueEnd = "}";
        string szNameValue0 = "\"{0}\":\"{1}\",";
        string szNameValue1 = "\"{0}\":\"{1}\"";
        string szNameValue2Start = "\"{0}\":[";
        string szNameValue2End = "],";
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.ContentType = "text/plain";
            GetNodes();
        }
        #region load a whole tree
        public string ResponseTree()
        {
            DateTime dtStart = DateTime.Now;
            StringBuilder sbTree = new StringBuilder();
            List<Category> list = DataAccess.GetCategoriesByParentID(0); ;
            sbTree.Append("<ul class=\"treeview filetree\">");
            foreach (Category node in list)
            {
                LoadCategories(node, ref sbTree);
            }
            sbTree.Append("</ul>");
            sbTree.Append("<span style=\"display:none\">" + nPdtCount.ToString() + "<span>");
            DateTime dtEnd = DateTime.Now;
            TimeSpan tsRun = dtEnd - dtStart;
            return sbTree.ToString();
        }

        private void LoadCategories(Category node, ref StringBuilder sbTree)
        {
            string szHitarea = "<div class=\"hitarea\"></div>";
            string szAttrs = " pn=\"{0}\" pnm=\"{1}\" pmn=\"{2}\" ";
            sbTree.Append("<li>");
            sbTree.Append(szHitarea);
            sbTree.Append("<span class=\"folder mainCat\">");
            sbTree.Append(node.CategoryTitle);
            sbTree.Append("</span>");
            List<Category> listSub = DataAccess.GetCategoriesByParentID(node.CategoryId);
            if (listSub.Count > 0)
            {
                sbTree.Append("<ul>");
                foreach (Category childNode in listSub)
                {
                    sbTree.Append("<li>");
                    sbTree.Append(szHitarea);
                    sbTree.Append("<span class=\"folder subCat\">");
                    sbTree.Append(childNode.CategoryTitle);
                    sbTree.Append("</span>");
                    List<Product> listMasterPdts = DataAccess.GetMasterProductsByCategory(childNode.CategoryId);
                    if (listMasterPdts.Count > 0)
                    {
                        sbTree.Append("<ul>");
                        foreach (Product mp in listMasterPdts)
                        {
                            List<Product> listChildPdts = DataAccess.GetChildrenPdtsByMasterID(mp.ProductId);
                            sbTree.Append("<li>");
                            if (listChildPdts.Count > 0)
                            {
                                sbTree.Append(szHitarea);
                                sbTree.Append("<span class=\"folder mpdt\">");
                                sbTree.Append(mp.ProductName);
                                sbTree.Append("</span>");
                            }
                            else
                            {

                                string szMpdtAttrs = string.Format(szAttrs, Server.HtmlEncode(mp.ProductName), mp.ProductNumber, mp.ProductModelNumber);
                                sbTree.Append("<a class=\"file mpdt\" " + szMpdtAttrs + " onclick=\"fillPdtAttrs(this)\">");
                                sbTree.Append(mp.ProductName);
                                nPdtCount++;
                                sbTree.Append("</a>");
                            }

                            if (listChildPdts.Count > 0)
                            {
                                sbTree.Append("<ul>");
                                foreach (Product p in listChildPdts)
                                {
                                    sbTree.Append("<li>");
                                    string szPdtAttrs = string.Format(szAttrs, Server.HtmlEncode(p.ProductName), p.ProductNumber, p.ProductModelNumber);
                                    sbTree.Append("<a class=\"file pdt\" " + szPdtAttrs + " onclick=\"fillPdtAttrs(this)\">");
                                    sbTree.Append(p.ProductName);
                                    nPdtCount++;
                                    sbTree.Append("</a>");
                                    sbTree.Append("</li>");
                                }
                                sbTree.Append("</ul>");
                            }

                            sbTree.Append("</li>");
                        }
                        sbTree.Append("</ul>");
                    }

                    sbTree.Append("</li>");
                }
                sbTree.Append("</ul>");
            }
            sbTree.Append("</li>");



        }

        #endregion


        public void GetNodes()
        {

            string szReturn = string.Empty;
            StringBuilder sbOutput = new StringBuilder();
            int nParentID = 0; string szNodeType = "root";
            if (!string.IsNullOrEmpty(Request.Params["root"]))
            {
                string szRoot = Request.Params["root"];
                if (szRoot == "source")
                {
                    nParentID = 0;
                }
                else
                {
                    nParentID = Convert.ToInt32(szRoot);
                }
            }
            if (!string.IsNullOrEmpty(Request.Params["nodetype"]))
            {
                szNodeType = Request.Params["nodetype"].ToString();
            }
            switch (szNodeType)
            {
                case "root":
                    List<Category> listMainCate = DataAccess.GetCategoriesByParentID(nParentID);
                    szReturn = GetCategoryJson(listMainCate);
                    break;
                case "mainCate":
                    List<Category> listSubCate = DataAccess.GetCategoriesByParentID(nParentID);
                    szReturn = GetSubCategoryJson(listSubCate);
                    break;
                case "subCate":
                    List<Product> listMasterProduct = DataAccess.GetMasterProductsByCategory(nParentID);
                    szReturn = GetMasterProductsJson(listMasterProduct);
                    break;
                case "mpdt":
                    List<Product> listProducts = DataAccess.GetChildrenPdtsByMasterID(nParentID);
                    szReturn = GetProductsJson(listProducts);
                    break;
                default:
                    szReturn = "[{}]";
                    break;
            }
            //FileStream fs=new FileStream(Server.MapPath("~/files")+"/Debug.txt",FileMode.OpenOrCreate);
            //StreamWriter witer = new StreamWriter(fs);
            //witer.WriteLine(szReturn);
            //witer.WriteLine("datetime:" + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
            //witer.Flush();
            //fs.Close();

            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ContentType = "application/json; charset=utf-8";
            HttpContext.Current.Response.AddHeader("Connection", "Close");
            HttpContext.Current.Response.Write(szReturn);
            HttpContext.Current.Response.Flush();
        }

        private string GetCategoryJson(List<Category> list)
        {
            string SzReturn = string.Empty;
            StringBuilder sbJson = new StringBuilder();
            sbJson.AppendLine("[");
            for (int i = 0; i < list.Count; i++)
            {
                Category c = list[i];
                sbJson.AppendLine("{");
                addNaveValue0(ref sbJson, "id", c.CategoryId.ToString());
                addNaveValue0(ref sbJson, "text", c.CategoryTitle);
                addNaveValue0(ref sbJson, "hasChildren", "true");
                addNaveValue0(ref sbJson, "nodetype", "mainCate");
                addNaveValue1(ref sbJson, "classes", "folder");
                sbJson.AppendLine("}");
                if (i != list.Count - 1)
                {
                    sbJson.AppendLine(",");
                }
            }
            sbJson.AppendLine("]");
            SzReturn = sbJson.ToString();
            return SzReturn;
        }
        private string GetSubCategoryJson(List<Category> list)
        {
            string SzReturn = string.Empty;
            StringBuilder sbJson = new StringBuilder();
            sbJson.AppendLine("[");
            for (int i = 0; i < list.Count; i++)
            {
                Category c = list[i];
                sbJson.AppendLine("{");
                addNaveValue0(ref sbJson, "id", c.CategoryId.ToString());
                addNaveValue0(ref sbJson, "text", c.CategoryTitle);
                addNaveValue0(ref sbJson, "hasChildren", "true");
                addNaveValue0(ref sbJson, "nodetype", "subCate");
                addNaveValue1(ref sbJson, "classes", "folder");
                sbJson.AppendLine("}");
                if (i != list.Count - 1)
                {
                    sbJson.AppendLine(",");
                }
            }
            sbJson.AppendLine("]");
            SzReturn = sbJson.ToString();
            return SzReturn;
        }

        private string GetMasterProductsJson(List<Product> list)
        {
            string SzReturn = string.Empty;
            StringBuilder sbJson = new StringBuilder();
            sbJson.AppendLine("[");
            for (int i = 0; i < list.Count; i++)
            {
                Product mp = list[i];
                sbJson.AppendLine("{");
                addNaveValue0(ref sbJson, "id", mp.ProductId.ToString());
                addNaveValue0(ref sbJson, "text", Server.HtmlEncode(mp.ProductName));
                addNaveValue0(ref sbJson, "nodetype", "mpdt");
                bool blHasChildren = mp.HasChidren;

                if (!blHasChildren)
                {
                    addNaveValue0(ref sbJson, "pdtName", Server.HtmlEncode(mp.ProductName));
                    addNaveValue0(ref sbJson, "pdtNumber", mp.ProductNumber);
                    addNaveValue0(ref sbJson, "pdtModelNumber", mp.ProductModelNumber);
                    addNaveValue1(ref sbJson, "classes", "file");
                }
                else
                {
                    addNaveValue0(ref sbJson, "hasChildren", "true");
                    addNaveValue1(ref sbJson, "classes", "folder");
                }
                sbJson.AppendLine("}");
                if (i != list.Count - 1)
                {
                    sbJson.AppendLine(",");
                }
            }
            sbJson.AppendLine("]");
            SzReturn = sbJson.ToString();
            return SzReturn;
        }

        private string GetProductsJson(List<Product> list)
        {
            string SzReturn = string.Empty;
            StringBuilder sbJson = new StringBuilder();
            sbJson.AppendLine("[");
            for (int i = 0; i < list.Count; i++)
            {
                Product p = list[i];
                sbJson.AppendLine("{");
                addNaveValue0(ref sbJson, "id", p.ProductId.ToString());
                addNaveValue0(ref sbJson, "text", Server.HtmlEncode(p.ProductName));
                addNaveValue0(ref sbJson, "nodetype", "pdt");
                addNaveValue0(ref sbJson, "pdtName", Server.HtmlEncode(p.ProductName));
                addNaveValue0(ref sbJson, "pdtNumber", p.ProductNumber);
                addNaveValue0(ref sbJson, "pdtModelNumber", p.ProductModelNumber);
                addNaveValue1(ref sbJson, "classes", "file");
                sbJson.AppendLine("}");
                if (i != list.Count - 1)
                {
                    sbJson.AppendLine(",");
                }
            }
            sbJson.AppendLine("]");
            SzReturn = sbJson.ToString();
            return SzReturn;
        }






        private void addNaveValueStart(ref StringBuilder sb)
        {
            sb.AppendLine(szNameValueStart);
        }
        private void addNaveValueEnd(ref StringBuilder sb)
        {
            sb.AppendLine(szNameValueEnd);
        }
        private void addNaveValue0(ref StringBuilder sb, string szName, string szValue)
        {
            sb.AppendLine(string.Format(szNameValue0, szName, szValue));
        }
        private void addNaveValue1(ref StringBuilder sb, string szName, string szValue)
        {
            sb.AppendLine(string.Format(szNameValue1, szName, szValue));
        }
        private void addNaveValue2Start(ref StringBuilder sb, string szName)
        {
            sb.AppendLine(string.Format(szNameValue2Start, szName));
        }
        private void addNaveValue2End(ref StringBuilder sb)
        {
            sb.AppendLine(szNameValue2End);
        }

   
}
