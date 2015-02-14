goog.provide('app.ui.annotate.MarkerContainerRenderer');

goog.require('kinyelo.ui.ContainerRenderer');
goog.require('goog.array');

/**
 *
 * @constructor
 * @extends {kinyelo.ui.ContainerRenderer}
 */
app.ui.annotate.MarkerContainerRenderer = function() {
    goog.base(this);
}
goog.inherits(app.ui.annotate.MarkerContainerRenderer, kinyelo.ui.ContainerRenderer);
goog.addSingletonGetter(app.ui.annotate.MarkerContainerRenderer);

/**
 *
 * @type {string}
 */
app.ui.annotate.MarkerContainerRenderer.CSS_CLASS = 'annotation-markers';

/**
 *
 * @type {string}
 */
app.ui.annotate.MarkerContainerRenderer.WRAPPER_CLASS = 'marker-container';

/**
 * @param {app.ui.annotate.MarkerContainer} container
 * @overrides
 */
app.ui.annotate.MarkerContainerRenderer.prototype.createDom = function(container) {
    //TODO: how should we get this element?
    var dom = container.getDomHelper();
    var el = dom.createDom('div', this.getClassNames(container).join(' '));
    var wrapper = dom.createDom('div', app.ui.annotate.MarkerContainerRenderer.WRAPPER_CLASS);
    dom.appendChild(el, wrapper);

    container.setElementInternal(el);

    return el;
}


/**
 * @inheritDoc
 */
app.ui.annotate.MarkerContainerRenderer.prototype.getCssClass = function() {
    return app.ui.annotate.MarkerContainerRenderer.CSS_CLASS;
}
