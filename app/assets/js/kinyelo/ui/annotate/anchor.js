goog.provide('kinyelo.ui.annotate.Anchor');

goog.require('goog.object');

goog.require('kinyelo.ui.Component');
goog.require('kinyelo.ui.annotate.Annotation');



/**
 *
 * @param {!string} anchorId
 * @param {Array.<kinyelo.model.Annotation>=} model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {kinyelo.ui.Component}
 */
kinyelo.ui.annotate.Anchor = function(anchorId, model, opt_domHelper) {
    goog.base(this, opt_domHelper);
    this.id_ = anchorId;
    this.setModel(model || null);

    /**
     * due to transformations, we do not pass a reference to the anchor, at least on instantiation
     * @type {Node}
     * @private
     */
    this.relatedElement_ = this.dom_.getElement(anchorId);

    //TODO: set the supported states, p231
    //this.setSupportedState(goog.ui.Component.State.OPENED, true);
}
goog.inherits(kinyelo.ui.annotate.Anchor, kinyelo.ui.Component);

/**
 * @const
 * @type {string}
 */
kinyelo.ui.annotate.Anchor.CSS_CLASS = 'annotation-list';

/** @inheritDoc */
kinyelo.ui.annotate.Anchor.prototype.canDecorate = function() {
    return false;
}


/** @inheritDoc */
kinyelo.ui.annotate.Anchor.prototype.createDom = function() {
    var dom = this.getDomHelper();
    var element = dom.createDom('ul', kinyelo.ui.annotate.Anchor.CSS_CLASS);
    //TODO: add data-id here?
    this.setElementInternal(element);

    goog.array.forEach(this.getModel(), function(annotation) {
        var control = new kinyelo.ui.annotate.Annotation(annotation);
        this.addChild(control, true);
    }, this);

}

/** @inheritDoc */
kinyelo.ui.annotate.Anchor.prototype.getId = function() {
    return 'annotations-' + this.id_;
}

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.Anchor.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    //TODO: add listeners
}
