goog.provide('kinyelo.annotate.Anchor');

goog.require('goog.array');


/**
 * @param {!goog.events.EventTarget} parent
 * @param {!string} id
 * @param {Array.<object>=} annotations
 * @constructor
 */
kinyelo.annotate.Anchor = function(parent, id, annotations) {
    this.id = id;
    if(goog.isDefAndNotNull(annotations)) {
        goog.array.forEach(annotations, function(annotation) {
            goog.object.add(this.annotations, annotation.id, new kinyelo.annotate.Annotation(annotation));
        }, this);
    } else { this.annotations = []; }
    this.setParentEventTarget(parent);
}
goog.inherits()

/**
 * @type {string}
 */
kinyelo.annotate.Anchor.prototype.id;

/**
 * @type {object}
 */
kinyelo.annotate.Anchor.prototype.annotations;

/**
 *
 * @returns {string}
 */
/*kinyelo.annotate.Anchor.prototype.getId = function() {
    return this.id;
}*/

/**
 * @returns {Array.<object>}
 */
/*kinyelo.annotate.Anchor.prototype.getAnnotations = function() {
    return this.annotations;
}*/

/**
 *
 * @returns {Array.<object>}
 */
kinyelo.annotate.Anchor.prototype.getAnnotations = function() {
    return goog.array.clone(this.annotations);
}
