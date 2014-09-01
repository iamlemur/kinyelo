goog.provide('kinyelo.annotate.CharacterAnnotation');

goog.require('kinyelo.annotate.Annotation');

/**
 *
 * @param {object} annotation
 * @constructor
 */
kinyelo.annotate.CharacterAnnotation = function(annotation) {
    kinyelo.annotate.Annotation.call(this, annotation);
}
goog.inherits(kinyelo.annotate.CharacterAnnotation, kinyelo.annotate.Annotation);