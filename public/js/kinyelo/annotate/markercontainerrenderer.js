goog.provide('kinyelo.annotate.MarkerContainerRenderer');

goog.require('goog.ui.ContainerRenderer');

/**
 *
 * @constructor
 */
kinyelo.annotate.MarkerContainerRenderer = function() {

}
goog.inherits(kinyelo.annotate.MarkerContainerRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(kinyelo.annotate.MarkerContainerRenderer);

/**
 *
 * @type {string}
 */
kinyelo.annotate.MarkerContainerRenderer.CSS_CLASS = 'annotation-marker-container';

/**
 * @inheritDoc
 */
kinyelo.annotate.MarkerContainerRenderer.prototype.getCssClass = function() {
    return kinyelo.annotate.MarkerContainerRenderer.CSS_CLASS;
}

kinyelo.annotate.MarkerContainerRenderer.prototype.createDom = function(container) {
    var el = goog.base(this, 'createDom', container);
    container.setElementInternal(el);

}