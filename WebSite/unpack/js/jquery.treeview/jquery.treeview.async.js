/*
 * Async Treeview 0.1 - Lazy-loading extension for Treeview
 * 
 * http://bassistance.de/jquery-plugins/jquery-plugin-treeview/
 *
 * Copyright (c) 2007 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 *
 */

;(function($) {

    function load(settings, root, child, container, nodetype) {
        function createNode(parent) {
            var current = $("<li/>").attr("id", this.id || "").html("<span>" + this.text + "</span>").appendTo(parent);
            /****
            **chang_cheng added
            **/
            current.attr("nodetype", this.nodetype);
            if (this.classes.toString().indexOf("file") != -1) {
                current.html("");
                var linkPdt = $("<a class=\"pdtInTreeLink\" href=\"javascript:;\" onclick=\"fillTreeNode(this)\"></a>");
                linkPdt.addClass("file");
                linkPdt.html(this.text);
                if (this.pdtName || "") {
                    linkPdt.attr("pn", (this.pdtName));
                }
                if (this.pdtNumber || "") {
                    linkPdt.attr("pnm", this.pdtNumber);
                }
                if (this.pdtModelNumber || "") {
                    linkPdt.attr("pmn", this.pdtModelNumber);
                }
                current.html(linkPdt);
            }
            /****
            **End of chang_cheng added
            **/

            if (this.classes) {
                current.children("span").addClass(this.classes);
            }
            if (this.expanded) {
                current.addClass("open");
            }
            if (this.hasChildren || this.children && this.children.length) {
                var branch = $("<ul/>").css("display", "none").appendTo(current);
                if (this.hasChildren) {
                    current.addClass("hasChildren");
                    createNode.call({
                        classes: "placeholder",
                        text: "&nbsp;",
                        children: []
                    }, branch);
                }
                if (this.children && this.children.length) {
                    $.each(this.children, createNode, [branch]);
                }
            }
        }//end createNode
        //        alert(settings.url);
        $.ajax($.extend(true, {
            url: settings.url,
            dataType: "json",
            data: {
                root: root,
                nodetype: nodetype//chang_cheng added
            },
            success: function(response) {
                child.empty();
                $.each(response, createNode, [child]);
                $(container).treeview({ add: child });
            }
        }, settings.ajax));
        /*
        $.getJSON(settings.url, {root: root}, function(response) {
        function createNode(parent) {
        var current = $("<li/>").attr("id", this.id || "").html("<span>" + this.text + "</span>").appendTo(parent);
        if (this.classes) {
        current.children("span").addClass(this.classes);
        }
        if (this.expanded) {
        current.addClass("open");
        }
        if (this.hasChildren || this.children && this.children.length) {
        var branch = $("<ul/>").appendTo(current);
        if (this.hasChildren) {
        current.addClass("hasChildren");
        createNode.call({
        classes: "placeholder",
        text: "&nbsp;",
        children:[]
        }, branch);
        }
        if (this.children && this.children.length) {
        $.each(this.children, createNode, [branch])
        }
        }
        }
        child.empty();
        $.each(response, createNode, [child]);
        $(container).treeview({add: child});
        });
        */
    }

    var proxied = $.fn.treeview;
    $.fn.treeview = function(settings) {
        if (!settings.url) {
            return proxied.apply(this, arguments);
        }
        var container = this;
        if (!container.children().size())
            load(settings, "source", this, container, "root");
        var userToggle = settings.toggle;
        return proxied.call(this, $.extend({}, settings, {
            collapsed: true,
            toggle: function() {
                var $this = $(this);
                if ($this.hasClass("hasChildren")) {
                    var childList = $this.removeClass("hasChildren").find("ul");
                    var nodeType = $this.attr("nodetype");
                    load(settings, this.id, childList, container, nodeType);
                }
                if (userToggle) {
                    userToggle.apply(this, arguments);
                }
            }
        })
        );
    };

})(jQuery);