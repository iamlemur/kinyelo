goog.provide('kinyelo.ui.Button');

goog.require('goog.ui.Button');
goog.require('kinyelo.ui.ButtonRenderer');
goog.require('kinyelo.ui.IdGenerator');

/**
 * @param {goog.ui.ControlContent=} opt_content Text caption or existing DOM
 *     structure to display as the button's caption (if any).
 * @param {goog.ui.ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the button; defaults to {@link goog.ui.NativeButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @inheritDoc
 */
kinyelo.ui.Button = function(opt_content, opt_renderer, opt_domHelper) {
    goog.ui.Button.call(this, opt_content, opt_renderer, opt_domHelper);
}
goog.inherits(kinyelo.ui.Button, goog.ui.Button);
goog.ui.registry.setDefaultRenderer(kinyelo.ui.Button, kinyelo.ui.ButtonRenderer);


/**
 * Generator for unique IDs.
 * @type {kinyelo.ui.IdGenerator}
 * @private
 */
kinyelo.ui.Button.prototype.customIdGenerator_ = kinyelo.ui.IdGenerator.getInstance();

/**
 * @inheritDoc
 */
kinyelo.ui.Button.prototype.makeId = function(idFragment) {
    return "k-button-" + idFragment + "-" + this.getId();
};


/**
 * Gets the unique ID for the instance of this component.  If the instance
 * doesn't already have an ID, generates one on the fly.
 * @return {string} Unique component ID.
 */
kinyelo.ui.Button.prototype.getId = function() {
    return this.id_ || (this.id_ = this.customIdGenerator_.getNextUniqueId());
};