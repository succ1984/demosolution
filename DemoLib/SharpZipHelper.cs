using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ICSharpCode.SharpZipLib.Core;
using ICSharpCode.SharpZipLib.Zip;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.Security;
using System.Security;
using System.Security.Principal;
namespace CSFramework
{
    public class SharpZipHelper   
    {
        public SharpZipHelper()
        {
            FormsAuthenticationModule module = new FormsAuthenticationModule();
            module.Authenticate += new FormsAuthenticationEventHandler(module_Authenticate);
            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket("acheng", true, 20);
            FormsIdentity identity = new FormsIdentity(ticket);
            System.Security.Principal.GenericIdentity gIdentity = new System.Security.Principal.GenericIdentity("acheng", "generic");
            GenericPrincipal pricipal = new GenericPrincipal(gIdentity, new string[] {"admin","superadmin"});
            
        }

        void module_Authenticate(object sender, FormsAuthenticationEventArgs e)
        {
            throw new NotImplementedException();
        }


        #region Compresses the files in the nominated folder, and creates a zip file on disk named as outPathname.
        /// <summary>
        /// 
        /// </summary>
        /// <param name="outPathname">phsical filePath</param>
        /// <param name="password">can be nullOrEmpty</param>
        /// <param name="folderName">phsical folderPath</param>
        public void ZipFolder(string outPathname, string password, string folderName)
        {

            FileStream fsOut = File.Create(outPathname);
            ZipOutputStream zipStream = new ZipOutputStream(fsOut);

            zipStream.SetLevel(3); //0-9, 9 being the highest level of compression

            zipStream.Password = password;	// optional. Null is the same as not setting.

            // This setting will strip the leading part of the folder path in the entries, to
            // make the entries relative to the starting folder.
            // To include the full path for each entry up to the drive root, assign folderOffset = 0.
            int folderOffset = folderName.Length + (folderName.EndsWith("\\") ? 0 : 1);

            CompressFolder(folderName, zipStream, folderOffset);

            zipStream.IsStreamOwner = true;	// Makes the Close also Close the underlying stream
            zipStream.Close();
        }

        // Recurses down the folder structure
        //
        private void CompressFolder(string path, ZipOutputStream zipStream, int folderOffset)
        {

            string[] files = Directory.GetFiles(path);

            foreach (string filename in files)
            {

                FileInfo fi = new FileInfo(filename);

                string entryName = filename.Substring(folderOffset); // Makes the name in zip based on the folder
                entryName = ZipEntry.CleanName(entryName); // Removes drive from name and fixes slash direction
                ZipEntry newEntry = new ZipEntry(entryName);
                newEntry.DateTime = fi.LastWriteTime; // Note the zip format stores 2 second granularity

                // Specifying the AESKeySize triggers AES encryption. Allowable values are 0 (off), 128 or 256.
                //   newEntry.AESKeySize = 256;

                // To permit the zip to be unpacked by built-in extractor in WinXP and Server2003, WinZip 8, Java, and other older code,
                // you need to do one of the following: Specify UseZip64.Off, or set the Size.
                // If the file may be bigger than 4GB, or you do not need WinXP built-in compatibility, you do not need either,
                // but the zip will be in Zip64 format which not all utilities can understand.
                //   zipStream.UseZip64 = UseZip64.Off;
                newEntry.Size = fi.Length;

                zipStream.PutNextEntry(newEntry);

                // Zip the file in buffered chunks
                // the "using" will close the stream even if an exception occurs
                byte[] buffer = new byte[4096];
                using (FileStream streamReader = File.OpenRead(filename))
                {
                    StreamUtils.Copy(streamReader, zipStream, buffer);
                }
                zipStream.CloseEntry();
            }
            string[] folders = Directory.GetDirectories(path);
            foreach (string folder in folders)
            {
                CompressFolder(folder, zipStream, folderOffset);
            }
        }
        #endregion


        #region  Compresses the supplied memory stream, naming it as zipEntryName, into a zip,which is returned as a memory stream or a byte array.
        public MemoryStream CreateToMemoryStream(MemoryStream memStreamIn, string zipEntryName)
        {

            MemoryStream outputMemStream = new MemoryStream();
            ZipOutputStream zipStream = new ZipOutputStream(outputMemStream);

            zipStream.SetLevel(3); //0-9, 9 being the highest level of compression

            ZipEntry newEntry = new ZipEntry(zipEntryName);
            newEntry.DateTime = DateTime.Now;

            zipStream.PutNextEntry(newEntry);

            StreamUtils.Copy(memStreamIn, zipStream, new byte[4096]);
            zipStream.CloseEntry();

            zipStream.IsStreamOwner = false;	// False stops the Close also Closing the underlying stream.
            zipStream.Close();			// Must finish the ZipOutputStream before using outputMemStream.

            outputMemStream.Position = 0;
            return outputMemStream;

            // Alternative outputs:
            // ToArray is the cleaner and easiest to use correctly with the penalty of duplicating allocated memory.
            // byte[] byteArrayOut = outputMemStream.ToArray();

            // GetBuffer returns a raw buffer raw and so you need to account for the true length yourself.
            byte[] byteArrayOut = outputMemStream.GetBuffer();
            long len = outputMemStream.Length;
        }



