using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using iTextSharp.text.pdf;
using System.Web;
namespace CSFramework
{
    public class PDFHelper
    {
        public static Dictionary<string, string> GetFormFieldNames(string pdfPath)
        {
            Dictionary<string, string> fields = new Dictionary<string, string>();
            PdfReader reader = new PdfReader(pdfPath);
            foreach (KeyValuePair<string, AcroFields.Item> entry in reader.AcroFields.Fields)
                fields.Add(entry.Key.ToString(), string.Empty);
            reader.Close();
            return fields;            
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pdfPath">Template Path</param>
        /// <param name="formFieldMap"></param>
        /// <returns></returns>
        public static byte[] GeneratePDF(string pdfPath, Dictionary<string, string> formFieldMap)
        {
            MemoryStream output = new MemoryStream();
            PdfReader reader = new PdfReader(pdfPath);
            PdfStamper stamper = new PdfStamper(reader, output);
            AcroFields formFields = stamper.AcroFields;
            foreach (string fieldName in formFieldMap.Keys)
                formFields.SetField(fieldName, formFieldMap[fieldName]);
            stamper.FormFlattening = true;
            stamper.Close();
            reader.Close();
            return output.ToArray();
        }
        /// <summary>
        ///
        /// </summary>
        /// <param name="szTemplatePath">phsical template pdf file path</param>
        /// <param name="szFilePath">the physical file path you wanna generate</param>
        /// <param name="formFieldMap">a dictionary of PDF form field names&their values </param>
        public static void GeneratePDFOnServer(string szTemplatePath, string szFilePath, Dictionary<string, string> formFieldMap)
        {
            MemoryStream output = new MemoryStream();
            PdfReader reader = new PdfReader(szTemplatePath);
            PdfStamper stamper = new PdfStamper(reader, output);
            AcroFields formFields = stamper.AcroFields;
            foreach (string fieldName in formFieldMap.Keys)
            {
                formFields.SetField(fieldName, formFieldMap[fieldName]);
            }
            stamper.FormFlattening = true;
            reader.Close();
            //output.WriteTo(fs);       
            stamper.Close();
            FileStream fs = new FileStream(szFilePath, FileMode.OpenOrCreate);
            BinaryWriter writer = new BinaryWriter(fs, System.Text.Encoding.UTF8);
            byte[] byteContent = output.ToArray();
            foreach (byte bt in byteContent)
            {
                writer.Write(bt);
            }
            writer.Close();
            fs.Close();
        }

        // See http://stackoverflow.com/questions/4491156/get-the-export-value-of-a-checkbox-using-itextsharp/
        public static string GetExportValue(AcroFields.Item item)
        {
            PdfDictionary valueDict = item.GetValue(0);
            PdfDictionary appearanceDict = valueDict.GetAsDict(PdfName.AP);

            if (appearanceDict != null)
            {
                PdfDictionary normalAppearances = appearanceDict.GetAsDict(PdfName.N);
                // /D is for the "down" appearances.

                // if there are normal appearances, one key will be "Off", and the other
                // will be the export value... there should only be two.
                if (normalAppearances != null)
                {
                    foreach (PdfName curKey in normalAppearances.Keys)
                        if (!PdfName.OFF.Equals(curKey))
                            return curKey.ToString().Substring(1); // string will have a leading '/' character, so remove it!
                }
            }

            // if that doesn't work, there might be an /AS key, whose value is a name with 
            // the export value, again with a leading '/', so remove it!
            PdfName curVal = valueDict.GetAsName(PdfName.AS);
            if (curVal != null)
                return curVal.ToString().Substring(1);
            else
                return string.Empty;
        }

        public static void ReturnPDF(byte[] contents)
        {
            ReturnPDF(contents, null);
        }

        public static void ReturnPDF(byte[] contents, string attachmentFilename)
        {
            HttpResponse response = HttpContext.Current.Response;
            if (!string.IsNullOrEmpty(attachmentFilename))
                response.AddHeader("Content-Disposition", "attachment; filename=" + attachmentFilename);
            response.ContentType = "application/pdf";
            response.BinaryWrite(contents);
            response.End();
        }
    }
}
