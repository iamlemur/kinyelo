goog.provide('kinyelo.ui.annotate.AnnotationRenderer');

goog.require('goog.ui.ControlRenderer');


/**
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
kinyelo.ui.annotate.AnnotationRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.annotate.AnnotationRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(kinyelo.ui.annotate.AnnotationRenderer);

/** @type {string} */
kinyelo.ui.annotate.AnnotationRenderer.CSS_CLASS = 'annotation-item';

/** @inheritDoc */
kinyelo.ui.annotate.AnnotationRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.AnnotationRenderer.CSS_CLASS;
}

kinyelo.ui.annotate.AnnotationRenderer.prototype.createDom = function(annotation) {
    var el = goog.base(this, 'createDom', annotation);
    annotation.setElementInternal(el);



    return el;
}