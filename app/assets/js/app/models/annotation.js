goog.provide('app.model.Annotation');

goog.require('kinyelo.Model');

goog.require('app.model.Author');
goog.require('app.model.Reply');

goog.require('goog.events');

/**
 * @param {!app.model.Post} post
 * @param {?number} id
 * @param {!HTMLElement} annotatable
 * @param {!app.model.Author} author
 * @param {!string} content
 * @param {string=} highlight
 * @constructor
 * @extends {kinyelo.Model}
 */
app.model.Annotation = function(post, id, annotatable, author, content, highlight) {
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
     * @type {!app.model.Author}
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
     * @type {Array.<app.model.Reply>}
     * @private
     */
    this.replies_ = [];

    /**
     * @type {?number}
     * @private
     */
    this.id_ = id;

    /**
     * @type {!app.model.Post}
     * @private
     */
    this.post_ = post;


    this.dispatchEvent(app.model.Annotation.EventType.CREATED);
}
goog.inherits(app.model.Annotation, kinyelo.Model);

/**
 *
 * @type {Object}
 */
app.model.Annotation.EventType = {
    CREATED: goog.events.getUniqueId('created')
}

/**
 * @param {!app.model.Reply} reply
 */
app.model.Annotation.prototype.addReply = function(reply) {
    this.replies_.push(reply);
}

/**
 * @returns {!HTMLElement}
 */
app.model.Annotation.prototype.getAnnotatable = function() {
    return this.annotatable_;
}


/**
 *
 * @returns {!app.model.Author}
 */
app.model.Annotation.prototype.getAuthor = function() {
    return this.author_;
}

/**
 *
 * @returns {!string}
 */
app.model.Annotation.prototype.getContent = function() {
    return this.content_;
}

/**
 *
 * @returns {Array.<app.model.Reply>}
 */
app.model.Annotation.prototype.getReplies = function() {
    return this.replies_;
}