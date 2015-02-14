goog.provide('app.models.Annotation');

goog.require('kinyelo.models.Model');

goog.require('app.models.Author');
goog.require('app.models.Reply');

goog.require('goog.events');

/**
 * @param {!app.models.Post} post
 * @param {?number} id
 * @param {!HTMLElement} annotatable
 * @param {app.models.Author} author
 * @param {!string} content
 * @param {string=} highlight
 * @constructor
 * @extends {kinyelo.models.Model}
 */
app.models.Annotation = function(post, id, annotatable, author,  content, highlight) {

    kinyelo.models.Model.call(this);

    this.setParentEventTarget(post);

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
     * @type {!app.models.Author}
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
     * @type {Array.<app.models.Reply>}
     * @private
     */
    this.replies_ = [];

    /**
     * @type {?number}
     * @private
     */
    this.id_ = id;

    /**
     * @type {!app.models.Post}
     * @private
     */
    this.post_ = post;

    this.dispatchEvent(app.models.Annotation.EventType.CREATE);

}
goog.inherits(app.models.Annotation, kinyelo.models.Model);

/**
 *
 * @type {Object}
 */
app.models.Annotation.EventType = {
    CREATE: goog.events.getUniqueId('create'),
    DELETE: goog.events.getUniqueId('delete')
}

/**
 * @param {!app.models.Reply} reply
 */
app.models.Annotation.prototype.addReply = function(reply) {
    this.replies_.push(reply);
}

/**
 * @returns {!HTMLElement}
 */
app.models.Annotation.prototype.getAnnotatable = function() {
    return this.annotatable_;
}


/**
 *
 * @returns {!app.models.Author}
 */
app.models.Annotation.prototype.getAuthor = function() {
    return this.author_;
}

/**
 *
 * @returns {!string}
 */
app.models.Annotation.prototype.getContent = function() {
    return this.content_;
}

/**
 *
 * @returns {Array.<app.models.Reply>}
 */
app.models.Annotation.prototype.getReplies = function() {
    return this.replies_;
}

/**
 *
 * @returns {!app.models.Post}
 */
app.models.Annotation.prototype.getPost = function() {
    return this.post_;
}