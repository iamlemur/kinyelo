goog.provide('kinyelo.editor.DelayedCommand');


/**
 * @param {!string} command The command to execute
 * @param {!goog.dom.AbstractRange} range The range where the command was executed
 * @constructor
 */
kinyelo.editor.DelayedCommand = function(command, range) {
    /**
     * @type {string}
     * @private
     */
    this.command_ = command;
    /**
     * @type {goog.dom.AbstractRange}
     * @private
     */
    this.range_ = range;
}



/**
 * @returns {string}
 */
kinyelo.editor.DelayedCommand.prototype.getCommand = function() {
    return this.command_;
}

/**
 * @returns {goog.dom.AbstractRange}
 */
kinyelo.editor.DelayedCommand.prototype.getRange = function() {
    return this.range_;
}