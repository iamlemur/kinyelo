goog.provide('app.models.Reply');

goog.require('app.models.Author');
goog.require('kinyelo.models.Model');

/**
 *
 * @param {!app.models.Annotation} annotation
 * @param {!app.models.Author} author
 * @param {string} content
 * @constructor
 * @extends {kinyelo.models.Model}
 */
app.models.Reply = function(annotation, author, content) {

    kinyelo.models.Model.call(this);

    /**
     * @type {?app.models.Annotation}
     * @private
     */
    this.annotation_ = annotation;

    /**
     * @type {!app.models.Author}
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
goog.inherits(app.models.Reply, kinyelo.models.Model);
