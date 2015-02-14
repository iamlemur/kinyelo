goog.provide('kinyelo.events.EventTarget');

goog.require('goog.events.EventTarget');


/**
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
kinyelo.events.EventTarget = function() {
    goog.events.EventTarget.call(this);
}
goog.inherits(kinyelo.events.EventTarget, goog.events.EventTarget);


/**
 *
 * @returns {goog.events.EventTarget}
 */
kinyelo.events.EventTarget.prototype.getParent = function() {
    return this.getParentEventTarget();
}