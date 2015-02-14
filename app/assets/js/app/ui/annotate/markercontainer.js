goog.provide('app.ui.annotate.MarkerContainer');

goog.require('goog.object');
goog.require('goog.editor.Field.EventType');
goog.require('goog.ui.Component');
goog.require('goog.ui.Container.Orientation');

goog.require('kinyelo.ui.Control');
goog.require('kinyelo.ui.Container');
goog.require('kinyelo.ui.Component');
goog.require('app.ui.annotate.Marker');
goog.require('app.ui.annotate.MarkerContainerRenderer');

/**
 * @param {app.models.Post} model
 * @constructor
 * @extends {kinyelo.ui.Container}
 */
app.ui.annotate.MarkerContainer = function(model) {
    goog.base(this, goog.ui.Container.Orientation.VERTICAL, app.ui.annotate.MarkerContainerRenderer.getInstance());

    this.setModel(model || null);

    /**
     *
     * @type {app.ui.annotate.Marker}
     * @private
     */
    this.activeMarker_ = null;

    this.setFocusable(false);

}
goog.inherits(app.ui.annotate.MarkerContainer, kinyelo.ui.Container);
goog.ui.registry.setDefaultRenderer(app.ui.annotate.MarkerContainer, app.ui.annotate.MarkerContainerRenderer);

/**
 * @const
 * @type {string}
 */
app.ui.annotate.MarkerContainer.ELEMENT_ID = 'marker-container';

/** @overrides */
app.ui.annotate.MarkerContainer.prototype.getId = function() {
    //TODO: add singleton getter
    return app.ui.annotate.MarkerContainer.ELEMENT_ID;
}
/**
 * @param element
 * @returns {boolean}
 * @inheritDoc
 */
app.ui.annotate.MarkerContainer.prototype.canDecorate = function(element) {
    return false;
}

/**
 * @const
 * @type {string}
 */
app.ui.annotate.MarkerContainer.CONTAINER_ID = 'post-markers';

/**
 * We use this method to delay adding event listeners to the model until the model has been initialized from
 * the request
 */
app.ui.annotate.MarkerContainer.prototype.init = function() {
    this.getHandler().listen(
        this.getModel(),
        [app.models.Annotatable.EventType.CREATE],
        this.addMarker,
        false
    );
    this.getHandler().listen(
        this.getModel(),
        [app.models.Annotatable.EventType.DELETE],
        this.deleteMarker,
        false
    )
}


/** @inheritDoc */
app.ui.annotate.MarkerContainer.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    this.getHandler().listen(this.getModel().getContentField(),
        goog.editor.Field.EventType.DELAYEDCHANGE,
        this.handleDelayedChange,
        false);

}

/**
 *
 * @param {goog.events.Event} e
 */
app.ui.annotate.MarkerContainer.prototype.handleDelayedChange = function(e) {
    console.log('marker container is handling delayed change');
    this.forEachChild(function(child) {
        child.getRenderer().updatePosition(child);

    }, this);
}

/**
 *
 * @param {goog.events.Event=} opt_e
 */
app.ui.annotate.MarkerContainer.prototype.addMarker = function(e) {
    var control = new app.ui.annotate.Marker(e.target);
    this.addChild(control, true);
}

/**
 *
 * @param {goog.events.Event=} opt_e
 */
app.ui.annotate.MarkerContainer.prototype.deleteMarker = function(e) {
    var control = this.getChild(kinyelo.ui.Component.generateChildId(e.target.getNode().id, app.ui.annotate.Marker.ID_FRAGMENT));
    if(control) {
        console.log('removing marker for invalid annotatable');
        this.removeChild(control, true);
    }
}

/**
 *
 * @param {goog.events.Event=} opt_e
 */
app.ui.annotate.MarkerContainer.prototype.updateMarker = function(e) {
    /*var annotation = e.target;
    var annotatable = annotation.getAnnotatable();
    var control = this.getChild(kinyelo.ui.Component.generateChildId(annotatable.getNode().id, app.ui.annotate.Marker.ID_FRAGMENT));
    if(control) {
        control.setCaption(annotatable.getAnnotationsCount());
    }*/
}


/**
 * @returns {app.ui.annotate.Marker}
 */
app.ui.annotate.MarkerContainer.prototype.getActiveMarker = function() {
    return this.activeMarker_;
}


/**
 *
 * @returns {HTMLElement}
 * @overrides
 */
app.ui.annotate.MarkerContainer.prototype.getContentElement = function() {
    return this.getElement().firstElementChild;
}
