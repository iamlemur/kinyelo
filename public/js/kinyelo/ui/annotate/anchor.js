goog.provide('kinyelo.ui.annotate.Anchor');

goog.require('goog.array');
goog.require('kinyelo.annotate.Anchor');
goog.require('kinyelo.annotate.Annotation');
goog.require('goog.object');


/**
 *
 * @param {!kinyelo.annotate.Anchor} model
 * @constructor
 */
kinyelo.ui.annotate.Anchor = function(model) {
    goog.base(this);
    this.setModel(model);
    //TODO: set the supported states, p231
    this.setSupportedState(goog.ui.Component.State.OPENED, true);
    goog.array.forEach(model.getAnnotations(), function(annotation) {
        this.addAnnotation(annotation);
    }, this);
}
goog.inherits(kinyelo.ui.annotate.Anchor, goog.ui.Control);

kinyelo.ui.annotate.Anchor.prototype.addAnnotation = function(annotation) {
    this.addChild(new kinyelo.ui.annotate.Annotation(new kinyelo.annotate.Annotation(annotation)));
}

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.Anchor.prototype.getId = function() {
    return this.getModel().getId();
}

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.Anchor.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    //TODO: add listeners
}

goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.Anchor, kinyelo.ui.annotate.AnchorRenderer);
