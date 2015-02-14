goog.provide('kinyelo.events.Event');

goog.require('goog.events.Event');

/**
 * @constructor
 * @extends {goog.events.Event}
 */
kinyelo.events.Event = function(type, opt_target) {
    goog.events.Event.call(this, type, opt_target);
}
goog.inherits(kinyelo.events.Event, goog.events.Event);