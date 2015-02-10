goog.provide('kinyelo.model.Post');

goog.require('kinyelo.model.Author');
goog.require('kinyelo.model.Annotation');

/**
 * @param {number} id
 * @param {!Element} title
 * @param {!Element} content
 * @param {?kinyelo.model.Author=} author
 * @constructor
 */
kinyelo.model.Post = function(id, title, content, author) {

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
     * @type {kinyelo.model.Author}
     * @private
     */
    this.author_ = goog.isDefAndNotNull(author) ? author: null;

    /**
     *
     * @type {Array.<kinyelo.model.Annotation>}
     * @private
     */
    this.annotations_ = [];
}

/**
 *
 * @returns {string}
 */
kinyelo.model.Post.prototype.getTitle = function() {
    return this.title_.innerHTML;
}

/**
 *
 * @returns {string}
 */
kinyelo.model.Post.prototype.getContent = function() {
    return this.content_.innerHTML;
}

/**
 *
 * @returns {Array.<kinyelo.model.Annotation>}
 */
kinyelo.model.Post.prototype.getAnnotations = function() {
    //TODO: do we want a live reference?
    return goog.array.clone(this.annotations_);
}

/**
 *
 * @returns {!kinyelo.model.Author}
 */
kinyelo.model.Post.prototype.getAuthor = function() {
    return this.author_;
}

/**
 *
 * @param {!kinyelo.model.Author} author
 */
kinyelo.model.Post.prototype.setAuthor = function(author) {
    this.author_ = author;
}

/**
 *
 * @type {boolean}
 */
kinyelo.model.Post.prototype.published = false;

/**
 *
 * @param {!kinyelo.model.Annotation} annotation
 */
kinyelo.model.Post.prototype.addAnnotation = function(annotation) {
    annotation.setPost(this);
    this.annotations_.push(annotation);
}