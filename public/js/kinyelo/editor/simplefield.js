goog.provide('kinyelo.editor.SimpleField');

/**
 * @constructor
 * @extends {goog.editor.ContentEditableField}
 */
kinyelo.editor.SimpleField = function(id, opt_doc) {

    goog.editor.ContentEditableField.call(this, id, opt_doc);

}
goog.inherits(kinyelo.editor.SimpleField, goog.editor.ContentEditableField);