goog.provide('kinyelo.ui.annotate.Container');

goog.require('goog.ui.Container');
goog.require('goog.ui.registry');
goog.require('kinyelo.ui.annotate.ContainerRenderer');

/**
 *
 * @param {Object=} data
 * @constructor
 */

kinyelo.ui.annotate.Container = function(data) {
    goog.base(this, goog.ui.Container.Orientation.VERTICAL, kinyelo.ui.annotate.ContainerRenderer.getInstance());
    this.setModel(data || null);
    this.setFocusable(false);
}
goog.inherits(kinyelo.ui.annotate.Container, goog.ui.Container);


/**
 * @return {Object}
 * @override
 */
kinyelo.ui.annotate.Container.prototype.getModel;

kinyelo.ui.annotate.Container.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');

    //TODO: listen for events here?
}


/**
 * Returns the child control that owns the given DOM node, or null if no such
 * control is found.
 * @param {Node} node DOM node whose owner is to be returned.
 * @return {goog.ui.Control?} Control hosted in the container to which the node
 *     belongs (if found).
 * @protected
 */
kinyelo.ui.annotate.Container.prototype.getOwnerControl = function(node) {
    // Ensure that this container actually has child controls before
    // looking up the owner.
    if (this.childElementIdMap_) {
        var elem = this.getElement();
        // See http://b/2964418 . IE9 appears to evaluate '!=' incorrectly, so
        // using '!==' instead.
        // TODO(user): Possibly revert this change if/when IE9 fixes the issue.
        while (node && node !== elem) {
            var id = goog.dom.dataset.get(node, 'id');
            if (id in this.childElementIdMap_) {
                return this.childElementIdMap_[id];
            }
            node = node.parentNode;
        }
    }
    return null;
};



/**
 * Configures the container after its DOM has been rendered, and sets up event
 * handling.  Overrides {@link goog.ui.Component#enterDocument}.
 * @override
 */
kinyelo.ui.annotate.Container.prototype.enterDocument = function() {
    goog.ui.Container.superClass_.enterDocument.call(this);

    this.forEachChild(function(child) {
        if (child.isInDocument()) {
            this.registerChildId(child);
        }
    }, this);

    var elem = this.getElement();

    // Call the renderer's initializeDom method to initialize the container's DOM.
    this.renderer_.initializeDom(this);

    // Initialize visibility (opt_force = true, so we don't dispatch events).
    this.setVisible(this.visible_, true);

    // Handle events dispatched by child controls.
    this.getHandler().
        listen(this, goog.ui.Component.EventType.ENTER,
            this.handleEnterItem).
        listen(this, goog.ui.Component.EventType.HIGHLIGHT,
            this.handleHighlightItem).
        listen(this, goog.ui.Component.EventType.UNHIGHLIGHT,
            this.handleUnHighlightItem).
        listen(this, goog.ui.Component.EventType.OPEN, this.handleOpenItem).
        listen(this, goog.ui.Component.EventType.CLOSE, this.handleCloseItem).

        // Handle mouse events.
        listen(elem, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).
        listen(goog.dom.getOwnerDocument(elem), goog.events.EventType.MOUSEUP,
            this.handleDocumentMouseUp).

        // Handle mouse events on behalf of controls in the container.
        listen(elem, [
            goog.events.EventType.MOUSEDOWN,
            goog.events.EventType.MOUSEUP,
            goog.events.EventType.MOUSEOVER,
            goog.events.EventType.MOUSEOUT,
            goog.events.EventType.CONTEXTMENU
        ], this.handleChildMouseEvents);

    // If the container is focusable, set up keyboard event handling.
    if (this.isFocusable()) {
        this.enableFocusHandling_(true);
    }
};


/**
 * Creates a DOM ID for the child control and registers it to an internal
 * hash table to be able to find it fast by id.
 * @param {goog.ui.Component} child The child control. Its root element has
 *     to be created yet.
 * @private
 */
kinyelo.ui.annotate.Container.prototype.registerChildId = function(child) {
    // Map the DOM ID of the control's root element to the control itself.
    var childElem = child.getElement();

    // If the control's root element doesn't have a DOM ID assign one.
    goog.dom.dataset.set(childElem, 'id', child.getId());
    var id = goog.dom.dataset.get(childElem, 'id');
//    var id = childElem.id || (childElem.id = child.getId());

    // Lazily create the child element ID map on first use.
    if (!this.childElementIdMap_) {
        this.childElementIdMap_ = {};
    }
    this.childElementIdMap_[id] = child;
};


/**
 * Adds the control as a child of this container at the given 0-based index.
 * Overrides {@link goog.ui.Component#addChildAt} by also updating the
 * container's highlight index.  Since {@link goog.ui.Component#addChild} uses
 * {@link #addChildAt} internally, we only need to override this method.
 * @param {goog.ui.Component} control New child.
 * @param {number} index Index at which the new child is to be added.
 * @param {boolean=} opt_render Whether the new child should be rendered
 *     immediately after being added (defaults to false).
 * @override
 */
