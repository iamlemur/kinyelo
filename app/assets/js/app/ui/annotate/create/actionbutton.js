goog.provide('app.ui.annotate.create.ActionButton');

goog.require('kinyelo.ui.Button');


/**
 * @param  {string} type
 * @param {goog.ui.ButtonRenderer=} opt_renderer Renderer used to render or
 *     decorate the button; defaults to {@link goog.ui.NativeButtonRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @constructor
 * @overrides
 */
app.ui.annotate.create.ActionButton = function(type, opt_renderer, opt_domHelper) {


    //TODO: type can be ControlContent so we can process and send DOM structure or just chaneg label
    kinyelo.ui.Button.call(this, type, opt_renderer, opt_domHelper);
    /**
     *
     * @type {string}
     * @private
     */
    this.type_ = type;
}
goog.inherits(app.ui.annotate.create.ActionButton, kinyelo.ui.Button);

/**
 *
 * @returns {string}
 */
app.ui.annotate.create.ActionButton.prototype.getType = function() {
    return this.type_;
}

/**
 *
 * @enum {string}
 */
app.ui.annotate.create.ActionButton.EventType = {
    CLICK: goog.events.getUniqueId('click')
}



/**
 * @inheritDoc
 */
app.ui.annotate.create.ActionButton.prototype.handleMouseUp = function(e) {
    this.dispatchEvent(goog.events.EventType.CLICK);
}

