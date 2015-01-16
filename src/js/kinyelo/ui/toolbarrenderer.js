
goog.provide('kinyelo.ui.ToolbarRenderer');

goog.require('goog.ui.ToolbarRenderer');



/**
 * Default renderer for {@link goog.ui.Toolbar}s, based on {@link
    * goog.ui.ToolbarRenderer}.
 * @constructor
 * @extends {goog.ui.ToolbarRenderer}
 */
kinyelo.ui.ToolbarRenderer = function() {
    goog.ui.ToolbarRenderer.call(this);
};
goog.inherits(kinyelo.ui.ToolbarRenderer, goog.ui.ToolbarRenderer);
goog.addSingletonGetter(kinyelo.ui.ToolbarRenderer);


/**
 * Default CSS class to be applied to the root element of toolbars rendered
 * by this renderer.
 * @type {string}
 */
kinyelo.ui.ToolbarRenderer.CSS_CLASS = goog.getCssName('k-rte-toolbar');

/**
 * Returns the CSS class to be applied to the root element of containers
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
kinyelo.ui.ToolbarRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.ToolbarRenderer.CSS_CLASS;
};


/**
 * Creates and returns the container's root element.  The default
 * simply creates a DIV and applies the renderer's own CSS class name to it.
 * To be overridden in subclasses.
 * @param {goog.ui.Container} container Container to render.
 * @return {Element} Root element for the container.
 */
kinyelo.ui.ToolbarRenderer.prototype.createDom = function(container) {
    return container.getDomHelper().createDom('ul');
};