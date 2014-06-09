goog.provide('kinyelo.editor.plugins.HeadingFormatter');

goog.require('goog.editor.node');
goog.require('goog.debug.Logger');
goog.require('kinyelo.editor');


/**
 * Plugin to wrap the selected text with a h# tag
 * @constructor
 * @extends {goog.editor.Plugin}
 */
kinyelo.editor.plugins.HeadingFormatter = function() {
    goog.editor.Plugin.call(this);
}
goog.inherits(kinyelo.editor.plugins.HeadingFormatter, goog.editor.Plugin);

/** @override */
kinyelo.editor.plugins.HeadingFormatter.prototype.getTrogClassId = function() {
    return 'HeadingFormatter';
}

/**
 * Logging object.
 * @type {goog.debug.Logger}
 * @protected
 * @override
 */
kinyelo.editor.plugins.HeadingFormatter.prototype.logger =
    goog.debug.Logger.getLogger('kinyelo.editor.plugins.HeadingFormatter');

/**
 * Commands implemented by this plugin.
 * @enum {string}
 */
kinyelo.editor.plugins.HeadingFormatter.COMMAND = {
    H1: '+heading1',
    H2: '+heading2'
};

/**
 * Tags mapped to commands in this plugin.
 * @enum {string}
 */
kinyelo.editor.plugins.HeadingFormatter.TAGS = {
    H1: goog.dom.TagName.H1,
    H2: goog.dom.TagName.H2
};

/**
 * Inverse map of execCommand strings to
 * {@link goog.editor.plugins.BasicTextFormatter.COMMAND} constants. Used to
 * determine whether a string corresponds to a command this plugin
 * handles in O(1) time.
 * @type {Object}
 * @private
 */
kinyelo.editor.plugins.HeadingFormatter.SUPPORTED_COMMANDS_ =
    goog.object.transpose(kinyelo.editor.plugins.HeadingFormatter.COMMAND);


/**
 * Whether the string corresponds to a command this plugin handles.
 * @param {string} command Command string to check.
 * @return {boolean} Whether the string corresponds to a command
 *     this plugin handles.
 * @override
 */
kinyelo.editor.plugins.HeadingFormatter.prototype.isSupportedCommand = function(command) {
    return command in kinyelo.editor.plugins.HeadingFormatter.SUPPORTED_COMMANDS_;
}


/**
 * Execute a user-initiated command.
 * @param {string} command Command to execute.
 * @override
 */
kinyelo.editor.plugins.InlineFormatter.prototype.execCommandInternal = function(command) {

}

/** @inheritDoc */
kinyelo.editor.plugins.InlineFormatter.prototype.handleKeyboardShortcut = function(e, key, isModifierPressed) {

}

/** @inheritDoc */
kinyelo.editor.plugins.InlineFormatter.prototype.queryCommandValue = function(command) {

}