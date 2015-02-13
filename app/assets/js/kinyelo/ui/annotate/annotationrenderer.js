goog.provide('app.ui.annotate.AnnotationRenderer');

goog.require('goog.ui.ControlRenderer');
goog.require('goog.dom');


/**
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
app.ui.annotate.AnnotationRenderer = function() {
    goog.base(this);
}
goog.inherits(app.ui.annotate.AnnotationRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(app.ui.annotate.AnnotationRenderer);

/** @type {string} */
app.ui.annotate.AnnotationRenderer.CSS_CLASS = 'annotation-item';

/** @inheritDoc */
app.ui.annotate.AnnotationRenderer.prototype.getCssClass = function() {
    return app.ui.annotate.AnnotationRenderer.CSS_CLASS;
}

/**
 *
 * @param {app.ui.annotate.Annotation} annotation
 * @returns {Element}
 */
app.ui.annotate.AnnotationRenderer.prototype.createDom = function(annotation) {

    this.domHelper = annotation.getDomHelper();

    var div = this.domHelper.createDom(
        goog.dom.TagName.DIV,
        'entry',
        [this.getAvatar(annotation), this.getAuthorLink(annotation), this.getContent(annotation)]);

    var el = this.domHelper.createDom(
        'li', this.getClassNames(annotation).join(' '), div);

    this.setAriaStates(annotation, el);

    return el;
}


/**
 *
 * @param {app.ui.annotate.Annotation} annotation
 * @returns {Element}
 * @protected
 */
app.ui.annotate.AnnotationRenderer.prototype.getAvatar = function(annotation) {

    var avatarImage = this.domHelper.createDom(goog.dom.TagName.IMG, {
        'src': annotation.getModel().getAuthor().getAvatarURL()
    });
    var avatar = this.domHelper.createDom(goog.dom.TagName.A, {
        'href': annotation.getModel().getAuthor().getURL(),
        'title': 'Go to the profile of ' + annotation.getModel().getAuthor().getUsername(),
        'class': 'avatar',
        'rel': 'nofollow'
    }, avatarImage);

    return avatar;

}

/**
 *
 * @param {app.ui.annotate.Annotation} annotation
 * @returns {Element}
 * @protected
 */
app.ui.annotate.AnnotationRenderer.prototype.getAuthorLink = function(annotation) {
    var link = this.domHelper.createDom(goog.dom.TagName.A, {
        'href': annotation.getModel().getAuthor().getURL(),
        'title': 'Go to the profile of ' + annotation.getModel().getAuthor().getUsername(),
        'class': 'author'
    }, annotation.getModel().getAuthor().getUsername());

    return link;

}

/**
 *
 * @param {app.ui.annotate.Annotation} annotation
 * @returns {Element}
 * @protected
 */
app.ui.annotate.AnnotationRenderer.prototype.getContent = function(annotation) {

    var content = this.domHelper.createDom(goog.dom.TagName.P, 'content', annotation.getModel().getContent());
    return content;

}