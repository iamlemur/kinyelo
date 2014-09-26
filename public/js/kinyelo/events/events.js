goog.provide('kinyelo.events.annotations');
goog.require('goog.events');

/**
 * @type {string}
 */
kinyelo.events.annotations.EventType = {
    NEW_ANNOTATION: goog.events.getUniqueId('new-annotation'),
    MARKER_CLICKED: goog.events.getUniqueId('clicked-marker')
};