goog.provide('app.ui.annotate.create.CreationContainerRenderer');

goog.require('goog.object');
goog.require('app.models.Annotation');
goog.require('app.ui.annotate.create.ActionButton');
goog.require('kinyelo.ui.ButtonRenderer');
goog.require('app.ui.annotate.create.Form');

/**
 * @constructor
 */
app.ui.annotate.create.CreationContainerRenderer = function() {
}
goog.addSingletonGetter(app.ui.annotate.create.CreationContainerRenderer);


/**
 *
 * @param {kinyelo.ui.Component} container
 */
app.ui.annotate.create.CreationContainerRenderer.prototype.createDom = function(container) {
    var dom = container.getDomHelper();
    var el = dom.createDom('div', app.ui.annotate.create.CreationContainerRenderer.CSS_CLASS);
    container.setElementInternal(el);
    this.showActionButtons(container);
}

/**
 *
 * @param {kinyelo.ui.Component} container
 */
app.ui.annotate.create.CreationContainerRenderer.prototype.showActionButtons = function(container) {
    container.removeChildren(true);
    var types = app.models.Annotation.Type;
    goog.object.forEach(types, function(value, key) {
        var button = new app.ui.annotate.create.ActionButton(value, kinyelo.ui.ButtonRenderer.getInstance());
        container.addChild(button, true);
    });
}

/**
 * @param {kinyelo.ui.Component} container
 * @param {app.models.annotation.Type} type
 */
app.ui.annotate.create.CreationContainerRenderer.prototype.showForm = function(container, type) {
    container.removeChildren(true);
    var form = new app.ui.annotate.create.Form(type);
    container.addChild(form, true);
}

/**
 *
 * @type {string}
 */
app.ui.annotate.create.CreationContainerRenderer.CSS_CLASS = 'k-creation-container';