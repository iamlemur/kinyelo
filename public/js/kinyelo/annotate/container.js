goog.provide('kinyelo.annotate.Container');

goog.require('goog.array');


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
 * @param {Object} element
 * @param {number} index
 * @param {Array} array
 */
kinyelo.annotate.Container.groupAnnotations = function(element, index, array) {
    return element.anchor;
}