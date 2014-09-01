goog.provide('kinyelo.annotate.Annotation');

goog.require('goog.events.EventTarget');

/**
 *
 * @param {object} annotation
 * @constructor
 */
kinyelo.annotate.Annotation = function(annotation) {
    this.annotation
    goog.events.EventTarget.call(this);
}
goog.inherits(kinyelo.annotate.Annotation, goog.events.EventTarget);

kinyelo.annotate.Annotation.renderAnnotations = function() {

}