goog.provide('kinyelo.ui.annotate.Group');

goog.require('goog.ui.Control');
goog.require('goog.ui.Component.State');
goog.require('kinyelo.annotate.Anchor');
goog.require('kinyelo.ui.annotate.GroupRenderer');


/**
 *
 * @param {string} id
 * @param {kinyelo.annotate.Group} group
 * @param {kinyelo.ui.annotate.GroupRenderer=} renderer
 * @constructor
 * @extends {goog.ui.Control}
 */
kinyelo.ui.annotate.Group = function(id, group, renderer) {
    goog.base(this);
    //TODO: set the supported states, p231
    this.setSupportedState(goog.ui.Component.State.OPENED, true);
    /**
     * @type {string}
     * @private
     */
    this.contentId_ = id;
    if(!group) {
        group = new kinyelo.annotate.Anchor();
    }
    this.setModel(group);


}
goog.inherits(kinyelo.ui.annotate.Group, goog.ui.Control);

/**
 * @return {kinyelo.annotate.Group}
 * @override
 */
kinyelo.ui.annotate.Group.prototype.getModel;

/**
 * @inheritDoc
 */
kinyelo.ui.annotate.Group.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    //TODO: add listeners
}

/**
 * Gets the unique ID for the instance of this component.  If the instance
 * doesn't already have an ID, generates one on the fly.
 * @return {string} Unique component ID.
 */
kinyelo.ui.annotate.Group.prototype.getId = function() {
    return this.contentId_;
};

goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.Group, kinyelo.ui.annotate.GroupRenderer);

goog.ui.registry.setDecoratorByClassName(kinyelo.ui.annotate.GroupRenderer.CSS_CLASS,
    function() { return new kinyelo.ui.annotate.Group(); });

/**
 * @returns {string}
 */
kinyelo.ui.annotate.Group.prototype.getContentId = function() {
    return this.contentId_;
}