        #endregion


        #region Create a Zip as a browser download attachment in IIS

        // This will accumulate each of the files named in the fileList into a zip file,
        // and stream it to the browser.
        // This approach writes directly to the Response OutputStream.
        // The browser starts to receive data immediately which should avoid timeout problems.
        // This also avoids an intermediate memorystream, saving memory on large files.
        //
        public void DownloadZipToBrowser(List<string> zipFileList, Page page)
        {

            page.Response.ContentType = "application/zip";
            // If the browser is receiving a mangled zipfile, IIS Compression may cause this problem. Some members have found that
            //    Response.ContentType = "application/octet-stream"     has solved this. May be specific to Internet Explorer.

            page.Response.AppendHeader("content-disposition", "attachment; filename=\"Download.zip\"");
            page.Response.CacheControl = "Private";
            page.Response.Cache.SetExpires(DateTime.Now.AddMinutes(3)); // or put a timestamp in the filename in the content-disposition

            byte[] buffer = new byte[4096];

            ZipOutputStream zipOutputStream = new ZipOutputStream(page.Response.OutputStream);
            zipOutputStream.SetLevel(3); //0-9, 9 being the highest level of compression

            foreach (string fileName in zipFileList)
            {

                Stream fs = File.OpenRead(fileName);	// or any suitable inputstream
                FileInfo file = new FileInfo(fileName);
                ZipEntry entry = new ZipEntry(file.Name);//ZipEntry.CleanName(fileName)
                entry.Size = fs.Length;
                // Setting the Size provides WinXP built-in extractor compatibility,
                //  but if not available, you can set zipOutputStream.UseZip64 = UseZip64.Off instead.

                zipOutputStream.PutNextEntry(entry);

                int count = fs.Read(buffer, 0, buffer.Length);
                while (count > 0)
                {
                    zipOutputStream.Write(buffer, 0, count);
                    count = fs.Read(buffer, 0, buffer.Length);
                    if (!page.Response.IsClientConnected)
                    {
                        break;
                    }
                    page.Response.Flush();
                }
                fs.Close();
            }
            zipOutputStream.Close();
            page.Response.Flush();
            page.Response.End();
        }


        #endregion


        #region Unpack a Zip with full control over the operation

        //This sample illustrates many aspects:
        //skipping directory entries
        //controlling the folder where the output is placed
        //passwords
        //exception handling, closing disk files, and efficient use of memory.
        public void ExtractZipFile(string archiveFilenameIn, string password, string outFolder)
        {
            ZipFile zf = null;
            try
            {
                FileStream fs = File.OpenRead(archiveFilenameIn);
                zf = new ZipFile(fs);
                if (!String.IsNullOrEmpty(password))
                {
                    zf.Password = password;		// AES encrypted entries are handled automatically
                }
                foreach (ZipEntry zipEntry in zf)
                {
                    if (!zipEntry.IsFile)
                    {
                        continue;			// Ignore directories
                    }
                    String entryFileName = zipEntry.Name;
                    // to remove the folder from the entry:- entryFileName = Path.GetFileName(entryFileName);
                    // Optionally match entrynames against a selection list here to skip as desired.
                    // The unpacked length is available in the zipEntry.Size property.

                    byte[] buffer = new byte[4096];		// 4K is optimum
                    Stream zipStream = zf.GetInputStream(zipEntry);

                    // Manipulate the output filename here as desired.
                    String fullZipToPath = Path.Combine(outFolder, entryFileName);
                    string directoryName = Path.GetDirectoryName(fullZipToPath);
                    if (directoryName.Length > 0)
                        Directory.CreateDirectory(directoryName);

                    // Unzip file in buffered chunks. This is just as fast as unpacking to a buffer the full size
                    // of the file, but does not waste memory.
                    // The "using" will close the stream even if an exception occurs.
                    using (FileStream streamWriter = File.Create(fullZipToPath))
                    {
                        StreamUtils.Copy(zipStream, streamWriter, buffer);
                    }
                }
            }
            finally
            {
                if (zf != null)
                {
                    zf.IsStreamOwner = true; // Makes close also shut the underlying stream
                    zf.Close(); // Ensure we release resources
                }
            }
        }

