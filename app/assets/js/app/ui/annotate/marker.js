goog.provide('app.ui.annotate.Marker');

goog.require('goog.dom');
goog.require('goog.object');
goog.require('goog.style');
goog.require('goog.ui.registry');
goog.require('kinyelo.ui.Control');
goog.require('goog.ui.Component');
goog.require('app.ui.annotate.MarkerRenderer');

/**
 *
 * @param {Node} annotatable
 * @constructor
 * @extends {kinyelo.ui.Control}
 */
app.ui.annotate.Marker = function(annotatable) {

    kinyelo.ui.Control.call(this);

    /**
     *
     * @type {number}
     * @private
     */
    this.count_ = null;

    /**
     * @type {Node}
     */
    this.annotatable = annotatable;

    this.updateCount();

}
goog.inherits(app.ui.annotate.Marker, kinyelo.ui.Control);

/**
 * @param {boolean=} opt_decrement
 */
app.ui.annotate.Marker.prototype.updateCount = function(opt_decrement) {
    if(goog.isNull(this.getCount())) {
        this.count_ = 0;
    } else {
        if(goog.isDefAndNotNull(opt_decrement) && opt_decrement) {
            this.count_--;
        } else {
            this.count_++;
        }
    }
    this.setCaption("" + this.getCount());
    if(this.isInDocument()) {
        this.getRenderer().updatePosition(this);
    }
}

/**
 * @returns {number}
 */
app.ui.annotate.Marker.prototype.getCount = function() {
    return this.count_;
}


/**
 * @returns {number}
 */
app.ui.annotate.Marker.prototype.getCaption = function() {
    return this.getModel().count;
}

/**
 * @returns {Node}
 */
app.ui.annotate.Marker.prototype.getAnnotatable = function() {
    return this.annotatable;
}

/**
 * @return {string} Unique component ID.
 */
app.ui.annotate.Marker.prototype.getIdInternal = function() {
    return this.annotatable.id;
};



/** @inheritDoc */
app.ui.annotate.Marker.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    this.getRenderer().updatePosition(this);
    //TODO: add listeners
    this.getHandler().listen(this, [goog.ui.Component.EventType.CHECK, goog.ui.Component.EventType.UNCHECK], function(e) {
        console.log('marker has been checked/unchecked', e);
    });
}

/**
 *
 * @returns {boolean}
 */
app.ui.annotate.Marker.prototype.isValid = function() {
    return /** @type {boolean} */ this.annotatable.parentNode;
}

/**
 * @type {string}
 */
app.ui.annotate.Marker.ID_FRAGMENT = 'marker-';

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