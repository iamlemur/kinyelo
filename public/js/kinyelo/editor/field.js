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
    goog.editor.ContentEditableField.call(this, this.editableElement_, opt_doc);
    this.registerPlugins();

}
goog.inherits(kinyelo.editor.Field, goog.editor.ContentEditableField);


kinyelo.editor.Field.prototype.registerPlugins = function() {
    var plugin = this.getPluginByClassId('LoremIpsum');
    if(!goog.isNull(plugin)) {
        plugin.postInit();
    }
}

/**
 * @inheritDoc
 */
kinyelo.editor.Field.prototype.execCommand = function(command, var_args) {
    goog.base(this, 'execCommand', command, var_args);
    var blockNodes = goog.dom.findNodes(this.getElement(), goog.editor.node.isBlockTag);
    goog.array.forEach(blockNodes, goog.bind(this.addUniqueID, this));
}

kinyelo.editor.Field.prototype.addUniqueID = function(node) {
    if(goog.string.isEmptySafe(node.id)) {
        node.id = this.generateID();
    }
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
