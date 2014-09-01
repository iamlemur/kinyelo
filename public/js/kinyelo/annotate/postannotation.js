goog.provide('kinyelo.annotate.PostAnnotation');

goog.require('kinyelo.annotate.Annotation');

/**
 *
 * @param {object} annotation
 * @constructor
 */
kinyelo.annotate.PostAnnotation = function(annotation) {
    kinyelo.annotate.Annotation.call(this, annotation);
}
goog.inherits(kinyelo.annotate.PostAnnotation, kinyelo.annotate.Annotation);