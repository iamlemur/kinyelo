goog.provide('kinyelo.model');

goog.require('kinyelo.events.EventTarget');

/**
 *
 * @constructor
 * @extends {kinyelo.events.EventTarget}
 */
kinyelo.Model = function() {
    kinyelo.events.EventTarget.call(this);
}
goog.inherits(kinyelo.Model, kinyelo.events.EventTarget);