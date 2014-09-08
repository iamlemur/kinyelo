goog.provide('kinyelo.ui.annotate.GroupRenderer');

goog.require('goog.ui.ControlRenderer');
goog.require('kinyelo.ui.annotate.Annotation');
goog.require('goog.array');


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
    var el = goog.base(this, 'createDom', group);
    console.log(el);
    group.setElementInternal(el);

    var annotations = group.getModel();

    goog.array.forEach(annotations, function(annotation) {
        var control = new kinyelo.ui.annotate.Annotation(annotation);
        group.addChild(control, true);
    });

    return el;
}
