goog.provide('kinyelo.annotate.Group');

goog.require('kinyelo.annotate.CommentAnnotation');
goog.require('kinyelo.annotate.CharacterAnnotation');
goog.require('kinyelo.annotate.PostAnnotation');
goog.require('goog.array');


/**
 *
 * @param annotations
 * @constructor
 */
kinyelo.annotate.Group = function(annotations) {
    this.annotationsData = annotations;
    goog.array.forEach(this.annotationsData, this.createAnnotation, this);
}

/**
 *
 * @param {object} annotation
 */
kinyelo.annotate.Group.createAnnotation = function(annotation) {
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
 * @type {array=}
 */
kinyelo.annotate.Group.annotations = null;