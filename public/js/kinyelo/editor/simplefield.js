goog.provide('kinyelo.editor.SimpleField');

goog.require('kinyelo.editor.Field');
goog.require('kinyelo.editor.plugins.BasicTextFormatter');
goog.require('kinyelo.editor.plugins.LoremIpsum');
goog.require('goog.editor.plugins.TagOnEnterHandler');
goog.require('goog.editor.plugins.UndoRedo');

/**
 * @constructor
 * @extends {kinyelo.editor.Field}
 */
kinyelo.editor.SimpleField = function(id, opt_doc) {

    kinyelo.editor.Field.call(this, id, opt_doc);
    this.makeEditable();

}
goog.inherits(kinyelo.editor.SimpleField, kinyelo.editor.Field);

kinyelo.editor.SimpleField.prototype.registerPlugins = function() {
    this.registerPlugin(new kinyelo.editor.plugins.BasicTextFormatter());
    this.registerPlugin(new goog.editor.plugins.UndoRedo());
    this.registerPlugin(new goog.editor.plugins.TagOnEnterHandler(goog.dom.TagName.P));
    this.registerPlugin(new kinyelo.editor.plugins.LoremIpsum(''));
    goog.base(this, 'registerPlugins');
}