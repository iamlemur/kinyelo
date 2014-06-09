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