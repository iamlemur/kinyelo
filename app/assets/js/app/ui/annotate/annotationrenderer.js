goog.provide('app.ui.annotate.AnnotationRenderer');


goog.require('app.ui.BaseRenderer');

/**
 *
 * @constructor
 * @extends {app.ui.BaseRenderer}
 */
app.ui.annotate.AnnotationRenderer = function() {
}
goog.inherits(app.ui.annotate.AnnotationRenderer, app.ui.BaseRenderer);
goog.addSingletonGetter(app.ui.annotate.AnnotationRenderer);


/**
 *
 * @type {string}
 */
app.ui.annotate.AnnotationRenderer.CSS_CLASS = 'annotation';

/**
 * @param {app.ui.annotate.Annotation} component
 * @return {Element}
 * @overrides
 */
app.ui.annotate.AnnotationRenderer.prototype.createDom = function(component) {
    var dom = component.getDomHelper();


    var entryDiv = dom.createDom(
        goog.dom.TagName.DIV,
        'entry',
        [
            this.getAvatar(component.getModel().getAuthor()),
            this.getAuthorLink(component.getModel().getAuthor()),
            this.getContent(component)
        ]);
    /*
     goog.array.forEach(this.getModel().getReplies(), function(reply) {
     var control = '';
     }, this);
     */
    //TODO: do we need to add the class here if not decorating?
    var element = dom.createDom('div', app.ui.annotate.AnnotationRenderer.CSS_CLASS, [entryDiv, this.getReplyButton(component)]);

    return element;

//    var el = dom.createDom('div', this.getClassNames(container).join(' '));

}



/**
 * @param {kinyelo.ui.Component} component
 * @returns {Element}
 */
app.ui.annotate.AnnotationRenderer.prototype.getReplyButton = function(component) {
    var dom = component.getDomHelper();
    var content = dom.createDom(goog.dom.TagName.BUTTON, 'reply start-reply', dom.createTextNode('reply'));
    return content;
}



/**
 * @param {kinyelo.ui.Component} component
 * @returns {Element}
 */
app.ui.annotate.AnnotationRenderer.prototype.getContent = function(component) {
    var dom = component.getDomHelper();
    var content = dom.createDom(goog.dom.TagName.DIV, 'content', dom.htmlToDocumentFragment(component.getModel().getContent()));
    return content;
}





/**
 * @inheritDoc
 */
app.ui.annotate.AnnotationRenderer.prototype.getCssClass = function() {
    return app.ui.annotate.AnnotationRenderer.CSS_CLASS;
}