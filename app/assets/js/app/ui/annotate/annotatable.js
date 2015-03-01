goog.provide('app.ui.annotate.Annotatable');

goog.require('goog.object');
goog.require('goog.dom.classes');

goog.require('kinyelo.ui.Component');
goog.require('app.ui.annotate.Annotation');



/**
 *
 * @param {!app.models.Annotatable} model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {kinyelo.ui.Component}
 */
app.ui.annotate.Annotatable = function(model, opt_domHelper) {
    goog.base(this, opt_domHelper);
    //this.id_ = model.getNode().id;
    this.setModel(model);

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

    goog.array.forEach(this.getModel().getAnnotations(), function(annotation) {
        var control = new app.ui.annotate.Annotation(annotation);
        this.addChild(control, true);
    }, this);

}

/** @inheritDoc */
/*app.ui.annotate.Annotatable.prototype.getId = function() {
    return this.id_;
}*/

/**
 * @inheritDoc
 */
app.ui.annotate.Annotatable.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    //TODO: add listeners
}


