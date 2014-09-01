goog.provide('kinyelo.annotate.CommentAnnotation');

goog.require('kinyelo.annotate.Annotation');

/**
 *
 * @param {object} annotation
 * @constructor
 */
kinyelo.annotate.CommentAnnotation = function(annotation) {
    kinyelo.annotate.Annotation.call(this, annotation);
}
goog.inherits(kinyelo.annotate.CommentAnnotation, kinyelo.annotate.Annotation);