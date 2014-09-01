goog.provide('kinyelo.annotate.Group');

goog.require('kinyelo.annotate.CommentAnnotation');
goog.require('kinyelo.annotate.CharacterAnnotation');
goog.require('kinyelo.annotate.PostAnnotation');
goog.require('goog.array');
goog.require('goog.dom');


/**
 *
 * @param {array} annotations
 * @param  {kinyelo.annotate.Container} container
 * @constructor
 */
kinyelo.annotate.Group = function(annotations, container) {
    this.annotationsData = annotations;
    goog.array.forEach(this.annotationsData, this.createAnnotation, this);
    this.container_ = container;
    this.renderGroup();
}

/**
 *
 * @param {object} annotation
 */
kinyelo.annotate.Group.prototype.createAnnotation = function(annotation) {
    switch(annotation.type) {
        case 'comment':
            goog.array.insert(this.annotations, new kinyelo.annotate.CommentAnnotation(annotation));
            break;
        case 'character':
            goog.array.insert(this.annotations, new kinyelo.annotate.CharacterAnnotation(annotation));
            break;
        case 'post':
            goog.array.insert(this.annotations, new kinyelo.annotate.PostAnnotation(annotation));
            break;
    }
}

/**
 *
 */
kinyelo.annotate.Group.prototype.renderGroup = function() {
    goog.dom.getFirstElementChild(this.container_.getContainerElement());
}

/**
 *
 * @type {array=}
 */
kinyelo.annotate.Group.prototype.annotations = [];