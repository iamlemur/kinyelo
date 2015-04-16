

/**
 * @fileoverview Generator for unique element IDs.
 *
 */

goog.provide('kinyelo.ui.IdGenerator');



/**
 * Creates a new id generator.
 * @constructor
 * @final
 */
kinyelo.ui.IdGenerator = function() {
};
goog.addSingletonGetter(kinyelo.ui.IdGenerator);


/**
 * Next unique ID to use
 * @type {number}
 * @private
 */
kinyelo.ui.IdGenerator.prototype.nextId_ = 0;

/**
 * Generator for unique IDs.
 * @type {goog.ui.IdGenerator}
 * @private
 */
goog.ui.Component.prototype.idGenerator_ = goog.ui.IdGenerator.getInstance();


/**
 * Gets the next unique ID.
 * @return {string} The next unique identifier.
 */
kinyelo.ui.IdGenerator.prototype.getNextUniqueId = function() {
    return (this.nextId_++).toString(36);
};
