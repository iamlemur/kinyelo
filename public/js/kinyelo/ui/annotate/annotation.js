goog.provide('kinyelo.ui.annotate.Annotation');

goog.require('kinyelo.ui.annotate.AnnotationRenderer');
goog.require('kinyelo.annotate.Annotation');
goog.require('goog.ui.Control');

/**
 *
 * @param {kinyelo.annotate.Annotation=} model
 * @constructor
 * @extends {goog.ui.Control}
 */
kinyelo.ui.annotate.Annotation = function(model) {
    goog.base(this);

    this.setModel(model);
    //TODO: set the supported states, p231
    this.setSupportedState(goog.ui.Component.State.OPENED, true);

}
goog.inherits(kinyelo.ui.annotate.Annotation, goog.ui.Control);
goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.Annotation, kinyelo.ui.annotate.AnnotationRenderer);

/**
 * return {!kinyelo.annotate.Annotation}
 * @override
 */
kinyelo.ui.annotate.Annotation.prototype.getModel;