goog.provide('app.ui.annotate.Container');

goog.require('goog.object');
goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.events');

goog.require('kinyelo.ui.Component');
goog.require('app.ui.annotate.Annotatable');
goog.require('app.ui.annotate.create.CreationContainer');
//goog.require('app.ui.annotate.form.Form');

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
app.ui.annotate.Container.OVERLAY_ID = 'active-nav-overlay';

/**
 * @type {string}
 */
app.ui.annotate.Container.TOGGLE_CLASS = 'js-annotations';

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
    //the container is in the document as soon as the document loads
    goog.base(this, 'enterDocument');
    //TODO: add listeners
    //TODO: listen for esc key?

    var overlay = this.getDomHelper().getElement(app.ui.annotate.Container.OVERLAY_ID);
    this.getHandler().listen(
        overlay,
        goog.events.EventType.CLICK,
        goog.bind(this.hideContainer, this),
        false
    );

}


/**
 *
 * @param {goog.events.Event=} opt_e
 */
app.ui.annotate.Container.prototype.hideContainer = function(opt_e) {

    var html = this.getDomHelper().getDocument().documentElement;
    goog.dom.classes.remove(html, app.ui.annotate.Container.TOGGLE_CLASS);
    console.log('hiding container');
    this.removeChildren(true);

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
 * @enum {string}
 */
app.ui.annotate.Container.EventType = {
    HIDE_CONTAINER: goog.events.getUniqueId('hide-container'),
    SHOW_CONTAINER: goog.events.getUniqueId('show-container')
}


/**
 * this event proxies adding a child as an event handler
 * @param {goog.events.Event} e
 * @override
 */
app.ui.annotate.Container.prototype.addChild = function(e) {

    /**
     * @type {app.models.Annotatable}
     */
    console.log('addchild container method', e);
    var annotatable = e.target.getModel();
    var annotatableUI = new app.ui.annotate.Annotatable(annotatable);
    goog.base(this, 'addChild', annotatableUI, true);
    //TODO: add buttons here
    var creationContainerUI = new app.ui.annotate.create.CreationContainer(annotatable);
    goog.base(this, 'addChild', creationContainerUI, true);

    this.showContainer(annotatableUI);

}

/**
 *
 * @param {app.ui.annotate.Annotatable} annoatableUI
 */
app.ui.annotate.Container.prototype.showContainer = function(annotatableUI) {

    console.log('showcontainer method');

    var dom = this.getDomHelper();
    var html = dom.getDocument().documentElement;
    goog.dom.classes.add(html, app.ui.annotate.Container.TOGGLE_CLASS);

    annotatableUI.updatePosition();

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
