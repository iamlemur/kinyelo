goog.provide('kinyelo.editor');

goog.require('goog.dom');

/**
 * Tags of elements that can contain inline format tags.
 * @enum {string}
 */
kinyelo.editor.BlockFormats = [
    goog.dom.TagName.P,
    goog.dom.TagName.LI
];

/**
 * Whether a given node is a text node.
 * @param {!Node} node Node to check the type of
 * @return {boolean} Whether a given node is a text node.
 */
kinyelo.editor.isTextNode = function(node) {
    return node.nodeType == goog.dom.NodeType.TEXT;
}

/**
 * Whether two ranges are equal
 * @param {!goog.dom.AbstractRange} range1 First range to compare
 * @param {!goog.dom.AbstractRange} range2 Second range to compare
 * @return {boolean} Whether the two given ranges are equal.
 */
kinyelo.editor.isEqualRanges = function(range1, range2) {
    return range1.getAnchorNode() == range2.getAnchorNode()
        && range1.getFocusNode() == range2.getFocusNode()
        && range1.getAnchorOffset() == range2.getAnchorOffset()
        && range1.getFocusOffset() == range2.getFocusOffset();
}

/**
 * Whether a given node matches the tag corresponding to the current command being executed.
 * @param {!string} tag The tag to check
 * @param {!Node} node Node to check the tag of
 * @return {boolean} Whether the node's tag is the tag corresponding to the command being executed.
 */
kinyelo.editor.checkTag = function(tag, node) {
    return node.tagName == tag;
}

/**
 * Flattens an element if it is completely in the current range and has the tag corresponding
 * to the command being executed.
 * @param {!string} tag Tag to check
 * @param {!goog.dom.AbstractRange} range Range to check
 * @param {!Node} node Node to check the tag of
 */
kinyelo.editor.flattenElements = function(tag, range, node) {
    if(kinyelo.editor.checkTag(tag, node) && range.containsNode(node)) {
        goog.dom.flattenElement(node);
    }
}

/**
 * String that matches a single BR tag or NBSP surrounded by non-breaking
 * whitespace
 * @type {string}
 * @private
 */
kinyelo.editor.BrOrNbspSurroundedWithWhiteSpace_ =
    '[\t\n\r ]*(<br[^>]*\/?>|&nbsp;)[\t\n\r ]*';

/**
 * String that matches a single BR tag or NBSP surrounded by non-breaking
 * whitespace
 * @type {RegExp}
 */
kinyelo.editor.emptyNodeRegExp = new RegExp('^' +
    kinyelo.editor.BrOrNbspSurroundedWithWhiteSpace_ +
    '$');