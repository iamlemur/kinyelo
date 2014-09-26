goog.provide('kinyelo.ui.annotate.Marker');

goog.require('kinyelo.ui.annotate.MarkerRenderer');
goog.require('goog.dom');
goog.require('goog.ui.registry');
goog.require('kinyelo.ui.Control');
goog.require('goog.ui.ControlRenderer');
goog.require('kinyelo.events.annotations');

/**
 *
 * @param {string} anchor
 * @constructor
 * @extends {kinyelo.ui.Control}
 */
kinyelo.ui.annotate.Marker = function(anchor) {
    kinyelo.ui.Control.call(this);
    /**
     *
     * @type {string}
     * @private
     */
    this.contentId_ = anchor;
    this.updateCount();
    goog.events.listen(this, goog.ui.Component.EventType.ACTION, this.handleClick);
}
goog.inherits(kinyelo.ui.annotate.Marker, kinyelo.ui.Control);
goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.Marker, kinyelo.ui.annotate.MarkerRenderer);

kinyelo.ui.annotate.Marker.prototype.count = 0;

kinyelo.ui.annotate.Marker.prototype.updateCount = function(decrement) {
    if(decrement) {
        this.count--;
    } else {
        this.count++;
    }
    this.setCaption("" + this.count);
    if(this.isInDocument()) {
        this.updatePosition();
    }
}

/**
 * @returns {number}
 * @public
 */
kinyelo.ui.annotate.Marker.prototype.getCount = function() {
    return this.count;
}

kinyelo.ui.annotate.Marker.prototype.updatePosition = function() {
    var anchor = goog.dom.getElement(this.contentId_);
    var position = goog.style.getPosition(anchor);
    goog.style.setPosition(this.getContentElement(), null, position.y);
}

kinyelo.ui.annotate.Marker.prototype.handleClick = function(e) {
    console.log('getting actions', e.target);
    console.log(this.isActive());
    this.dispatchEvent(kinyelo.events.annotations.EventType.MARKER_CLICKED);
}


/**
 * @returns {number}
 */
kinyelo.ui.annotate.Marker.prototype.getCaption = function() {
    console.log('returning count of ' + this.count);
    return this.count;
}

/**
 * Gets the unique ID for the instance of this component.  If the instance
 * doesn't already have an ID, generates one on the fly.
 * @return {string} Unique component ID.
 */
kinyelo.ui.annotate.Marker.prototype.getId = function() {
    return this.contentId_;
};

/**
 *
 * @returns {string}
 */
//kinyelo.ui.annotate.Marker.prototype.getRelatedContentElementId = function() {
//    return this.contentNodeId_;
//}

/**
 *
 * @returns {boolean}
 */
//kinyelo.ui.annotate.Marker.prototype.isStillValid = function() {
//    if(!goog.dom.getElement(this.contentNodeId_)) {
//        return false;
//    }
//    return true;
//}

