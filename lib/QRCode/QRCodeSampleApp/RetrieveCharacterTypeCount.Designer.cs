namespace QRCodeSample
{
    partial class RetrieveCharacterTypeCount
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
            this.btnGet = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.lblChinese = new System.Windows.Forms.Label();
            this.lblLetter = new System.Windows.Forms.Label();
            this.lblDigit = new System.Windows.Forms.Label();
            this.lblPunc = new System.Windows.Forms.Label();
            this.lblOthers = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.lblLower = new System.Windows.Forms.Label();
            this.lblUpper = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.lblAll = new System.Windows.Forms.Label();
            this.lblWhiteSpace = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.lblSymbo = new System.Windows.Forms.Label();
            this.lblControl = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.label14 = new System.Windows.Forms.Label();
            this.ltlOtherByte = new System.Windows.Forms.Label();
            this.ltlChinseByte = new System.Windows.Forms.Label();
            this.label12 = new System.Windows.Forms.Label();
            this.label15 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // txtContent
            // 
            this.txtContent.Location = new System.Drawing.Point(12, 12);
            this.txtContent.Multiline = true;
            this.txtContent.Name = "txtContent";
            this.txtContent.Size = new System.Drawing.Size(430, 155);
            this.txtContent.TabIndex = 0;
            // 
            // btnGet
            // 
            this.btnGet.Location = new System.Drawing.Point(12, 173);
            this.btnGet.Name = "btnGet";
            this.btnGet.Size = new System.Drawing.Size(169, 23);
            this.btnGet.TabIndex = 1;
            this.btnGet.Text = "获取各类字符个数";
            this.btnGet.UseVisualStyleBackColor = true;
            this.btnGet.Click += new System.EventHandler(this.btnGet_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(72, 238);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(41, 12);
            this.label1.TabIndex = 2;
            this.label1.Text = "汉字：";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(48, 278);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(65, 12);
            this.label2.TabIndex = 3;
            this.label2.Text = "英文字母：";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(72, 312);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(41, 12);
            this.label3.TabIndex = 4;
            this.label3.Text = "数字：";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(60, 363);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(53, 12);
            this.label4.TabIndex = 5;
            this.label4.Text = "其他字符";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(48, 341);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(65, 12);
            this.label5.TabIndex = 6;
            this.label5.Text = "标点符号：";
            // 
            // lblChinese
            // 
            this.lblChinese.AutoSize = true;
            this.lblChinese.Location = new System.Drawing.Point(154, 238);
            this.lblChinese.Name = "lblChinese";
            this.lblChinese.Size = new System.Drawing.Size(0, 12);
            this.lblChinese.TabIndex = 7;
            // 
            // lblLetter
            // 
            this.lblLetter.AutoSize = true;
            this.lblLetter.Location = new System.Drawing.Point(154, 278);
            this.lblLetter.Name = "lblLetter";
            this.lblLetter.Size = new System.Drawing.Size(0, 12);
            this.lblLetter.TabIndex = 8;
            // 
            // lblDigit
            // 
            this.lblDigit.AutoSize = true;
            this.lblDigit.Location = new System.Drawing.Point(154, 312);
            this.lblDigit.Name = "lblDigit";
            this.lblDigit.Size = new System.Drawing.Size(0, 12);
            this.lblDigit.TabIndex = 9;
            // 
            // lblPunc
            // 
            this.lblPunc.AutoSize = true;
            this.lblPunc.Location = new System.Drawing.Point(154, 341);
            this.lblPunc.Name = "lblPunc";
            this.lblPunc.Size = new System.Drawing.Size(0, 12);
            this.lblPunc.TabIndex = 10;
            // 
            // lblOthers
            // 
            this.lblOthers.AutoSize = true;
            this.lblOthers.Location = new System.Drawing.Point(154, 363);
            this.lblOthers.Name = "lblOthers";
            this.lblOthers.Size = new System.Drawing.Size(0, 12);
            this.lblOthers.TabIndex = 11;
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(401, 238);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(29, 12);
            this.label6.TabIndex = 12;
            this.label6.Text = "小写";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(401, 278);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(29, 12);
            this.label7.TabIndex = 13;
            this.label7.Text = "大写";
            // 
            // lblLower
            // 
            this.lblLower.AutoSize = true;
            this.lblLower.Location = new System.Drawing.Point(462, 238);
            this.lblLower.Name = "lblLower";
            this.lblLower.Size = new System.Drawing.Size(11, 12);
            this.lblLower.TabIndex = 14;
            this.lblLower.Text = "0";
            // 
            // lblUpper
            // 
            this.lblUpper.AutoSize = true;
            this.lblUpper.Location = new System.Drawing.Point(462, 278);
            this.lblUpper.Name = "lblUpper";
            this.lblUpper.Size = new System.Drawing.Size(11, 12);
            this.lblUpper.TabIndex = 15;
            this.lblUpper.Text = "0";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(401, 200);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(89, 12);
            this.label8.TabIndex = 16;
            this.label8.Text = "字符串总长度：";
            // 
            // lblAll
            // 
            this.lblAll.AutoSize = true;
            this.lblAll.Location = new System.Drawing.Point(496, 200);
            this.lblAll.Name = "lblAll";
            this.lblAll.Size = new System.Drawing.Size(11, 12);
            this.lblAll.TabIndex = 17;
            this.lblAll.Text = "0";
            // 
            // lblWhiteSpace
            // 
            this.lblWhiteSpace.AutoSize = true;
            this.lblWhiteSpace.Location = new System.Drawing.Point(496, 312);
            this.lblWhiteSpace.Name = "lblWhiteSpace";
            this.lblWhiteSpace.Size = new System.Drawing.Size(11, 12);
            this.lblWhiteSpace.TabIndex = 23;
            this.lblWhiteSpace.Text = "0";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Location = new System.Drawing.Point(401, 312);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(65, 12);
            this.label10.TabIndex = 22;
            this.label10.Text = "空格长度：";
            // 
            // lblSymbo
            // 
            this.lblSymbo.AutoSize = true;
            this.lblSymbo.Location = new System.Drawing.Point(462, 390);
            this.lblSymbo.Name = "lblSymbo";
            this.lblSymbo.Size = new System.Drawing.Size(11, 12);
            this.lblSymbo.TabIndex = 21;
            this.lblSymbo.Text = "0";
            // 
            // lblControl
            // 
            this.lblControl.AutoSize = true;
            this.lblControl.Location = new System.Drawing.Point(462, 350);
            this.lblControl.Name = "lblControl";
            this.lblControl.Size = new System.Drawing.Size(11, 12);
            this.lblControl.TabIndex = 20;
            this.lblControl.Text = "0";
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(401, 390);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(29, 12);
            this.label13.TabIndex = 19;
            this.label13.Text = "符号";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Location = new System.Drawing.Point(401, 350);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(53, 12);
            this.label14.TabIndex = 18;
            this.label14.Text = "控制字符";
            // 
            // ltlOtherByte
            // 
            this.ltlOtherByte.AutoSize = true;
            this.ltlOtherByte.Location = new System.Drawing.Point(703, 352);
            this.ltlOtherByte.Name = "ltlOtherByte";
            this.ltlOtherByte.Size = new System.Drawing.Size(11, 12);
            this.ltlOtherByte.TabIndex = 27;
            this.ltlOtherByte.Text = "0";
            // 
            // ltlChinseByte
            // 
            this.ltlChinseByte.AutoSize = true;
            this.ltlChinseByte.Location = new System.Drawing.Point(703, 312);
            this.ltlChinseByte.Name = "ltlChinseByte";
            this.ltlChinseByte.Size = new System.Drawing.Size(11, 12);
            this.ltlChinseByte.TabIndex = 26;
            this.ltlChinseByte.Text = "0";
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.Location = new System.Drawing.Point(606, 350);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(65, 12);
            this.label12.TabIndex = 25;
            this.label12.Text = "其他字节数";
            // 
            // label15
            // 
            this.label15.AutoSize = true;
            this.label15.Location = new System.Drawing.Point(606, 312);
            this.label15.Name = "label15";
            this.label15.Size = new System.Drawing.Size(65, 12);
            this.label15.TabIndex = 24;
            this.label15.Text = "汉字字节数";
            // 
            // RetrieveCharacterTypeCount
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(909, 410);
            this.Controls.Add(this.ltlOtherByte);
            this.Controls.Add(this.ltlChinseByte);
            this.Controls.Add(this.label12);
            this.Controls.Add(this.label15);
            this.Controls.Add(this.lblWhiteSpace);
            this.Controls.Add(this.label10);
            this.Controls.Add(this.lblSymbo);
            this.Controls.Add(this.lblControl);
            this.Controls.Add(this.label13);
            this.Controls.Add(this.label14);
            this.Controls.Add(this.lblAll);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.lblUpper);
            this.Controls.Add(this.lblLower);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.lblOthers);
            this.Controls.Add(this.lblPunc);
            this.Controls.Add(this.lblDigit);
            this.Controls.Add(this.lblLetter);
            this.Controls.Add(this.lblChinese);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.btnGet);
            this.Controls.Add(this.txtContent);
            this.Name = "RetrieveCharacterTypeCount";
            this.Text = "RetrieveCharacterTypeCount";
            this.Load += new System.EventHandler(this.RetrieveCharacterTypeCount_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox txtContent;
        private System.Windows.Forms.Button btnGet;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label lblChinese;
        private System.Windows.Forms.Label lblLetter;
        private System.Windows.Forms.Label lblDigit;
        private System.Windows.Forms.Label lblPunc;
        private System.Windows.Forms.Label lblOthers;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label lblLower;
        private System.Windows.Forms.Label lblUpper;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label lblAll;
        private System.Windows.Forms.Label lblWhiteSpace;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label lblSymbo;
        private System.Windows.Forms.Label lblControl;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Label label14;
        private System.Windows.Forms.Label ltlOtherByte;
        private System.Windows.Forms.Label ltlChinseByte;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.Label label15;
    }
}