goog.provide('kinyelo.ui.annotate.annotation.ReplyRenderer');

goog.require('kinyelo.ui.annotate.AnnotationRenderer');
goog.require('goog.dom');
goog.require('goog.array');


/**
 *
 * @constructor
 * @extends {kinyelo.ui.annotate.annotation.AnnotationRenderer}
 */
kinyelo.ui.annotate.annotation.ReplyRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.annotate.annotation.ReplyRenderer, kinyelo.ui.annotate.AnnotationRenderer);
goog.addSingletonGetter(kinyelo.ui.annotate.annotation.ReplyRenderer);

/** @type {string} */
kinyelo.ui.annotate.annotation.ReplyRenderer.CSS_CLASS = 'reply';

/** @inheritDoc */
kinyelo.ui.annotate.annotation.ReplyRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.annotation.ReplyRenderer.CSS_CLASS;
}

/**
 *
 * @param {kinyelo.ui.annotate.annotation.Reply} reply
 * @returns {Element}
 */
kinyelo.ui.annotate.annotation.ReplyRenderer.prototype.createDom = function(reply) {

    var replies = reply.getModel();
    this.domHelper = reply.getDomHelper();

    var replyElements = [];

    goog.array.forEach(replies, function(reply) {
        var div = this.domHelper.createDom(goog.dom.TagName.DIV, 'entry', [this.getAvatar(reply), this.getAuthorLink(reply), this.getContent(reply)]);
        var li = this.domHelper.createDom(goog.dom.TagName.LI, null, div);
        goog.array.insert(replyElements, li);
    }, this);

    var el = this.domHelper.createDom(
        'ul', this.getClassNames(reply).join(' '), replyElements);

    this.setAriaStates(reply, el);

    return el;
}
