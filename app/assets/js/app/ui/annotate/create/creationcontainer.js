goog.provide('app.ui.annotate.create.CreationContainer');

goog.require('kinyelo.ui.Component');
goog.require('app.ui.annotate.create.CreationContainerRenderer');
goog.require('app.ui.annotate.create.Form');
goog.require('app.models.Annotation');
goog.require('goog.events');
goog.require('goog.events.BrowserEvent');

/**
 * @param {app.models.Annotatable} model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @inheritDoc
 * @constructor
 * @extends {kinyelo.ui.Component}
 */
app.ui.annotate.create.CreationContainer = function(model, opt_domHelper) {
    kinyelo.ui.Component.call(this, opt_domHelper);
    this.setModel(model);
    this.renderer_ = goog.ui.registry.getDefaultRenderer(this.constructor);
}
goog.inherits(app.ui.annotate.create.CreationContainer, kinyelo.ui.Component);
goog.ui.registry.setDefaultRenderer(app.ui.annotate.create.CreationContainer, app.ui.annotate.create.CreationContainerRenderer);

/**
 * @inheritDoc
 */
app.ui.annotate.create.CreationContainer.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    this.getHandler().listen(
        this,
        goog.events.EventType.CLICK,
        this.handleActionButtonClick_,
        false
    );
    this.getHandler().listen(
        this,
        app.ui.annotate.create.Form.EventType.SUBMIT_COMMENT,
        goog.bind(this.handleFormSubmit, this),
        false
    );
}


app.ui.annotate.create.CreationContainer.prototype.handleFormSubmit = function(e) {

    //TODO: disable form when submitting

    var appInstance = kinyelo.App.getInstance();
    var user = appInstance.getUser();

    var annotatableModel = /** @type {app.models.Annotatable} */ this.getModel();
    var postModel = annotatableModel.getPost();

    var model = new app.models.Annotation(postModel, null, annotatableModel.getElement(), user, e.getContent());

    model.save(goog.bind(this.afterSave, this));

}

/** @inheritDoc */
app.ui.annotate.create.CreationContainer.prototype.createDom = function() {
    this.renderer_.createDom(this);
}

/**
 *
 * @param {!goog.events.Event} e
 * @private
 */
app.ui.annotate.create.CreationContainer.prototype.handleActionButtonClick_ = function(e) {
    //TODO: figure out why I cannot get browser event to determine tbe mouse button clicked
    this.renderer_.showForm(this, e.target.getType());
}

//TODO: standardize the response object returned from AJAX requests
/**
 *
 * @param {object}
 */
app.ui.annotate.create.CreationContainer.prototype.afterSave = function(result) {
    console.log(result);
    if(result.success) {
        //this.dispatchEvent(app.models.Annotation.EventType.READY);
    } else {

    }
}