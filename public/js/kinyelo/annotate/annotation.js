goog.provide('kinyelo.annotate.Annotation');

//TODO: see p 32 and 33 for more on typedef when updating this later

/**
 * @param {!object} annotation
 * @constructor
 */
kinyelo.annotate.Annotation = function(annotation) {
    this.annotation = annotation;
}

/**
 * @type {object}
 */
kinyelo.annotate.Annotation.prototype.annotation;

/** @enum {string} */
kinyelo.annotate.Annotation.AnnotationTypes = {
    COMMENT: 'COMMENT',
    CHARACTER: 'CHARACTER',
    POST: 'POST'
}

/**
 * @enum {string}
 */
kinyelo.annotate.Annotation.AnnotationStates = {
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE"
}