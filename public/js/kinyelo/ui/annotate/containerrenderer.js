goog.provide('kinyelo.ui.annotate.ContainerRenderer');

goog.require('goog.ui.ContainerRenderer');
goog.require('goog.object');
goog.require('kinyelo.annotate.Container');
goog.require('kinyelo.ui.annotate.Group');


/**
 *
 * @constructor
 * @extends {goog.ui.ContainerRenderer}
 */
kinyelo.ui.annotate.ContainerRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.annotate.ContainerRenderer, goog.ui.ContainerRenderer);
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
 * @inheritDoc
 */
kinyelo.ui.annotate.ContainerRenderer.prototype.getClassNames = function(container) {
    var classNames = goog.base(this, 'getClassNames', container);

    //remove the orientation class
    goog.array.removeAt(classNames, 1);
    return classNames;
};

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