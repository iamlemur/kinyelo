goog.provide('kinyelo.ui.Component');

goog.require('goog.ui.Component');

/**
 *
 * @param opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
kinyelo.ui.Component = function(opt_domHelper) {
    goog.ui.Component.call(this, opt_domHelper);
}
goog.inherits(kinyelo.ui.Component, goog.ui.Component);

/**
 *
 * @param {!string} id
 * @param {string} opt_fragment
 * @returns {string}
 */
kinyelo.ui.Component.generateChildId = function(id, opt_fragment) {
    return (opt_fragment || '') + id;
}