goog.provide('kinyelo.ui.annotate.AnchorRenderer');

goog.require('goog.ui.ControlRenderer');
goog.require('kinyelo.ui.annotate.Annotation');
goog.require('kinyelo.ui.annotate.annotation.Comment');
goog.require('goog.array');
goog.require('kinyelo.annotate.Annotation');
goog.require('kinyelo.ui.annotate.Button');


/**
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
kinyelo.ui.annotate.AnchorRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.annotate.AnchorRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(kinyelo.ui.annotate.GroupRenderer);

/**
 * @type {string}
 */
kinyelo.ui.annotate.AnchorRenderer.CSS_CLASS = 'annotation-group';

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.AnchorRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.AnchorRenderer.CSS_CLASS;
}


/**
 *
 * @param {kinyelo.ui.annotate.Anchor} group
 * @returns {Element}
 */
kinyelo.ui.annotate.AnchorRenderer.prototype.createDom = function(control) {

    var el = control.getDomHelper().createDom('ul', this.getClassNames(control).join(' '));

    this.setAriaStates(control, el);

    var model = control.getModel();

    goog.array.forEach(model.getAnnotations(), function(annotation) {
        //switch(annotation.type) {
        //    case 'COMMENT':
                var annotationControl = new kinyelo.ui.annotate.annotation.Comment(annotation);
        //        break;
        //}
        //control.addChild(annotationControl, true);
    });

    //this.addButtons(control);
    //this.addCommentForm(control);

    return el;
}

/**
 *
 * @param {!goog.ui.Control} control
 */
kinyelo.ui.annotate.AnchorRenderer.prototype.addButtons = function(control) {
    var comment = new kinyelo.ui.annotate.Button('Add Comment');
    var character = new kinyelo.ui.annotate.Button('Add Character');
    var post = new kinyelo.ui.annotate.Button('Connect Post');
    control.addChild(comment, true);
    control.addChild(character, true);
    control.addChild(post, true);
}

/**
 *
 * @param {goog.ui.Control} control
 */
kinyelo.ui.annotate.AnchorRenderer.prototype.addCommentForm = function(control) {
    //control.getDomHelper().createDom('div');
}
