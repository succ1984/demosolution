using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.IO;
using System.Threading;
using System.Collections.Specialized;
using System.Collections;

using Microsoft.Practices.EnterpriseLibrary.Common;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.ObjectBuilder;
using System.Data.Common;

namespace CSFramework
{
    public class DataBasePageStatePersister : PageStatePersister
    {
        private Database db;
        private DbCommand comm;
        private static List<DictionaryEntry> listPageState = new List<DictionaryEntry>();
        private string szViewStateName = "__VIEWSTATE_KEY";
        public DataBasePageStatePersister(Page page)
            : base(page)
        {
            db = DatabaseFactory.CreateDatabase("local");
        }

        public override void Load()
        {

            string szStateID = base.Page.Request[szViewStateName].ToString();

            Pair statePair = LoadViewState(szStateID);

            this.ViewState = statePair.First;
            this.ControlState = statePair.Second;
        }

        public override void Save()
        {
            if (this.ViewState != null || this.ControlState != null)
            {
                Guid guid = Guid.NewGuid();
                string szNewStateID = guid.ToString();
                base.Page.ClientScript.RegisterHiddenField(szViewStateName, szNewStateID);               
                Pair pairState = new Pair(ViewState, ControlState);
                SaveViewState(szNewStateID, pairState);
            }
        }



        public Pair LoadViewState(string szViewStateID)
        {
            Pair statePair = null;
            foreach (DictionaryEntry entry in listPageState)
            {
                if (entry.Key.ToString() == szViewStateID)
                {
                    statePair = (Pair)entry.Value;
                    break;
                }
            }

            if (statePair == null)
            {
                string szSql = "SELECT szContent FROM tb_ViewState WHERE ViewStateID='" + szViewStateID + "'";
                comm = db.GetSqlStringCommand(szSql);
                object obj = db.ExecuteScalar(comm);
                if (obj != null)
                {
                    string szViewState = obj.ToString();
                    IStateFormatter formatter = base.StateFormatter;
                    statePair = (Pair)formatter.Deserialize(szViewState);
                }

            }
            return statePair;
        }

        public void SaveViewState(string szViewStateID, Pair pairState)
        {
            DictionaryEntry entryNew = new DictionaryEntry();
            entryNew.Key = szViewStateID;
            entryNew.Value = pairState;
            listPageState.Add(entryNew);

            IStateFormatter formatter = base.StateFormatter;
            string szStateNew = formatter.Serialize(entryNew);
            string szSql = "INSERT INTO tb_ViewState(ViewStateID,szContent) VALUES('{0}','{1}')";
            szSql = string.Format(szSql, szViewStateID, szStateNew);
            comm = db.GetSqlStringCommand(szSql);
            db.ExecuteNonQuery(comm);
            if (listPageState.Count >= 1000)
            {
                listPageState.RemoveRange(0, listPageState.Count - 1000);
            }


        }


    }




    public class FilePageStatePersister : PageStatePersister
    {
        private string szDirPath;
        private string szPostfix = ".vsf";
        private string szViewStateName = "__VIEWSTATE_KEY";

        public FilePageStatePersister(Page page)
            : base(page)
        {
            szDirPath = page.Server.MapPath("/App_Data/viewstate/");    
        }

        public override void Load()
        {

            string szStateID = base.Page.Request[szViewStateName].ToString();
            //deserialize stateID
            szStateID = this.StateFormatter.Deserialize(szStateID).ToString();
            Pair statePair = LoadViewState(szStateID);

            this.ViewState = statePair.First;
            this.ControlState = statePair.Second;
        }

        public override void Save()
        {
            if (this.ViewState != null || this.ControlState != null)
            {
                Guid guid = Guid.NewGuid();
                string szNewStateID = guid.ToString();
                //serialize stateID
                string szNewStateIDInHidden = this.StateFormatter.Serialize(szNewStateID);
                base.Page.ClientScript.RegisterHiddenField(szViewStateName, szNewStateIDInHidden);
                Pair pairState = new Pair(ViewState, ControlState);
                SaveViewState(szNewStateID, pairState);
            }
        }



        public Pair LoadViewState(string szViewStateID)
        {
            Pair statePair = null;
            
            if (statePair == null)
            {
                string szFileName = szViewStateID + szPostfix;
                string szFilePath = Path.Combine(szDirPath, szFileName);
                FileStream stream = new FileStream(szFilePath, FileMode.Open, FileAccess.ReadWrite);
                StreamReader sr = new StreamReader(stream,System.Text.Encoding.Default);
                string szViewState = sr.ReadToEnd();
                sr.Close();               
                if (!string.IsNullOrEmpty(szViewState))
                {                  
                    IStateFormatter formatter = base.StateFormatter;
                    statePair = (Pair)formatter.Deserialize(szViewState);
                }

            }
            return statePair;
        }

        public void SaveViewState(string szViewStateID, Pair pairState)
        {
            IStateFormatter formatter = base.StateFormatter;
            string szPairState = formatter.Serialize(pairState);
            string szFileName = szViewStateID + szPostfix;
            string szFilePath = Path.Combine(szDirPath, szFileName);
            FileStream stream = new FileStream(szFilePath, FileMode.OpenOrCreate, FileAccess.ReadWrite);
            StreamWriter sw = new StreamWriter(stream, System.Text.Encoding.Default);
            sw.Write(szPairState);
            sw.Flush();
            sw.Close();
        }


    }



    public class CachePageStatePersister : PageStatePersister
    {
        
        private string szViewStateName = "__VIEWSTATE_KEY";
        public CachePageStatePersister(Page page)
            : base(page)
        {
            
        }

        public override void Load()
        {

            string szStateID = base.Page.Request[szViewStateName].ToString();
            szStateID = this.StateFormatter.Deserialize(szStateID).ToString();
            Pair statePair = LoadViewState(szStateID);

            this.ViewState = statePair.First;
            this.ControlState = statePair.Second;
        }

        public override void Save()
        {
            if (this.ViewState != null || this.ControlState != null)
            {

                string szNewStateID = PageKey;
                string szNewStateIDInHidden = this.StateFormatter.Serialize(szNewStateID);
                base.Page.ClientScript.RegisterHiddenField(szViewStateName, szNewStateIDInHidden);
                Pair pairState = new Pair(ViewState, ControlState);
                SaveViewState(szNewStateID, pairState);
            }
        }



        public Pair LoadViewState(string szViewStateID)
        {
            Pair statePair = null;
          
            if (statePair == null)
            {
                object obj = Page.Cache[szViewStateID];
                if (obj != null)
                {
                    string szViewState = obj.ToString();
                    IStateFormatter formatter = base.StateFormatter;
                    statePair = (Pair)formatter.Deserialize(szViewState);
                }

            }
            return statePair;
        }

        public void SaveViewState(string szViewStateID, Pair pairState)
        {            

            IStateFormatter formatter = base.StateFormatter;
            Page.Cache[szViewStateID] = formatter.Serialize(pairState);
        }

        public string PageKey
        {
            get
            {
                return Page.Session.SessionID + "_page_saveviewstatetoother_aspx";
            }
        }





    }







}
