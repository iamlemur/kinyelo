goog.provide('kinyelo.annotate.Container');

goog.require('goog.array');
goog.require('goog.object');


/**
 *
 * @param {object} data
 * @constructor
 */
kinyelo.annotate.Container = function(data) {
    /**
     * @type {Object}
     * @private
     */
    this.data_ = data;

    this.authors_ = this.data_.authors;

    this.authorMap_ = goog.array.toObject(this.authors_, function(author) {
        return author.id;
    }, this);

    goog.array.forEach(this.data_.annotations, this.assignAuthors_, this);

    goog.array.sortObjectsByKey(this.data_.annotations, "createdAt");

    /**
     * @type {Object}
     * @private
     */
    this.annotationMap_ = goog.array.bucket(this.data_.annotations, kinyelo.annotate.Container.groupAnnotations);

}

/**
 * @returns {Object}
 */
kinyelo.annotate.Container.prototype.getAnnotationMap = function() {
    return this.annotationMap_;
}

/**
 *
 * @param {Object} annotation
 * @private
 */
kinyelo.annotate.Container.prototype.assignAuthors_ = function(annotation) {
    var author = goog.object.get(this.authorMap_, annotation.authorId);
    if(goog.isDef(author)) {
        annotation.author = author;
    }
    if(goog.isDefAndNotNull(annotation.replies)) {
        goog.array.forEach(annotation.replies, this.assignAuthors_, this);
    }
}

/**
 *
 * @param {Object} element
 * @param {number} index
 * @param {Array} array
 */
kinyelo.annotate.Container.groupAnnotations = function(element, index, array) {
    return element.anchor;
}