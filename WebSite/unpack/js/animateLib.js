/**
* create time 2012/08/29
* @author lynx cat.
* @version 0.77beta.
*/

(function (win, doc) {
    var win = win || window;
    var doc = doc || win.document,
    pow = Math.pow,
    sin = Math.sin,
    PI = Math.PI,
    BACK_CONST = 1.70158;
    var Easing = {
        // 匀速运动
        linear: function (t) {
            return t;
        },
        easeIn: function (t) {
            return t * t;
        },
        easeOut: function (t) {
            return (2 - t) * t;
        },
        easeBoth: function (t) {
            return (t *= 2) < 1 ?.5 * t * t :.5 * (1 - (--t) * (t - 2));
        },
        easeInStrong: function (t) {
            return t * t * t * t;
        },
        easeOutStrong: function (t) {
            return 1 - (--t) * t * t * t;
        },
        easeBothStrong: function (t) {
            return (t *= 2) < 1 ?.5 * t * t * t * t :.5 * (2 - (t -= 2) * t * t * t);
        },
        easeOutQuart: function (t) {
            return -(pow((t - 1), 4) - 1)
        },
        easeInOutExpo: function (t) {
            if (t === 0) return 0;
            if (t === 1) return 1;
            if ((t /= 0.5) < 1) return 0.5 * pow(2, 10 * (t - 1));
            return 0.5 * (-pow(2, -10 * --t) + 2);
        },
        easeOutExpo: function (t) {
            return (t === 1) ? 1 : -pow(2, -10 * t) + 1;
        },
        swingFrom: function (t) {
            return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
        },
        swingTo: function (t) {
            return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
        },
        sinusoidal: function (t) {
            return (-Math.cos(t * PI) / 2) + 0.5;
        },
        flicker: function (t) {
            var t = t + (Math.random() - 0.5) / 5;
            return this.sinusoidal(t < 0 ? 0 : t > 1 ? 1 : t);
        },
        backIn: function (t) {
            if (t === 1) t -= .001;
            return t * t * ((BACK_CONST + 1) * t - BACK_CONST);
        },
        backOut: function (t) {
            return (t -= 1) * t * ((BACK_CONST + 1) * t + BACK_CONST) + 1;
        },
        bounce: function (t) {
            var s = 7.5625, r;
            if (t < (1 / 2.75)) {
                r = s * t * t;
            }
            else if (t < (2 / 2.75)) {
                r = s * (t -= (1.5 / 2.75)) * t + .75;
            }
            else if (t < (2.5 / 2.75)) {
                r = s * (t -= (2.25 / 2.75)) * t + .9375;
            }
            else {
                r = s * (t -= (2.625 / 2.75)) * t + .984375;
            }
            return r;
        }
    };
    /**
    * 基石 用于返回一个包含对话方法的对象
    * @param elem
    * @return {Object}
    */
    function catfx(elem) {
        elem = typeof elem === 'string' ? doc.getElementById(elem) : elem;
        return new fx(elem);
    }
    /**
    * 内部基石 用于返回一个包含对话方法的对象
    * @param elem
    * @return {Object}
    */
    function fx(elem) {
        this.elem = elem;
        return this;
    }
    /**
    * 基础类 包含一些基础方法，和不变量
    */
    var fxBase = {
        speed: {
            slow: 600,
            fast: 200,
            defaults: 400
        },
        fxAttrs: [],
        fxMap: [],
        /**
        * 返回对象元素的css值
        * @param elem
        * @param p
        * @return css value
        */
        getStyle: function () {
            var fn = function () { };
            if ('getComputedStyle' in win) {
                fn = function (elem, p) {
                    var p = p.replace(/\-(\w)/g, function (i, str) {
                        return str.toUpperCase();
                    });
                    var val = getComputedStyle(elem, null)[p];
                    if (~(' ' + p + ' ').indexOf(' left right top bottom ') && val === 'auto') {
                        val = '0px';
                    }
                    return val;
                }
            } else {
                fn = function (elem, p) {
                    var p = p.replace(/\-(\w)/g, function (i, str) {
                        return str.toUpperCase();
                    });
                    var val = elem.currentStyle[p];
                    if (~(' ' + p + ' ').indexOf(' width height') && val === 'auto') {
                        var rect = elem.getBoundingClientRect();
                        val = (p === 'width' ? rect.right - rect.left : rect.bottom - rect.top) + 'px';
                    }
                    if (p === 'opacity') {
                        var filter = elem.currentStyle.filter;
                        if (/opacity/.test(filter)) {
                            val = filter.match(/\d+/)[0] / 100;
                            val = (val === 1 || val === 0) ? val.toFixed(0) : val.toFixed(1);
                        } else if (val === undefined) {
                            val = 1;
                        }
                    }
                    if (~(' ' + p + ' ').indexOf(' left right top bottom ') && val === 'auto') {
                        val = '0px';
                    }
                    return val;
                }
            }
            return fn;
        } (),
        /**
        * 返回对象元素的css值
        * @param 颜色值(暂不支持red,pink,blue等英文)
        * @return rgb(x,x,x)
        */
        getColor: function (val) {
            var r, g, b;
            if (/rgb/.test(val)) {
                var arr = val.match(/\d+/g);
                r = arr[0];
                g = arr[1];
                b = arr[2];
            } else if (/#/.test(val)) {
                var len = val.length;
                if (len === 7) {
                    r = parseInt(val.slice(1, 3), 16);
                    g = parseInt(val.slice(3, 5), 16);
                    b = parseInt(val.slice(5), 16);
                }
                else if (len === 4) {
                    r = parseInt(val.charAt(1) + val.charAt(1), 16);
                    g = parseInt(val.charAt(2) + val.charAt(2), 16);
                    b = parseInt(val.charAt(3) + val.charAt(3), 16);
                }
            } else {
                return val;
            }
            return {
                r: parseFloat(r),
                g: parseFloat(g),
                b: parseFloat(b)
            }
        },
        /**
        * 返回解析后的css
        * @param prop
        * @return {val:val,unit:unit}
        */
        parseStyle: function (prop) {
            var val = parseFloat(prop)
                ,unit = prop.replace(/^[\-\d\.]+/, '');
            if (isNaN(val)) {
                val = this.getColor(unit);
                unit = '';
            }
            return { val: val, unit: unit };
        },
        /**
        * 设置元素的透明度
        * @param elem
        * @param val
        */
        setOpacity: function (elem, val) {
            if ('getComputedStyle' in win) {
                elem.style.opacity = val === 1 ? '' : val;
            } else {
                elem.style.zoom = 1;
                elem.style.filter = val === 1 ? '' : 'alpha(opacity=' + val * 100 + ')';
            }
        },
        /**
        * 设置元素的css值
        * @param elem
        * @param prop
        * @param val
        */
        setStyle: function (elem, prop, val) {
            if (prop != 'opacity') {
                prop = prop.replace(/\-(\w)/g, function (i, p) {
                    return p.toUpperCase();
                });
                elem.style[prop] = val;
            } else {
                this.setOpacity(elem, val);
            }
        },
        /**
        * 返回解析后的prop
        * @param prop
        * @return {prop}
        */
        parseProp: function (prop) {
            var props = {};
            for (var i in prop) {
                props[i] = this.parseStyle(prop[i].toString());
            }
            return props;
        },
        /**
        * 修正用户的参数
        * @param elem
        * @param duration
        * @param easing
        * @param callback
        * @return {options}
        */
        setOption: function (elem, duration, easing, callback) {
            var options = {};
            var _this = this;
            options.duration = function (duration) {
                if (typeof duration == 'number') {
                    return duration;
                } else if (typeof duration == 'string' && _this.speed[duration]) {
                    return _this.speed[duration];
                } else {
                    return _this.speed.defaults;
                }
            } (duration);
            options.easing = function (easing) {
                if (typeof easing == 'function') {
                    return easing;
                } else if (typeof easing == 'string' && Easing[easing]) {
                    return Easing[easing];
                } else {
                    return Easing.linear;
                }
            } (easing);
            options.callback = function (callback) {
                var _this = this;
                return function () {
                    if (typeof callback == 'function') {
                        callback.call(elem);
                    }
                }
            } (callback)
            return options;
        },
        /**
        * 维护setInterval的函数，动画的启动
        */
        tick: function () {
            var _this = this;
            if (!_this.timer) {
                _this.timer = setInterval(function () {
                    for (var i = 0, len = _this.fxMap.length; i < len; i++) {
                        var elem = _this.fxMap[i][0];
                        var core = _this.data(elem)[0];
                        core(elem);
                    }
                }, 16);
            }
        },
        /**
        * 停止所有动画
        */
        stop: function () {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = undefined;
            }
        },
        /**
        * 存储或者拿出队列
        * @param elem
        */
        data: function (elem) {
            for (var i = 0, len = this.fxMap.length; i < len; i++) {
                var data = this.fxMap[i];
                if (elem === data[0]) {
                    return data[1];
                }
            }
            this.fxMap.push([elem, []]);
            return this.fxMap[this.fxMap.length - 1][1];
        },
        /**
        * 删除队列
        * @param elem
        */
        removeData: function (elem) {
            for (var i = 0, len = this.fxMap.length; i < len; i++) {
                var data = this.fxMap[i];
                if (elem === data[0]) {
                    this.fxMap.splice(i, 1);
                    if (this.isDataEmpty()) {
                        this.stop();
                    }
                }
            }
        },
        isDataEmpty: function () {
            return this.fxMap.length == 0;
        }
    }, 

    $ = fxBase;
    /**
    * 核心对象，用于生成动画对象。
    * @param elem
    * @param props
    * @param options
    * @return {Object}
    */
    function fxCore(elem, props, options) {
        this.elem = elem;
        this.props = props;
        this.options = options;
        this.start();
    }
    fxCore.prototype = {
        constructor: fxCore,
        /**
        * 将动画函数加入到队列中，并启动动画。
        */
        start: function () {
            var cores = $.data(this.elem);
            cores.push(this.step());
            $.tick();
        },
        /**
        * 核心方法，控制每一帧元素的状态。
        * @return function
        */
        step: function () {
            var _this = this;
            var fn = function (elem) {
                var t = Date.now() - this.startTime;
                if (Date.now() < this.startTime + this.options.duration) {
                    if (t <= 1) { t = 1; }
                    for (var i in this.target) {
                        if (typeof this.source[i]['val'] === 'number') {
                            var val = parseFloat((this.source[i]['val'] + (this.target[i]['val'] - this.source[i]['val']) * this.options.easing(t / this.options.duration)).toFixed(7));
                        } else {
                            var r = parseInt(this.source[i]['val']['r'] + (this.target[i]['val']['r'] - this.source[i]['val']['r']) * this.options.easing(t / this.options.duration));
                            var g = parseInt(this.source[i]['val']['g'] + (this.target[i]['val']['g'] - this.source[i]['val']['g']) * this.options.easing(t / this.options.duration));
                            var b = parseInt(this.source[i]['val']['b'] + (this.target[i]['val']['b'] - this.source[i]['val']['b']) * this.options.easing(t / this.options.duration));
                            var val = 'rgb(' + r + ',' + g + ',' + b + ')';
                        }
                        $.setStyle(this.elem, i, val + this.source[i]['unit']);
                    }
                } else {
                    for (var i in this.target) {
                        if (typeof this.target[i]['val'] === 'number') {
                            var val = this.target[i]['val'];
                        } else {
                            var val = 'rgb(' + this.target[i]['val']['r'] + ',' + this.target[i]['val']['g'] + ',' + this.target[i]['val']['b'] + ')';
                        }
                        $.setStyle(elem, i, val + this.source[i]['unit']);
                    }
                    var cores = $.data(elem);
                    cores.shift();
                    this.options.callback();
                    if (cores.length == 0) {
                        $.setStyle(elem, 'overflow', this.overflow);
                        $.removeData(elem);
                    }
                }
            }
            return function (elem) {
                if (!_this.startTime) {
                    var source = {};
                    _this.target = _this.props;
                    for (var i in _this.props) {
                        var val = $.getStyle(_this.elem, i);
                        source[i] = $.parseStyle(val);
                    }
                    _this.source = source;
                    _this.startTime = Date.now();
                    _this.overflow = $.getStyle(elem, 'overflow');
                    $.setStyle(elem, 'overflow', 'hidden');
                }
                fn.call(_this, elem);
            }
        }
    }
    /**
    * 外部接口类。
    */
    fx.prototype = {
        constructor: fx,
        /**
        * 动画方法
        * @param prop
        * @param duration
        * @param easing
        * @param callback
        * @return {Object}
        */
        animate: function (prop, duration, easing, callback) {
            if (arguments.length == 3 && typeof easing === 'function') { //多数时候用户第三个参数是回调
                callback = easing;
                easing = undefined;
            }
            var props = $.parseProp(prop);
            var options = $.setOption(this.elem, duration, easing, callback);
            var core = new fxCore(this.elem, props, options);
            return this;
        },
        /**
        * 停止动画方法
        * 使用方法 catjs('your element id').stop();
        */
        stop: function () {
            $.removeData(this.elem);
        }
    }
    win.catfx = catfx;
})(this, document); 