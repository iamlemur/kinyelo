goog.provide('app.ui.annotate.MarkerRenderer');

goog.require('kinyelo.ui.ControlRenderer');
goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {kinyelo.ui.ControlRenderer}
 */
app.ui.annotate.MarkerRenderer = function() {
    kinyelo.ui.ControlRenderer.call(this)
}
goog.inherits(app.ui.annotate.MarkerRenderer, kinyelo.ui.ControlRenderer);
goog.addSingletonGetter(app.ui.annotate.MarkerRenderer);

/** @inheritDoc */
app.ui.annotate.MarkerRenderer.CSS_CLASS = 'annotation-marker';


/** @inheritDoc */
app.ui.annotate.MarkerRenderer.prototype.getCssClass = function() {
    return app.ui.annotate.MarkerRenderer.CSS_CLASS;
};

/** @inheritDoc */
app.ui.annotate.MarkerRenderer.prototype.createDom = function(marker) {
    var el = goog.base(this, 'createDom', marker);
    marker.setElementInternal(el);

    //set supported transition events
    marker.setSupportedState(goog.ui.Component.State.CHECKED, true);

    marker.setDispatchTransitionEvents(goog.ui.Component.State.CHECKED, true);

    return el;
}

/**
 * update vertical position of marker to align with content
 * @param {app.ui.annotate.Marker} marker
 */
app.ui.annotate.MarkerRenderer.prototype.updatePosition = function(marker) {
    var position = goog.style.getPosition(/** @type {HTMLElement} */ marker.getAnnotatable());
    goog.style.setPosition(marker.getContentElement(), null, position.y);
}