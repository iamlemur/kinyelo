goog.provide('app.ui.annotate.create.Form');

goog.require('kinyelo.ui.Component');
goog.require('app.ui.annotate.create.FormRenderer');
goog.require('kinyelo.editor.SingleLineField');
goog.require('app.ui.annotate.create.SubmitCommentEvent');

/**1
 *
 * @param {app.models.Annotation.Type} type
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {kinyelo.ui.Component}
 */
app.ui.annotate.create.Form = function(type, opt_domHelper) {
    kinyelo.ui.Component.call(this, opt_domHelper);
    this.renderer_ = goog.ui.registry.getDefaultRenderer(this.constructor);

    /**
     *
     * @type {app.models.Annotation.Type}
     * @private
     */
    this.type_ = type || null;
}
goog.inherits(app.ui.annotate.create.Form, kinyelo.ui.Component);
goog.ui.registry.setDefaultRenderer(app.ui.annotate.create.Form, app.ui.annotate.create.FormRenderer);

/** @enum {string} */
app.ui.annotate.create.Form.IdFragment = {
    CONTAINER: 'wrapper',
    FORM: 'form',
    COMMENT_FIELD: 'comment-field',
    SUBMIT_BUTTON: 'submit',
    CANCEL_BUTTON: 'cancel'
};

/** @enum {string} */
app.ui.annotate.create.Form.EventType = {
    SUBMIT_COMMENT: 'submit-comment'
}

/**
 *
 * @returns {app.models.Annotation.Type}
 */
app.ui.annotate.create.Form.prototype.getType = function() {
    return this.type_;
}

/**
 * @override
 */
app.ui.annotate.create.Form.prototype.createDom = function() {
    this.renderer_.createDom(this);
}

/** @override */
app.ui.annotate.create.Form.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    var commentField = this.getElementByFragment(app.ui.annotate.create.Form.IdFragment.COMMENT_FIELD);
    if(!goog.isNull(commentField)) {
        /**
         *
         * @type {kinyelo.editor.SingleLineField}
         * @private
         */
        this.contentField_ = new kinyelo.editor.SingleLineField(commentField.id);
    }
    var submitButton = this.getElementByFragment(app.ui.annotate.create.Form.IdFragment.SUBMIT_BUTTON);
    this.getHandler().listen(
        submitButton,
        goog.events.EventType.CLICK,
        goog.bind(this.submitComment, this),
        false
    )
}
/**
 *
 * @param {goog.events.Event=} opt_e
 */
app.ui.annotate.create.Form.prototype.submitComment = function(opt_e) {
    if(!goog.isNull(this.contentField_)) {
        this.dispatchEvent(new app.ui.annotate.create.SubmitCommentEvent(this.contentField_.getCleanContents()));
    }
}