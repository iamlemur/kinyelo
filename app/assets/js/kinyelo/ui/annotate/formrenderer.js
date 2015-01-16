goog.provide('kinyelo.ui.annotate.FormRenderer');

goog.require('kinyelo.ui.ControlRenderer');


/**
 *
 * @constructor
 * @extends {kinyelo.ui.ControlRenderer}
 */

kinyelo.ui.annotate.FormRenderer = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.annotate.FormRenderer, kinyelo.ui.ControlRenderer);
goog.addSingletonGetter(kinyelo.ui.annotate.FormRenderer);


/**
 * @type {string}
 */
kinyelo.ui.annotate.FormRenderer.CSS_CLASS = 'annotation-form';

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.FormRenderer.prototype.getCssClass = function() {
    return kinyelo.ui.annotate.FormRenderer.CSS_CLASS;
}

/**
 *
 * @param {kinyelo.ui.annotate.Group} group
 * @returns {Element}
 */
kinyelo.ui.annotate.FormRenderer.prototype.createDom = function(group) {

    var el = group.getDomHelper().createDom(
        'div', this.getClassNames(group).join(' '), group.getContent());

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

    this.addButtons(group);
    this.addCommentForm(group);

    return el;
}
