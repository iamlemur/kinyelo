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
 * @type {string}
 * @private
 */
kinyelo.editor.plugins.HeadingFormatter.prototype.tag_ = null;

/**
 * Get the tag we are using to execute the requested command
 * @return {string}
 */
kinyelo.editor.plugins.HeadingFormatter.prototype.getTag = function () {
    return this.tag_;
}

/**
 * Set the tag we are using to execute the requested command
 * @param {string} command The command corresponding to the tag
 */
kinyelo.editor.plugins.HeadingFormatter.prototype.setTag = function(command) {
    switch(command) {
        case kinyelo.editor.plugins.HeadingFormatter.COMMAND.H1:
            this.tag_ = kinyelo.editor.plugins.HeadingFormatter.TAGS.H1;
            break;
        case kinyelo.editor.plugins.HeadingFormatter.COMMAND.H2:
            this.tag_ = kinyelo.editor.plugins.HeadingFormatter.TAGS.H2;
            break;
        default:
            break;
    }
}

/**
 * @param {!Node} node Node to check
 */
kinyelo.editor.plugins.HeadingFormatter.isFormattable = function(range, node) {
    return range.containsNode(node, true) && goog.editor.node.isBlockTag(node);
}

/**
 * @param {!Node} node Node to convert
 */
kinyelo.editor.plugins.HeadingFormatter.prototype.formatNode = function(node) {
    var newNode = goog.dom.createDom(this.getTag());
    goog.dom.append(newNode, node.childNodes);
    goog.dom.replaceNode(newNode, node);
}


/**
 * Execute a user-initiated command.
 * @param {string} command Command to execute.
 * @override
 */
kinyelo.editor.plugins.HeadingFormatter.prototype.execCommandInternal = function(command) {
    //get the editable field
    //find all nodes that are P, LI and partially in range
    //turn into headers, splitting LIs and removing strong formats
    var range = goog.editor.range.expand(this.getFieldObject().getRange());
    var savedRange = goog.editor.range.saveUsingNormalizedCarets(range);
    var container = range.getContainer();
    if(!goog.editor.node.isBlockTag(container)) {
        container = goog.dom.getAncestor(container, goog.editor.node.isBlockTag);
    }
    var formattableNodes = [];
    formattableNodes = goog.dom.findNodes(container, goog.partial(kinyelo.editor.plugins.HeadingFormatter.isFormattable, range));
    if(!formattableNodes.length) {
        formattableNodes.push(container);
    }
    if(!this.queryCommandValue(command)) {
        this.setTag(command);
    } else {
        this.tag_ = goog.dom.TagName.P;
    }
    goog.array.forEach(formattableNodes, goog.bind(this.formatNode, this));
    savedRange.restore().select();
}

/** @inheritDoc */
kinyelo.editor.plugins.HeadingFormatter.prototype.handleKeyboardShortcut = function(e, key, isModifierPressed) {
    if(isModifierPressed && key == '1') {
        this.getFieldObject().execCommand(kinyelo.editor.plugins.HeadingFormatter.COMMAND.H1);
        return true;
    }
    if(isModifierPressed && key == '2') {
        this.getFieldObject().execCommand(kinyelo.editor.plugins.HeadingFormatter.COMMAND.H2);
        return true;
    }
    return false;
}

/** @inheritDoc */
kinyelo.editor.plugins.HeadingFormatter.prototype.queryCommandValue = function(command) {
    this.setTag(command);
    var range = this.getFieldObject().getRange();
    var container = range && range.getContainer();
    var ancestor = goog.dom.getAncestorByTagNameAndClass(container, this.getTag());
    return !!ancestor;
}