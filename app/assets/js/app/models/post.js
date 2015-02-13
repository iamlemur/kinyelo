goog.provide('app.model.Post');

goog.require('app.model.Author');
goog.require('app.model.Annotation');

goog.require('kinyelo.Model');

/**
 * @param {number} id
 * @param {!Element} title
 * @param {!Element} content
 * @param {?app.model.Author=} author
 * @constructor
 * @extends {kinyelo.Model}
 */
app.model.Post = function(id, title, content, author) {

    /**
     *
     * @type {number}
     * @private
     */
    this.id_ = id;

    /**
     *
     * @type {!Element}
     * @private
     */
    this.title_ = title;

    /**
     *
     * @type {!Element}
     * @private
     */
    this.content_ = content;

    /**
     *
     * @type {app.model.Author}
     * @private
     */
    this.author_ = goog.isDefAndNotNull(author) ? author: null;

    /**
     *
     * @type {Array.<app.model.Annotation>}
     * @private
     */
    this.annotations_ = [];
}
goog.inherits(app.model.Post, kinyelo.Model);

/**
 *
 * @returns {string}
 */
app.model.Post.prototype.getTitle = function() {
    return this.title_.innerHTML;
}

/**
 *
 * @returns {string}
 */
app.model.Post.prototype.getContent = function() {
    return this.content_.innerHTML;
}

/**
 *
 * @returns {Array.<app.model.Annotation>}
 */
app.model.Post.prototype.getAnnotations = function() {
    //TODO: do we want a live reference?
    return goog.array.clone(this.annotations_);
}

/**
 *
 * @returns {!app.model.Author}
 */
app.model.Post.prototype.getAuthor = function() {
    return this.author_;
}

/**
 *
 * @param {!app.model.Author} author
 */
app.model.Post.prototype.setAuthor = function(author) {
    this.author_ = author;
}

/**
 *
 * @type {boolean}
 */
app.model.Post.prototype.published = false;

/**
 *
 * @param {!app.model.Annotation} annotation
 */
app.model.Post.prototype.addAnnotation = function(annotation) {
    annotation.setPost(this);
    this.annotations_.push(annotation);
}