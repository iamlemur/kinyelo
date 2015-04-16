goog.provide('kinyelo.ui.editor.ToolbarFactory');

goog.require('goog.dom');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarButton');
goog.require('goog.ui.Container.Orientation');
goog.require('goog.ui.Component.State');
goog.require('goog.style');
goog.require('kinyelo.ui.editor.ToolbarRenderer');
goog.require('kinyelo.ui.editor.CustomButtonRenderer');
goog.require('goog.string.Unicode');
goog.require('goog.userAgent');

/**
 * Creates a {@link goog.ui.Toolbar} containing the specified set of
 * toolbar buttons, and renders it into the given parent element.  Each
 * item in the {@code items} array must a {@link goog.ui.Control}.
 * @param {!Array.<goog.ui.Control>} items Toolbar items; each must
 *     be a {@link goog.ui.Control}.
 * @param {!Element} elem Toolbar parent element.
 * @param {boolean=} opt_isRightToLeft Whether the editor chrome is
 *     right-to-left; defaults to the directionality of the toolbar parent
 *     element.
 * @return {!goog.ui.Toolbar} Editor toolbar, rendered into the given parent
 *     element.
 */
kinyelo.ui.editor.ToolbarFactory.makeToolbar = function(items, elem,
                                                     opt_isRightToLeft) {
    var domHelper = goog.dom.getDomHelper(elem);

    // Create an empty horizontal toolbar using the default renderer.
    var toolbar = new goog.ui.Toolbar(kinyelo.ui.editor.ToolbarRenderer.getInstance(),
        goog.ui.Container.Orientation.HORIZONTAL, domHelper);

    // Optimization:  Explicitly test for the directionality of the parent
    // element here, so we can set it for both the toolbar and its children,
    // saving a lot of expensive calls to goog.style.isRightToLeft() during
    // rendering.
    var isRightToLeft = opt_isRightToLeft || goog.style.isRightToLeft(elem);
    toolbar.setRightToLeft(isRightToLeft);

    // Optimization:  Set the toolbar to non-focusable before it is rendered,
    // to avoid creating unnecessary keyboard event handler objects.
    toolbar.setFocusable(false);

    for (var i = 0, button; button = items[i]; i++) {
        // Optimization:  Set the button to non-focusable before it is rendered,
        // to avoid creating unnecessary keyboard event handler objects.  Also set
        // the directionality of the button explicitly, to avoid expensive calls
        // to goog.style.isRightToLeft() during rendering.
        button.setSupportedState(goog.ui.Component.State.FOCUSED, false);
        button.setRightToLeft(isRightToLeft);
        toolbar.addChild(button, true);
    }

    toolbar.render(elem);
    return toolbar;
};


/**
 * Creates a toggle button with the given ID, tooltip, and caption. Applies
 * any custom CSS class names to the button's caption element. The button
 * returned has checkbox-like toggle semantics.
 * @param {string} id Button ID; must equal a {@link goog.editor.Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {goog.ui.ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Button renderer; defaults to
 *     {@link kinyelo.ui.editor.CustomButtonRenderer} if unspecified.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!goog.ui.Button} A toggle button.
 */
kinyelo.ui.editor.ToolbarFactory.makeToggleButton = function(id, tooltip, caption,
                                                          opt_classNames, opt_renderer, opt_domHelper) {
    var button = kinyelo.ui.editor.ToolbarFactory.makeButton(id, tooltip, caption,
        opt_classNames, opt_renderer, opt_domHelper);
    button.setSupportedState(goog.ui.Component.State.CHECKED, true);
    return button;
};



/**
 * Creates a toolbar button with the given ID, tooltip, and caption.  Applies
 * any custom CSS class names to the button's caption element.
 * @param {string} id Button ID; must equal a {@link goog.editor.Command} for
 *     built-in buttons, anything else for custom buttons.
 * @param {string} tooltip Tooltip to be shown on hover.
 * @param {goog.ui.ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the caption
 *     element.
 * @param {goog.ui.ButtonRenderer=} opt_renderer Button renderer; defaults to
 *     {@link kinyelo.ui.editor.CustomButtonRenderer} if unspecified.
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!goog.ui.Button} A toolbar button.
 */
kinyelo.ui.editor.ToolbarFactory.makeButton = function(id, tooltip, caption,
                                                    opt_classNames, opt_renderer, opt_domHelper) {
    opt_renderer = goog.isDef(opt_renderer) ? opt_renderer : kinyelo.ui.editor.CustomButtonRenderer.getInstance();
    var button = new goog.ui.ToolbarButton(
        kinyelo.ui.editor.ToolbarFactory.createContent_(caption, opt_classNames,
            opt_domHelper),
        opt_renderer,
        opt_domHelper);
    button.setId(id);
    button.setTooltip(tooltip);
    return button;
};



/**
 * Creates a new DIV that wraps a button caption, optionally applying CSS
 * class names to it.  Used as a helper function in button factory methods.
 * @param {goog.ui.ControlContent} caption Button caption.
 * @param {string=} opt_classNames CSS class name(s) to apply to the DIV that
 *     wraps the caption (if any).
 * @param {goog.dom.DomHelper=} opt_domHelper DOM helper, used for DOM
 *     creation; defaults to the current document if unspecified.
 * @return {!Element} DIV that wraps the caption.
 * @private
 */
kinyelo.ui.editor.ToolbarFactory.createContent_ = function(caption, opt_classNames,
                                                        opt_domHelper) {
    // FF2 doesn't like empty DIVs, especially when rendered right-to-left.
    if ((!caption || caption == '') && goog.userAgent.GECKO &&
        !goog.userAgent.isVersion('1.9a')) {
        caption = goog.string.Unicode.NBSP;
    }
    return (opt_domHelper || goog.dom.getDomHelper()).createDom(
        goog.dom.TagName.SPAN,
        opt_classNames ? {'class' : opt_classNames} : null, caption);
};
