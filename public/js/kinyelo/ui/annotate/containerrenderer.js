goog.provide('kinyelo.ui.annotate.ContainerRenderer');

goog.require('kinyelo.ui.ContainerRenderer');
goog.require('goog.object');
goog.require('kinyelo.annotate.Container');
goog.require('kinyelo.ui.annotate.Group');


/**
 *
 * @constructor
 * @extends {kinyelo.ui.ContainerRenderer}
 */
kinyelo.ui.annotate.ContainerRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.annotate.ContainerRenderer, kinyelo.ui.ContainerRenderer);
goog.addSingletonGetter(kinyelo.ui.annotate.ContainerRenderer);

/**
 * @type {string}
 */
kinyelo.ui.annotate.ContainerRenderer.CSS_CLASS = 'annotations-container';

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.ContainerRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.ContainerRenderer.CSS_CLASS;
}

/**
 *
 * @param {kinyelo.ui.annotate.Container} container
 */
kinyelo.ui.annotate.ContainerRenderer.prototype.createDom = function(container) {
    var el = goog.base(this, 'createDom', container);
    container.setElementInternal(el);

    var annotations = container.getModel();
    var groups = annotations.getAnnotationMap();

    //do more here with the metadata in the container data set

    goog.object.forEach(groups, function(item, id) {
        var group = new kinyelo.annotate.Group(item);
        var control = new kinyelo.ui.annotate.Group(id, group);
        container.addChild(control, true);
    });

    return el;
}

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.ContainerRenderer.prototype.canDecorate = goog.functions.FALSE();