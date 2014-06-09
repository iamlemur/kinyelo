goog.provide('kinyelo.editor.Field');

goog.require('goog.dom');
goog.require('goog.editor.ContentEditableField');
goog.require('goog.editor.plugins.EnterHandler');
goog.require('goog.editor.plugins.ListTabHandler');
goog.require('goog.editor.plugins.LoremIpsum');
goog.require('goog.editor.plugins.RemoveFormatting');
goog.require('goog.editor.plugins.SpacesTabHandler');
goog.require('goog.editor.plugins.UndoRedo');
goog.require('goog.editor.plugins.TagOnEnterHandler');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.editor.DefaultToolbar');
goog.require('goog.ui.editor.ToolbarController');
goog.require('goog.debug.Logger');

goog.require('kinyelo.editor.plugins.InlineFormatter');
goog.require('kinyelo.editor.plugins.HeaderFormatter');

/**
 * @constructor
 * @extends {goog.editor.ContentEditableField}
 */
kinyelo.editor.Field = function(id, opt_doc) {

    this.parentElement_ = /** @type {!Element} */ (goog.dom.getElement(kinyelo.editor.Field.CONTAINER_ID_));
    var dom = goog.dom.getDomHelper(this.parentElement_);
    this.editableElement_ = dom.createDom(goog.dom.TagName.DIV, {id: kinyelo.editor.Field.POST_CONTAINER_ID});
    goog.editor.ContentEditableField.call(this, this.editableElement_, opt_doc);
    this.initEditor_();

}
goog.inherits(kinyelo.editor.Field, goog.editor.ContentEditableField);
goog.exportSymbol('kinyelo.editor.Field.POST_CONTAINER_ID', kinyelo.editor.Field.POST_CONTAINER_ID);
goog.exportSymbol('kinyelo.editor.Field', kinyelo.editor.Field);

/**
 * Initialize the editing interface
 * @private
 */
kinyelo.editor.Field.prototype.initEditor_ = function() {

    var dom = goog.dom.getDomHelper(this.parentElement_);
    this.toolbarElement_ = dom.createDom(goog.dom.TagName.DIV, {id: kinyelo.editor.Field.TOOLBAR_CONTAINER_ID_});

    this.initToolbar_();

    this.parentElement_.appendChild(this.editableElement_);
    this.parentElement_.appendChild(this.toolbarElement_);

    this.toolbarController_ = new goog.ui.editor.ToolbarController(this, this.toolbar_);

    /*
     var customRenderer = goog.ui.ContainerRenderer.getCustomRenderer(goog.ui.ContainerRenderer, 'k-toolbar');
     this.toolbar.setRenderer(customRenderer);
     */

    this.registerPlugin(new kinyelo.editor.plugins.InlineFormatter());
    this.registerPlugin(new goog.editor.plugins.RemoveFormatting());
    this.registerPlugin(new goog.editor.plugins.UndoRedo());
    this.registerPlugin(new goog.editor.plugins.ListTabHandler());
    this.registerPlugin(new goog.editor.plugins.SpacesTabHandler());
    this.registerPlugin(new goog.editor.plugins.EnterHandler());
    this.registerPlugin(new goog.editor.plugins.TagOnEnterHandler(goog.dom.TagName.P));
    this.registerPlugin(new goog.editor.plugins.LoremIpsum('Click here to edit'));
    this.makeEditable();
}

/**
 * Initialize the toolbar
 * @private
 */
kinyelo.editor.Field.prototype.initToolbar_ = function() {

    var strongButton = goog.ui.editor.ToolbarFactory.makeToggleButton(kinyelo.editor.plugins.InlineFormatter.COMMAND.STRONG, 'Bold', 'Bold');
    var emButton = goog.ui.editor.ToolbarFactory.makeToggleButton(kinyelo.editor.plugins.InlineFormatter.COMMAND.EM, 'Italic', 'Italic');
    strongButton.queryable = true;
    emButton.queryable = true;

    this.buttons_ = [
        strongButton,
        emButton
    ];


    this.toolbar_ = goog.ui.editor.DefaultToolbar.makeToolbar(this.buttons_, this.toolbarElement_);


}

/**
 * The toolbar controller
 * @type {goog.ui.editor.ToolbarController}
 * @private
 */
kinyelo.editor.Field.prototype.toolbarController_ = null;

/**
 * Array of editor plugins
 * @type {Array.<string>}
 * @private
 */
kinyelo.editor.Field.prototype.buttons_ = null;


/**
 * Element of the editable area's container (including headings)
 * @type {Element}
 * @private
 */
kinyelo.editor.Field.prototype.parentElement_ = null;

/**
 * @type {string}
 * @const
 * @private
 */
kinyelo.editor.Field.CONTAINER_ID_ = 'opus';

/**
 * @type {string}
 * @const
 */
kinyelo.editor.Field.POST_CONTAINER_ID = 'post-body';

/**
 * @type {string}
 * @const
 * @private
 */
kinyelo.editor.Field.TOOLBAR_CONTAINER_ID_ = 'rte-toolbar';

/**
 * Element of the main editable body
 * @type {Element}
 * @private
 */
kinyelo.editor.Field.prototype.editableElement_ = null;

/**
 * the toolbar element
 * @type {Element}
 * @private
 */
kinyelo.editor.Field.prototype.toolbarElement_ = null;

/**
 * The toolbar for the rich text editor
 * @type {goog.ui.Toolbar}
 * @private
 */
kinyelo.editor.Field.prototype.toolbar_ =  null;


/**
 * @type {goog.dom.SavedRange}
 * @private
 */
kinyelo.editor.Field.prototype.insertRange_ = null;

/**
 * Save a range to insert an inline format later if the user types in the same position
 * after requesting a new format
 * @param {!goog.dom.SavedRange} savedRange The range to save
 */
kinyelo.editor.Field.prototype.setInsertRange = function(savedRange) {
    if(savedRange.isCollapsed()) {
        this.insertRange_ = savedRange;
    }
}



/**
 * Tags of elements that can contain inline format tags.
 * @enum {string}
 */
kinyelo.editor.BlockFormats = [
    goog.dom.TagName.P,
    goog.dom.TagName.LI
];

/**
 * Whether a given node is a text node.
 * @param {!Node} node Node to check the type of
 * @return {boolean} Whether a given node is a text node.
 */
kinyelo.editor.isTextNode = function(node) {
    return node.nodeType == goog.dom.NodeType.TEXT;
}

