goog.provide('kinyelo.ui.annotate.annotation.Comment');

goog.require('kinyelo.ui.annotate.Annotation');
goog.require('kinyelo.annotate.Reply');
goog.require('kinyelo.ui.annotate.annotation.CommentRenderer');


/**
 *
 * @param {kinyelo.annotate.Reply} comment
 * @param {kinyelo.ui.annotate.annotation.CommentRenderer=} renderer
 * @constructor
 * @extends {kinyelo.ui.annotate.Annotation}
 */
kinyelo.ui.annotate.annotation.Comment = function(comment, renderer) {
    goog.base(this, comment, renderer);
    if(goog.isDefAndNotNull(comment.replies)) {
        this.addClassName('has-children');
    }
}
goog.inherits(kinyelo.ui.annotate.annotation.Comment, kinyelo.ui.annotate.Annotation);

goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.annotation.Comment, kinyelo.ui.annotate.annotation.CommentRenderer);

goog.ui.registry.setDecoratorByClassName(kinyelo.ui.annotate.annotation.CommentRenderer.CSS_CLASS,
    function() { return new kinyelo.ui.annotate.annotation.Comment(); });