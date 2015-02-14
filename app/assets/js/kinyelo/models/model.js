goog.provide('kinyelo.models.Model');

goog.require('kinyelo.events.EventTarget');

/**
 *
 * @constructor
 * @extends {kinyelo.events.EventTarget}
 */
kinyelo.models.Model = function() {
    kinyelo.events.EventTarget.call(this);

    /**
     *
     * @type {!goog.events.EventHandler}
     * @protected
     */
    this.handler = new goog.events.EventHandler(this);
}
goog.inherits(kinyelo.models.Model, kinyelo.events.EventTarget);

/**
 * @overrides
 */
kinyelo.models.Model.prototype.disposeInternal = function() {
    kinyelo.models.Model.superClass_.disposeInternal.call(this);
    this.handler.dispose();
}

/**
 *
 * @returns {!goog.events.EventHandler}
 */
kinyelo.models.Model.prototype.getHandler = function() {
    return this.handler;
}