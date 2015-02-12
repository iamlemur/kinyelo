goog.provide('kinyelo.ui.annotate.Container');

goog.require('goog.object');
goog.require('goog.array');
goog.require('goog.dom.classes');
goog.require('goog.events');

goog.require('kinyelo.ui.Component');
goog.require('kinyelo.ui.annotate.Annotatable');

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
            return annotation.getAnnotatable().id;
        }
    );

}
goog.inherits(kinyelo.ui.annotate.Container, kinyelo.ui.Component);

/**
 * @const
 * @type {string}
 */
kinyelo.ui.annotate.Container.ELEMENT_ID = 'annotations';

/**
 * @const
 * @type {string}
 */
kinyelo.ui.annotate.Container.WRAPPER_CLASS = 'annotations-container';

/**
 * @const
 * @type {string}
 */
kinyelo.ui.annotate.Container.OVERLAY_ID = 'active-nav-overlay';


/** @inheritDoc */
kinyelo.ui.annotate.Container.prototype.canDecorate = function() {
    return false;
}

/** @inheritDoc */
kinyelo.ui.annotate.Container.prototype.enterDocument = function(container) {
    goog.base(this, 'enterDocument');
    //TODO: add listeners

    //TODO: listen for esc key?

    var dom = this.getDomHelper();
    var overlay = dom.getElement(kinyelo.ui.annotate.Container.OVERLAY_ID);
    if(!goog.isNull(overlay)) {
        this.getHandler().listen(overlay, 'click', this.hideAnnotations);
    }
}

/** @inheritDoc */
kinyelo.ui.annotate.Container.prototype.getModel = function() {
    return this.model_ || goog.object.create();
}

/** @overrides */
kinyelo.ui.annotate.Container.prototype.getContentElement = function() {
    return this.getElement().firstElementChild;
}

/** @overrides */
kinyelo.ui.annotate.Container.prototype.createDom = function() {
    var dom = this.getDomHelper();
    var el = dom.createDom('div');
    el.id = kinyelo.ui.annotate.Container.ELEMENT_ID;
    var wrapper = dom.createDom('div', kinyelo.ui.annotate.Container.WRAPPER_CLASS);
    dom.appendChild(el, wrapper);
    this.setElementInternal(el);

    goog.object.forEach(this.contentMap_, function(annotations, annotatableId) {
        this.createChild(annotatableId, annotations);
    }, this);

}

kinyelo.ui.annotate.Container.prototype.createChild = function(annotatableId, annotations) {
    var control = new kinyelo.ui.annotate.Annotatable(annotatableId, annotations);
    this.addChild(control, true);
    return control;
}


/**
 * @type {kinyelo.ui.annotate.Annotatable}
 */
kinyelo.ui.annotate.Container.prototype.activeChild = null;

/**
 * will lazily instantiate an annotable in the annotations container
 * @param {goog.events.Event} e
 */
kinyelo.ui.annotate.Container.prototype.activateAnnotatable = function(e) {
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
kinyelo.ui.annotate.Container.TOGGLE_CLASS = 'js-annotations';

/**
 *
 */
kinyelo.ui.annotate.Container.prototype.showAnnotations = function() {
    var dom = this.getDomHelper();
    var html = dom.getDocument().documentElement;
    goog.dom.classes.add(html, kinyelo.ui.annotate.Container.TOGGLE_CLASS);
}


kinyelo.ui.annotate.Container.EventType = {
    ANNOTATIONS_HIDDEN: goog.events.getUniqueId('annotations-hidden')
}

/**
 *
 * @param {goog.events.Event} opt_e
 */
kinyelo.ui.annotate.Container.prototype.hideAnnotations = function(opt_e) {
    var dom = this.getDomHelper();
    var html = dom.getDocument().documentElement;
    goog.dom.classes.remove(html, kinyelo.ui.annotate.Container.TOGGLE_CLASS);
    this.dispatchEvent(kinyelo.ui.annotate.Container.EventType.ANNOTATIONS_HIDDEN);
}
