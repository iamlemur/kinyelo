goog.provide('kinyelo.ui.Control');

goog.require('goog.ui.Control');

/**
 * @inheritDoc
 * @constructor
 */
kinyelo.ui.Control = function() {
    goog.ui.Control.call(this);
    //this.setSupportedState(goog.ui.Component.State.HOVER, true);
    //this.setAutoStates(goog.ui.Component.State.HOVER, false);
}
goog.inherits(kinyelo.ui.Control, goog.ui.Control);

/**
 * @type {string}
 */
kinyelo.ui.Control.ID_FRAGMENT;

/**
 * @returns {string}
 * @protected
 */
kinyelo.ui.Control.prototype.getIdFragment = function() {
    return goog.isDefAndNotNull(kinyelo.ui.Control.ID_FRAGMENT) ? kinyelo.ui.Control.ID_FRAGMENT : '';
}

/**
 * @returns {string}
 */
kinyelo.ui.Control.prototype.getId = function() {
    return this.getIdFragment() + this.getIdInternal();
}

/**
 * @returns {string}
 * @protected
 */
kinyelo.ui.Control.prototype.getIdInternal = function() {
    return goog.base(this, 'getId');
}

//
//
//kinyelo.ui.Control.IdFragment = {
//    ICON: 'ic',
//    LABEL: 'la'
//};
//
///**
// * @inheritDoc
// */
//kinyelo.ui.Control.prototype.enterDocument = function() {
//    goog.base(this, 'enterDocument');
//    var icon = this.getElementByFragment(kinyelo.ui.Control.IdFragment.ICON);
//    this.getHandler().listen(icon, [goog.ui.Component.EventType.HIGHLIGHT,
//        goog.ui.Component.EventType.UNHIGHLIGHT], function(e) { console.log('hovered over icon'); });
//}
//
//kinyelo.ui.Control.prototype.createDom = function() {
//
//}
//
//kinyelo.ui.Control.prototype.canDecorate = goog.functions.FALSE;
//
///*
// kinyelo.ui.Test.prototype.getContentElement = function() {
// //override this when adding children because this is used to determine the parent element of where the children
// //are added, for example, when adding a reply thread control of an annotation, the child reply thread
// //will need to be added in a particular place in the DOM structure
// }*/