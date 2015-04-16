goog.provide('app.ui.annotate.create.FormRenderer');


goog.require('app.ui.BaseRenderer');

/**
 *
 * @constructor
 * @extends {app.ui.BaseRenderer}
 */
app.ui.annotate.create.FormRenderer = function() {

}
goog.inherits(app.ui.annotate.create.FormRenderer, app.ui.BaseRenderer);
goog.addSingletonGetter(app.ui.annotate.create.FormRenderer);


/**
 *
 * @type {string}
 */
app.ui.annotate.create.FormRenderer.CSS_CLASS = 'create-annotation';
app.ui.annotate.create.FormRenderer.WRAPPER_CLASS = 'create-annotation-form';
app.ui.annotate.create.FormRenderer.SUBMIT_BUTTON_CLASS = 'submit';
app.ui.annotate.create.FormRenderer.CANCEL_BUTTON_CLASS = 'cancel';


/**
 * @param {app.ui.annotate.create.Form} component
 */
app.ui.annotate.create.FormRenderer.prototype.createDom = function(component) {
    var user = kinyelo.App.getInstance().getUser();
    var dom = component.getDomHelper();

    var form = dom.createDom(
        goog.dom.TagName.DIV,
        {
            "id": component.makeId(app.ui.annotate.create.Form.IdFragment.CONTAINER),
            "class": app.ui.annotate.create.FormRenderer.WRAPPER_CLASS + " " + component.getType()
        },
        goog.array.concat([this.getAvatar(user), this.getAuthorLink(user), this.getCommentField(component)], this.getButtons(component))
    );
    component.setElementInternal(form);
}


/**
 * @param {app.ui.annotate.create.Form} component
 * @returns {Element}
 */
app.ui.annotate.create.FormRenderer.prototype.getCommentField = function(component) {
    var dom = component.getDomHelper();
    var element = dom.createDom(
        goog.dom.TagName.DIV,
        {
            "class": app.ui.BaseRenderer.EDITABLE_FIELD_CLASS,
            "id": component.makeId(app.ui.annotate.create.Form.IdFragment.COMMENT_FIELD)
        }
    );
    return element;
}


/**
 * @param {app.ui.annotate.create.Form} component
 * @returns {Array<Element>}
 */
app.ui.annotate.create.FormRenderer.prototype.getButtons = function(component) {
    var dom = component.getDomHelper();
    var submitButton = dom.createDom(
        goog.dom.TagName.BUTTON,
        {
            "class": app.ui.annotate.create.FormRenderer.SUBMIT_BUTTON_CLASS,
            "id": component.makeId(app.ui.annotate.create.Form.IdFragment.SUBMIT_BUTTON)
        },
        "add"
    );
    var cancelButton = dom.createDom(
        goog.dom.TagName.BUTTON,
        {
            "class": app.ui.annotate.create.FormRenderer.CANCEL_BUTTON_CLASS,
            "id": component.makeId(app.ui.annotate.create.Form.IdFragment.CANCEL_BUTTON)
        },
        "cancel"
    );
    return [submitButton, cancelButton];
}
