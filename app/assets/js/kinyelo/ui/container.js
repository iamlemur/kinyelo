goog.provide('kinyelo.ui.Container');

goog.require('goog.ui.Container');

/**
 * @inheritDoc
 * @constructor
 * @extends {goog.ui.Container}
 */
kinyelo.ui.Container = function(opt_orientation, opt_renderer, opt_domHelper) {
    goog.ui.Container.call(this, opt_orientation, opt_renderer, opt_domHelper);
}
goog.inherits(kinyelo.ui.Container, goog.ui.Container);


//
///**
// * @inheritDoc
// */
//kinyelo.ui.Container.prototype.getOwnerControl = function(node) {
//    // Ensure that this container actually has child controls before
//    // looking up the owner.
//    if (this.childElementIdMap_) {
//        var elem = this.getElement();
//        // See http://b/2964418 . IE9 appears to evaluate '!=' incorrectly, so
//        // using '!==' instead.
//        // TODO(user): Possibly revert this change if/when IE9 fixes the issue.
//        while (node && node !== elem) {
//            var id = goog.dom.dataset.get(node, 'id');
//            if (id in this.childElementIdMap_) {
//                return this.childElementIdMap_[id];
//            }
//            node = node.parentNode;
//        }
//    }
//    return null;
//};
//
//
//
///**
// * @inheritDoc
// */
//kinyelo.ui.Container.prototype.enterDocument = function() {
//    goog.ui.Container.superClass_.enterDocument.call(this);
//
//    this.forEachChild(function(child) {
//        if (child.isInDocument()) {
//            this.registerChildId(child);
//        }
//    }, this);
//
//    var elem = this.getElement();
//
//    // Call the renderer's initializeDom method to initialize the container's DOM.
//    this.renderer_.initializeDom(this);
//
//    // Initialize visibility (opt_force = true, so we don't dispatch events).
//    this.setVisible(this.visible_, true);
//
//    // Handle events dispatched by child controls.
//    this.getHandler().
//        listen(this, goog.ui.Component.EventType.ENTER,
//        this.handleEnterItem).
//        listen(this, goog.ui.Component.EventType.HIGHLIGHT,
//        this.handleHighlightItem).
//        listen(this, goog.ui.Component.EventType.UNHIGHLIGHT,
//        this.handleUnHighlightItem).
//        listen(this, goog.ui.Component.EventType.OPEN, this.handleOpenItem).
//        listen(this, goog.ui.Component.EventType.CLOSE, this.handleCloseItem).
//
//        // Handle mouse events.
//        listen(elem, goog.events.EventType.MOUSEDOWN, this.handleMouseDown).
//        listen(goog.dom.getOwnerDocument(elem), goog.events.EventType.MOUSEUP,
//        this.handleDocumentMouseUp).
//
//        // Handle mouse events on behalf of controls in the container.
//        listen(elem, [
//            goog.events.EventType.MOUSEDOWN,
//            goog.events.EventType.MOUSEUP,
//            goog.events.EventType.MOUSEOVER,
//            goog.events.EventType.MOUSEOUT,
//            goog.events.EventType.CONTEXTMENU
//        ], this.handleChildMouseEvents);
//
//    // If the container is focusable, set up keyboard event handling.
//    if (this.isFocusable()) {
//        this.enableFocusHandling_(true);
//    }
//};
//
//
///**
// * @inheritDoc
// */
//kinyelo.ui.Container.prototype.registerChildId = function(child) {
//    // Map the DOM ID of the control's root element to the control itself.
//    var childElem = child.getElement();
//
//    // If the control's root element doesn't have a DOM ID assign one.
//    goog.dom.dataset.set(childElem, 'id', child.getId());
//    var id = goog.dom.dataset.get(childElem, 'id');
////    var id = childElem.id || (childElem.id = child.getId());
//
//    // Lazily create the child element ID map on first use.
//    if (!this.childElementIdMap_) {
//        this.childElementIdMap_ = {};
//    }
//    this.childElementIdMap_[id] = child;
//};
//
//
//
///**
// * @inheritDoc
// */
//kinyelo.ui.Container.prototype.removeChild = function(control, opt_unrender) {
//    control = goog.isString(control) ? this.getChild(control) : control;
//
//    if (control) {
//        var index = this.indexOfChild(control);
//        if (index != -1) {
//            if (index == this.highlightedIndex_) {
//                control.setHighlighted(false);
//            } else if (index < this.highlightedIndex_) {
//                this.highlightedIndex_--;
//            }
//        }
//
//        // Remove the mapping from the child element ID map.
//        var childElem = control.getElement();
//        if (childElem && goog.dom.dataset.has(childElem, 'id') && this.childElementIdMap_) {
//            goog.object.remove(this.childElementIdMap_, goog.dom.dataset.get(childElem, 'id'));
//        }
//    }
//
//    control = /** @type {goog.ui.Control} */ (
//        goog.ui.Container.superClass_.removeChild.call(this, control,
//            opt_unrender));
//
//    // Re-enable mouse event handling (in case the control is reused elsewhere).
//    control.setHandleMouseEvents(true);
//
//    return control;
//};
//
///**
// * @inheritDoc
// */
//kinyelo.ui.Container.prototype.handleHighlightItem = function(e) {
//    var index = this.indexOfChild(/** @type {goog.ui.Control} */ (e.target));
//    if (index > -1 && index != this.highlightedIndex_) {
//        var item = this.getHighlighted();
//        if (item) {
//            // Un-highlight previously highlighted item.
//            item.setHighlighted(false);
//        }
//
//        this.highlightedIndex_ = index;
//        item = this.getHighlighted();
//
//        if (this.isMouseButtonPressed()) {
//            // Activate item when mouse button is pressed, to allow MacOS-style
//            // dragging to choose menu items.  Although this should only truly
//            // happen if the highlight is due to mouse movements, there is little
//            // harm in doing it for keyboard or programmatic highlights.
//            item.setActive(true);
//        }
//
//        // Update open item if open item needs follow highlight.
//        if (this.openFollowsHighlight_ &&
//            this.openItem_ && item != this.openItem_) {
//            if (item.isSupportedState(goog.ui.Component.State.OPENED)) {
//                item.setOpen(true);
//            } else {
//                this.openItem_.setOpen(false);
//            }
//        }
//    }
//    var element = this.getElement();
//    goog.asserts.assert(element,
//        'The DOM element for the container cannot be null.');
//    goog.a11y.aria.setState(element,
//        goog.a11y.aria.State.ACTIVEDESCENDANT,
//        goog.dom.dataset.get(e.target.getElement(), 'id'));
//};
//
