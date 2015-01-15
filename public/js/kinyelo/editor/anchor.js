goog.provide('kinyelo.editor.Anchor');

goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.dom');

/**
 * @constructor
 */
kinyelo.editor.Anchor = function(id) {
    this.highlights = goog.object.create();
    this.id = id;
    this.element = goog.dom.getElement(id);
}

/**
 * @type {number}
 */
kinyelo.editor.Anchor.prototype.id;

/**
 * @type {object}
 */
kinyelo.editor.Anchor.prototype.highlights;

/**
 * @type {HTMLElement}
 */
kinyelo.editor.Anchor.prototype.element;

/**
 * Adds a highlight to the anchor when a new annotation is created
 * @param highlight {!Object}
 * @returns {boolean}
 */
kinyelo.editor.Anchor.prototype.addHighlight = function(annotationId, highlight) {
    goog.object.add(this.highlights, annotationId, highlight);
    return true;
}

/**
 * Shows a highlight when an annotation with a highlight is hovered
 * @param id {!number}
 * @returns {boolean}
 */
kinyelo.editor.Anchor.prototype.highlight = function(id) {

}