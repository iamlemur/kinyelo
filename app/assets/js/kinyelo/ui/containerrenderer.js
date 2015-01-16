goog.provide('kinyelo.ui.ContainerRenderer');

goog.require('goog.ui.ContainerRenderer');

/**
 * @inheritDoc
 * @constructor
 * @extends {goog.ui.Container}
 */
kinyelo.ui.ContainerRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.ContainerRenderer, goog.ui.ContainerRenderer);

/**
 * @inheritDoc
 */
kinyelo.ui.ContainerRenderer.prototype.getClassNames = function(container) {
    var classNames = goog.base(this, 'getClassNames', container);

    //remove the orientation class
    goog.array.removeAt(classNames, 1);
    return classNames;
};