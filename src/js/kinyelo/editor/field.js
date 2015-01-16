goog.provide('kinyelo.editor.Field');

goog.require('goog.editor.ContentEditableField');
goog.require('goog.editor.Plugin');
goog.require('goog.string');

/**
 * @constructor
 * @extends {goog.editor.ContentEditableField}
 */
kinyelo.editor.Field = function(id, opt_doc) {

    this.editableElement_ = /** @type {!Element} */ (goog.dom.getElement(id));
    this.editableElement_.spellcheck = false;
    goog.editor.ContentEditableField.call(this, this.editableElement_, opt_doc);
    this.registerPlugins();

}
goog.inherits(kinyelo.editor.Field, goog.editor.ContentEditableField);


/**
 *
 */
kinyelo.editor.Field.prototype.registerPlugins = function() {
    var plugin = this.getPluginByClassId('LoremIpsum');
    //TODO: check that this plugin exists
    plugin.postInit();
}


/**
 * @override
 */
kinyelo.editor.Field.prototype.execCommand = function(command, var_args) {
    goog.base(this, 'execCommand', command, var_args);
    var blockNodes = goog.dom.findNodes(this.getElement(), goog.editor.node.isBlockTag);
    goog.array.forEach(blockNodes, goog.bind(this.addUniqueID, this, false));
}

/**
 *
 * @param {Element} node
 * @param {boolean} force
 * @returns {Element}
 */
kinyelo.editor.Field.prototype.addUniqueID = function(node, force) {
    if(goog.string.isEmptySafe(node.id) || force) {
        node.id = this.generateID();
    }
    return node;
}

kinyelo.editor.Field.prototype.generateID = function() {
    //TODO: ensure this does not conflict with existing IDs
    var limit = Math.pow(16, 4);
    var number = parseInt(Math.random()*limit);
    return number.toString(16);
}


/**
 * Element of the main editable body
 * @type {Element}
 * @private
 */
kinyelo.editor.Field.prototype.editableElement_ = null;

/**
 * @type {goog.events.EventHandler=}
 * @private
 */
kinyelo.editor.Field.prototype.eventRegister_ = null;



/**
 * Handles keydown on the field.
 * override this because the backspace is not detected in Chrome by keyPress or keyDown
 * @param {goog.events.BrowserEvent} e The browser event.
 * @private
 * @override
 */
kinyelo.editor.Field.prototype.handleKeyDown_ = function(e) {
    if(e.keyCode == goog.events.KeyCodes.BACKSPACE) {
        var range = this.getRange();
        var container = goog.editor.style.getContainer(
            range && range.getContainerElement());
        var section = goog.dom.getAncestorByTagNameAndClass(container, goog.dom.TagName.SECTION);
        // if we have the container and the container is empty and the first child of the section
        // and the section is the last child of the editable element
        if (container &&
            container.innerHTML.match(kinyelo.editor.emptyNodeRegExp) &&
            goog.dom.getFirstElementChild(section) == container &&
            section &&
            goog.dom.getFirstElementChild(this.getElement()) == section) {
            // Don't delete if it's the last node in the field and just has a BR.
            e.preventDefault();
            // TODO(user): I think we probably don't need to stopPropagation here
            e.stopPropagation();
        }
    }

    goog.base(this, 'handleKeyDown_', e);

};