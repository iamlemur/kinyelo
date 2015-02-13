goog.provide('app.ui.annotate.Reply');

goog.require('kinyelo.ui.Component');

/**
 *
 * @param {app.model.Reply} model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {kinyelo.ui.Component}
 */
app.ui.annotate.Reply = function(model, opt_domHelper) {
    goog.base(this, opt_domHelper);

    this.setModel(model || null);
}
goog.inherits(app.ui.annotate.Reply, kinyelo.ui.Component);


