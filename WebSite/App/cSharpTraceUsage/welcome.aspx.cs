using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class App_cSharpTraceUsage_welcome : System.Web.UI.Page
{
    
    protected void Page_Load(object sender, EventArgs e)
    {
        Trace.TraceFinished += new TraceContextEventHandler(Trace_TraceFinished);
        if (!Page.IsPostBack)
        {
            Trace.Warn("mycustom", "111");
            Trace.Warn("mycustom", "222");
            Trace.Write("mycustom", "333");
            Trace.Write("mycustom", "333");           
        }
    }

    void Trace_TraceFinished(object sender, TraceContextEventArgs e)
    {
        ICollection collect = e.TraceRecords;        
        foreach (object o in collect)
        {
            TraceContextRecord record = (TraceContextRecord)o;
            Response.Write(record.Category+"\t"+record.Message+"\t"+record.IsWarning+"<br/>");
            if (record.ErrorInfo != null)
            {
                Response.Write(record.ErrorInfo.ToString() + "<br/>");
            }
        }       
    }
   
}