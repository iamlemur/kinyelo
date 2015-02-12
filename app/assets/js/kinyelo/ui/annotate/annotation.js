goog.provide('kinyelo.ui.annotate.Annotation');

goog.require('kinyelo.ui.annotate.AnnotationRenderer');
goog.require('kinyelo.annotate.Annotation');
goog.require('goog.events');

/**
 *
 * @param {kinyelo.model.Annotation=} model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {kinyelo.ui.Component}
 */
kinyelo.ui.annotate.Annotation = function(model, opt_domHelper) {
    goog.base(this, opt_domHelper);

    this.setModel(model || null);

}
goog.inherits(kinyelo.ui.annotate.Annotation, kinyelo.ui.Component);

/**
 * @const
 * @type {string}
 */
kinyelo.ui.annotate.Annotation.CSS_CLASS = 'annotation';


/** @inheritDoc */
kinyelo.ui.annotate.Annotation.prototype.canDecorate = function() {
    return false;
}

/** @inheritDoc */
kinyelo.ui.annotate.Annotation.prototype.createDom = function() {
    var dom = this.dom_;
    var element = dom.createDom('li', kinyelo.ui.annotate.Annotation.CSS_CLASS);
    this.setElementInternal(element);
}

/** @inheritDoc */
kinyelo.ui.annotate.Annotation.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    //TODO: add listeners
    this.dispatchEvent(kinyelo.ui.annotate.Annotation.EventType.ANNOTATION_RENDERED);
}

kinyelo.ui.annotate.Annotation.EventType = {
    ANNOTATION_RENDERED: goog.events.getUniqueId('annotation-rendered')
}