goog.provide('kinyelo.ui.annotate.Form');

goog.require('goog.ui.Control');

/**
 *
 * @param {kinyelo.annotate.Group} group
 * @param {kinyelo.ui.annotate.FormRenderer} renderer
 * @constructor
 * @extends {kinyelo.ui.Control}
 */
kinyelo.ui.annotate.Form = function(group, renderer) {
    this.setModel(group);
}

goog.inherits(kinyelo.ui.annotate.Form, kinyelo.ui.Control);