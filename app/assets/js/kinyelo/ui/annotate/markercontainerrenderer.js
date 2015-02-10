goog.provide('kinyelo.ui.annotate.MarkerContainerRenderer');

goog.require('kinyelo.ui.ContainerRenderer');
goog.require('kinyelo.ui.annotate.Marker');
goog.require('goog.array');

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
kinyelo.ui.annotate.MarkerContainerRenderer.CSS_CLASS = 'annotation-markers';

/** @inheritDoc */
kinyelo.ui.annotate.MarkerContainerRenderer.prototype.createDom = function(container) {
    //TODO: how should we get this element?
    var el = container.getDomHelper().createDom('div', this.getClassNames(container).join(' '));
    //var el = goog.base(this, 'createDom', container);
    container.setElementInternal(el);

    var anchors = container.getModel();
    goog.array.forEach(anchors, function(anchor) {
        var control = new kinyelo.ui.annotate.Marker(anchor);
        container.addChild(control, true);
    });

    return el;
}


/**
 * @inheritDoc
 */
kinyelo.ui.annotate.MarkerContainerRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.MarkerContainerRenderer.CSS_CLASS;
}
