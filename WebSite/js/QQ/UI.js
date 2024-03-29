﻿

String.prototype.hasString = function (g) {
    if (typeof g == "object") {
        for (var f = 0, h = g.length; f < h; f++) {
            if (!this.hasString(g[f])) {
                return false
            }
        }
        return true
    } else {
        if (this.indexOf(g) != -1) {
            return true
        }
    }
};
String.prototype.breakWord = function (f, c) {
    c || (c = "<wbr/>");
    return this.replace(RegExp("(\\w{" + (f ? f : 0) + "})(\\w)", "g"),
	function (i, g, b) {
	    return g + c + b
	})
};
String.prototype.realLength = function () {
    return this.replace(/[^\x00-\xff]/g, "**").length
};
String.prototype.cut = function (c) {
    if (this.realLength() <= c) {
        return this
    }
    var b = Math.min(this.length, c);
    var g = "";
    for (var f = b; f >= 0; --f) {
        var g = this.substring(0, f);
        if (g.realLength() <= c) {
            return g
        }
    }
    return g
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "")
};
qq = window.qq || {
    ajax: function (i) {
        var g = qq.xmlHttp(),
		m,
		l;
        g.onreadystatechange = function () {
            if (g.readyState == 1) {
                if (i.timeout && i.fail) {
                    l = setTimeout(function () {
                        if (!m) {
                            g.abort();
                            i.fail()
                        }
                    },
					i.timeout)
                }
            } else {
                if (g.readyState == 2) {
                    i.send && i.send()
                } else {
                    if (g.readyState == 4) {
                        m = 1;
                        if (g.status == 200) {
                            try {
                                i.success(g.responseText)
                            } catch (b) { }
                        } else {
                            if (i.fail) {
                                clearTimeout(l);
                                i.fail()
                            }
                        }
                    }
                }
            }
        };
        if (qq.isObject(i.data)) {
            var j = [];
            for (var k in i.data) {
                j.push(k + "=" + encodeURIComponent(i.data[k]))
            }
            i.data = j.join("&")
        }
        if (i.type == "get") {
            g.open("GET", i.url + (i.url.hasString("?") ? "&" : "?") + i.data, true);
            g.send(null)
        } else {
            g.open("POST", i.url, true);
            g.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            g.send(i.data)
        }
        return g
    },
    get: function (b, g) {
        var f = qq.xmlHttp();
        f.onreadystatechange = function () {
            if (f.readyState == 4 && f.status == 200) {
                try {
                    g(f.responseText)
                } catch (c) { }
            } else {
                return f
            }
        };
        f.open("GET", b, true);
        f.send(null);
        return f
    },
    xmlHttp: function () {
        var b;
        if (window.ActiveXObject) {
            b = new ActiveXObject("Microsoft.XMLHTTP")
        } else {
            if (window.XMLHttpRequest) {
                b = new XMLHttpRequest
            }
        }
        return b
    },
    crossAsynJson: function (i, g, m, l) {
        var j = qq.DC("script"),
		k = qq.GT(document, "head")[0];
        window[g] = function (c) {
            window[g] = undefined;
            try {
                delete window[g]
            } catch (b) { }
            m(c);
            k && setTimeout(function () {
                k.removeChild(j)
            },
			5)
        };
        l && qq.A(j, "charset", l);
        qq.A(j, "type", "text/javascript");
        qq.A(j, "src", i);
        qq.A(j, "async", true);
        k.appendChild(j)
    },
    getScript: function (g, f, i) {
        var h = qq.DC("script");
        if (f) {
            if (qq.B.ie) {
                h.onreadystatechange = function () {
                    if (h.readyState == "loaded" || h.readyState == "complete") {
                        f()
                    }
                }
            } else {
                h.onload = f
            }
        }
        i && qq.A(h, "charset", i);
        qq.A(h, "type", "text/javascript");
        qq.A(h, "src", g);
        qq.GT(document, "head")[0].appendChild(h)
    },
    getCss: function (g, f, i) {
        var h = i ? i : qq.DC("link");
        if (f) {
            h.onload = f
        }
        if (!i) {
            qq.A(h, "rel", "stylesheet");
            qq.A(h, "type", "text/css");
            qq.GT(document, "head")[0].appendChild(h)
        }
        qq.A(h, "href", g)
    },
    evalScript: function (a) {
        var b = this.regExp.script; (a = a.match(new RegExp(b, "img"))) && qq.each(a,
		function (c) {
		    eval(c.match(new RegExp(b, "im"))[1])
		})
    },
    regExp: {
        script: "<script[^>]*>([\\S\\s]*?)<\/script>"
    },
    encode: function (b) {
        return escape(qq.utfEncode(b))
    },
    decode: function (b) {
        return qq.utfDecode(unescape(b))
    },
    utfEncode: function (g) {
        g = g.replace(/\r\n/g, "\n");
        for (var f = "", i = 0; i < g.length; i++) {
            var h = g.charCodeAt(i);
            if (h < 128) {
                f += String.fromCharCode(h)
            } else {
                if (h > 127 && h < 2048) {
                    f += String.fromCharCode(h >> 6 | 192)
                } else {
                    f += String.fromCharCode(h >> 12 | 224);
                    f += String.fromCharCode(h >> 6 & 63 | 128)
                }
                f += String.fromCharCode(h & 63 | 128)
            }
        }
        return f
    },
    utfDecode: function (g) {
        for (var f = "", i = 0, h = c1 = c2 = 0; i < g.length; ) {
            h = g.charCodeAt(i);
            if (h < 128) {
                f += String.fromCharCode(h);
                i++
            } else {
                if (h > 191 && h < 224) {
                    c2 = g.charCodeAt(i + 1);
                    f += String.fromCharCode((h & 31) << 6 | c2 & 63);
                    i += 2
                } else {
                    c2 = g.charCodeAt(i + 1);
                    c3 = g.charCodeAt(i + 2);
                    f += String.fromCharCode((h & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                    i += 3
                }
            }
        }
        return f
    },
    parseUrl: function (g, f) {
        var i = g ? g : document.location.href;
        g = {};
        f = f || "?";
        if (!i.hasString(f)) {
            return g
        }
        f = i.split(f)[1].split("&");
        for (i = 0; i < f.length; i++) {
            var h = f[i].replace(/#.*$/g, "").split("=");
            h[1] || (h[1] = "");
            g[h[0]] = qq.B.ie ? h[1] : qq.decode(h[1])
        }
        return g
    },
    cookie: function (f, h, c, i, g) {
        if (arguments.length == 1) {
            var b = document.cookie.match(new RegExp("(^| )" + f + "=([^;]*)(;|$)"));
            if (b != null) {
                return decodeURIComponent(b[2])
            }
            return null
        } else {
            if (!arguments[1]) {
                document.cookie = f + "=11" + ((i) ? "; path=" + i : "; path=/") + ((g) ? "; domain=" + g : "") + "; expires=Fri, 02-Jan-1970 00:00:00 GMT"
            } else {
                e = "";
                if (!c) {
                    e = new Date;
                    e.setTime(e.getTime() + 24 * 60 * 60 * 1000);
                    e = "; expires=" + e.toGMTString()
                }
                document.cookie = f + "=" + h + ((c) ? "; expires=" + c.toGMTString() : e) + ((i) ? "; path=" + i : "; path=/") + ((g) ? ";domain=" + g : "")
            }
        }
    },
    localData: {
        hname: location.hostname ? location.hostname : "localStatus",
        isLocalStorage: window.localStorage ? true : false,
        dataDom: null,
        initDom: function () {
            if (!this.dataDom) {
                try {
                    this.dataDom = document.createElement("input");
                    this.dataDom.type = "hidden";
                    this.dataDom.style.display = "none";
                    this.dataDom.addBehavior("#default#userData");
                    document.body.appendChild(this.dataDom);
                    var c = new Date();
                    c = c.getDate() + 30;
                    this.dataDom.expires = c.toUTCString()
                } catch (b) {
                    return false
                }
            }
            return true
        },
        set: function (b, c) {
            if (this.isLocalStorage) {
                window.localStorage.setItem(b, c)
            } else {
                if (this.initDom()) {
                    this.dataDom.load(this.hname);
                    this.dataDom.setAttribute(b, c);
                    this.dataDom.save(this.hname)
                }
            }
        },
        get: function (b) {
            if (this.isLocalStorage) {
                return window.localStorage.getItem(b)
            } else {
                if (this.initDom()) {
                    this.dataDom.load(this.hname);
                    return this.dataDom.getAttribute(b)
                }
            }
        },
        remove: function (b) {
            if (this.isLocalStorage) {
                localStorage.removeItem(b)
            } else {
                if (this.initDom()) {
                    this.dataDom.load(this.hname);
                    this.dataDom.removeAttribute(b);
                    this.dataDom.save(this.hname)
                }
            }
        }
    },
    drag: function (g, f, i) {
        var h = document;
        i = i != undefined ? i : true;
        qq.EA(g, "mousedown",
		function (b) {
		    f.start && f.start(b);
		    if (i) {
		        if (g.setCapture) {
		            g.setCapture()
		        } else {
		            window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
		        }
		    }
		    if (f.drag) {
		        h.onmousemove = f.drag
		    }
		    h.onmouseup = function () {
		        if (i) {
		            if (g.releaseCapture) {
		                g.releaseCapture()
		            } else {
		                window.captureEvents && window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP)
		            }
		        }
		        f.stop && f.stop(b);
		        h.onmousemove = null;
		        h.onmouseup = null;
		        f.call && f.call(b)
		    }
		})
    },
    animate: function (j, g, k, b, i, f) {
        if (typeof (f) == "undefined") {
            f = "px"
        }
        clearTimeout(j["_extend_" + g.replace(/\-\.\=/, "_") + "_timeOut"]);
        if (k > b) {
            i = -Math.abs(i)
        } else {
            i = Math.abs(i)
        }
        var c = k;
        var h = b - k;
        j["_extend_" + g.replace(/\-\.\=/, "_") + "_timeOut"] = setTimeout(function () {
            c += i;
            var l = b - c;
            if (k < b) {
                if (l < h / 3) {
                    i = Math.ceil(l / 3)
                }
                if (l <= 0) {
                    j[g] = b + f;
                    return
                }
            } else {
                if (l > h / 3) {
                    i = Math.floor(l / 3)
                }
                if (l >= 0) {
                    j[g] = b + f;
                    return
                }
            }
            j[g] = c + f;
            j["_extend_" + g.replace(/\-\.\=/, "_") + "_timeOut"] = setTimeout(arguments.callee, 20)
        },
		20)
    },
    showOpacity: function (h, f, g) {
        if (qq.C(h, "display") === "none") {
            h.style.display = "block"
        }
        qq.C(h, "opacity", 0);
        f = f || 200,
		g = g || 20;
        var b = 0,
		c = f / 20;
        clearTimeout(h.timeOut);
        h.timeOut = setTimeout(function () {
            if (b >= 1) {
                qq.C(h, "opacity", 1);
                return
            }
            b += 1 / c;
            qq.C(h, "opacity", b);
            h.timeOut = setTimeout(arguments.callee, g)
        },
		g)
    },
    hideOpacity: function (h, f, g) {
        qq.C(h, "opacity", 1);
        f = f || 200,
		g = g || 20;
        var b = 1,
		c = f / 20;
        clearTimeout(h.timeOut);
        h.timeOut = setTimeout(function () {
            if (b <= 0) {
                h.style.display = "none";
                qq.C(h, "opacity", 1);
                return
            }
            b -= 1 / c;
            qq.C(h, "opacity", b);
            h.timeOut = setTimeout(arguments.callee, g)
        },
		g)
    },
    getX: function (b) {
        return b.offsetParent ? b.offsetLeft + qq.getX(b.offsetParent) : b.offsetLeft
    },
    getY: function (b) {
        return b.offsetParent ? b.offsetTop + qq.getY(b.offsetParent) : b.offsetTop
    },
    within: function (i, g) {
        var m = qq.getX(g) - qq.scrollX(),
		l = qq.width(g) + m,
		j = qq.getY(g) - qq.scrollY();
        g = qq.height(g) + j;
        var k = {};
        if (i[0] > m && i[0] < l && i[1] > j && i[1] < g) {
            if (i[0] - m < (l - m) / 2) {
                k.left = true
            }
            if (i[1] - j < (g - j) / 2) {
                k.top = true
            }
            return k
        }
    },
    frameX: function (b) {
        return b.frameElement ? qq.getX(b.frameElement) + qq.frameX(b.parent) : 0
    },
    frameY: function (b) {
        return b.frameElement ? qq.getY(b.frameElement) + qq.frameY(b.parent) : 0
    },
    width: function (b) {
        return parseInt(b.offsetWidth)
    },
    height: function (b) {
        return parseInt(b.offsetHeight)
    },
    pageWidth: function () {
        return document.body.scrollWidth || document.documentElement.scrollWidth
    },
    pageHeight: function () {
        return document.body.scrollHeight || document.documentElement.scrollHeight
    },
    windowWidth: function () {
        var b = document.documentElement;
        return self.innerWidth || b && b.clientWidth || document.body.clientWidth
    },
    windowHeight: function () {
        var b = document.documentElement;
        return self.innerHeight || b && b.clientHeight || document.body.clientHeight
    },
    scrollX: function (g) {
        var f = document.documentElement;
        if (g) {
            var i = g.parentNode,
			h = g.scrollLeft || 0;
            if (g == f) {
                h = qq.scrollX()
            }
            return i ? h + qq.scrollX(i) : h
        }
        return self.pageXOffset || f && f.scrollLeft || document.body.scrollLeft
    },
    scrollY: function (g) {
        var f = document.documentElement;
        if (g) {
            var i = g.parentNode,
			h = g.scrollTop || 0;
            if (g == f) {
                h = qq.scrollY()
            }
            return i ? h + qq.scrollY(i) : h
        }
        return self.pageYOffset || f && f.scrollTop || document.body.scrollTop
    },
    scrollTo: function (f, g) {
        return window.scrollTo(f, g)
    },
    hide: function (f) {
        qq.isString(f) && (f = this.G(f));
        if (f) {
            if (!f.__curDisplay) {
                var g = this.C(f, "display");
                "none" != g && (f.__curDisplay = g)
            }
            f.style.display = "none"
        }
    },
    show: function (c) {
        qq.isString(c) && (c = this.G(c));
        c && (c.style.display = c.__curDisplay || "block")
    },
    toggle: function (c) {
        qq.isString(c) && (c = this.G(c));
        "none" == this.C(c, "display") ? this.show(c) : this.hide(c)
    },
    hasClass: function (f, g) {
        return !f || !f.className ? !1 : f.className != f.className.replace(RegExp("\\b" + g + "\\b"), "")
    },
    addClass: function (f, g) {
        f && (f.className ? this.hasClass(f, g) || (f.className += " " + g) : f.className = g)
    },
    removeClass: function (g, i) {
        if (g) {
            var h = i.split(" ");
            1 < h.length ? qq.each(h,
			function (b) {
			    qq.removeClass(g, b)
			}) : this.hasClass(g, i) && (g.className = g.className.replace(RegExp("\\b" + i + "\\b"), ""))
        }
    },
    toggleClass: function (f, g) {
        this.hasClass(f, g) ? this.removeClass(f, g) : this.addClass(f, g)
    },
    next: function (b) {
        b = b.nextSibling;
        if (b == null) {
            return false
        }
        return qq.isElement(b) ? b : this.next(b)
    },
    prev: function (b) {
        b = b.previousSibling;
        if (b == null) {
            return false
        }
        return qq.isElement(b) ? b : this.prev(b)
    },
    remove: function (b) {
        b && b.parentNode && b.parentNode.removeChild(b)
    },
    append: function (f, c) {
        c.appendChild(f)
    },
    prepend: function (g, f) {
        var h = f.firstChild;
        h ? qq.before(g, h) : qq.append(g, f)
    },
    after: function (g, f) {
        var h = f.parentNode;
        h.lastChild == g ? h.appendChild(g) : h.insertBefore(g, f.nextSibling)
    },
    before: function (f, c) {
        c.parentNode.insertBefore(f, c)
    },
    replace: function (f, c) {
        c.parentNode.replaceChild(f, c)
    },
    tmpl: function () {
        var f = {};
        return function c(g, b) {
            g = !/\W/.test(g) ? (f[g] = f[g] || c(qq.G(g).innerHTML)) : qq.tmplString(g);
            return b ? g(b) : g
        }
    } (),
    tmplString: function (b) {
        return new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + b.replace(/[\r\t\n]/g, " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');")
    },
    html: function (g) {
        var f = qq.DC("div"),
		h = [];
        f.innerHTML = g;
        qq.each(f.childNodes,
		function (b) {
		    h.push(b)
		});
        return h
    },
    css: function (f, c) {
        if (!c) {
            c = qq.DC("style");
            qq.A(c, "type", "text/css");
            qq.append(c, qq.GT(document, "head")[0])
        }
        if (c.styleSheet) {
            c.styleSheet.cssText = f
        } else {
            f = document.createTextNode(f);
            qq.append(f, c)
        }
    },
    text: function a(f) {
        var j = [];
        f = f.childNodes;
        for (var i = 0, g = f.length; i < g; i++) {
            j.push(f[i].nodeType != 1 ? f[i].nodeValue : a(f[i]))
        }
        return j.join("")
    },
    parent: function (g, f) {
        if (qq.isArray(g)) {
            var h = [];
            qq.each(g,
			function (b) {
			    if (f && qq.hasClass(b.parentNode, f) || !f) {
			        h.push(b.parentNode)
			    }
			});
            return h
        }
        return g.parentNode
    },
    parents: function (g, f) {
        if (f) {
            var h = [];
            g = qq.parents(g);
            qq.each(g,
			function (b) {
			    qq.hasClass(b, f) && h.push(b)
			});
            return h
        }
        g = g.parentNode;
        return g.nodeName == "HTML" ? [g] : [g].concat(qq.parents(g))
    },
    children: function (g, f) {
        var h = [];
        if (f) {
            f = f.split("|")
        }
        qq.each(g.childNodes,
		function (k) {
		    var c = false;
		    if (f) {
		        for (var j = 0, b = f.length; j < b; j++) {
		            if (qq.hasClass(k, f[j])) {
		                c = true;
		                break
		            }
		        }
		    }
		    if (qq.isElement(k) && (!f || c)) {
		        h.push(k)
		    }
		});
        return h
    },
    A: function (g, f, h) {
        if (h == undefined) {
            return g.getAttribute(f)
        } else {
            h == "" ? g.removeAttribute(f) : g.setAttribute(f, h)
        }
    },
    C: function () {
        var b;
        return function (i, h, f) {
            if (i) {
                if (void 0 == f) {
                    if (window.getComputedStyle) {
                        return h = h.replace(/([A-Z])/g, "-$1"),
						h = h.toLowerCase(),
						window.getComputedStyle(i, null).getPropertyValue(h)
                    }
                    if (i.currentStyle) {
                        return "opacity" == h ? 0 <= i.style.filter.indexOf("opacity=") ? parseFloat(i.style.filter.match(/opacity=([^)]*)/)[1]) / 100 : "1" : i.currentStyle[h]
                    }
                } else {
                    !b && "opacity" == h && (b = "opacity" in i.style ? 1 : 2),
					"opacity" == h && 2 == b ? i.style.filter = (i.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + 100 * f + ")" : i.style[h] = f
                }
            }
        }
    } (),
    DC: function (b) {
        return document.createElement(b)
    },
    E: function (b) {
        if (b && b.clone) {
            return b
        }
        b = window.event || b;
        return {
            clone: true,
            stop: function () {
                if (b && b.stopPropagation) {
                    b.stopPropagation()
                } else {
                    b.cancelBubble = true
                }
            },
            prevent: function () {
                if (b && b.preventDefault) {
                    b.preventDefault()
                } else {
                    b.returnValue = false
                }
            },
            target: b.target || b.srcElement,
            x: b.clientX || b.pageX,
            y: b.clientY || b.pageY,
            button: b.button,
            key: b.keyCode,
            shift: b.shiftKey,
            alt: b.altKey,
            ctrl: b.ctrlKey,
            type: b.type,
            wheel: b.wheelDelta / 120 || -b.detail / 3
        }
    },
    EA: function (a, b, c, e) {
        if (qq.isString(a)) {
            var h = c;
            c = function () {
                eval(h)
            }
        }
        if (a.addEventListener) {
            if (b == "mousewheel") {
                b = "DOMMouseScroll"
            }
            a.addEventListener(b, c, e);
            return true
        } else {
            return a.attachEvent ? a.attachEvent("on" + b, c) : false
        }
    },
    ER: function (g, f, h) {
        if (g.removeEventListener) {
            g.removeEventListener(f, h, false);
            return true
        } else {
            return g.detachEvent ? g.detachEvent("on" + f, h) : false
        }
    },
    G: function (b) {
        return typeof (b) == "object" ? b : document.getElementById(b)
    },
    GT: function (f, c) {
        return f.getElementsByTagName(c)
    },
    GC: function () {
        function u(c, b) {
            if (!b) {
                b = c;
                c = document
            }
            c = c || document;
            if (!/^[\w\-_#]+$/.test(b) && c.querySelectorAll) {
                return t(c.querySelectorAll(b))
            }
            if (b.indexOf(",") > -1) {
                b = b.split(/,/g);
                for (var k = [], f = 0, h = b.length; f < h; ++f) {
                    k = k.concat(u(c, b[f]))
                }
                return g(k)
            }
            b = b.match(o);
            var i = b.pop();
            k = (i.match(n) || j)[1];
            f = !k && (i.match(q) || j)[1];
            h = i.split(".").slice(2);
            i = !k && (i.match(m) || j)[1];
            if (f && !i && c.getElementsByClassName) {
                i = t(c.getElementsByClassName(f))
            } else {
                i = !k && t(c.getElementsByTagName(i || "*"));
                if (f) {
                    i = r(i, "className", RegExp("(^|\\s)" + f + "(\\s|$)"), h)
                }
                if (k) {
                    return (c = c.getElementById(k)) ? [c] : []
                }
            }
            return b[0] && i[0] ? s(b, i) : i
        }
        function t(c) {
            try {
                return Array.prototype.slice.call(c)
            } catch (b) {
                for (var i = [], f = 0, h = c.length; f < h; ++f) {
                    i[f] = c[f]
                }
                return i
            }
        }
        function s(k, i, h) {
            var l = k.pop();
            if (l === ">") {
                return s(k, i, true)
            }
            var c = [],
			f = -1,
			b = (l.match(n) || j)[1],
			A = !b && (l.match(q) || j)[1];
            l = !b && (l.match(m) || j)[1];
            var p = -1,
			x,
			z,
			y;
            for (l = l && l.toLowerCase(); x = i[++p]; ) {
                z = x.parentNode;
                do {
                    y = (y = (y = !l || l === "*" || l === z.nodeName.toLowerCase()) && (!b || z.id === b)) && (!A || RegExp("(^|\\s)" + A + "(\\s|$)").test(z.className));
                    if (h || y) {
                        break
                    }
                }
                while (z = z.parentNode);
                if (y) {
                    c[++f] = x
                }
            }
            return k[0] && c[0] ? s(k, c) : c
        }
        function r(c, b, p, i) {
            var k = -1,
			l,
			h = -1,
			f = [];
            for (i = i || ""; l = c[++k]; ) {
                if (p.test(l[b]) && l[b].hasString(i)) {
                    f[++h] = l
                }
            }
            return f
        }
        var o = /(?:[\w\-\\.#]+)+(?:\[\w+?=([\'"])?(?:\\\1|.)+?\1\])?|\*|>/ig,
		q = /^(?:[\w\-_]+)?\.([\w\-_]+)/,
		n = /^(?:[\w\-_]+)?#([\w\-_]+)/,
		m = /^([\w\*\-_]+)/,
		j = [null, null],
		g = function () {
		    var c = +new Date,
			b = function () {
			    var f = 1;
			    return function (h) {
			        var i = h[c],
					k = f++;
			        if (!i) {
			            h[c] = k;
			            return true
			        }
			        return false
			    }
			} ();
		    return function (p) {
		        for (var i = p.length, k = [], l = -1, h = 0, f; h < i; ++h) {
		            f = p[h];
		            if (b(f)) {
		                k[++l] = f
		            }
		        }
		        c += 1;
		        return k
		    }
		} ();
        return u
    } (),
    isDate: function (b) {
        return this.getType(b) == "Date"
    },
    cloneDate: function (b) {
        if (!b) {
            return b
        }
        d = new Date;
        d.setTime(b.getTime());
        return d
    },
    formatDate: function (s, r) {
        var q = r.replace(/\W/g, ",").split(","),
		p = ["yyyy", "MM", "dd", "hh", "mm", "ss", "ww"];
        s = {
            y: s.getFullYear(),
            M: s.getMonth() + 1,
            d: s.getDate(),
            h: s.getHours(),
            m: s.getMinutes(),
            s: s.getSeconds(),
            w: s.getDay()
        };
        for (var n = 0, o = q.length; n < o; n++) {
            for (var m = q[n], j = 0; j < 7; j++) {
                var g = p[j].slice(-1);
                if (m.hasString(g)) {
                    if (g == "w" && s[g] == 0) {
                        s[g] = 7
                    }
                    r = m.hasString(p[j]) ? r.replace(RegExp(p[j], "g"), this.addZero(s[g])) : r.replace(RegExp(p[j].slice(p[j].length / 2), "g"), s[g])
                }
            }
        }
        return r
    },
    parseDate: function (j, g) {
        g || (g = "yyyy-MM-dd");
        g = g.replace(/\W/g, ",").split(",");
        j = j.replace(/\D/g, ",").split(",");
        var q = 2000,
		p = 0,
		n = 1,
		o = 0,
		m = 0,
		l = 0;
        qq.each(g,
		function (b, c) {
		    if (j[c] != "" && !isNaN(j[c])) {
		        if (b.hasString("y")) {
		            q = Number(j[c])
		        }
		        if (b.hasString("M")) {
		            p = Number(j[c]) - 1
		        }
		        if (b.hasString("d")) {
		            n = Number(j[c])
		        }
		        if (b.hasString("h")) {
		            o = Number(j[c])
		        }
		        if (b.hasString("m")) {
		            m = Number(j[c])
		        }
		        if (b.hasString("s")) {
		            l = Number(j[c])
		        }
		        if (b.hasString("w")) {
		            l = Number(j[c])
		        }
		    }
		});
        return new Date(q, p, n, o, m, l)
    },
    isObject: function (b) {
        return typeof b == "object"
    },
    isElement: function (b) {
        return b && b.nodeType == 1
    },
    isUndefined: function (b) {
        return typeof b == "undefined"
    },
    isFunction: function (b) {
        return this.getType(b) == "Function"
    },
    isNumber: function (b) {
        return this.getType(b) == "Number"
    },
    isString: function (b) {
        return this.getType(b) == "String"
    },
    isArray: function (b) {
        return this.getType(b) == "Array"
    },
    getType: function (b) {
        return Object.prototype.toString.call(b).slice(8, -1)
    },
    addZero: function (f, c) {
        c || (c = 2);
        return Array(Math.abs(("" + f).length - (c + 1))).join(0) + f
    },
    trim: function (b) {
        return b.replace(/^\s+|\s+$/g, "")
    },
    random: function (f, c) {
        if (f == undefined) {
            f = 0
        }
        if (c == undefined) {
            c = 9
        }
        return Math.floor(Math.random() * (c - f + 1) + f)
    },
    has: function (g, f) {
        for (var i = 0, h = g.length; i < h; i++) {
            if (g[i] == f) {
                return true
            }
        }
        return false
    },
    each: function (g, f) {
        if (qq.isUndefined(g[0])) {
            for (var i in g) {
                qq.isFunction(g[i]) || f(i, g[i])
            }
        } else {
            i = 0;
            for (var h = g.length; i < h; i++) {
                qq.isFunction(g[i]) || f(g[i], i)
            }
        }
    },
    merge: function (g, f) {
        var h = [];
        if (f) {
            qq.each(f,
			function (b) {
			    qq.has(g, b) || h.push(b)
			});
            return g.concat(h)
        } else {
            qq.each(g,
			function (b) {
			    qq.has(h, b) || h.push(b)
			});
            return h
        }
    },
    ready: function (b) {
        if (qq.ready.done) {
            return b()
        }
        if (qq.isReady.done) {
            qq.readyDo.push(b)
        } else {
            qq.readyDo = [b];
            qq.isReady()
        }
    },
    readyDo: [],
    isReady: function () {
        if (!qq.isReady.done) {
            qq.isReady.done = true;
            if (document.readyState == "complete") {
                qq.onReady()
            } else {
                if (document.addEventListener) {
                    document.addEventListener("DOMContentLoaded",
					function () {
					    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
					    qq.onReady()
					},
					false)
                } else {
                    if (document.attachEvent) {
                        var b = top != self;
                        if (b) {
                            document.attachEvent("onreadystatechange",
							function () {
							    if (document.readyState === "complete") {
							        document.detachEvent("onreadystatechange", arguments.callee);
							        qq.onReady()
							    }
							})
                        } else {
                            document.documentElement.doScroll && !b &&
							function () {
							    if (!qq.ready.done) {
							        try {
							            document.documentElement.doScroll("left")
							        } catch (c) {
							            setTimeout(arguments.callee, 0);
							            return
							        }
							        qq.onReady()
							    }
							} ()
                        }
                    }
                }
            }
            qq.EA(window, "load", qq.onReady)
        }
    },
    onReady: function () {
        if (!qq.ready.done) {
            qq.ready.done = true;
            for (var g = 0, f = qq.readyDo.length; g < f; g++) {
                try {
                    qq.readyDo[g]()
                } catch (h) { }
            }
            qq.readyDo = null
        }
    },
    B: function () {
        var f = {},
		c = navigator.userAgent;
        f.win = c.hasString("Windows") || c.hasString("Win32");
        f.ie6 = c.hasString("MSIE 6") && !c.hasString("MSIE 7") && !c.hasString("MSIE 8");
        f.ie8 = c.hasString("MSIE 8");
        f.ie = c.hasString("MSIE");
        f.opera = window.opera || c.hasString("Opera");
        f.safari = c.hasString("WebKit");
        f.ipad = c.hasString("iPad");
        f.mac = c.hasString("Mac");
        f.firefox = c.hasString("Firefox");
        return f
    } ()
};
qq.B.ie && document.execCommand("BackgroundImageCache", false, true); /*  |xGv00|fdcea66fe0ee32ea713c7777e005864a */