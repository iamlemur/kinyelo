goog.provide('app.ui.annotate.Annotatable');

goog.require('goog.object');
goog.require('goog.events');
goog.require('goog.dom.classes');
goog.require('goog.dom.dataset');


goog.require('kinyelo.ui.Component');
goog.require('app.ui.annotate.Annotation');
goog.require('app.models.Annotation');



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
    //var element = dom.createDom('div', app.ui.annotate.Annotatable.CSS_CLASS);
    var wrapper = dom.createDom('div', app.ui.annotate.Annotatable.WRAPPER_CLASS);
    //TODO: add data-id here?
    this.setElementInternal(wrapper);

    goog.array.forEach(this.getModel().getAnnotations(), this.addChildFromModel_, this);

}

/**
 *
 * @param {!app.models.Annotation} model
 * @private
 */
app.ui.annotate.Annotatable.prototype.addChildFromModel_ = function(model) {
    var control = new app.ui.annotate.Annotation(model);
    this.addChild(control, true);
}


/**
 *
 * @returns {Node}
 * @inheritDoc
 */
app.ui.annotate.Annotatable.prototype.getContentElement = function() {
    return this.getElement();
    //return this.getElement().firstChild;
}


/**
 * @type {string}
 */
app.ui.annotate.Annotatable.WRAPPER_CLASS = 'annotatable-wrapper';

app.ui.annotate.Annotatable.IdFragment = {
    ACTION_BUTTONS: "actions"
}

app.ui.annotate.Annotatable.prototype.getId = function() {
    return "annotatable-" + this.getModel().getNode().id;
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
    this.getHandler().listen(
        this.getModel().getPost(),
        app.models.Annotation.EventType.READY,
        this.handleAnnotationReady,
        false
    );
}

/**
 * @inheritDoc
 */
app.ui.annotate.Annotatable.prototype.exitDocument = function() {
    goog.base(this, 'exitDocument');
    //TODO: add listeners

}

app.ui.annotate.Annotatable.prototype.updatePosition = function() {
    var position = goog.style.getClientPosition(/** @type {HTMLElement} */ this.getModel().getNode());
    this.getElement().style.marginTop = position.y + 'px';
}

/**
 *
 * @param {!goog.events.Event} e
 */
app.ui.annotate.Annotatable.prototype.handleAnnotationReady = function(e) {
    var model = e.target;
    this.addChildFromModel_(model);
}