goog.provide('kinyelo.ui.annotate.Marker');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.ui.registry');
goog.require('kinyelo.ui.Control');
goog.require('kinyelo.ui.annotate.MarkerRenderer');

/**
 *
 * @param {Node} anchor
 * @constructor
 * @extends {kinyelo.ui.Control}
 */
kinyelo.ui.annotate.Marker = function(anchor) {

    kinyelo.ui.Control.call(this);

    this.setModel(goog.object.create());

    this.getModel().contentId = anchor.id;
    this.getModel().count = null;
    this.contentItem = anchor;

    this.updateCount();

}
goog.inherits(kinyelo.ui.annotate.Marker, kinyelo.ui.Control);

/**
 * @param {boolean=} decrement
 */
kinyelo.ui.annotate.Marker.prototype.updateCount = function(decrement) {
    if(goog.isNull(this.getModel().count)) {
        this.getModel().count = 0;
    } else {
        if(goog.isDefAndNotNull(decrement) && decrement) {
            this.getModel().count--;
        } else {
            this.getModel().count++;
        }
    }
    this.setCaption("" + this.getModel().count);
    if(this.isInDocument()) {
        this.updatePosition();
    }
}

/**
 * @returns {number}
 */
kinyelo.ui.annotate.Marker.prototype.getCount = function() {
    return this.getModel().count;
}


/**
 * @returns {number}
 */
kinyelo.ui.annotate.Marker.prototype.getCaption = function() {
    return this.getModel().count;
}

/**
 * @returns {Node}
 */
kinyelo.ui.annotate.Marker.prototype.getContentItem = function() {
    return this.contentItem;
}

/**
 * Gets the unique ID for the instance of this component.  If the instance
 * doesn't already have an ID, generates one on the fly.
 * this way we can retrieve marker by content element ID
 * @return {string} Unique component ID.
 */
kinyelo.ui.annotate.Marker.prototype.getId = function() {
    return 'marker-' + this.getModel().contentId;
};

/** @inheritDoc */
kinyelo.ui.annotate.Marker.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    this.getRenderer().updatePosition(this);
    //TODO: add listeners
    //TODO: listen on contentItem for an increment of the count or the position
}

goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.Marker, kinyelo.ui.annotate.MarkerRenderer);
goog.ui.registry.setDecoratorByClassName(kinyelo.ui.annotate.MarkerRenderer.CSS_CLASS, function() {
    return new kinyelo.ui.annotate.Marker(null);
});