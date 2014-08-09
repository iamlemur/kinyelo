goog.provide('kinyelo.editor.AdvancedField');

goog.require('goog.dom');
goog.require('goog.editor.plugins.RemoveFormatting');
goog.require('goog.editor.plugins.UndoRedo');
goog.require('goog.editor.plugins.BasicTextFormatter');
//goog.require('goog.editor.plugins.ListTabHandler');
//goog.require('goog.editor.plugins.SpacesTabHandler');
goog.require('goog.ui.editor.ToolbarFactory');
goog.require('goog.ui.editor.ToolbarController');

goog.require('kinyelo.editor.Field');
goog.require('kinyelo.editor.plugins.LoremIpsum');
goog.require('kinyelo.editor.plugins.InlineFormatter');
goog.require('kinyelo.editor.plugins.HeadingFormatter');
goog.require('kinyelo.editor.plugins.EnterHandler');

/**
 * @constructor
 * @extends {kinyelo.editor.Field}
 */
kinyelo.editor.AdvancedField = function(id, opt_doc) {

    kinyelo.editor.Field.call(this, id, opt_doc);
    this.parentElement_ = /** @type {!Element} */ goog.dom.getParentElement(this.editableElement_);

    this.createToolbar_();

    this.initToolbar_();
    this.makeEditable();

}
goog.inherits(kinyelo.editor.AdvancedField, kinyelo.editor.Field);
goog.exportSymbol('kinyelo.editor.AdvancedField', kinyelo.editor.AdvancedField);



/** @override */
goog.editor.Field.DELAYED_CHANGE_FREQUENCY = 1000;

kinyelo.editor.AdvancedField.prototype.registerPlugins = function() {
    this.registerPlugin(new kinyelo.editor.plugins.EnterHandler());
    this.registerPlugin(new kinyelo.editor.plugins.InlineFormatter());
    this.registerPlugin(new kinyelo.editor.plugins.HeadingFormatter());
    this.registerPlugin(new kinyelo.editor.plugins.LoremIpsum(''));
    this.registerPlugin(new goog.editor.plugins.BasicTextFormatter());
    this.registerPlugin(new goog.editor.plugins.RemoveFormatting());
    this.registerPlugin(new goog.editor.plugins.UndoRedo());
    //this.registerPlugin(new goog.editor.plugins.ListTabHandler());
    //this.registerPlugin(new goog.editor.plugins.SpacesTabHandler());
    goog.base(this, 'registerPlugins');
}


/**
 * Create the toolbar
 * @private
 */
kinyelo.editor.AdvancedField.prototype.createToolbar_ = function() {

    var dom = goog.dom.getDomHelper(this.parentElement_);
    this.toolbarElement_ = dom.createDom(goog.dom.TagName.DIV, {id: kinyelo.editor.AdvancedField.TOOLBAR_CONTAINER_ID_});

    var strongButton = goog.ui.editor.ToolbarFactory.makeToggleButton(kinyelo.editor.plugins.InlineFormatter.COMMAND.STRONG, 'Strong', 'Strong');
    var emButton = goog.ui.editor.ToolbarFactory.makeToggleButton(kinyelo.editor.plugins.InlineFormatter.COMMAND.EM, 'Emphasis', 'Emphasis');
    strongButton.queryable = true;
    emButton.queryable = true;
    var h1Button = goog.ui.editor.ToolbarFactory.makeToggleButton(kinyelo.editor.plugins.HeadingFormatter.COMMAND.H1, 'H1', 'H1');
    var h2Button = goog.ui.editor.ToolbarFactory.makeToggleButton(kinyelo.editor.plugins.HeadingFormatter.COMMAND.H2, 'H2', 'H2');
    h1Button.queryable = true;
    h2Button.queryable = true;

    this.buttons_ = [
        strongButton,
        emButton,
        h1Button,
        h2Button,
    ];


    this.toolbar_ = goog.ui.editor.ToolbarFactory.makeToolbar(this.buttons_, this.toolbarElement_);

    //var customRenderer = goog.ui.ContainerRenderer.getCustomRenderer(goog.ui.ContainerRenderer, 'k-toolbar');
    //this.toolbar_.setRenderer(customRenderer);


    this.parentElement_.appendChild(this.toolbarElement_);

}

/**
 * Initialize the toolbar
 * @private
 */
kinyelo.editor.AdvancedField.prototype.initToolbar_ = function() {

    this.toolbarController_ = new goog.ui.editor.ToolbarController(this, this.toolbar_);

}

/**
 * The toolbar controller
 * @type {goog.ui.editor.ToolbarController}
 * @private
 */
kinyelo.editor.AdvancedField.prototype.toolbarController_ = null;

/**
 * Array of editor plugins
 * @type {Array.<string>}
 * @private
 */
kinyelo.editor.AdvancedField.prototype.buttons_ = null;


/**
 * Element of the editable area's container (including headings)
 * @type {Element}
 * @private
 */
kinyelo.editor.AdvancedField.prototype.parentElement_ = null;

/**
 * @type {string}
 * @const
 * @private
 */
kinyelo.editor.AdvancedField.TOOLBAR_CONTAINER_ID_ = 'rte-toolbar';


/**
 * the toolbar element
 * @type {Element}
 * @private
 */
kinyelo.editor.AdvancedField.prototype.toolbarElement_ = null;

/**
 * The toolbar for the rich text editor
 * @type {goog.ui.Toolbar}
 * @private
 */
kinyelo.editor.AdvancedField.prototype.toolbar_ =  null;


