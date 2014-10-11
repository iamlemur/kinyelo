goog.provide('kinyelo.ui.annotate.ButtonRenderer');

goog.require('goog.ui.CustomButtonRenderer');

/**
 * @inheritDoc
 * @constructor
 * @extends {goog.ui.CustomButtonRenderer}
 */
kinyelo.ui.ButtonRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.annotate.ButtonRenderer, goog.ui.CustomButtonRenderer);

/**
 * @type {string}
 */
kinyelo.ui.annotate.ButtonRenderer.CSS_CLASS = 'annotation-group';

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.ButtonRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.ButtonRenderer.CSS_CLASS;
}