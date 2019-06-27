<%@ Page Title="" Language="C#" MasterPageFile="~/layout/main.master" AutoEventWireup="true" CodeFile="welcome.aspx.cs" Inherits="App_jquerycycle_welcome" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <script src="../../js/jquery.cycle.all.js" type="text/javascript"></script>
    
     <!--slideshow products -->            
            <script type="text/javascript" language="javascript">
                //$("#slideProducts").cycle();               
                $.fn.cycle.transitions.scrollCustom = function($cont, $slides, opts) {
                    $cont.css('overflow', 'hidden').width("268");
                    opts.before.push(function(curr, next, opts, fwd) {
                        $.fn.cycle.commonReset(curr, next, opts);
                        opts.cssBefore.left = fwd ? next.cycleW + opts.margin : -(next.cycleW + opts.margin);
                        opts.animOut.left = fwd ? -(curr.cycleW + opts.margin) : curr.cycleW + opts.margin;
                    });
                    opts.cssFirst = {
                        left: 0
                    };
                    opts.cssBefore = {
                        top: 0
                    };
                    opts.animIn = {
                        left: 0
                    };
                    opts.animOut = {
                        top: 0
                    };
                };
                if ($('#slideProducts').length) {
                    $('#slideProducts').cycle({
                        fx: "scrollCustom",
                        margin: 20,
                        next: $('#homeBtnNext'),
                        prev: $('#homeBtnPrev'),
                        easing: 'easeInOutExpo',
                        cleartypeNoBg: true,
                        speed: 1000,
                        timeout: 12000
                    });
                };


                var inners = $('.slide .sliderContent').cycle().cycle('stop');

                var slideshow = $(".outerSlide").cycle(
                                {
                                    fx: "scrollHorz",
                                    slideExpr: ".outerItem",
                                    timeout: 0,
                                    slideResize: 1,
                                    before: function(currSlideElement, nextSlideElement, options, forwardFlag) {
                                        // stop all inner slideshows                                      
                                        inners.cycle('stop');
                                        // start the new slide's slideshow                                       
                                        $("#slideNav .sliderBullets").html("");
                                        $(this).find(".slide .sliderContent").cycle({
                                            fx: 'fade',
                                            speed: '1000',
                                            timeout: 20000,
                                            pause: 0,     // true to enable "pause on hover" 
                                            pauseOnPagerHover: 1,
                                            pager: '#slideNav .sliderBullets',
                                            activePagerClass: 'active',
                                            pagerAnchorBuilder: function(idx, slide) {
                                                return '<a href="#"><span></span></a>';
                                            },
                                            before: function() {
                                                $(".slideNav").width(containerWidth);
                                                $(".slideNav").css("margin-left", -globalLeft);
                                            }
                                        });
                                    }
                                }
            );

                
            </script>

</asp:Content>


