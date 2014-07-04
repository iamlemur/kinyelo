goog.provide('kinyelo.editor.Field');

goog.require('goog.editor.ContentEditableField');
goog.require('goog.editor.Plugin');

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
