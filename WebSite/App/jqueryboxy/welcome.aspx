<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_jqueryboxy_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <script src="../../js/jquery.boxy.js" type="text/javascript"></script>
<script type="text/javascript" language="javascript">
    var currFlashIndex;
    function showFlash() {
        $(".flash").hide();
        $($(".flash")[currFlashIndex]).show();
    }

    jQuery(function($) {
        var howToBox = new Boxy($("#howToBox"), {
            modal: true,
            draggable: true,
            fixed: true,
            show: true,
            afterShow: showFlash
        });
        howToBox.show();
    });


</script>


 
 
 <div id="howToBox" class="boxy">
        <div class="topZone">
           <div class="flash" style="display:none;">
                   <div class="topLeft">
                        <EMBED src="http://staging2:3000/purewirelessentertainment/includes/Localize_en-us/howto_slide_A.swf" width="600" height="378" type="application/x-shockwave-flash" wmode="opaque" quality="high" /> 
                    </div>
                    <div class="topRight">
                       
                        <p class="subTilte">
                             Connect <em>Bluetooth</em> devices to Creative wireless speakers
                        </p>                
                        <ul class="description">

                             <li>
                             We’ve gone the way of universal connectivity over proprietary wireless technology, so <em>Bluetooth</em> it shall be!
                            </li>
                            <li>
That means any compatible stereo <em>Bluetooth</em> device – like most mobile phones, notebooks, <em>Bluetooth</em> MP3 players – can be connected to Creative <em>Bluetooth</em> wireless speakers.
                            </li>

                            <li>
                              View the guide on the left to learn more, with more tips available by selecting the boxes at the bottom.
                            </li>
                        </ul>
                    </div>
           </div>
           
           <div  class="flash">
                   <div class="topLeft">
                        <EMBED src="http://staging2:3000/purewirelessentertainment/includes/Localize_en-us/howto_slide_B.swf" width="600" height="378" type="application/x-shockwave-flash" wmode="opaque" quality="high" /> 
                    </div>

                    <div class="topRight">

                        <p class="subTilte">
                           Add a subwoofer to your modular speaker wirelessly
                        </p>                
                        <ul class="description">
                           <li>
                               So you want more bass in your music and movies? It’s time to bring on the big guns. 
                            </li>
                            <li>
                                 Add on the ZiiSound DSx wireless subwoofer to your solo ZiiSound D5x modular speaker configuration.
                            </li>

                            <li>
                                See how easy it is to set it up when Ben’s cousins come to visit him.
                            </li>
                            <li>
                            The ZiiSound DSx supports the ZiiSound D3x as well. It’s just as easy!
                            </li>
                        </ul>
                    </div>
           </div>
           
           <div  class="flash">

                   <div class="topLeft">
                        <EMBED src="http://staging2:3000/purewirelessentertainment/includes/Localize_en-us/howto_slide_C.swf" width="600" height="378" type="application/x-shockwave-flash" wmode="opaque" quality="high" /> 
                    </div>
                    <div class="topRight">
                      
                        <p class="subTilte">
                            Wirelessly add another modular speaker to the mix
                        </p>                
                        <ul class="description">
                         <li>
                               It’s now time to up the game.
                            </li>

                            <li>
                               While the subwoofer helps with the thunderous lows and explosions, the ideal experience for a movie is to hear distinct audio channels and we have just that, wirelessly of course.
                            </li>
                            <li>
                              Let’s see how Ben and his cousins link an additional ZiiSound D5x to the setup, making it a 2.1 configuration. The two ZiiSound D5x speakers will play dedicated Left and Right channels while the subwoofer handles the lows.
                            </li>
                        </ul>
                    </div>
           </div>
           <div class="flash">

                   <div class="topLeft">
                        <EMBED src="http://staging2:3000/purewirelessentertainment/includes/Localize_en-us/howto_slide_D.swf" width="600" height="378" type="application/x-shockwave-flash" wmode="opaque" quality="high" /> 
                    </div>
                    <div class="topRight">
                      
                        <p class="subTilte">
                           Get the party started!
                        </p>                
                        <ul class="description">
                            <li>
                              Add yet another ZiiSound D5x to make it the ultimate entertainment speaker system!
                            </li>

                            <li>
                              Select “Party” mode to entertain your guests with perfectly synchronized music, with up to three ZiiSound D5x speakers blasting the same song in unison, and the subwoofer delivering the all-important bass.
                            </li>        
                        </ul>
                    </div>
           </div>
         
        </div>


</asp:Content>
