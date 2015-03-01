goog.provide('app.ui.annotate.Marker');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.ui.registry');
goog.require('kinyelo.ui.Control');
goog.require('goog.ui.Component');
goog.require('app.ui.annotate.MarkerRenderer');
goog.require('app.models.Annotatable');
goog.require('app.models.Annotation');

/**
 *
 * @param {app.models.Annotatable} annotatable
 * @constructor
 * @extends {kinyelo.ui.Control}
 */
app.ui.annotate.Marker = function(annotatable) {

    kinyelo.ui.Control.call(this);

    /**
     * @type {app.models.Annotatable}
     * @private
     */
    this.annotatable_ = annotatable;


}
goog.inherits(app.ui.annotate.Marker, kinyelo.ui.Control);

/**
 *
 * @returns {app.models.Annotatable}
 */
app.ui.annotate.Marker.prototype.getAnnotatable = function() {
    return this.annotatable_;
}

/**
 * @return {string} Unique component ID.
 */
app.ui.annotate.Marker.prototype.getIdInternal = function() {
    return this.annotatable_.getNode().id;
};



/** @inheritDoc */
app.ui.annotate.Marker.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    this.getRenderer().updatePosition(this);
    //TODO: add listeners
    this.getHandler().listen(this.getAnnotatable().getParent(),
        [app.models.Annotation.EventType.CREATE, app.models.Annotation.EventType.DELETE],
        this.handleAnnotationCreatedDeleted,
        false
    );
}

/**
 * @type {string}
 */
app.ui.annotate.Marker.ID_FRAGMENT = 'marker-';



app.ui.annotate.Marker.prototype.handleAnnotationCreatedDeleted = function(e) {
    console.log('marker gets new annotation event');
    var annotation = e.target;
    if(annotation && annotation.getAnnotatable() == this.getAnnotatable()) {
        this.getRenderer().setContent(this.getContentElement(), this.getAnnotatable().getAnnotationsCount().toString());
    }
}

/**
 * @returns {string}
 */
app.ui.annotate.Marker.prototype.getIdFragment = function() {
    return app.ui.annotate.Marker.ID_FRAGMENT;
}

goog.ui.registry.setDefaultRenderer(app.ui.annotate.Marker, app.ui.annotate.MarkerRenderer);
goog.ui.registry.setDecoratorByClassName(app.ui.annotate.MarkerRenderer.CSS_CLASS, function() {
    return new app.ui.annotate.Marker(null);
});