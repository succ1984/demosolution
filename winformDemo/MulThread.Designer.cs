namespace winformDemo
{
    partial class MulThread
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.txtContent = new System.Windows.Forms.TextBox();
            this.btnGetConent = new System.Windows.Forms.Button();
            this.txtTest = new System.Windows.Forms.TextBox();
            this.btnGetBaiDu = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // txtContent
            // 
            this.txtContent.Location = new System.Drawing.Point(12, 74);
            this.txtContent.Multiline = true;
            this.txtContent.Name = "txtContent";
            this.txtContent.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.txtContent.Size = new System.Drawing.Size(506, 131);
            this.txtContent.TabIndex = 0;
            // 
            // btnGetConent
            // 
            this.btnGetConent.Location = new System.Drawing.Point(12, 211);
            this.btnGetConent.Name = "btnGetConent";
            this.btnGetConent.Size = new System.Drawing.Size(75, 23);
            this.btnGetConent.TabIndex = 1;
            this.btnGetConent.Text = "Get";
            this.btnGetConent.UseVisualStyleBackColor = true;
            this.btnGetConent.Click += new System.EventHandler(this.btnGetConent_Click);
            // 
            // txtTest
            // 
            this.txtTest.Location = new System.Drawing.Point(12, 34);
            this.txtTest.Name = "txtTest";
            this.txtTest.Size = new System.Drawing.Size(506, 21);
            this.txtTest.TabIndex = 2;
            // 
            // btnGetBaiDu
            // 
            this.btnGetBaiDu.AutoSize = true;
            this.btnGetBaiDu.Location = new System.Drawing.Point(121, 211);
            this.btnGetBaiDu.Name = "btnGetBaiDu";
            this.btnGetBaiDu.Size = new System.Drawing.Size(135, 23);
            this.btnGetBaiDu.TabIndex = 3;
            this.btnGetBaiDu.Text = "异步获取百度首页内容";
            this.btnGetBaiDu.UseVisualStyleBackColor = true;
            this.btnGetBaiDu.Click += new System.EventHandler(this.btnGetBaiDu_Click);
            // 
            // MulThread
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(549, 304);
            this.Controls.Add(this.btnGetBaiDu);
            this.Controls.Add(this.txtTest);
            this.Controls.Add(this.btnGetConent);
            this.Controls.Add(this.txtContent);
            this.Name = "MulThread";
            this.Text = "MulThread";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox txtContent;
        private System.Windows.Forms.Button btnGetConent;
        private System.Windows.Forms.TextBox txtTest;
        private System.Windows.Forms.Button btnGetBaiDu;
    }
}