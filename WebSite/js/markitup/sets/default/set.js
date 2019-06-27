// ----------------------------------------------------------------------------
// markItUp!
// ----------------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
// Html tags
// http://en.wikipedia.org/wiki/html
// ----------------------------------------------------------------------------
// Basic set. Feel free to add more tags
// ----------------------------------------------------------------------------
mySettings = {
    onShiftEnter: { keepDefault: false, replaceWith: '<br />\n' },
    onCtrlEnter: { keepDefault: false, multiline: true, openWith: '<p>', closeWith: '</p>' },
    onTab: { keepDefault: false, replaceWith: '    ' },
    markupSet: [
		{ name: '一级标题', key: '3', openWith: '<h3>', closeWith: '</h3>\n', placeHolder: '' },
		{ name: '二级标题', key: '4', openWith: '<h4>', closeWith: '</h4>\n', placeHolder: '' },
		{ separator: '---------------' },
		{ name: '加粗', key: 'B', openWith: '(!(<b>|!|<strong>)!)', closeWith: '(!(</b>|!|</strong>)!)' },
		{ name: '倾斜', key: 'I', openWith: '(!(<em>|!|<i>)!)', closeWith: '(!(</em>|!|</i>)!)' },
		{ separator: '---------------' },
        { name: '插入图片', key: 'T', replaceWith: '<figure>\n<img src="[![例如: abcd/2012/l.jpg,图片说明(如果有的话)]!]" alt="" />(|(\n<figcaption>@@@</figcaption>)|)\n</figure>\n' },
        { name: '图片注释', key: 'F', openWith: '<figcaption>', closeWith: '</figcaption>' },
        { name: '段内摘要', key: '2', openWith: '<blockquote>', closeWith: '</blockquote>\n', placeHolder: '' },
		{ name: '超级链接', key: 'L', openWith: '<a href="[![Link:!:http://]!]"(!( title="[![Title]!]")!)>', closeWith: '</a>\n', placeHolder: '输入链接地址' },
        { name: '署名Footer', openWith: '<footer>', closeWith: '</footer>\n' },
        { name: '段落', key: 'Enter', openWith: '<p>', multiline: true, closeWith: '</p>' },
        { name: '诗歌', key: 'P', openWith: '<p class=\"verse\">', multiline: true, closeWith: '</p>' },
        { separator: '---------------' },
		{ name: '圆点列表', openWith: '    <li>', closeWith: '</li>', multiline: true, openBlockWith: '<ul>\n', closeBlockWith: '\n</ul>' },
		{ name: '数字列表', openWith: '    <li>', closeWith: '</li>', multiline: true, openBlockWith: '<ol>\n', closeBlockWith: '\n</ol>' },
		{ separator: '---------------' },
		{ name: '清除HTML', className: 'clean', replaceWith: function (markitup) { return markitup.selection.replace(/<(.*?)>/g, "") } },
		{ name: '预览', className: 'preview', call: 'preview' }
	]
}