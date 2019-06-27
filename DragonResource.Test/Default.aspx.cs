using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CSFramework;
using CSFramework.DataAccess;

using System.Data.Entity;
using DragonSource.Utils;

namespace DragonResource.Test
{
    public partial class _Default : System.Web.UI.Page
    {
        private DragonResourceEntities oContext = new DragonResourceEntities();
        protected MagazineArticle oArticle;
        protected string szContent;

        protected string szMsg;
        protected void Page_Load(object sender, EventArgs e)
        {
            szContent = "<br>　　大三那年寒假，我万水千山从武汉到福州去看他。<br>　　在此之前，我们用两年的时间在厚厚的信笺上打造了一座爱的殿堂。 <br>　　福州解放大桥的临时工棚搭在中洲岛上，岛上有一个小小的红顶白墙的教堂，简陋的工棚的窗外，是静静的闽江白天黑夜地淌着，好像把小岛和日子一起带到了远方。<br>　　工地上没事时我们常坐在小火炉旁说话。有时也什么都不说，卢柑皮被星星末末地洒在红通通的火上，噼噼啪啪爆出一股焦香。我记得那年正月十五正好是情人节，下午，也是在火炉边，他的call机嘀嘀嘀地响了起来。他回电话，给一个女孩，开始彼此恭贺得热热闹闹地。后来他说，平平在我这里。电话里顿了一下，轻声问，平平是谁呀？静默了一会儿，又自顾轻声说道，福州天气好吗？宜兴挺好的，阳光普照……话没讲完，那女孩在远方小城情人节的阳光下，突然泣不成声了……<br>　　他告诉我是小妹，他大学时代的恋人。然后我们谁都不再吭声。<br>　　天色越来越暗，炉火越来越亮，映着他的双眼越来越晶莹。我的泪水终于漫了上来，将他模糊在那段我一无所知的往事里。<br>　　1995年的冬天，报上说那是福州近几十年来最冷的一个冬天。<br>　　那个冬天，他始终不肯对往事解释哪怕一句，我原本憩于天使翼上的初恋在日复一日的暗自等待里悄然落尘。<br>　　寒假还没有结束我就借口有事提前回到了学校。<img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140102-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140102-2-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140103-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140103-2-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140104-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140102-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140102-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140102-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140102-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140102-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140104-2-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140105-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140105-2-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140105-3-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140105-4-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140106-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140106-2-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140106-3-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140106-4-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140106-5-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140106-6-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140107-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140107-2-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140108-1-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140108-2-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140108-3-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140108-4-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140108-5-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140108-6-l.jpg\"><img alt=\"\" src=\"/qkimages/ajds/ajds201401/ajds20140108-7-l.jpg\"><br>　　可回到学校才发现，无论白天怎样忙碌夜晚都一样漫长。对他的思恋竟像闽江的潮水，白天悄悄退去了，夜晚，又汹涌地攀爬上来。当他的电话辗转打到宿舍管理室，只听到那低低的嗓音唤了声“平平”，我的泪水应声而落，我满腹怨怼地向爱情投降。<br>　　往事就让它云淡风清地过去吧！走在校园林荫道上，冬去春来，花开花落，我总这样对自己说。<br>　　次年七月，他专程从福州赶到武汉接我毕业，并陪我到南京报到。我们的关系就算确定下来。<br>　　孤身一人忙碌奔走在新的城市里，许多东西都悄悄地发生着改变。我越来越需要一些实实在在有安全感的温暖，隔天一封的信和每天的电话都不足以平定我波动的情绪，我一度为往事跟他纠缠不休。 <br>　　他只好写了封很长的信解释给我听：小妹进大学时很小，才十六岁，那是一九九O年。在迎新舞会上他请她跳了舞。后来她托与他同班的老乡约他，理工院校女生不多而她各方面都很不错，于是就走到了一起。再后来发现性格不合，他满腹闯荡的志向，专业性质决定一生将漂泊不定。而她太依赖太简单，用他的话说是对社会的认知太少，他尝试提出要分手，不料她竟爬上教学楼顶窗要往下跳。他追上去把她“提”了进来（她个子很小，只有一米五四）。那时他是下了决心要一辈子对这个拿命来爱自己的小女孩好的，但他先一年毕业后她受不了了，受不了寂寞。这次她提出了分手，吵吵闹闹反反复复终于也就分了，正当他在社会上被撞得头破血流的时候。<br>　　这种事就像入秋后的蚊子叮下的一个疖——不抓痒得难受，抓了又会痛得钻心。<br>　　我只能装作不痛不痒不再过问。<br>　　我懂得我那骄傲的恋人对往事守口如瓶的脆弱，也明白了每次吵闹后他绝望的心情，甚至也能体察小妹辗转设法与他联系的心情。我想，往事于他、于小妹、于我都已不可逾越，而不懂得珍惜是多么可怕的事！<br>　　于是在我工作后的第二年，他回到南京，我嫁给了他。婚后他转向IT行业，接下来的日子虽然辛苦但也还顺利。在他的圈子里他依然是个骄傲无比的人，他常说，我也是他骄傲的一部分。<br>　　小妹就在这时再次出现。<br>　　在一个周末收拾房间时，我听到他的手机响起。隐约是个娇娇的女声，而他的每一声谈笑听起来都比平时响亮、爽朗。挂机后他告诉我是小妹，她在南京。<br>　　默默整理好床单，我说：“那你该去见见她。”<br>　　“再说吧。”他眼镜一摘仰面躺倒在床上。我转身要走，手腕却被他攥住了，挣扎了几下，还是被他双手紧紧搂在了怀里……可我仍不能停止想着小妹的事：进大学时十六岁！这样的年纪，令闻者惊服，令我怅恨，也令爱情更容易刻骨铭心。更令人难以入睡的是，我有一种错觉：他初恋的那个人，依然是如花的十六岁！<br>　　第二天下班回家，电话里有他的留言，还是见她去了。<br>　　我独自在阳台上收着衣服，他的、我的、床单、我们的……搂着一大堆衣服我一个人蹲在了黄昏的阳台上，想哭。暮色渐起，一切开始变得飘浮、昏黄，只有床单那温暖洁净的味道里，才渗出一些些熨贴与安慰来。<br>　　生活中有许多默默无语的人，这些人的初恋，常常是一种难以摆脱的情结。我和他，偏偏都是这种人。或许一直以来，真正使我不能释怀的，使年少的他痛苦的是他的小妹而不是我。我看到过他最真实的痛苦，那痛苦曾深深挫伤了我，留下一种根深蒂固的钝钝的痛。或许从一开始，我的爱就无法与他的初恋抗衡？<br>　　那晚他回来后显得和我一样平静——如果我不说，他也许永远不会关注我平静后面真实的内心。他像平时一样眼镜一摘仰面躺倒在床上，告诉我：和她在城市花园咖啡屋坐了几个小时，她又哭了，她毕业后一直过得不怎么好，她说她要离婚……感觉到我微微的战栗他戛然而止，我决然地说：“我要去见她。明天。”<br>　　不去理他愣愣地端详着我欲言又止的样子。<br>　　即便是得到一个痛苦的结局也胜于得不到结局的痛苦。<br>　　这样想着我第一次主动狂热地将他拥抱。任他毫无抵抗地融化在我悲伤的温柔里。<br>　　第二天早起带我去见他的初恋情人，他竟有几分兴致勃勃。苍翠高大的法国梧桐掩映下的中山路一片繁华，站在新街口环形天桥上，听见他用手机联络着：“你快到了吗？新百广场前有个圆环你看到了吗？你到圆环里去我们就看到你了。”<br>　　是什么让我的心动了一下？我看着他，他脸上的表情有种单纯的关怀，仿佛对方是他的一个亲人，仿佛我们驱车去看的真的只是他人海中的无法丢弃的妹妹。<br>　　我低下头，有些释怀。<br>　　有些过去是无法抹煞的。是人性的脆弱还是人性的真诚？拥有一个重情义的丈夫应该更胜于凉薄的男人吧。<br>　　当他的手机沉寂太久再次响起时，我已经知道了结果。<br>　　四下里放眼看去，交通高峰时间到了，人群越来越拥挤，广场上走过无数女子，天桥上有无数女子走过，哪一个是小妹的背影呢？也许她在哪个大厦的玻璃幕墙后看着我们？<br>　　谁想过事情会这样?<br>　　谁想过事情会这样。<br>　　回家的路上，他牵着我的手走在人群中，好像还是有几分兴致勃勃。<br>　　“其实，我和小妹，没什么的。真的。”<br>　　真的？<br>　　“你是我的骄傲。”他强调说，“永远！”<br>　　永远？<br>　　将来的事谁知道呢！就连发生过的，我们也不可能知道究竟发生了什么。但是，在手上的，还是好好珍惜吧。<br>　　我们手牵着手回家去。<br>　　";
           

            oArticle= oContext.MagazineArticles.FirstOrDefault(p => p.TitleID == "ahjt20030331");
            oArticle.Content = szContent;
            oContext.AcceptAllChanges();


            Regex regImg = new Regex("src=\\\"(.*?)\\\"");//<img (.*?) src=\\\"(.*?)\\\"\\s{0}/?>"
            DateTime dtStart = DateTime.Now;
            szContent = regImg.Replace(szContent, m =>
            {
                // Get the matched string. 
                string x = m.ToString();
                // double this value 
                string result = "src=\""+ImageProtection.GetProtectedImageUrl(m.Groups[1].ToString())+"\"";
                return result;
            });
            DateTime dtEnd = DateTime.Now;

            TimeSpan tsExhaust= DateTimeHelper.DateDiff2(dtStart, dtEnd);
            szMsg += "正则替换用时：" + tsExhaust.TotalSeconds + "秒<br/>";
            szMsg+="正则替换用时：" + tsExhaust.TotalMilliseconds + "毫秒";
            //MatchCollection imgCollection = regImg.Matches(szContent);

            //foreach (Match imgMatch in imgCollection)
            //{
            //    var imgSrc = imgMatch.Groups[2].Value;
            //}

        }



       
    }
}
