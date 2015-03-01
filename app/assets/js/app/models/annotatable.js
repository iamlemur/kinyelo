goog.provide('app.models.Annotatable');

goog.require('kinyelo.models.Model');
goog.require('goog.events');

/**
 * @param {!app.models.Post} parent
 * @param {!Node} node
 * @constructor
 */
app.models.Annotatable = function(parent, node) {
    kinyelo.models.Model.call(this);

    this.setParentEventTarget(parent);
    /**
     *
     * @type {!Node}
     * @private
     */
    this.node_ = node;

    /**
     *
     * @type {Array.<app.models.Annotation>}
     * @private
     */
    this.annotations_ = [];

    this.getHandler().listen(this.getParent(),
        app.models.Annotation.EventType.CREATE,
        this.addAnnotation,
        false
    );

    this.dispatchEvent(app.models.Annotatable.EventType.CREATE);

}
goog.inherits(app.models.Annotatable, kinyelo.models.Model);

/**
 *
 * @returns {!Node}
 */
app.models.Annotatable.prototype.getNode = function() {
    return this.node_;
}

/**
 *
 * @returns {boolean}
 */
app.models.Annotatable.prototype.isValid = function() {
    return /** @type {boolean} */ this.node_.parentNode;
}


/**
 *
 */
app.models.Annotatable.prototype.validate = function() {
    if(!this.isValid()) {
        this.delete();
    }
}

/**
 *
 */
app.models.Annotatable.prototype.delete = function() {
    this.dispatchEvent(app.models.Annotatable.EventType.DELETE);
    this.disposeInternal();
}

app.models.Annotatable.EventType = {
    DELETE: goog.events.getUniqueId('delete'),
    CREATE: goog.events.getUniqueId('create')
}

/**
 *
 * @param {goog.events.Event} e
 */
app.models.Annotatable.prototype.handleDelayedChange = function(e) {
    this.validate();
}

/**
 *
 * @param {!goog.events.Event} e
 */
app.models.Annotatable.prototype.addAnnotation = function(e) {
    console.log('annotatable gets new annotation event');
    this.annotations_.push(e.target);
}

/**
 * @returns {number}
 */
app.models.Annotatable.prototype.getAnnotationsCount = function() {
    return this.annotations_.length;
}

/**
 * @returns {Array.<app.models.Annotation>}
 */
app.models.Annotatable.prototype.getAnnotations = function() {
    return this.annotations_;
}