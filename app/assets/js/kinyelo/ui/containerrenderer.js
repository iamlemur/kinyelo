goog.provide('kinyelo.ui.ContainerRenderer');

goog.require('goog.ui.ContainerRenderer');

/**
 * @inheritDoc
 * @constructor
 * @extends {goog.ui.ContainerRenderer}
 */
kinyelo.ui.ContainerRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.ContainerRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(kinyelo.ui.ContainerRenderer);