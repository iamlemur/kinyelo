goog.provide('app.model.Reply');

goog.require('app.model.Author');
goog.require('kinyelo.Model');

/**
 *
 * @param {!app.model.Annotation} annotation
 * @param {!app.model.Author} author
 * @param {string} content
 * @constructor
 * @extends {kinyelo.Model}
 */
app.model.Reply = function(annotation, author, content) {

    /**
     * @type {?app.model.Annotation}
     * @private
     */
    this.annotation_ = annotation;

    /**
     * @type {!app.model.Author}
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
goog.inherits(app.model.Reply, kinyelo.Model);
