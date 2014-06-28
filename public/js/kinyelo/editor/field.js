goog.provide('kinyelo.editor.Field');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.editor.ContentEditableField');
goog.require('goog.editor.plugins.EnterHandler');
goog.require('kinyelo.editor.plugins.BasicTextFormatter');
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
goog.require('kinyelo.editor.plugins.HeadingFormatter');
goog.require('kinyelo.editor.DelayedCommand');

/**
 * @constructor
 * @extends {goog.editor.ContentEditableField}
 */
kinyelo.editor.Field = function(id, opt_doc) {

    this.parentElement_ = /** @type {!Element} */ (goog.dom.getElement(kinyelo.editor.Field.CONTAINER_ID_));
    var dom = goog.dom.getDomHelper(this.parentElement_);
    this.editableElement_ = dom.createDom(goog.dom.TagName.DIV, {id: kinyelo.editor.Field.POST_CONTAINER_ID});
    this.parentElement_.appendChild(this.editableElement_);

    this.createToolbar_();
    goog.editor.ContentEditableField.call(this, this.editableElement_, opt_doc);
    this.initToolbar_();
    this.makeEditable();

    goog.events.listen(this, goog.editor.Field.EventType.DELAYEDCHANGE, this.handleDelayedChange_, false, this);
    goog.events.listen(window, 'beforeunload', this.handleUnload_, false, this);

}
goog.inherits(kinyelo.editor.Field, goog.editor.ContentEditableField);
goog.exportSymbol('kinyelo.editor.Field.POST_CONTAINER_ID', kinyelo.editor.Field.POST_CONTAINER_ID);
goog.exportSymbol('kinyelo.editor.Field', kinyelo.editor.Field);



/** @override */
goog.editor.Field.DELAYED_CHANGE_FREQUENCY = 10000;


kinyelo.editor.Field.prototype.handleDelayedChange_ = function() {
    console.log('change happened');
}

kinyelo.editor.Field.prototype.handleUnload_ = function() {
    if(this.isModified()) {
        console.log('modified');
        return goog.getMsg('You have unsaved changes. Click cancel to return to the page and save them or click OK to discard');
    }
}

/**
 * Create the toolbar
 * @private
 */
kinyelo.editor.Field.prototype.createToolbar_ = function() {

    var dom = goog.dom.getDomHelper(this.parentElement_);
    this.toolbarElement_ = dom.createDom(goog.dom.TagName.DIV, {id: kinyelo.editor.Field.TOOLBAR_CONTAINER_ID_});
/*
    var strongButton = goog.ui.editor.ToolbarFactory.makeToggleButton(kinyelo.editor.plugins.InlineFormatter.COMMAND.STRONG, 'Bold', 'Bold');
    var emButton = goog.ui.editor.ToolbarFactory.makeToggleButton(kinyelo.editor.plugins.InlineFormatter.COMMAND.EM, 'Italic', 'Italic');
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
        h2Button
    ];*/

    this.buttons_ = [
        goog.editor.Command.BOLD,
        goog.editor.Command.ITALIC
    ];

    this.toolbar_ = goog.ui.editor.DefaultToolbar.makeToolbar(this.buttons_, this.toolbarElement_);

    /*
     var customRenderer = goog.ui.ContainerRenderer.getCustomRenderer(goog.ui.ContainerRenderer, 'k-toolbar');
     this.toolbar.setRenderer(customRenderer);
     */

    this.parentElement_.appendChild(this.toolbarElement_);

}

/**
 * Initialize the toolbar
 * @private
 */
kinyelo.editor.Field.prototype.initToolbar_ = function() {

    this.toolbarController_ = new goog.ui.editor.ToolbarController(this, this.toolbar_);

//    this.registerPlugin(new kinyelo.editor.plugins.InlineFormatter());
//    this.registerPlugin(new kinyelo.editor.plugins.HeadingFormatter());
    this.registerPlugin(new kinyelo.editor.plugins.BasicTextFormatter());
    this.registerPlugin(new goog.editor.plugins.RemoveFormatting());
    this.registerPlugin(new goog.editor.plugins.UndoRedo());
    this.registerPlugin(new goog.editor.plugins.ListTabHandler());
    this.registerPlugin(new goog.editor.plugins.SpacesTabHandler());
    this.registerPlugin(new goog.editor.plugins.EnterHandler());
    this.registerPlugin(new goog.editor.plugins.TagOnEnterHandler(goog.dom.TagName.P));
    this.registerPlugin(new goog.editor.plugins.LoremIpsum('Click here to edit'));


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
 * A saved command for insertion depending on subsequent user interaction
 * @type {kinyelo.editor.DelayedCommand}
 * @private
 */
kinyelo.editor.Field.prototype.delayedCommand_ = null;

/**
 * Save a range and command to insert an inline format later if the user types in the same
 * position after requesting a new format
 * @param {kinyelo.editor.DelayedCommand} command The delayed command to save
 */
kinyelo.editor.Field.prototype.setDelayedCommand = function(command) {
    if(command.getRange().isCollapsed()) {
        this.delayedCommand_  = command;
        //add a listener to execute the command after interaction
        this.keyEvent_ = goog.events.listen(this.field, goog.events.EventType.KEYPRESS, this.onInteraction, false, this);
        this.clickEvent_ = goog.events.listen(this.field, goog.events.EventType.CLICK, this.onInteraction, false, this);
    }
}

/**
 *
 * @returns {kinyelo.editor.DelayedCommand}
 */
kinyelo.editor.Field.prototype.getDelayedCommand = function() {
    return this.delayedCommand_;
}



/**
 * The method for a key press
 * @param {!goog.events.Event} e The event
 */
kinyelo.editor.Field.prototype.onInteraction = function(e) {
    if(!goog.isNull(this.delayedCommand_)) {
        var currentRange = this.getRange();
        var delayedRange = this.delayedCommand_.getRange();
        if(kinyelo.editor.isEqualRanges(currentRange, delayedRange) && e.getBrowserEvent().which != 0) {
            this.execCommand(this.delayedCommand_.getCommand());
        }

        this.delayedCommand_ = null;

        //set the command to null and remove listener
        goog.events.unlistenByKey(this.keyEvent_);
        goog.events.unlistenByKey(this.clickEvent_);
    }
}



