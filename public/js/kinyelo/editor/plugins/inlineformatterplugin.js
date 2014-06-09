goog.provide('kinyelo.editor.plugins.InlineFormatter');

goog.require('kinyelo.editor');
goog.require('goog.editor.node');
goog.require('goog.debug.Logger');


/**
 * Plugin to wrap the selected text with an inline tag
 * @constructor
 * @extends {goog.editor.Plugin}
 */
kinyelo.editor.plugins.InlineFormatter = function() {
    this.range_ = null;
    this.savedRange_ = null;
    this.tag_ = null;
    this.flatten_ = false;
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
 * Whether a given node matches the tag corresponding to the current command being executed.
 * @param {!string} tag The tag to check
 * @param {!Node} node Node to check the tag of
 * @return {boolean} Whether the node's tag is the tag corresponding to the command being executed.
 */
kinyelo.editor.plugins.InlineFormatter.checkTag = function(tag, node) {
    return node.tagName == tag;
}

/**
 * Flattens an element if it is completely in the current range and has the tag corresponding
 * to the command being executed.
 * @param {!string} tag Tag to check
 * @param {!goog.dom.AbstractRange} range Range to check
 * @param {!Node} node Node to check the tag of
 */
kinyelo.editor.plugins.InlineFormatter.flattenElements = function(tag, range, node) {
    if(kinyelo.editor.plugins.InlineFormatter.checkTag(tag, node) && range.containsNode(node)) {
        goog.dom.flattenElement(node);
    }
}

/**
 * Whether a given can contain an inline format tag.
 * @param {!Node} node Node to check for supporting inline format tags
 * @return {boolean} Whether the node's tag is a tag that can contain an inline format tag.
 */
kinyelo.editor.plugins.InlineFormatter.isInlineFormattable = function(node) {
    return goog.array.indexOf(kinyelo.editor.BlockFormats, node.tagName) != -1;
}

/**
 * @type {boolean}
 * @private
 */
kinyelo.editor.plugins.InlineFormatter.prototype.flatten_ = false;

/**
 * The selected range
 * @type {?goog.dom.AbstractRange}
 * @private
 */
kinyelo.editor.plugins.InlineFormatter.prototype.range_ = null;

/**
 * Set the custom range
 * @param {?goog.dom.AbstractRange} range The range to save
 */
kinyelo.editor.plugins.InlineFormatter.prototype.setCustomRange = function(range) {
    this.range_ = range;
}

/**
 * Get the custom range
 * @return {goog.dom.AbstractRange} The custom range
 */
kinyelo.editor.plugins.InlineFormatter.prototype.getCustomRange = function() {
    return this.range_;
}

/**
 * Checks a given node and if the node is completely in the current range, will wrap the child nodes
 * Otherwise, if the given node is partially contained, we will find the descendant text nodes
 * and format them if they can be otherwise retrieve a list of all child nodes that are fully contained
 * in the current range and move to a new inline format tag corresponding to the command being
 * executed
 * @param {!goog.dom.AbstractRange} range The range to check
 * @param {!string} tag Tag to use for formatting
 * @param {!Node} node Text node to wrap
 */
kinyelo.editor.plugins.InlineFormatter.prototype.formatNode = function(tag, node) {

    if(this.getCustomRange().containsNode(node)) {
        //if block node is fully contained
        var newNode = goog.dom.createDom(tag, null, node.childNodes);
        goog.dom.append(node, newNode);
    } else if(this.getCustomRange().containsNode(node, true)) {
        //else if block node is partially contained
        //get all text ranges
        var textNodes = goog.dom.findNodes(node, kinyelo.editor.isTextNode);
        goog.array.forEach(textNodes, goog.partial(kinyelo.editor.formatTextNode, this.getCustomRange(), tag));


        var childNode = goog.editor.node.getFirstChild(node);
        var childNodes = [];
        while(!goog.isNull(childNode)) {
            if(this.getCustomRange().containsNode(childNode)) {
                childNodes.push(childNode);
            }
            childNode = goog.editor.node.getNextSibling(childNode);
        }
        if(!goog.array.isEmpty(childNodes)) {
            var newNode = goog.dom.createDom(tag);
            goog.dom.insertSiblingBefore(newNode, childNodes[0]);
            goog.dom.append(newNode, childNodes);
        }

    }
}

/**
 * Checks a given node and if the node is completely in the current range, will wrap the child nodes
 * Otherwise, if the given node is partially contained, we will find the descendant text nodes
 * and format them if they can be otherwise retrieve a list of all child nodes that are fully contained
 * in the current range and move to a new inline format tag corresponding to the command being
 * executed
 * @param {!Node} node Node to merge
 */
kinyelo.editor.plugins.InlineFormatter.mergeNodes = function(node) {
    var childNode = goog.editor.node.getFirstChild(node);
    if(goog.isNull(childNode)) { return; }
    var childNodes = [];
    var lastTag = childNode.tagName;
    while(!goog.isNull(childNode)) {
        if(!kinyelo.editor.isTextNode(childNode)) {
            kinyelo.editor.plugins.InlineFormatter.mergeNodes(childNode);
        }
        if(childNode.tagName == lastTag && childNode.tagName in kinyelo.editor.plugins.InlineFormatter.TAGS) {
            childNodes.push(childNode);
        } else {
            if(childNodes.length > 1) {
                var newNode = goog.dom.createDom(lastTag);
                goog.dom.insertSiblingBefore(newNode, childNodes[0]);
                goog.dom.append(newNode, childNodes);
                goog.array.forEach(childNodes, goog.dom.flattenElement);
            }
            childNodes = [];
            childNodes.push(childNode);
        }
        lastTag = childNode.tagName;
        childNode = goog.editor.node.getNextSibling(childNode);
    }
}


/**
 * Checks a given text node and if the node is completely in the current range, is not a block tag node,
 * and its parent node is not completely in the current range, then wrap with the inline format tag
 * corresponding to the current command being executed
 * @param {!goog.dom.AbstractRange} range The range to check
 * @param {!string} tag The tag to apply
 * @param {!Node} node Text node to wrap
 */
kinyelo.editor.formatTextNode = function(range, tag, textNode) {
    //if the textNode is completely in the range and the parent is not
    if(range.containsNode(textNode)
        && !goog.editor.node.isBlockTag(textNode.parentNode)
        && !range.containsNode(textNode.parentNode)) {
        var newNode = goog.dom.createDom(tag);
        goog.dom.insertSiblingBefore(newNode, textNode);
        goog.dom.append(newNode, textNode);
    }
}

/**
 * Adjusts the current range from the beginning
 * Checks the highest ancestor matching the tag corresponding to the current command being executed
 * If an ancestor exists, we must split the DOM at this point and indicate
 * that since the range starts in a node matching the current requested inline format
 * we must flatten the selection as need to toggle it off
 * Otherwise, we also to check the previous sibling and if it matches the current tag
 * corresponding to the current command being executed, we want to include this in the range to
 * be formatted
 * @param {goog.dom.SavedCaretRange} savedRange
 * @param {string} tag
 */

kinyelo.editor.plugins.InlineFormatter.prototype.checkStartRange = function(savedRange, tag) {

    var startNode = savedRange.getCaret(true);
    if(!goog.isNull(goog.editor.node.getNextSibling(startNode)) && kinyelo.editor.plugins.InlineFormatter.checkTag(tag, goog.editor.node.getNextSibling(startNode))) {
        this.setFlatten(true);
    }
    var startAncestor = goog.dom.getAncestorByTagNameAndClass(startNode, tag);
    //if start node is descendant of strong tag
    if(!goog.isNull(startAncestor) && startAncestor.tagName == tag) {
        var startSubtree = goog.editor.node.splitDomTreeAt(startNode, startNode, startAncestor);
        goog.dom.insertSiblingAfter(startSubtree, startAncestor);
        this.setCustomRange(goog.editor.range.expand(this.getCustomRange()));
        this.setFlatten(true);
    } else {
        //if it is null, make sure we don't need to merge a neighboring sibling
        var prevSibling = goog.editor.node.getPreviousSibling(startNode);
        if(!goog.isNull(prevSibling) && kinyelo.editor.plugins.InlineFormatter.checkTag(tag, prevSibling)) {
            var node = this.getFieldDomHelper().createTextNode('');
            goog.dom.insertSiblingBefore(node, prevSibling);
            this.getCustomRange().moveToNodes(node, node.length, this.getCustomRange().getFocusNode(), this.getCustomRange().getFocusOffset());
        }
    }
}

/**
 * Adjusts the current range from the end
 * Checks the highest ancestor matching the tag corresponding to the current command being executed
 * If an ancestor exists, we check if we are flattening the selection based on examining the start of the range
 * and if we are flattening, we want to insert a new marker to end the range here and include it
 * and if we are not flattening, we want to insert a new marker after the after the caret created by
 * the saved range for splitting and split the end node's ancestor which matches the inline format tag
 * current being executed
 * Otherwise, we examine the next sibling of the end of the range for inclusion if it matches the tag
 * corresponding to the current command being executed
 * @param {goog.dom.SavedCaretRange} savedRange
 * @param {string} tag
 */
kinyelo.editor.plugins.InlineFormatter.prototype.checkEndRange = function(savedRange, tag) {

    var endNode = savedRange.getCaret();
    var endAncestor = goog.dom.getAncestorByTagNameAndClass(endNode, tag);
    //if end node is descendant of strong tag
    if(!goog.isNull(endAncestor) && endAncestor.tagName == tag) {
        var node = this.getFieldDomHelper().createTextNode('');
        if(!this.getFlatten()) {
            goog.dom.insertSiblingAfter(node, endAncestor);
            this.getCustomRange().moveToNodes(this.getCustomRange().getAnchorNode(), this.getCustomRange().getAnchorOffset(), node, node.length);
        } else {
            //split the end node's strong ancestor
            goog.dom.insertSiblingAfter(node, endNode);
            var endSubtree = goog.editor.node.splitDomTreeAt(endNode, node, endAncestor);
            goog.dom.insertSiblingAfter(endSubtree, endAncestor);
            this.setCustomRange(goog.editor.range.expand(this.getCustomRange()));
        }
    } else {
        //if it is null, make sure we don't need to merge a neighboring sibling
        var nextSibling = goog.editor.node.getNextSibling(endNode);
        if(!goog.isNull(nextSibling) && kinyelo.editor.plugins.InlineFormatter.checkTag(tag, nextSibling)) {
            var node = this.getFieldDomHelper().createTextNode('');
            goog.dom.insertSiblingBefore(node, nextSibling);
            this.getCustomRange().moveToNodes(node, node.length, this.getCustomRange().getFocusNode(), this.getCustomRange().getFocusOffset());
        }
    }

}


/**
 * Set whether we are flattening the current selection or not
 * @param {boolean} flatten Whether we are flattening the current selection or not
 */
kinyelo.editor.plugins.InlineFormatter.prototype.setFlatten = function(flatten) {
    this.flatten_ = flatten;
}

/**
 * Get whether we are flattening the current selection or not
 * @return {boolean}
 */
kinyelo.editor.plugins.InlineFormatter.prototype.getFlatten = function () {
    return this.flatten_;
}

/**
 * Execute a user-initiated command.
 * @param {string} command Command to execute.
 * @override
 */
kinyelo.editor.plugins.InlineFormatter.prototype.execCommandInternal = function(command) {

    var tag = null;
    this.setCustomRange(null);
    this.setFlatten(false);
    switch(command) {
        case kinyelo.editor.plugins.InlineFormatter.COMMAND.STRONG:
            tag = kinyelo.editor.plugins.InlineFormatter.TAGS.STRONG;
            break;
        case kinyelo.editor.plugins.InlineFormatter.COMMAND.EM:
            tag = kinyelo.editor.plugins.InlineFormatter.TAGS.EM;
            break;
        default:
            break;
    }

    this.setCustomRange(goog.editor.range.expand(this.getFieldObject().getRange()));

    if(!this.getCustomRange().isCollapsed()) {

        var savedRange = goog.editor.range.saveUsingNormalizedCarets(this.getCustomRange());
        this.setCustomRange(savedRange.toAbstractRange());

        this.checkStartRange(savedRange, tag);
        this.checkEndRange(savedRange, tag);
        this.setCustomRange(goog.editor.range.expand(this.getCustomRange()));

        //flatten all strong nodes in range
        var container = this.getCustomRange().getContainer();
        //get block ancestor
        goog.editor.range.normalizeNode(container);
        if(!goog.editor.node.isBlockTag(container)) {
            container = goog.dom.getAncestor(container, goog.editor.node.isBlockTag);
        }

        if(goog.editor.range.intersectsTag(this.getCustomRange(), tag)) {
            var nodes = goog.dom.findNodes(container, goog.editor.node.isImportant);
            goog.array.forEach(nodes, goog.partial(kinyelo.editor.plugins.InlineFormatter.flattenElements, tag, this.getCustomRange()));
        }

        if(!this.getFlatten()) {
            var formattableNodes = [];
            formattableNodes = goog.dom.findNodes(container, kinyelo.editor.plugins.InlineFormatter.isInlineFormattable);
            if(!formattableNodes.length) {
                formattableNodes.push(container);
            }
            goog.array.forEach(formattableNodes, goog.bind(this.formatNode, this, tag));
            goog.array.forEach(formattableNodes, kinyelo.editor.plugins.InlineFormatter.mergeNodes);
        }

        goog.editor.range.normalizeNode(container);
        savedRange.restore().select();


    } else {
        if(!this.getFieldObject().queryCommandValue(command)) {
            var savedRange = this.getCustomRange().saveUsingDom();
            this.getFieldObject().setInsertRange(savedRange);
        }
        /*if(!this.queryCommandValue(command)) {
         var newNode = goog.dom.createDom(tag);
         this.getCustomRange().insertNode(newNode);
         goog.editor.range.selectNodeStart(newNode);
         }*/
        //create a new strong element
        //insert at cursor
        //place cursor inside
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
    var range = this.getFieldObject().getRange();
    var container = range && range.getContainer();
    var ancestor = goog.dom.getAncestorByTagNameAndClass(container, goog.dom.TagName.STRONG);
    return !!ancestor;
}