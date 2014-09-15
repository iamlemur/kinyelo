goog.provide('kinyelo.ui.annotate.GroupRenderer');

goog.require('goog.ui.ControlRenderer');
goog.require('kinyelo.ui.annotate.Annotation');
goog.require('kinyelo.ui.annotate.annotation.Comment');
goog.require('goog.array');
goog.require('kinyelo.annotate.Annotation');


/**
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
kinyelo.ui.annotate.GroupRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.annotate.GroupRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(kinyelo.ui.annotate.GroupRenderer);

/**
 * @type {string}
 */
kinyelo.ui.annotate.GroupRenderer.CSS_CLASS = 'annotation-group';

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.GroupRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.GroupRenderer.CSS_CLASS;
}


/**
 *
 * @param {kinyelo.ui.annotate.Group} group
 * @returns {Element}
 */
kinyelo.ui.annotate.GroupRenderer.prototype.createDom = function(group) {

    var el = group.getDomHelper().createDom(
        'ul', this.getClassNames(group).join(' '), group.getContent());

    this.setAriaStates(group, el);

    group.setElementInternal(el);

    var annotations = group.getModel();

    goog.array.forEach(annotations.getAnnotations(), function(annotation) {
        switch(annotation.type) {
            case 'COMMENT':
                var control = new kinyelo.ui.annotate.annotation.Comment(annotation);
                break;
        }
        group.addChild(control, true);
    });

    return el;
}
