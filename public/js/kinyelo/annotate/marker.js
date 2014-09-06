goog.provide('kinyelo.annotate.Marker');

goog.require('kinyelo.annotate.MarkerRenderer');
goog.require('goog.dom');
goog.require('goog.ui.registry');
goog.require('goog.ui.Control');
goog.require('goog.ui.ControlRenderer');

/**
 *
 * @param {Node} node
 * @constructor
 */
kinyelo.annotate.Marker = function(node) {
    this.contentNodeId_ = node.id;
    goog.ui.Control.call(this);
}
goog.inherits(kinyelo.annotate.Marker, goog.ui.Control);
goog.ui.registry.setDefaultRenderer(kinyelo.annotate.Marker, kinyelo.annotate.MarkerRenderer);

/**
 *
 * @returns {string}
 */
kinyelo.annotate.Marker.prototype.getRelatedContentElementId = function() {
    return this.contentNodeId_;
}

/**
 *
 * @returns {boolean}
 */
kinyelo.annotate.Marker.prototype.isStillValid = function() {
    if(!goog.dom.getElement(this.contentNodeId_)) {
        return false;
    }
    return true;
}

