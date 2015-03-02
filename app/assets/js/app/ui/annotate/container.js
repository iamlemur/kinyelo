goog.provide('app.ui.annotate.Container');

goog.require('goog.object');
goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.events');

goog.require('kinyelo.ui.Component');
goog.require('app.ui.annotate.Annotatable');

/**
 * @param {app.models.Post} post
 * @param {kinyelo.ui.Component} parent
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {kinyelo.ui.Component}
 */

app.ui.annotate.Container = function(post, parent, opt_domHelper) {
    goog.base(this, opt_domHelper);

    this.setParentEventTarget(parent);

    this.setModel(post);

}
goog.inherits(app.ui.annotate.Container, kinyelo.ui.Component);

/**
 * @const
 * @type {string}
 */
app.ui.annotate.Container.ELEMENT_ID = 'annotations';

/**
 * @const
 * @type {string}
 */
app.ui.annotate.Container.WRAPPER_CLASS = 'annotations-container';


/** @inheritDoc */
app.ui.annotate.Container.prototype.canDecorate = function() {
    return false;
}

/** @inheritDoc */
app.ui.annotate.Container.prototype.enterDocument = function(container) {
    goog.base(this, 'enterDocument');
    //TODO: add listeners

    //TODO: listen for esc key?

    this.getHandler().listen(
        this.getModel(),
        app.models.Annotatable.EventType.ACTIVATE,
        goog.bind(this.addChild, this),
        false
    );

}


/** @inheritDoc */
app.ui.annotate.Container.prototype.getModel = function() {
    return this.model_ || goog.object.create();
}

/** @overrides */
app.ui.annotate.Container.prototype.getContentElement = function() {
    return this.getElement().firstElementChild;
}


/**
 *
 * @param {goog.events.Event} e
 * @override
 */
app.ui.annotate.Container.prototype.addChild = function(e) {

    /**
     * @type {app.models.Annotatable}
     */
    var annotatable = e.target;
    var annotatableUI = new app.ui.annotate.Annotatable(annotatable);
    goog.base(this, 'addChild', annotatableUI, true);

}

/** @overrides */
app.ui.annotate.Container.prototype.createDom = function() {

    var dom = this.getDomHelper();
    var el = dom.createDom('div');
    el.id = app.ui.annotate.Container.ELEMENT_ID;
    var wrapper = dom.createDom('div', app.ui.annotate.Container.WRAPPER_CLASS);
    dom.appendChild(el, wrapper);
    this.setElementInternal(el);

}
