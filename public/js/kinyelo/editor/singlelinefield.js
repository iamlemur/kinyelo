goog.provide('kinyelo.editor.SingleLineField');

goog.require('kinyelo.editor.Field');
goog.require('kinyelo.editor.plugins.LoremIpsum');
goog.require('kinyelo.editor.plugins.EnterHandler');

/**
 * @constructor
 * @extends {kinyelo.editor.Field}
 */
kinyelo.editor.SingleLineField = function(id, opt_doc) {

    kinyelo.editor.Field.call(this, id, opt_doc);
    this.makeEditable();

}
goog.inherits(kinyelo.editor.SingleLineField, kinyelo.editor.Field);

kinyelo.editor.SingleLineField.prototype.registerPlugins = function() {

    this.registerPlugin(new kinyelo.editor.plugins.LoremIpsum(''));
    this.registerPlugin(new kinyelo.editor.plugins.EnterHandler(false));

    goog.base(this, 'registerPlugins');

}

kinyelo.editor.SingleLineField.prototype.handleKeyPress = function(e) {
    console.log(e.keyCode);
    if(e.keyCode == 13) {
        e.preventDefault();
        return true;
    }
}