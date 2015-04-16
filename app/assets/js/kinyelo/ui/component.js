goog.provide('kinyelo.ui.Component');

goog.require('goog.ui.Component');
goog.require('kinyelo.ui.IdGenerator');

/**
 *
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
kinyelo.ui.Component = function(opt_domHelper) {
    goog.ui.Component.call(this, opt_domHelper);
}
goog.inherits(kinyelo.ui.Component, goog.ui.Component);

/**
 * Generator for unique IDs.
 * @type {kinyelo.ui.IdGenerator}
 * @private
 */
kinyelo.ui.Component.prototype.customIdGenerator_ = kinyelo.ui.IdGenerator.getInstance();

/**
 *
 * @param {!string} id
 * @param {string} opt_fragment
 * @returns {string}
 */
kinyelo.ui.Component.generateChildId = function(id, opt_fragment) {
    return (opt_fragment || '') + id;
}

/**
 * @inheritDoc
 */
kinyelo.ui.Component.prototype.makeId = function(idFragment) {
    return "k-" + idFragment + "-" + this.getId();
};

/**
 * Gets the unique ID for the instance of this component.  If the instance
 * doesn't already have an ID, generates one on the fly.
 * @return {string} Unique component ID.
 */
kinyelo.ui.Component.prototype.getId = function() {
    return this.id_ || (this.id_ = this.customIdGenerator_.getNextUniqueId());
};