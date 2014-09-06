goog.provide('kinyelo.annotate.MarkerRenderer');

goog.require('goog.ui.ControlRenderer');

/**
 *
 * @constructor
 */
kinyelo.annotate.MarkerRenderer = function() {
    goog.ui.ControlRenderer.call(this);
}
goog.inherits(kinyelo.annotate.MarkerRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(kinyelo.annotate.MarkerRenderer);

/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
kinyelo.annotate.MarkerRenderer.CSS_CLASS = goog.getCssName('k-annotation-marker');


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
kinyelo.annotate.MarkerRenderer.prototype.getCssClass = function() {
    return kinyelo.annotate.MarkerRenderer.CSS_CLASS;
};

kinyelo.annotate.MarkerRenderer.prototype.createDom = function(control) {
    var classNames = this.getClassNames(control);
    var attributes = {
        'class': classNames.join(' '),
        'title': control.getTooltip() || ''
    };
    var controlElement = control.getDomHelper().createDom('span', attributes,
        this.createMarker(control.getContent(), control.getDomHelper()));

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
 * @param {goog.ui.ControlContent} content Text caption or DOM structure to wrap
 *     in a box.
 * @param {goog.dom.DomHelper} dom DOM helper, used for document interaction.
 * @return {Element} Pseudo-rounded-corner box containing the content.
 */
kinyelo.annotate.MarkerRenderer.prototype.createMarker = function(content, dom) {
    return dom.createDom('span', null, content);
};