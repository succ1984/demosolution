(function () {

    /*
    version: $version$ $release$ released
    author: ranklau@gmail.com
    */




    /**
    * 主要的命名空间
    */

    var Fox = {};
    var Expr = {};
    var Util = {};

    /**
    * @class util
    * @singleton
    */
    Util = {

        /**
        * 去首尾空格，包括全角
        * @method trim
        * @param  {String} 要去空格的字符串
        * @return {return} 返回去空白符的字符串
        */
        trim: function (s) {
            return s.replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, "");
        },

        /**
        * 替换函数，使方法：Uti.substitube('{$a}test', {a:'abc'})，返回abctest
        * @method substitute
        * @param  {String} tpl 替换模板
        * @param  {JSON}   json 数据
        * @return {return} 返回替换后的字符串
        */
        substitute: function (tpl, json) {
            return tpl.replace(/\{\$(\w+)\}/g, function (a, b) { return json[b] });
        },

        /**
        * 找出一个元素在集合中的索引
        * @method indexOf
        * @param  {Array Like} arr 集合数据
        * @param  {ANY}        item 要找的元素
        * @param  {Number}     from 从第几个索引开始查找
        * @return {Number} 返回元素所在索引，如找不到返回-1
        */
        indexOf: function (arr, item, from) {
            var len = arr.length;
            from = from | 0;
            if (from < 0) from += len;
            if (from < 0) from = 0;

            for (; from < len; from++) {
                if (from in arr && arr[from] === item) return from;
            }
            return -1;
        },

        /**
        * 求两个集合的并集
        * @method union
        * @param  {Array Like} a 集合a
        * @param  {Array Like} b 集合b
        * @return {Array Like} 返回并集
        */
        union: function (a, b) {
            return Util.uniquelize(a.concat(b));
        },

        /**
        * 找出一个元素是否存在于一个集合中
        * @method contains
        * @param  {Array Like} arr  集合数据
        * @param  {ANY}        item 要找的元素
        * @return {Number} 返回查找的布尔结果
        */
        contains: function (arr, item) {
            return Util.indexOf(arr, item) > -1;
        },

        /**
        * 集合去重
        * @method uniquelize
        * @param  {Array Like} arr  集合数据
        * @return {Array LIke} 去重后的结果
        */
        uniquelize: function (arr) {
            var result = [],
			contains = Util.contains;
            for (var i = 0, len = arr.length; i < len; i++) {
                if (!contains(result, arr[i])) {
                    result.push(arr[i]);
                }
            }
            return result;
        },

        /**
        * 数组过滤，对集合每个元素都执行一次过滤函数，并返回过滤结果。
        * @method arrayFilter
        * @param  {Array Like} arr    集合数据
        * @param  {Function}   filter 过滤函数
        * @return {Array LIke} 过滤后的集合
        */
        arrayFilter: function (arr, filter) {
            var result = [], n = 0;
            for (var i = 0, len = arr.length; i < len; i++) {
                var item = arr[i];
                if (filter(item)) result[n++] = item;
            }
            return result;
        },

        /**
        * 将输入参数生成为数组，HTMLElements将生成数组。
        * @method makeArray
        * @param  {ANY}   arr    任意数据
        * @param  {Array} result 可返回数组的引用
        * @return {Array LIke} 返回数组
        */
        makeArray: (function () {
            var slice = Array.prototype.slice,
			push = Array.prototype.push;

            try {

                slice.call(document.documentElement.childNodes, 0)[0].nodeType;
                return function (arr, result) {
                    result = result || [];
                    if (arr.length) result = slice.call(arr, 0);
                    else result.push(arr);
                    return result;
                };

            } catch (ex) {

                return function (arr, result) {
                    result = result || [];
                    if (Object.prototype.toString.call(arr) == '[object Array]' || !arr.length) {
                        push.call(result, arr);
                    } else if (arr.length) {
                        for (var i = 0, len = arr.length; i < len; i++) {
                            result.push(arr[i]);
                        }
                    } else {
                        throw new Error(['makeArray', 'unexpect arguments "' + arr + '"']);
                    }
                    return result;
                }

            };
        })()
    };

    /**
    * 查找时间戳
    * @property
    * @default {NULL}
    */
    Fox.timestamp = null;


    /** 
    * 通用抛异常函数
    * @method exception
    * @static
    * @param  {String} expr 要抛出的异常字符串
    * @return {Error}  返回一个Error对象
    */
    Fox.exception = function (expr) {
        throw new Error(['selector', 'unexpect expressions ["' + expr + '"]']);
    };


    /** 
    * 跨浏览器兼容的contains函数，即一个元素是否是包含另一个节点。
    * @method contains
    * @static
    * @param  {HTMLElement} a 祖先节点
    * @param  {HTMLElement} b 子孙节点
    * @return {Boolean}     返回布尔值。
    */
    Fox.contains = document.compareDocumentPosition ? function (a, b) {
        return !!(a.compareDocumentPosition(b) & 16);
    } : function (a, b) {
        return a !== b && (a.contains ? a.contains(b) : true);
    };


    /** 
    * 跨浏览器兼容的children函数，返回一个元素下的所有子节点
    * @method children
    * @static
    * @param  {HTMLElement} el 祖先节点
    * @return {Boolean}     返回所有子节点。
    */
    Fox.children = document.documentElement.children ? function (el) {
        return el.children;
    } : function (el) {
        return Util.arrayFilter(el.children, function (el) { return !!el.tagName; });
    };


    /** 
    * 得到一个树集合中第一层级的节点
    * @method getFirstLevelNodes
    * @static
    * @param  {HTMLElements|Array} 树集合节点
    * @return {Array}  返回第一层的节点集合数组
    */
    Fox.getFirstLevelNodes = function (nodes) {
        for (var i = 1; i < nodes.length; i++) {
            if (Fox.contains(nodes[i - 1], nodes[i])) {
                //除重，复杂度O(N)。
                //如果dom里前者包含后者，则移者后者
                //当前循环标记-1
                //结果将是
                //第一轮：[1,3,4,5,6], i=1
                //第二轮：[1,4,5,6] i=1
                //第三轮：[1,5,6] i=1
                //第四轮：[1,6] i=1
                //第五轮：[1] i=1
                nodes.splice(i, 1);
                i--;
            }
        }
        return nodes;
    };


    /**
    * 创建nth索引，方便nth查找
    * @method buildIndex
    * @static
    * @param  {HTMLElement} el 要创建节点的索引
    * @return {void}
    */
    Fox.buildIndex = function (el) {

        var parentEl = el.parentNode,
		childs = parentEl.childNodes,
		index = 1;

        for (var i = 0, len = childs.length; i < len; i++) {
            if (childs[i].tagName) childs[i]._index = index++;
        }

        parentEl._length = index;
        parentEl._timestamp = Fox.timestamp;
    }

    /**
    * 找到当前节点的索引值。
    * @method position
    * @static
    * @param  {HTMLElement} 要创建节点的索引
    * @param  {Boolean
    * @return {Number}
    * @remark nth-child(N): matches elements on the basis of their positions within a parent element's list of child elements.
    */
    Fox.position = function (el, reverse) {
        var p = el.parentNode;
        if (p.timestamp != Fox.timestamp) Fox.buildIndex(el);
        if (reverse) return p._length - el._index + 1; //nth-last-child的反转查法
        else return el._index; //顺序nth返回当前索引
    }


    /** 
    * 程序入口点，即浏览器里的document.querySelectorAll函数
    * @method query
    * @static
    * @param  {String} selector 选择器字符串
    * @param  {HTMLElement|HTMLElements|Array} context  上下文的节点或节点集合
    * @return {Array}  返回根据selector查找出来的结果集数组
    */
    Fox.query = function (selector, context) {

        /**
        存储解析好的数据
        */
        var selectors = [],

        /**
        返回结果
        */
	result = [],

        /**
        解析规则
        (关系符{1}(标签元素{1})((?:属性选择符)*)(:伪类)?)+
        */
	regExp = /(^|\s*[>+~ ]\s*)(([\w\-\:.#*]+|\([^\)]*\)|\[[^\]]*\])+)(?=($|\s*[>+~ ]\s*))/g,

        /**
        关系符为空，默认tagName为*
        */
	tagName = '*',

        /**
        最后一个关系符
        */
	last_relation = null,

        /**
        trim引用
        */
	trim = Util.trim,

        /**
        makeArray引用
        */
	makeArray = Util.makeArray;


        /**
        如果context参数为空，则默认从document根元素开始查找
        */
        context = context || document.documentElement;

        /**
        最后查询时间戳
        */
        Fox.timestamp = new Date * 1;

        /** 
        解析输入的selector，处理成格式化好处理的形式，形如：
        [[relation, tagname+attribute+pseudo]]
        */
        selector = selector.replace(regExp, function (all, relation, tagName, attribute, pseudo) {
            selectors.push([relation, tagName]);
            return ''; //将输入参数进行替代，最后不为空，则输入的selector不合法。
        });

        /**
        如果遇到不能解析的selector给出异常
        */
        if (selector != '') Fox.exception(selector);

        /**
        转成数组
        可以调用Fox.makeArray方法
        */
        result = makeArray(context);

        /**
        主要的parser程序
        从前往后查找，暂不作优化。
        如遇到div div.a的情况就需要除重处理，因为第一次解析成
        document.documentElement div处理时已经包括了div.a
        */
        for (var i = 0, sl = selectors.length; i < sl; i++) {

            var part = selectors[i];
            var relation = trim(part[0]) || ' '; //取出的关系
            var attri = trim(part[1]); //取出的属性。
            var tmpNodes = []; //临时存储节点数组

            //如果关系符为祖先（包含关系符）时，取出tagName，而后的Expr则用element.getElementsByTagName(tagName)来找节点集合。
            if (relation == ' ') attri = attri.replace(/^[\w-]+/, function (t) { tagName = t; return '' });

            if (relation == ' ' && last_relation == ' ') {
                //前一个的关系为祖先（包含选择符），当前的关系选择符也为祖先时，则用快速去重法；
                //得到第一层节点集合。
                result = Fox.getFirstLevelNodes(result);
            }

            var relationHandle = Expr.relations[relation];
            var filterHandle = Expr.parseToFilter(attri);

            //兄弟节点除重
            if (relation == '~') {

                for (var j = 0, len = result.length; j < len; j++) {
                    var queryResult = relationHandle(result[j], filterHandle, tagName);
                    tmpNodes = Util.union(tmpNodes, queryResult);
                }

            } else {

                for (var j = 0, len = result.length; j < len; j++) {
                    var queryResult = relationHandle(result[j], filterHandle, tagName);
                    tmpNodes = tmpNodes.concat(queryResult);
                }

            }

            //存储到结果集
            result = tmpNodes;

            //记录最后一次关系符。
            last_relation = relation;
        };

        return result;
    };




    /**
    * selector 表达式
    * @class Expr
    * @singleton
    */

    Expr = Fox.selectors = {

        /** 
        * 伪类配置过滤函数
        * 由前向后找的过滤总是以前一个节点为基础上进行过滤的。
        * 如果由后往前找的过滤，则刚好相反
        * @perperty pseudos
        * @static
        */
        pseudos: {

            "first-child": function (el) {
                return el.parentNode.getElementsByTagName("*")[0] == el;
            },

            "last-child": function (el) {
                return !(el = el.nextSibling) || !el.tagName && !el.nextSibling;
            },

            "only-child": function (el) {
                return Fox.children(el.parentNode).length == 1;
            },

            "nth-child": function (el, nth) {
                //element position
                var pos = Fox.position(el, false); //要把转化position这步closure起来以提高效率。
                return Expr.nthFilter(nth, pos);
            },

            "nth-last-child": function (el, nth) {
                //element position
                var pos = Fox.position(el, true);
                return Expr.nthFilter(nth, pos);
            },

            "nth-of-type": function (el, nth) {
                var i = 1;
                while (el = el.previousSibling) {
                    if (el.tagName == el.tagName) i++;
                }
                return Expr.nthFilter(nth, i);
            },

            "nth-last-of-type": function (el, nth) {
                var i = 1;
                while (el = el.nextSibling) {
                    if (el.tagName == el.tagName) i++;
                }
                return Expr.nthFilter(nth, i);
            },

            "first-of-type": function (el) {
                var tag = el.tagName;
                while (el = el.previousSlibling) {
                    if (el.tagName == tag) return false;
                }
                return true;
            },

            "last-of-type": function (el) {
                var tag = el.tagName;
                while (el = el.nextSibling) {
                    if (el.tagName == tag) return false;
                }
                return true;
            },

            "only-of-type": function (el) {
                var els = el.parentNode.childNodes;
                for (var i = els.length - 1; i > -1; i--) {
                    if (els[i].tagName == el.tagName && els[i] != el) return false;
                }
                return true;
            },

            "empty": function (el) {
                return !el.firstChild;
            },

            "parent": function (el) {
                return !!el.firstChild;
            },

            "not": function (el, selector) {
                return !Expr.parseToFilter(selector)(el);
                //return !filter(el); 
            },

            "enabled": function (el) {
                return !el.disabled && el.type !== "hidden";
            },

            "disabled": function (el) {
                return el.disabled;
            },

            "checked": function (el) {
                return el.checked;
            },

            "contains": function (el, txt) {
                return (el.textContent || el.innerText || "").indexOf(txt) >= 0;
            }

            /**你也可以自己加些伪类，例如text，image**/
        },

        /** 
        * 表达式配置字符串方法，其中{$handle}表示获
        取attribute的方法，{$value}表示值
        * @perperty operators
        * @static
        */
        operators: {
            '': '{$handle}', //isTrue|hasValue
            '=': '{$handle}=="{$value}"', //equal
            '!=': '{$handle}!="{$value}"', //unequal
            '~=': '{$handle}&&(" "+{$handle}+" ").indexOf(" {$value} ")>-1', //onePart
            '|=': '{$handle}&&({$handle}+"-").indexOf("{$value}-")==0', //firstPart
            '^=': '{$handle}&&{$handle}.indexOf("{$value}")==0', // beginWith
            '$=': '{$handle}&&{$handle}.lastIndexOf("{$value}")=={$handle}.length-"{$value}".length', // endWith
            '*=': '{$handle}&&{$handle}.indexOf("{$value}")>-1' //contains
        },

        /** 
        * 关系selector配置查找函数
        * @perperty relations
        * @static
        */
        relations: {

            //contains
            " ": function (el, filter, tagName) {
                var result = el.getElementsByTagName(tagName || "*");
                return Util.arrayFilter(result, filter);
            },

            //children
            ">": function (el, filter) {
                var nodes = el.childNodes,
				result = [];
                for (var i = 0, len = nodes.length; i < len; i++) {
                    var node = nodes[i];
                    if (("tagName" in node) && filter(node)) result.push(node);
                }
                return result;
            },

            //nextSibling
            "+": function (el, filter) {
                while (el = el.nextSibling) {
                    if ("tagName" in el) {
                        if (filter(el)) return [el]; else return [];
                    }
                }
                return [];
            },

            //nextSiblings
            "~": function (el, filter) {
                var arr = [];
                while (el = el.nextSibling) {
                    if (el.tagName && filter(el)) arr.push(el);
                }
                return arr;
            }
        },

        /** 
        * 快捷选择符配置替换函数
        * @perperty shortcuts
        * @static
        */
        shortcuts: [
		[/\#([\w\-]+)/g, '[id="$1"]'], //id缩略写法
		[/^([\w\-]+)/g, function (a, b) { return '[tagName="' + b.toUpperCase() + '"]'; } ], //tagName缩略写法
		[/\.([\w\-]+)/g, '[className~="$1"]'], //className缩略写法
		[/^\*/g, '[tagName]']//任意tagName缩略写法
	],

        /** 
        * 快捷选择符解析函数，将快捷选符符解析成普通选择符
        * @method parseShortcuts
        * @param  {String} selector 选择符的字符串
        * @static
        * @return {String} 替换完成的普通选择字符串
        */
        parseShortcuts: function (selector) {
            var sc = Expr.shortcuts;
            for (var i = 0, len = sc.length; i < len; i++) {
                selector = selector.replace(sc[i][0], sc[i][1]);
            }
            return selector;
        },

        /** 
        * 比较nth值与当前position，通过则为true，否则为false
        * @method nthFilter
        * @param  {String} nthValue 选择符的字符串
        * @param  {Number} pos      HTMLElement在父元素下的索引值
        * @static
        * @return {Function} 返回nth的数字值
        */
        nthFilter: function (nthValue, pos) {

            if (nthValue == "even") nthValue = '2n';
            if (nthValue == "odd") nthValue = '2n+1';

            var nthValue = nthValue.replace(/(^|\D+)n/g, "$11n");

            if (!(/n/.test(nthValue))) {
                //没有N乘数
                return pos == nthValue;
            } else {
                //a * n + b = pos;
                //(pos - b) % n = 0
                var arr = nthValue.split("n");
                var a = arr[0] | 0, b = arr[1] | 0;
                var d = pos - b;
                return d >= 0 && d % a == 0;
            }

        },

        /**
        * 将一个格式化好的attribute selector数组解析成过滤函数
        * @method parseAttributesToFilter
        * @static
        * @param  {Array}    一个格式化好的attribute selector数组
        * @return {Function} 返回一个filter的过滤函数。
        * @remark 接口：属性的格式是[[名,运算符,值]] 的二维数组；
        */
        parseAttributesToFilter: function (attris) {

            if (attris.length == 0) return null; //如果没有属性选择符

            var attriFunc = [];

            for (var i = 0, attr; attr = attris[i]; i++) {
                //属性过滤

                //得到attribute函数
                var sAttri = Expr.getAttriHandle(attr[0]);
                var operator = attr[1];
                var value = attr[2];

                attriFunc.push(Util.substitute(Expr.operators[operator], {
                    handle: sAttri, value: value
                }));

            }

            attriFunc = 'return ' + attriFunc.join("&&");
            //一个短路条件写法，提高效率；据说jquery实际上也是通过这样的方法提高效率；

            return new Function("el", attriFunc);
        },


        /**
        * 将一个格式化好的pseudos selector数组解析成过滤函数
        * @method parsePseudosToFilter
        * @static
        * @param  {Array}    一个格式化好的pseudos selector数组
        * @return {Function} 返回一个filter的过滤函数。
        * @remark 接口：伪类的格式是[[名,值]] 的二维数组；
        */
        parsePseudosToFilter: function (pseudos) {

            var filters = [];

            for (var i = 0, p; p = pseudos[i]; i++) {
                //伪类过滤

                var name = p[0],
				value = p[1];

                var pseHandle = Expr.pseudos[name];
                if (!pseHandle) Fox.exception(name); //找不到伪类hash里面的函数则抛异常

                if (name.indexOf('nth') == 0
			|| name == "not" || name == 'contains') {
                    //后期需要优化
                    filters.push(function (el) {
                        return pseHandle(el, value);
                    });

                } else filters.push(pseHandle);

            }

            return filters;
        },


        /** 
        * 解析selector成过滤函数
        * @method parseToFilter
        * @static
        * @param  {String}   selector 需要处理的selector字符串，包括属性选择器和伪类选择器
        * @return {Function} 返回一个filter的过滤函数，该函数的参数是一个HTMLElement。
        */
        parseToFilter: function (selector) {

            /**
            伪类的格式是[[名,值]]
            的二维数组；

            属性的格式是[[名,运算符,值]]
            的二维数组；
            */
            var attris = [],
			pseudos = [];

            var pseudoReg = /\:([\w\-]+)(\(([^)]+)\))?/g,
			attriReg = /\[\s*([\w\-]+)\s*([!~|^$*]?\=)?\s*(?:(["']?)([^\]'"]*)\3)?\s*\]/g;

            /** 生成的函数队列 */
            var filterFuncs = [],
			attriFuncs = [],
			pseudoFuncs = [];

            /**
            标准快捷方式转换
            */
            selector = Expr.parseShortcuts(selector);

            //伪类存储[name,value]
            selector = selector.replace(pseudoReg, function (a, b, c, d, e) {
                pseudos.push([b, d]); return "";
            });

            //属性存储[name,operator,value]
            selector = selector.replace(attriReg, function (a, b, c, d, e) {
                attris.push([b, c || "", e || ""]); return "";
            });

            if (selector != '') Fox.exception(selector);

            //解析attributes
            attriFuncs = Expr.parseAttributesToFilter(attris);
            attriFuncs && filterFuncs.push(attriFuncs);



            //解析pseudos
            pseudoFuncs = Expr.parsePseudosToFilter(pseudos);
            if (pseudoFuncs.length) filterFuncs = filterFuncs.concat(pseudoFuncs);

            //只是为了不循环，采用加速，去除也可。
            switch (filterFuncs.length) {
                case 0: return function (el) { return true; };
                case 1: return filterFuncs[0];
                case 2: return function (el) { return filterFuncs[0](el) && filterFuncs[1](el); };
            }

            //循环返回过滤结果
            return function (el) {

                for (var i = 0; i < funcLength; i++) {
                    if (!filterFuncs[i](el)) return false;
                }

                return true;
            };
        },


        /** 
        * 通过一个attribute来判断是用内置还是getAttribute方法来获得相应的属性值。
        * @method getAttriHandle
        * @param  {String} attri attribute名称
        * @static
        * @return {String} 查找相应的attribute的方式，以字符串方式返回。
        */
        getAttriHandle: (function () {
            /* 是否使用内置.attribute形式来获取属性 */

            //内置attribute相关属性转换
            var attriMap = {
                'class': 'el.className',
                'for': 'el.htmlFor',
                'href': 'el.getAttribute("href", 2)'
            };

            //优先.attribute属性获取
            var nativeAttris = 'name,id,className,value,selected,checked,disabled,type,tagName,readOnly'.split(',');

            //内置属性获取
            for (var i = 0, len = nativeAttris.length; i < len; i++) {
                attriMap[nativeAttris[i]] = 'el.' + nativeAttris[i];
            }

            return function (attri) {
                return attriMap[attri] || 'el.getAttribute("' + attri + '")';
            };
        })()

    };

    window.Fox = Fox;
})();
