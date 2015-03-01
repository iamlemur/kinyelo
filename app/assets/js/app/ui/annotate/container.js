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

/**
 * @const
 * @type {string}
 */
app.ui.annotate.Container.OVERLAY_ID = 'active-nav-overlay';


/** @inheritDoc */
app.ui.annotate.Container.prototype.canDecorate = function() {
    return false;
}

/** @inheritDoc */
app.ui.annotate.Container.prototype.enterDocument = function(container) {
    goog.base(this, 'enterDocument');
    //TODO: add listeners

    //TODO: listen for esc key?

    var dom = this.getDomHelper();
    var overlay = dom.getElement(app.ui.annotate.Container.OVERLAY_ID);
    if(!goog.isNull(overlay)) {
        this.getHandler().listen(overlay, 'click', this.hideAnnotations);
    }

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
 */
app.ui.annotate.Container.prototype.handleMarkerClick = function(e) {
    console.log('annotations container is handling marker click', this, e);
    /**
     * @type {app.models.Annotatable}
     */
    var annotatable = e.target.getAnnotatable();
    var child = new app.ui.annotate.Annotatable(annotatable);
    this.addChild(child, true);
    this.activeChild = child;
    this.showAnnotations();
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


/**
 * will lazily instantiate an annotable in the annotations container
 * @param {goog.events.Event} e
 */
app.ui.annotate.Container.prototype.activateAnnotatable = function(e) {
    e.stopPropagation();
    if(!goog.isNull(this.activeChild)) {
        this.activeChild.setActive(false);
    }

    var annotatable = e.target.getAnnotatable();
    //TODO: handle error better here?
    if(goog.isNull(annotatable)) return;
    console.log('activateAnnotatable','annotatable',annotatable);

    var child = this.getChild(annotatable.id);
    console.log('activateAnnotatable','child',child);
    if(goog.isNull(child)) {
        //goog.object.add(this.contentMap_, annotatable.id, []);
        child = this.createChild(annotatable.id);
    }
    this.activeChild = child;

    var position = goog.style.getClientPosition(/** @type {HTMLElement} */ e.target.getAnnotatable());
    goog.style.setPosition(this.activeChild.getElement(), null, position.y);
    this.activeChild.setActive(true);

    this.showAnnotations();
}

/**
 * @type {string}
 */
app.ui.annotate.Container.TOGGLE_CLASS = 'js-annotations';

/**
 *
 */
app.ui.annotate.Container.prototype.showAnnotations = function() {
    var dom = this.getDomHelper();
    var html = dom.getDocument().documentElement;
    goog.dom.classes.add(html, app.ui.annotate.Container.TOGGLE_CLASS);
}


app.ui.annotate.Container.EventType = {
    ANNOTATIONS_HIDDEN: goog.events.getUniqueId('annotations-hidden')
}

/**
 *
 * @param {goog.events.Event} opt_e
 */
app.ui.annotate.Container.prototype.hideAnnotations = function(opt_e) {
    var dom = this.getDomHelper();
    var html = dom.getDocument().documentElement;
    goog.dom.classes.remove(html, app.ui.annotate.Container.TOGGLE_CLASS);
    this.dispatchEvent(app.ui.annotate.Container.EventType.ANNOTATIONS_HIDDEN);
}
