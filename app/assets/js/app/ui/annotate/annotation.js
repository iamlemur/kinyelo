goog.provide('app.ui.annotate.Annotation');

goog.require('app.ui.annotate.AnnotationRenderer');
goog.require('goog.events');
goog.require('kinyelo.ui.Component');

/**
 *
 * @param {app.models.Annotation=} model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {kinyelo.ui.Component}
 */
app.ui.annotate.Annotation = function(model, opt_domHelper) {
    goog.base(this, opt_domHelper);

    this.setModel(model || null);

}
goog.inherits(app.ui.annotate.Annotation, kinyelo.ui.Component);

/**
 * @const
 * @type {string}
 */
app.ui.annotate.Annotation.CSS_CLASS = 'annotation';


/** @inheritDoc */
app.ui.annotate.Annotation.prototype.canDecorate = function() {
    return false;
}

/** @inheritDoc */
app.ui.annotate.Annotation.prototype.createDom = function() {
    var dom = this.dom_;

    /**
     * @type {Element}
     */
    this.entryDiv = dom.createDom(
        goog.dom.TagName.DIV,
        'entry',
        [this.getAvatar(), this.getAuthorLink(), this.getContent()]);

    goog.array.forEach(this.getModel().getReplies(), function(reply) {
        var control = '';
    }, this);

    var element = dom.createDom('li', app.ui.annotate.Annotation.CSS_CLASS, this.entryDiv);

    this.setElementInternal(element);
}

/** @inheritDoc */
app.ui.annotate.Annotation.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    //TODO: add listeners
    this.dispatchEvent(app.ui.annotate.Annotation.EventType.ANNOTATION_RENDERED);
}

app.ui.annotate.Annotation.EventType = {
    ANNOTATION_RENDERED: goog.events.getUniqueId('annotation-rendered')
}


/**
 *
 * @returns {Element}
 * @protected
 */
app.ui.annotate.Annotation.prototype.getAvatar = function() {

    var dom = this.getDomHelper();
    var avatarImage = dom.createDom(goog.dom.TagName.IMG, {
        'src': this.getModel().getAuthor().getAvatarURL()
    });
    var avatar = dom.createDom(goog.dom.TagName.A, {
        'href': this.getModel().getAuthor().getURL(),
        'title': 'Go to the profile of ' + this.getModel().getAuthor().getUsername(),
        'class': 'avatar',
        'rel': 'nofollow'
    }, avatarImage);

    return avatar;

}

/**
 *
 * @returns {Element}
 * @protected
 */
app.ui.annotate.Annotation.prototype.getAuthorLink = function() {
    var link = this.getDomHelper().createDom(goog.dom.TagName.A, {
        'href': this.getModel().getAuthor().getURL(),
        'title': 'Go to the profile of ' + this.getModel().getAuthor().getUsername(),
        'class': 'author'
    }, this.getModel().getAuthor().getUsername());

    return link;

}

/**
 *
 * @returns {Element}
 * @protected
 */
app.ui.annotate.Annotation.prototype.getContent = function() {

    var content = this.getDomHelper().createDom(goog.dom.TagName.P, 'content', this.getModel().getContent());
    return content;

}