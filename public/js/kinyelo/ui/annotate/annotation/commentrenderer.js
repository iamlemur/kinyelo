goog.provide('kinyelo.ui.annotate.annotation.CommentRenderer');

goog.require('goog.dom');
goog.require('kinyelo.ui.annotate.AnnotationRenderer');
goog.require('kinyelo.ui.annotate.annotation.Reply');


/**
 *
 * @constructor
 * @extends {kinyelo.ui.annotate.AnnotationRenderer}
 */
kinyelo.ui.annotate.annotation.CommentRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.annotate.annotation.CommentRenderer, kinyelo.ui.annotate.AnnotationRenderer);
goog.addSingletonGetter(kinyelo.ui.annotate.annotation.CommentRenderer);

/** @type {string} */
kinyelo.ui.annotate.annotation.CommentRenderer.CSS_CLASS = 'annotation-comment';

/** @inheritDoc */
kinyelo.ui.annotate.annotation.CommentRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.annotation.CommentRenderer.CSS_CLASS;
}

kinyelo.ui.annotate.annotation.CommentRenderer.prototype.createDom = function(comment) {

    console.log('kinyelo.ui.annotate.annotation.CommentRenderer.prototype.createDom', comment);

    var el = goog.base(this, 'createDom', comment);

    this.comment = comment.getModel();
    this.domHelper = comment.getDomHelper();

    comment.setElementInternal(el);

    if(goog.isDefAndNotNull(this.comment.replies)) {
        var control = new kinyelo.ui.annotate.annotation.Reply(this.comment.replies);
        comment.addChild(control, true);
    }

    return el;
}