kinyelo.ui.annotate.Container.prototype.addChildAt = function(control, index, opt_render) {
    // Make sure the child control dispatches HIGHLIGHT, UNHIGHLIGHT, OPEN, and
    // CLOSE events, and that it doesn't steal keyboard focus.
    control.setDispatchTransitionEvents(goog.ui.Component.State.HOVER, true);
    control.setDispatchTransitionEvents(goog.ui.Component.State.OPENED, true);
    if (this.isFocusable() || !this.isFocusableChildrenAllowed()) {
        control.setSupportedState(goog.ui.Component.State.FOCUSED, false);
    }

    // Disable mouse event handling by child controls.
    control.setHandleMouseEvents(false);

    // Let the superclass implementation do the work.
    goog.ui.Container.superClass_.addChildAt.call(this, control, index,
        opt_render);

    if (control.isInDocument() && this.isInDocument()) {
        this.registerChildId(control);
    }

    // Update the highlight index, if needed.
    if (index <= this.highlightedIndex_) {
        this.highlightedIndex_++;
    }
};

/**
 * Removes a child control.  Overrides {@link goog.ui.Component#removeChild} by
 * updating the highlight index.  Since {@link goog.ui.Component#removeChildAt}
 * uses {@link #removeChild} internally, we only need to override this method.
 * @param {string|goog.ui.Component} control The ID of the child to remove, or
 *     the control itself.
 * @param {boolean=} opt_unrender Whether to call {@code exitDocument} on the
 *     removed control, and detach its DOM from the document (defaults to
 *     false).
 * @return {goog.ui.Control} The removed control, if any.
 * @override
 */
kinyelo.ui.annotate.Container.prototype.removeChild = function(control, opt_unrender) {
    control = goog.isString(control) ? this.getChild(control) : control;

    if (control) {
        var index = this.indexOfChild(control);
        if (index != -1) {
            if (index == this.highlightedIndex_) {
                control.setHighlighted(false);
            } else if (index < this.highlightedIndex_) {
                this.highlightedIndex_--;
            }
        }

        // Remove the mapping from the child element ID map.
        var childElem = control.getElement();
        if (childElem && goog.dom.dataset.has(childElem, 'id') && this.childElementIdMap_) {
            goog.object.remove(this.childElementIdMap_, goog.dom.dataset.get(childElem, 'id'));
        }
    }

    control = /** @type {goog.ui.Control} */ (
        goog.ui.Container.superClass_.removeChild.call(this, control,
            opt_unrender));

    // Re-enable mouse event handling (in case the control is reused elsewhere).
    control.setHandleMouseEvents(true);

    return control;
};

/**
 * Handles HIGHLIGHT events dispatched by items in the container when
 * they are highlighted.
 * @param {goog.events.Event} e Highlight event to handle.
 */
kinyelo.ui.annotate.Container.prototype.handleHighlightItem = function(e) {
    var index = this.indexOfChild(/** @type {goog.ui.Control} */ (e.target));
    if (index > -1 && index != this.highlightedIndex_) {
        var item = this.getHighlighted();
        if (item) {
            // Un-highlight previously highlighted item.
            item.setHighlighted(false);
        }

        this.highlightedIndex_ = index;
        item = this.getHighlighted();

        if (this.isMouseButtonPressed()) {
            // Activate item when mouse button is pressed, to allow MacOS-style
            // dragging to choose menu items.  Although this should only truly
            // happen if the highlight is due to mouse movements, there is little
            // harm in doing it for keyboard or programmatic highlights.
            item.setActive(true);
        }

        // Update open item if open item needs follow highlight.
        if (this.openFollowsHighlight_ &&
            this.openItem_ && item != this.openItem_) {
            if (item.isSupportedState(goog.ui.Component.State.OPENED)) {
                item.setOpen(true);
            } else {
                this.openItem_.setOpen(false);
            }
        }
    }
    var element = this.getElement();
    goog.asserts.assert(element,
        'The DOM element for the container cannot be null.');
    goog.a11y.aria.setState(element,
        goog.a11y.aria.State.ACTIVEDESCENDANT,
        goog.dom.dataset.get(e.target.getElement(), 'id'));
};



kinyelo.ui.annotate.Container.prototype.getGroups = function() {
    //do I need to clone here?
    goog.array.sortObjectsByKey(this.sampleData_.annotations, "createdAt");
    this.annotationMap = goog.array.bucket(this.sampleData_.annotations, this.organizeAnnotations, this);
}

goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.Container, kinyelo.ui.annotate.ContainerRenderer);

goog.ui.registry.setDecoratorByClassName(kinyelo.ui.annotate.ContainerRenderer.CSS_CLASS,
    function() { return new kinyelo.ui.annotate.Container(); });
