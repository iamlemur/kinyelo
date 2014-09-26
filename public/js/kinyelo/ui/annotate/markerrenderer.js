goog.provide('kinyelo.ui.annotate.MarkerRenderer');

goog.require('kinyelo.ui.ControlRenderer');
goog.require('goog.dom.TagName');

/**
 *
 * @constructor
 */
kinyelo.ui.annotate.MarkerRenderer = function() {
    goog.ui.ControlRenderer.call(this);
}
goog.inherits(kinyelo.ui.annotate.MarkerRenderer, kinyelo.ui.ControlRenderer);
goog.addSingletonGetter(kinyelo.ui.annotate.MarkerRenderer);

/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
kinyelo.ui.annotate.MarkerRenderer.CSS_CLASS = goog.getCssName('k-annotation-marker');


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
kinyelo.ui.annotate.MarkerRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.MarkerRenderer.CSS_CLASS;
};

/**
 *
 * @param {kinyelo.ui.annotate.Marker} control
 * @returns {!HTMLElement}
 */
kinyelo.ui.annotate.MarkerRenderer.prototype.createDom = function(control) {
    var classNames = this.getClassNames(control).join(' ');

    var dom = control.getDomHelper();
    var controlElement = dom.createDom('span', classNames,
        this.createMarker(control.getCaption(), dom));

    this.setAriaStates(control, controlElement);

    return controlElement;
};

/**
 * Takes a text caption or existing DOM structure, and returns the content
 * wrapped in a pseudo-rounded-corner box.  Creates the following DOM structure:
 *  <div class="goog-inline-block goog-custom-button-outer-box">
 *    <div class="goog-inline-block goog-custom-button-inner-box">
 *      Contents...
 *    </div>
 *  </div>
 * Used by both {@link #createDom} and {@link #decorate}.  To be overridden
 * by subclasses.
 * @param {string} content Text caption or DOM structure to wrap
 *     in a box.
 * @param {goog.dom.DomHelper} dom DOM helper, used for document interaction.
 * @return {Element} Pseudo-rounded-corner box containing the content.
 */
kinyelo.ui.annotate.MarkerRenderer.prototype.createMarker = function(content, dom) {
    return dom.createDom(goog.dom.TagName.SPAN, null, "" + content);
};