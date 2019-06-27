using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Text.RegularExpressions;
namespace QRCodeSample
{
    public partial class RetrieveCharacterTypeCount : Form
    {
        public RetrieveCharacterTypeCount()
        {
            InitializeComponent();
        }

        private void RetrieveCharacterTypeCount_Load(object sender, EventArgs e)
        {

        }

        private void btnGet_Click(object sender, EventArgs e)
        {
            int nAllLength = 0;
            int nLower = 0;
            int nUpper = 0;
            int nDigit = 0;
            int nPunctuation = 0;
            int nChinese = 0;
            int nSymbol = 0;
            int nControl = 0;
            int nWhiteSpace=0;
            string szText = txtContent.Text;
            nAllLength = szText.Length;
            char[] arrChars = szText.Trim().ToCharArray();
            var listChars = arrChars.ToList<char>();
            nLower = (from p in listChars
                      where CharacterHelper.IsLowerCaseLetter(p) == true
                      select p).Count();

            nUpper = (from p in listChars
                      where CharacterHelper.IsUpperCaseLetter(p) == true
                      select p).Count();
            nDigit = (from p in listChars
                      where CharacterHelper.IsDigitLetter(p) == true
                      select p).Count();
            nPunctuation = (from p in listChars
                            where CharacterHelper.IsPunctuation(p) == true
                            select p).Count();
            nChinese = (from p in listChars
                        where CharacterHelper.IsChinese(p) == true
                        select p).Count();

            nSymbol = (from p in listChars
                       where char.IsSymbol(p) == true
                       select p).Count();
            nControl = (from p in listChars
                        where char.IsControl(p) == true
                        select p).Count();
            nWhiteSpace = (from p in listChars
                           where char.IsWhiteSpace(p) == true
                           select p).Count();
            lblAll.Text = nAllLength.ToString();
            lblChinese.Text = nChinese.ToString();
            lblDigit.Text = nDigit.ToString();
            lblLetter.Text =(nLower+nUpper).ToString();
            lblLower.Text = nLower.ToString();
            lblUpper.Text = nUpper.ToString();
            lblPunc.Text = nPunctuation.ToString();

            lblSymbo.Text = nSymbol.ToString();
            lblWhiteSpace.Text = nWhiteSpace.ToString();
            lblControl.Text = nControl.ToString();


            ltlChinseByte.Text = ((from p in listChars
                                  where CharacterHelper.IsQuanJiao(p.ToString()) == true
                                  select p).Count()*3).ToString();

            ltlOtherByte.Text = (from p in listChars
                                 where CharacterHelper.IsBanJiao(p.ToString()) == true
                                 select p).Count().ToString();

            lblOthers.Text = (nAllLength-(nLower+nUpper+nDigit+nChinese+nPunctuation+nControl+nSymbol+nWhiteSpace)).ToString();
           

        }

    }

    public class CharacterHelper
    {
        public CharacterHelper()
        {
        }


        public static bool IsLowerCaseLetter(char c)
        {
            bool bReturn = false;
            if (c >= 97 && c <= 122)
            {
                bReturn = true;
            }
            return bReturn;
        }
        public static bool IsUpperCaseLetter(char c)
        {
            bool bReturn = false;
            if (c >= 65 && c <= 90)
            {
                bReturn = true;
            }
            return bReturn;
        }
        public static bool IsDigitLetter(char c)
        {
            bool bReturn = false;
            if (c >= 48 && c <= 57)
            {
                bReturn = true;
            }           
            return bReturn;
        }
        public static bool IsPunctuation(char c)
        {
            bool bReturn = false;
            bReturn = char.IsPunctuation(c);
            return bReturn;
        }
        public static bool IsChinese(char c)
        {
            bool bReturn = false;
            bReturn = Regex.IsMatch(c.ToString(), "[\u4e00-\u9fbb]+$");
            return bReturn;
            
        }

        //判断是不是全角函数
        public static bool IsQuanJiao(string checkString)
        {
            if (2 * checkString.Length == Encoding.Default.GetByteCount(checkString))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        //判断是不是半角函数
        public static bool IsBanJiao(string checkString)
        {
            if (checkString.Length == Encoding.Default.GetByteCount(checkString))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
      


    }
}
