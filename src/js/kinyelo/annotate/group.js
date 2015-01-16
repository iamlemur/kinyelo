goog.provide('kinyelo.annotate.Group');

goog.require('kinyelo.annotate.Annotation');

/**
 *
 * @param {Array.<kinyelo.annotate.Annotation>} annotations
 * @constructor
 */
kinyelo.annotate.Group = function(annotations) {
    /**
     *
     * @type {Array.<kinyelo.annotate.Annotation>}
     * @private
     */
    this.annotations_;
    if(!annotations) {
        this.annotations_ = [];
    } else {
        this.annotations_ = annotations;
    }

}

/**
 *
 * @returns {Array.<kinyelo.annotate.Annotation>}
 */
kinyelo.annotate.Group.prototype.getAnnotations = function() {
    return goog.array.clone(this.annotations_);
}
