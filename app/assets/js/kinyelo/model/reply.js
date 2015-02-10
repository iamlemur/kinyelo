goog.provide('kinyelo.model.Reply');

goog.require('kinyelo.model.Author');

/**
 *
 * @param {!kinyelo.model.Annotation} annotation
 * @param {!kinyelo.model.Author} author
 * @param {string} content
 * @constructor
 */
kinyelo.model.Reply = function(annotation, author, content) {

    /**
     * @type {?kinyelo.model.Annotation}
     * @private
     */
    this.annotation_ = annotation;

    /**
     * @type {!kinyelo.model.Author}
     * @private
     */
    this.author_ = author;
    /**
     *
     * @type {string}
     * @private
     */
    this.content_ = content;
}
