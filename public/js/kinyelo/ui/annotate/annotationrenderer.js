goog.provide('kinyelo.ui.annotate.AnnotationRenderer');

goog.require('goog.ui.ControlRenderer');
goog.require('goog.dom');


/**
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
kinyelo.ui.annotate.AnnotationRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.annotate.AnnotationRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(kinyelo.ui.annotate.AnnotationRenderer);

/** @type {string} */
kinyelo.ui.annotate.AnnotationRenderer.CSS_CLASS = 'annotation-item';

/** @inheritDoc */
kinyelo.ui.annotate.AnnotationRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.AnnotationRenderer.CSS_CLASS;
}

/**
 *
 * @param {kinyelo.ui.annotate.Annotation} annotation
 * @returns {Element}
 */
kinyelo.ui.annotate.AnnotationRenderer.prototype.createDom = function(annotation) {

    this.annotation = annotation.getModel();
    this.domHelper = annotation.getDomHelper();

    var div = this.domHelper.createDom(goog.dom.TagName.DIV, 'entry', [this.getAvatar(this.annotation), this.getAuthorLink(this.annotation), this.getContent(this.annotation)]);

    var el = this.domHelper.createDom(
        'li', this.getClassNames(annotation).join(' '), div);


    this.setAriaStates(annotation, el);

    return el;
}


/**
 *
 * @param {kinyelo.annotate.Annotation} annotation
 * @returns {Element}
 * @protected
 */
kinyelo.ui.annotate.AnnotationRenderer.prototype.getAvatar = function(annotation) {

    var avatarImage = this.domHelper.createDom(goog.dom.TagName.IMG, {
        'src': annotation.author.avatar.url
    });
    var avatar = this.domHelper.createDom(goog.dom.TagName.A, {
        'href': annotation.author.url,
        'title': 'Go to the profile of ' + annotation.author.username,
        'class': 'avatar',
        'rel': 'nofollow'
    }, avatarImage);

    return avatar;

}

/**
 *
 * @param {kinyelo.annotate.Annotation} annotation
 * @returns {Element}
 * @protected
 */
kinyelo.ui.annotate.AnnotationRenderer.prototype.getAuthorLink = function(annotation) {
    var link = this.domHelper.createDom(goog.dom.TagName.A, {
        'href': annotation.author.url,
        'title': 'Go to the profile of ' + annotation.author.username,
        'class': 'author'
    }, annotation.author.username);

    return link;

}

/**
 *
 * @param {kinyelo.annotate.Annotation} annotation
 * @returns {Element}
 * @protected
 */
kinyelo.ui.annotate.AnnotationRenderer.prototype.getContent = function(annotation) {

    var content = this.domHelper.createDom(goog.dom.TagName.P, 'content', annotation.content);
    return content;

}