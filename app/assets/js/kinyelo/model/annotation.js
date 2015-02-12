goog.provide('kinyelo.model.Annotation');

goog.require('kinyelo.model.Author');
goog.require('kinyelo.model.Reply');

/**
 * @param {!kinyelo.model.Post} post
 * @param {?number} id
 * @param {!HTMLElement} annotatable
 * @param {!kinyelo.model.Author} author
 * @param {!string} content
 * @param {string=} highlight
 * @constructor
 */
kinyelo.model.Annotation = function(post, id, annotatable, author, content, highlight) {
    /**
     * we do this because we want to check the anchor even exists before creating the annotation
     * and when checking, we already have the reference
     * and this also
     * @type {!HTMLElement}
     * @private
     */
    this.annotatable_ = annotatable;

    /**
     *
     * @type {!kinyelo.model.Author}
     * @private
     */
    this.author_ = author;

    /**
     *
     * @type {!string}
     * @private
     */
    this.content_ = content;

    /**
     *
     * @type {?string}
     * @private
     */
    this.highlight_ = goog.isDefAndNotNull(highlight) ? highlight : null;

    /**
     *
     * @type {Array.<kinyelo.model.Reply>}
     * @private
     */
    this.replies_ = [];

    /**
     * @type {?number}
     * @private
     */
    this.id_ = id;

    /**
     * @type {!kinyelo.model.Post}
     * @private
     */
    this.post_ = post;

}

/**
 * @param {!kinyelo.model.Reply} reply
 */
kinyelo.model.Annotation.prototype.addReply = function(reply) {
    this.replies_.push(reply);
}

/**
 * @returns {!HTMLElement}
 */
kinyelo.model.Annotation.prototype.getAnnotatable = function() {
    return this.annotatable_;
}
