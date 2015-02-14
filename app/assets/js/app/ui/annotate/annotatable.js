goog.provide('app.ui.annotate.Annotatable');

goog.require('goog.object');
goog.require('goog.dom.classes');

goog.require('kinyelo.ui.Component');
goog.require('app.ui.annotate.Annotation');



/**
 *
 * @param {!string} annotatableId
 * @param {Array.<app.models.Annotation>=} model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {kinyelo.ui.Component}
 */
app.ui.annotate.Annotatable = function(annotatableId, model, opt_domHelper) {
    goog.base(this, opt_domHelper);
    this.id_ = annotatableId;
    this.setModel(model || []);

    /**
     * due to transformations, we do not pass a reference to the anchor, at least on instantiation
     * @type {Node}
     * @private
     */
    this.relatedElement_ = this.dom_.getElement(annotatableId);

    //TODO: set the supported states, p231
    //this.setSupportedState(goog.ui.Component.State.OPENED, true);
}
goog.inherits(app.ui.annotate.Annotatable, kinyelo.ui.Component);

/**
 * @const
 * @type {string}
 */
app.ui.annotate.Annotatable.CSS_CLASS = 'annotation-list';

/** @inheritDoc */
app.ui.annotate.Annotatable.prototype.canDecorate = function() {
    return false;
}


/** @inheritDoc */
app.ui.annotate.Annotatable.prototype.createDom = function() {
    var dom = this.getDomHelper();
    var element = dom.createDom('ul', app.ui.annotate.Annotatable.CSS_CLASS);
    //TODO: add data-id here?
    this.setElementInternal(element);

    goog.array.forEach(this.getModel(), function(annotation) {
        var control = new app.ui.annotate.Annotation(annotation);
        this.addChild(control, true);
    }, this);

}

/** @inheritDoc */
app.ui.annotate.Annotatable.prototype.getId = function() {
    return this.id_;
}

/**
 * @inheritDoc
 */
app.ui.annotate.Annotatable.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    //TODO: add listeners
}

/**
 *
 * @param {boolean} active
 */
app.ui.annotate.Annotatable.prototype.setActive = function(active) {
    if(active) {
        goog.dom.classes.add(this.getElement(), 'active');
    } else {
        goog.dom.classes.remove(this.getElement(), 'active');
    }
}
