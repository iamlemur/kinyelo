goog.provide('kinyelo.ui.annotate.Container');

goog.require('goog.object');
goog.require('goog.array');

goog.require('kinyelo.ui.Component');
goog.require('kinyelo.ui.annotate.Anchor');

/**
 *
 * @param {Object=} model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {kinyelo.ui.Component}
 */

kinyelo.ui.annotate.Container = function(model, opt_domHelper) {
    goog.base(this, opt_domHelper);
    this.setModel(model || null);

    /**
     * @type {!Object}
     * @private
     */
    this.contentMap_ = goog.array.bucket(
        goog.object.getValues(this.getModel()),
        function(annotation) {
            return annotation.getAnchor().id;
        }
    );

}
goog.inherits(kinyelo.ui.annotate.Container, kinyelo.ui.Component);

/**
 * @const
 * @type {string}
 */
kinyelo.ui.annotate.Container.ELEMENT_ID = 'annotations-container';


/** @inheritDoc */
kinyelo.ui.annotate.Container.prototype.canDecorate = function() {
    return false;
}

/** @inheritDoc */
kinyelo.ui.annotate.Container.prototype.enterDocument = function(container) {
    goog.base(this, 'enterDocument');
    //TODO: add listeners
}

/** @inheritDoc */
kinyelo.ui.annotate.Container.prototype.getModel = function() {
    return this.model_ || goog.object.create();
}

kinyelo.ui.annotate.Container.prototype.createDom = function() {
    var el = this.getDomHelper().createDom('div');
    el.id = kinyelo.ui.annotate.Container.ELEMENT_ID;
    this.setElementInternal(el);

    goog.object.forEach(this.contentMap_, function(annotations, anchorId) {
        this.addChild(new kinyelo.ui.annotate.Anchor(anchorId, annotations), true);
    }, this);

}