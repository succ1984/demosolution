using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;

using System.Data.SqlClient;

using System.Timers;

namespace WithourDealerOrders
{
    public partial class WithoutDealerOrderService : ServiceBase
    {
        public WithoutDealerOrderService()
        {
            InitializeComponent();
        }

        private Timer timer = new Timer(3600000);//每小时运行1次

        protected override void OnStart(string[] args)
        {
            this.timer.Enabled = true;
            this.timer.Start();
            this.timer.Elapsed += new ElapsedEventHandler(timer_Elapsed);
        }

        void timer_Elapsed(object sender, ElapsedEventArgs e)
        {
            SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["PriceConnString"].ConnectionString);
            string szSql = "p_WithoutDealerOrderTransfer";
            SqlCommand comm = new SqlCommand(szSql, conn);
            comm.CommandType = CommandType.StoredProcedure;
            conn.Open();
            comm.ExecuteNonQuery();
            conn.Close();
        }

       
        protected override void OnStop()
        {
            this.timer.Enabled = false;
            this.timer.Close();
        }
    }
}
