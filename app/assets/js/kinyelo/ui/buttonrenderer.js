goog.provide('kinyelo.ui.ButtonRenderer');

goog.require('goog.a11y.aria.Role');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.string');
goog.require('goog.ui.ButtonRenderer');
goog.require('goog.ui.ControlContent');



/**
 * Custom renderer for {@link goog.ui.Button}s.  Custom buttons can contain
 * almost arbitrary HTML content, will flow like inline elements, but can be
 * styled like block-level elements.
 *
 * @constructor
 * @extends {goog.ui.ButtonRenderer}
 */
kinyelo.ui.ButtonRenderer = function() {
    goog.ui.ButtonRenderer.call(this);
};
goog.inherits(kinyelo.ui.ButtonRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(kinyelo.ui.ButtonRenderer);


/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
kinyelo.ui.ButtonRenderer.CSS_CLASS = goog.getCssName('k-button');


/**
 * Returns the button's contents wrapped in the following DOM structure:
 *    <div class="goog-inline-block goog-custom-button">
 *      <div class="goog-inline-block goog-custom-button-outer-box">
 *        <div class="goog-inline-block goog-custom-button-inner-box">
 *          Contents...
 *        </div>
 *      </div>
 *    </div>
 * Overrides {@link goog.ui.ButtonRenderer#createDom}.
 * @param {goog.ui.Control} control goog.ui.Button to render.
 * @return {Element} Root element for the button.
 * @override
 */
kinyelo.ui.ButtonRenderer.prototype.createDom = function(control) {
    var button = /** @type {goog.ui.Button} */ (control);
    var classNames = this.getClassNames(button);
    var attributes = {
        'class': classNames.join(' '),
        'title': button.getTooltip() || ''
    };
    var buttonElement = button.getDomHelper().createDom(goog.dom.TagName.BUTTON, attributes, button.getContent());

    this.setAriaStates(button, buttonElement);

    return buttonElement;
};




/**
 * Takes the button's root element and returns the parent element of the
 * button's contents.  Overrides the superclass implementation by taking
 * the nested DIV structure of custom buttons into account.
 * @param {Element} element Root element of the button whose content
 *     element is to be returned.
 * @return {Element} The button's content element (if any).
 * @override
 */
kinyelo.ui.ButtonRenderer.prototype.getContentElement = function(element) {
    return element && /** @type {Element} */ (element.firstChild.firstChild);
};



/**
 * Returns true if this renderer can decorate the element.  Overrides
 * {@link goog.ui.ButtonRenderer#canDecorate} by returning true if the
 * element is a DIV, false otherwise.
 * @param {Element} element Element to decorate.
 * @return {boolean} Whether the renderer can decorate the element.
 * @override
 */
kinyelo.ui.ButtonRenderer.prototype.canDecorate = function(element) {
    return element.tagName == goog.dom.TagName.BUTTON;
};


/**
 * Takes an existing element and decorates it with the custom button control.
 * Initializes the control's ID, content, tooltip, value, and state based
 * on the ID of the element, its child nodes, and its CSS classes, respectively.
 * Returns the element.  Overrides {@link goog.ui.ButtonRenderer#decorate}.
 * @param {goog.ui.Control} control Button instance to decorate the element.
 * @param {Element} element Element to decorate.
 * @return {Element} Decorated element.
 * @override
 */
kinyelo.ui.ButtonRenderer.prototype.decorate = function(control, element) {
    var button = /** @type {goog.ui.Button} */ (control);
    // Trim text nodes in the element's child node list; otherwise madness
    // ensues (i.e. on Gecko, buttons will flicker and shift when moused over).
    kinyelo.ui.ButtonRenderer.trimTextNodes_(element, true);
    kinyelo.ui.ButtonRenderer.trimTextNodes_(element, false);

    goog.dom.classes.add(element,
        goog.ui.INLINE_BLOCK_CLASSNAME, this.getCssClass());
    return kinyelo.ui.ButtonRenderer.superClass_.decorate.call(this, button,
        element);
};


/**
 * Returns the CSS class to be applied to the root element of components
 * rendered using this renderer.
 * @return {string} Renderer-specific CSS class.
 * @override
 */
kinyelo.ui.ButtonRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.ButtonRenderer.CSS_CLASS;
};

