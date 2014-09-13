goog.provide('kinyelo.ui.annotate.annotation.Reply');

goog.require('kinyelo.ui.annotate.annotation.ReplyRenderer');
goog.require('kinyelo.annotate.Reply');

/**
 *
 * @param {Array.<kinyelo.annotate.Reply>=} reply
 * @param {kinyelo.ui.annotate.annotation.ReplyRenderer} renderer
 * @constructor
 * @extends {goog.ui.Control}
 */
kinyelo.ui.annotate.annotation.Reply = function(reply, renderer) {
    goog.base(this, null /* content*/, renderer);
    //TODO: set supported states
    if(!reply) {
        //TODO: create empty reply typedef here
    }

    this.setModel(reply);

}
goog.inherits(kinyelo.ui.annotate.annotation.Reply, goog.ui.Control);


/**
 * return {!Array.<kinyelo.annotate.Reply>}
 * @override
 */
kinyelo.ui.annotate.annotation.Reply.prototype.getModel;

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.annotation.Reply.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    //TODO: add listeners
}


goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.annotation.Reply, kinyelo.ui.annotate.annotation.ReplyRenderer);

goog.ui.registry.setDecoratorByClassName(kinyelo.ui.annotate.annotation.ReplyRenderer.CSS_CLASS,
    function() { return new kinyelo.ui.annotate.annotation.Reply(); });