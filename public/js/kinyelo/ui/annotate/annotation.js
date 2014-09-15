goog.provide('kinyelo.ui.annotate.Annotation');

goog.require('kinyelo.ui.annotate.AnnotationRenderer');
goog.require('kinyelo.annotate.Annotation');
goog.require('goog.ui.Control');

/**
 *
 * @param {kinyelo.annotate.Annotation=} annotation
 * @param {kinyelo.ui.annotate.AnnotationRenderer} renderer
 * @constructor
 * @extends {goog.ui.Control}
 */
kinyelo.ui.annotate.Annotation = function(annotation, renderer) {
    goog.base(this, null /* content*/, renderer);
    //TODO: set supported states
    if(!annotation) {
        //TODO: create empty annotation typedef here
    }
    console.log(annotation);
    this.setModel(annotation);

}
goog.inherits(kinyelo.ui.annotate.Annotation, goog.ui.Control);


/**
 * return {!kinyelo.annotate.Annotation}
 * @override
 */
kinyelo.ui.annotate.Annotation.prototype.getModel;

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.Annotation.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    //TODO: add listeners
}


goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.Annotation, kinyelo.ui.annotate.AnnotationRenderer);

goog.ui.registry.setDecoratorByClassName(kinyelo.ui.annotate.AnnotationRenderer.CSS_CLASS,
    function() { return new kinyelo.ui.annotate.Annotation(); });