        #endregion


        #region Unpack a Zip - including embedded zips - and re-pack into a new zip or memorystream

        private ZipOutputStream _zipOut;
        private byte[] _buffer = new byte[4096];

        // This example illustrates reading an input disk file (or any input stream),
        // extracting the individual files, including from embedded zipfiles,
        // and writing them to a new zipfile with an output memorystream or disk file.
        //
        public void DoRebuildFile(string zipFileIn, string password)
        {

            Stream inStream = File.OpenRead(zipFileIn);

            MemoryStream outputMemStream = new MemoryStream();
            _zipOut = new ZipOutputStream(outputMemStream);
            _zipOut.IsStreamOwner = false;	// False stops the Close also Closing the underlying stream.

            // To output to a disk file, replace the above with
            //
            //   FileStream fsOut = File.Create(newZipFileName);
            //   _zipOut = new ZipOutputStream(fsOut);
            //   _zipOut.IsStreamOwner = true;	// Makes the Close also Close the underlying stream.

            _zipOut.SetLevel(3);
            _zipOut.Password = password;		// optional

            RecursiveExtractRebuild(inStream);
            inStream.Close();

            // Must finish the ZipOutputStream to finalise output before using outputMemStream.
            _zipOut.Close();

            outputMemStream.Position = 0;

            // At this point the underlying output memory stream (outputMemStream) contains the zip.
            // If outputting to a web response, see the "Create a Zip as a browser download attachment in IIS" example above.
            // See the "Create a Zip to a memory stream or byte array" example for other output options.
        }

        // Calls itself recursively if embedded zip
        //
        private void RecursiveExtractRebuild(Stream str)
        {

            ZipFile zipFile = new ZipFile(str);
            zipFile.IsStreamOwner = false;

            foreach (ZipEntry zipEntry in zipFile)
            {
                if (!zipEntry.IsFile)
                    continue;
                String entryFileName = zipEntry.Name; // or Path.GetFileName(zipEntry.Name) to omit folder
                // Specify any other filtering here.

                Stream zipStream = zipFile.GetInputStream(zipEntry);
                // Zips-within-zips are extracted. If you don't want this and wish to keep embedded zips as-is, just delete these 3 lines. 
                if (entryFileName.EndsWith(".zip", StringComparison.OrdinalIgnoreCase))
                {
                    RecursiveExtractRebuild(zipStream);
                }
                else
                {
                    ZipEntry newEntry = new ZipEntry(entryFileName);
                    newEntry.DateTime = zipEntry.DateTime;
                    newEntry.Size = zipEntry.Size;
                    // Setting the Size will allow the zip to be unpacked by XP's built-in extractor and other older code.

                    _zipOut.PutNextEntry(newEntry);

                    StreamUtils.Copy(zipStream, _zipOut, _buffer);
                    _zipOut.CloseEntry();
                }
            }
        }


        #endregion


        #region Unpack a zip using ZipInputStream (eg for Unseekable input streams)

        // Calling example:
        //WebClient webClient = new WebClient();
        //Stream data = webClient.OpenRead("http://www.example.com/test.zip");
        // This stream cannot be opened with the ZipFile class because CanSeek is false.
        //GetViaZipInput(data, @"c:\temp");

        //The ZipInputStream has one major advantage over using ZipFile to read a zip: it can read from an unseekable input stream - such as a WebClient download. However it currently cannot decode AES encrypted zips.

        public void GetViaZipInput(Stream zipStream, string outFolder)
        {

            ZipInputStream zipInputStream = new ZipInputStream(zipStream);
            ZipEntry zipEntry = zipInputStream.GetNextEntry();
            while (zipEntry != null)
            {
                String entryFileName = zipEntry.Name;
                // to remove the folder from the entry:- entryFileName = Path.GetFileName(entryFileName);
                // Optionally match entrynames against a selection list here to skip as desired.
                // The unpacked length is available in the zipEntry.Size property.

                byte[] buffer = new byte[4096];		// 4K is optimum

                // Manipulate the output filename here as desired.
                String fullZipToPath = Path.Combine(outFolder, entryFileName);
                string directoryName = Path.GetDirectoryName(fullZipToPath);
                if (directoryName.Length > 0)
                    Directory.CreateDirectory(directoryName);

                // Unzip file in buffered chunks. This is just as fast as unpacking to a buffer the full size
                // of the file, but does not waste memory.
                // The "using" will close the stream even if an exception occurs.
                using (FileStream streamWriter = File.Create(fullZipToPath))
                {
                    StreamUtils.Copy(zipInputStream, streamWriter, buffer);
                }
                zipEntry = zipInputStream.GetNextEntry();
            }
        }


        #endregion






    }
}
