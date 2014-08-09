goog.provide('kinyelo.editor.plugins.LoremIpsum');

goog.require('goog.editor.plugins.LoremIpsum');
goog.require('goog.dom.dataset');
goog.require('goog.string');
goog.require('goog.events.EventHandler');


/**
 *
 * @constructor
 * @extend {goog.editor.plugins.LoremIpsum}
 */
kinyelo.editor.plugins.LoremIpsum = function(message) {
    goog.editor.plugins.LoremIpsum.call(this);
    this.eventRegister_ = new goog.events.EventHandler(this);
}
goog.inherits(kinyelo.editor.plugins.LoremIpsum, goog.editor.plugins.LoremIpsum);

kinyelo.editor.plugins.LoremIpsum.DEFAULT_VALUE_KEY = 'defaultValue';

kinyelo.editor.plugins.LoremIpsum.prototype.postInit = function() {
    this.message_ = goog.dom.dataset.get(this.getFieldObject().getOriginalElement(), kinyelo.editor.plugins.LoremIpsum.DEFAULT_VALUE_KEY);
    this.eventRegister_.listen(this.getFieldObject(), goog.editor.Field.EventType.FOCUS, this.handleFocus_);
}

/**
 * @type {goog.events.EventHandler=}
 * @private
 */
kinyelo.editor.plugins.LoremIpsum.prototype.eventRegister_ = null;


/**
 * @inheritDoc
 */
kinyelo.editor.plugins.LoremIpsum.prototype.updateLorem_ = function() {
    // Try to apply lorem ipsum if:
    // 1) We have lorem ipsum text
    // 2) There's not a dialog open, as that screws
    //    with the dialog's ability to properly restore the selection
    //    on dialog close (since the DOM nodes would get clobbered in FF)
    // 3) We're not using lorem already
    // 4) The field is not currently active (doesn't have focus).
    var fieldObj = this.getFieldObject();
    if (!this.usingLorem_ &&
        !fieldObj.inModalMode() &&
        goog.editor.Field.getActiveFieldId() != fieldObj.id) {
        var field = fieldObj.getElement();
        if (!field) {
            // Fallback on the original element. This is needed by
            // fields managed by click-to-edit.
            field = fieldObj.getOriginalElement();
        }

        goog.asserts.assert(field);
        if (goog.editor.node.isEmpty(field)) {
            this.usingLorem_ = true;

            // Save the old font style so it can be restored when we
            // clear the lorem ipsum style.
            if(goog.isNull(this.placeholder_)) {
                var helper = fieldObj.getEditableDomHelper();
                this.placeholder_ = helper.createDom(goog.dom.TagName.SPAN, kinyelo.editor.plugins.LoremIpsum.DEFAULT_VALUE_KEY);
            }
            goog.dom.setTextContent(this.placeholder_, this.message_);
            fieldObj.setHtml(true, goog.dom.getOuterHtml(this.placeholder_), true);
        }
    }
};

kinyelo.editor.plugins.LoremIpsum.prototype.placeholder_ = null;

kinyelo.editor.plugins.LoremIpsum.prototype.handleKeyPress = function(e) {
    //if we have a normal key press
    //TODO: make sure they are not pressing a control key as well
    if(this.usingLorem_ && e.getBrowserEvent().which != 0) {
        this.usingLorem_ = false;
        this.clearLorem_(true);
        //this.getFieldObject().setHtml(false, null, true);
        goog.dom.removeChildren(this.getFieldObject().getElement());
        var dom = this.getFieldDomHelper();
        var section = dom.createDom(goog.dom.TagName.SECTION);
        this.getFieldObject().addUniqueID(section);
        var p = dom.createDom(goog.dom.TagName.P);
        this.getFieldObject().addUniqueID(p);
        goog.dom.appendChild(p, dom.createDom(goog.dom.TagName.BR));
        goog.dom.appendChild(section, p);
        goog.dom.appendChild(this.getFieldObject().getElement(), section);
        goog.editor.range.selectNodeStart(p);
    }
}

kinyelo.editor.plugins.LoremIpsum.prototype.handleFocus_ = function(e) {
    var fieldObj = this.getFieldObject();
    if(this.usingLorem_) {
        if (fieldObj.isLoaded()) {
            goog.editor.range.selectNodeStart(this.placeholder_);
        }
    }
}

kinyelo.editor.plugins.LoremIpsum.prototype.placeCursorAtStart = function() {
    var fieldObj = this.getFieldObject();
    goog.editor.range.selectNodeStart(this.placeholder_);
    //if (goog.userAgent.WEBKIT) {
        goog.dom.getOwnerDocument(fieldObj.getElement()).body.focus();
        fieldObj.placeCursorAtStart();
        fieldObj.focus();
    //} else {
    //    fieldObj.placeCursorAtStart();
    //}
}

/**
 * @inheritDoc
 */
kinyelo.editor.plugins.LoremIpsum.prototype.clearLorem_ = function(
    opt_placeCursor) {
    // Don't mess with lorem state when a dialog is open as that screws
    // with the dialog's ability to properly restore the selection
    // on dialog close (since the DOM nodes would get clobbered)
    var fieldObj = this.getFieldObject();
    if (this.usingLorem_ && !fieldObj.inModalMode()) {
        var field = fieldObj.getElement();
        if (!field) {
            // Fallback on the original element. This is needed by
            // fields managed by click-to-edit.
            field = fieldObj.getOriginalElement();
        }

        goog.asserts.assert(field);
        //this.usingLorem_ = false;
        //fieldObj.setHtml(true, null, true);

        // TODO(nicksantos): I'm pretty sure that this is a hack, but talk to
        // Julie about why this is necessary and what to do with it. Really,
        // we need to figure out where it's necessary and remove it where it's
        // not. Safari never places the cursor on its own willpower.
        if (opt_placeCursor && fieldObj.isLoaded()) {
            this.placeCursorAtStart();
        }
    }
};