goog.provide('kinyelo.ui.annotate.MarkerContainerRenderer');

goog.require('kinyelo.ui.ContainerRenderer');

/**
 *
 * @constructor
 * @extend {kinyelo.ui.ContainerRenderer}
 */
kinyelo.ui.annotate.MarkerContainerRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.annotate.MarkerContainerRenderer, kinyelo.ui.ContainerRenderer);
goog.addSingletonGetter(kinyelo.ui.annotate.MarkerContainerRenderer);

/**
 *
 * @type {string}
 */
kinyelo.ui.annotate.MarkerContainerRenderer.CSS_CLASS = 'annotation-marker-container';


/**
 * @inheritDoc
 */
kinyelo.ui.annotate.MarkerContainerRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.MarkerContainerRenderer.CSS_CLASS;
}
