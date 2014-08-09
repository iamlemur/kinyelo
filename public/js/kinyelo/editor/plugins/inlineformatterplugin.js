goog.provide('kinyelo.editor.plugins.InlineFormatter');

goog.require('kinyelo.editor');
goog.require('goog.editor.plugins.BasicTextFormatter');
goog.require('goog.editor.node');
goog.require('goog.debug.Logger');


/**
 * Plugin to wrap the selected text with an inline tag
 * @constructor
 * @extends {goog.editor.Plugin}
 */
kinyelo.editor.plugins.InlineFormatter = function() {
    this.tag_ = null;
    goog.editor.Plugin.call(this);
}
goog.inherits(kinyelo.editor.plugins.InlineFormatter, goog.editor.Plugin);

/** @override */
kinyelo.editor.plugins.InlineFormatter.prototype.getTrogClassId = function() {
    return 'InlineFormatter';
}

/**
 * Logging object.
 * @type {goog.debug.Logger}
 * @protected
 * @override
 */
kinyelo.editor.plugins.InlineFormatter.prototype.logger =
    goog.debug.Logger.getLogger('kinyelo.editor.plugins.InlineFormatter');

/**
 * Commands implemented by this plugin.
 * @enum {string}
 */
kinyelo.editor.plugins.InlineFormatter.COMMAND = {
    STRONG: '+insertStrong',
    EM: '+insertEm'
};

/**
 * Tags mapped to commands in this plugin.
 * @enum {string}
 */
kinyelo.editor.plugins.InlineFormatter.TAGS = {
    STRONG: goog.dom.TagName.STRONG,
    EM: goog.dom.TagName.EM
};

/**
 * Inverse map of execCommand strings to
 * {@link goog.editor.plugins.BasicTextFormatter.COMMAND} constants. Used to
 * determine whether a string corresponds to a command this plugin
 * handles in O(1) time.
 * @type {Object}
 * @private
 */
kinyelo.editor.plugins.InlineFormatter.SUPPORTED_COMMANDS_ =
    goog.object.transpose(kinyelo.editor.plugins.InlineFormatter.COMMAND);


/**
 * Whether the string corresponds to a command this plugin handles.
 * @param {string} command Command string to check.
 * @return {boolean} Whether the string corresponds to a command
 *     this plugin handles.
 * @override
 */
kinyelo.editor.plugins.InlineFormatter.prototype.isSupportedCommand = function(command) {
    return command in kinyelo.editor.plugins.InlineFormatter.SUPPORTED_COMMANDS_;
}

/**
 * @type {string}
 * @private
 */
kinyelo.editor.plugins.InlineFormatter.prototype.tag_ = null;

/**
 * Set the tag we are using to execute the requested command
 * @param {string} command The command corresponding to the tag
 */
kinyelo.editor.plugins.InlineFormatter.prototype.setTag = function(command) {
    switch(command) {
        case kinyelo.editor.plugins.InlineFormatter.COMMAND.STRONG:
            this.tag_ = kinyelo.editor.plugins.InlineFormatter.TAGS.STRONG;
            break;
        case kinyelo.editor.plugins.InlineFormatter.COMMAND.EM:
            this.tag_ = kinyelo.editor.plugins.InlineFormatter.TAGS.EM;
            break;
        default:
            break;
    }
}

/**
 * Get the tag we are using to execute the requested command
 * @return {string}
 */
kinyelo.editor.plugins.InlineFormatter.prototype.getTag = function () {
    return this.tag_;
}


kinyelo.editor.plugins.InlineFormatter.prototype.execCommandInternal = function(command) {
    this.setTag(command);
    switch(command) {
        case kinyelo.editor.plugins.InlineFormatter.COMMAND.STRONG:
            this.inlineFormatFix_(command, true);
            this.getFieldObject().execCommand(goog.editor.plugins.BasicTextFormatter.COMMAND.BOLD);
            this.inlineFormatFix_(command, false);
            break;
        case kinyelo.editor.plugins.InlineFormatter.COMMAND.EM:
            this.inlineFormatFix_(command, true);
            this.getFieldObject().execCommand(goog.editor.plugins.BasicTextFormatter.COMMAND.ITALIC);
            this.inlineFormatFix_(command, false);
            break;
        default:
            break;
    }
}


/** @inheritDoc */
kinyelo.editor.plugins.InlineFormatter.prototype.handleKeyboardShortcut = function(e, key, isModifierPressed) {
    if(isModifierPressed && key == 'b') {
        this.getFieldObject().execCommand(kinyelo.editor.plugins.InlineFormatter.COMMAND.STRONG);
        return true;
    }
    if(isModifierPressed && key == 'i') {
        this.getFieldObject().execCommand(kinyelo.editor.plugins.InlineFormatter.COMMAND.EM);
        return true;
    }
    return false;
}

/** @inheritDoc */
kinyelo.editor.plugins.InlineFormatter.prototype.queryCommandValue = function(command) {
    this.setTag(command);
    var range = this.getFieldObject().getRange();
    var container = range && range.getContainer();
    var ancestor = goog.dom.getAncestorByTagNameAndClass(container, this.getTag());
    return !!ancestor;
}


/**
 * @param {kinyelo.editor.plugins.BasicTextFormatter.COMMAND|string} command A command key.
 * @param {!boolean} is_pre Is this preformat or post-?
 * @private
 */
kinyelo.editor.plugins.InlineFormatter.prototype.inlineFormatFix_ = function(command, is_pre) {
    var oldTag = null;
    var newTag = null;
    switch(command) {
        case kinyelo.editor.plugins.InlineFormatter.COMMAND.EM:
            oldTag = is_pre ? goog.dom.TagName.EM : goog.dom.TagName.I;
            newTag = is_pre ? goog.dom.TagName.I : goog.dom.TagName.EM;
            break;
        case kinyelo.editor.plugins.InlineFormatter.COMMAND.STRONG:
            oldTag = is_pre ? goog.dom.TagName.STRONG : goog.dom.TagName.B;
            newTag = is_pre ? goog.dom.TagName.B : goog.dom.TagName.STRONG;
            break;
    }
    var range = this.getFieldObject().getRange();
    var container = range.getContainer();
    var savedRange = goog.editor.range.saveUsingNormalizedCarets(range);
    var iterFunction = function(node) {
        return range.containsNode(node, true) && node.tagName == oldTag;
    }
    var nodes = goog.dom.findNodes(container, iterFunction);
    if(goog.array.isEmpty(nodes) && container.tagName == oldTag) {
        nodes.push(container);
    }
    var replaceFunction = function(node) {
        var newNode = goog.dom.createDom(newTag);
        goog.dom.insertSiblingBefore(newNode, node);
        goog.dom.append(newNode, node.childNodes);
        goog.dom.removeNode(node);
    }
    goog.array.forEach(nodes, replaceFunction);
    savedRange.restore().select();
    goog.editor.range.expand(this.getFieldObject().getRange());
}