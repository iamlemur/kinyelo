goog.provide('kinyelo.Editor');
goog.provide('kinyelo.editor.plugins.StrongPlugin');

goog.require('goog.dom');
goog.require('goog.dom.NodeIterator');
goog.require('goog.dom.TagIterator');
goog.require('goog.editor.Command');
goog.require('goog.editor.node');
goog.require('goog.editor.ContentEditableField');
goog.require('goog.editor.plugins.BasicTextFormatter');
goog.require('goog.editor.plugins.EnterHandler');
goog.require('goog.editor.plugins.ListTabHandler');
goog.require('goog.editor.plugins.LoremIpsum');
goog.require('goog.editor.plugins.RemoveFormatting');
goog.require('goog.editor.plugins.SpacesTabHandler');
goog.require('goog.editor.plugins.UndoRedo');
goog.require('goog.editor.plugins.TagOnEnterHandler');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.editor.DefaultToolbar');
goog.require('goog.ui.editor.ToolbarController');


/**
 * Plugin to wrap the selected text with a <strong> tag
 * @constructor
 * @extends {goog.editor.Plugin}
 */
kinyelo.editor.plugins.StrongPlugin = function() {
    goog.editor.Plugin.call(this);
}
goog.inherits(kinyelo.editor.plugins.StrongPlugin, goog.editor.Plugin);

/** @inheritDoc */
kinyelo.editor.plugins.StrongPlugin.prototype.getTrogClassId = function() {
    return 'StrongPlugin';
}

/** Command implemented by the plugin
 * @type {string}
 */
kinyelo.editor.plugins.StrongPlugin.COMMAND = 'insertStrong';

/** @inheritDoc */
kinyelo.editor.plugins.StrongPlugin.prototype.isSupportedCommand = function(command) {
    return command == kinyelo.editor.plugins.StrongPlugin.COMMAND;
}

/** @inheritDoc */
kinyelo.editor.plugins.StrongPlugin.prototype.execCommandInternal = function(command) {

    var range = goog.editor.range.expand(this.getFieldObject().getRange());
    var savedRange = goog.editor.range.saveUsingNormalizedCarets(range);
    range = savedRange.toAbstractRange();
//    var newRange = savedRange.toAbstractRange();

    if(!range.isCollapsed()) {

        var bFlatten = false;

        //get the deepest points of the range
        //only check for parent because otherwise, full inline element is included by expanding above
        //if toggling on, we create a new range with them in to merge adjacent same nodes, effectively
        //otherwise, we split the subtree
        var predicateFunc = function(parentNode) {
            return parentNode.tagName == goog.dom.TagName.STRONG;
        }

        var startNode = savedRange.getCaret(true);
        var startAncestor = goog.editor.node.findHighestMatchingAncestor(startNode, predicateFunc);
        //if start node is descendant of strong tag
        if(!goog.isNull(startAncestor)) {
            //split the start node's strong ancestor
            //var node = this.getFieldDomHelper().createTextNode('');
            //goog.dom.insertSiblingBefore(node, startNode);
            //var startSubtree = goog.editor.node.splitDomTreeAt(node, startNode, startAncestor);
            var startSubtree = goog.editor.node.splitDomTreeAt(startNode, startNode, startAncestor);
            goog.dom.insertSiblingAfter(startSubtree, startAncestor);
            range = goog.editor.range.expand(range);
            bFlatten = true;
        } else {
            //if it is null, make sure we don't need to merge a neighboring sibling
            var prevSibling = goog.editor.node.getPreviousSibling(startNode);
            if(prevSibling.tagName == goog.dom.TagName.STRONG) {
                var node = this.getFieldDomHelper().createTextNode('');
                goog.dom.insertSiblingBefore(node, prevSibling);
                range.moveToNodes(node, node.length, range.getFocusNode(), range.getFocusOffset());
            }
        }

        var endNode = savedRange.getCaret();
        var endAncestor = goog.editor.node.findHighestMatchingAncestor(endNode, predicateFunc);
        //if end node is descendant of strong tag
        if(!goog.isNull(endAncestor)) {
            //if we are not toggling the inline format off (flattening)
            //then we need to include the ancestor instead of splitting the ancestor to remove formatting
            if(!bFlatten) {
                var node = this.getFieldDomHelper().createTextNode('');
                goog.dom.insertSiblingAfter(node, endAncestor);
                range.moveToNodes(range.getAnchorNode(), range.getAnchorOffset(), node, node.length);
            } else {
                //split the end node's strong ancestor
                var node = this.getFieldDomHelper().createTextNode('');
                goog.dom.insertSiblingAfter(node, endNode);
                var endSubtree = goog.editor.node.splitDomTreeAt(endNode, node, endAncestor);
                goog.dom.insertSiblingAfter(endSubtree, endAncestor);
                range = goog.editor.range.expand(range);
            }
        } else {
            //if it is null, make sure we don't need to merge a neighboring sibling
            var nextSibling = goog.editor.node.getNextSibling(endNode);
            if(nextSibling.tagName == goog.dom.TagName.STRONG) {
                var node = this.getFieldDomHelper().createTextNode('');
                goog.dom.insertSiblingBefore(node, nextSibling);
                range.moveToNodes(node, node.length, range.getFocusNode(), range.getFocusOffset());
            }
        }
        range = goog.editor.range.expand(range);

        //flatten all strong nodes in range
        var container = range.getContainer();
        //get block ancestor
        goog.editor.range.normalizeNode(container);
        if(!goog.editor.node.isBlockTag(container)) {
            container = goog.dom.getAncestor(container, goog.editor.node.isBlockTag);
        }

        if(goog.editor.range.intersectsTag(range, goog.dom.TagName.STRONG)) {
            var nodes = goog.dom.findNodes(container, goog.editor.node.isImportant);
            goog.array.forEach(nodes, function(node) {
                if(node.tagName == goog.dom.TagName.STRONG && this.containsNode(node)) {
                    goog.dom.flattenElement(node);
                }
            }, range);
        }

        if(!bFlatten) {

            var formattableNodes = [];
            formattableNodes = goog.dom.findNodes(container, kinyelo.editor.isInlineFormattable);
            if(!formattableNodes.length) {
                formattableNodes.push(container);
            }

            goog.array.forEach(formattableNodes, function(node) {
                if(this.containsNode(node)) {
                    //if block node is fully contained
                    var newNode = goog.dom.createDom(goog.dom.TagName.STRONG, null, node.childNodes);
                    goog.dom.append(node, newNode);
                } else if(this.containsNode(node, true)) {
                    //else if block node is partially contained
                    //get all text ranges
                    var textNodes = goog.dom.findNodes(node, kinyelo.editor.isTextNode);
                    goog.array.forEach(textNodes, function(textNode) {
                        //if the textNode is completely in the range and the parent is not
                        if(this.containsNode(textNode) && !goog.editor.node.isBlockTag(textNode.parentNode) && !this.containsNode(textNode.parentNode)) {
                            var newNode = goog.dom.createDom(goog.dom.TagName.STRONG);
                            goog.dom.insertSiblingBefore(newNode, textNode);
                            goog.dom.append(newNode, textNode);
                        }
                    }, this);

                    var childNode = goog.editor.node.getFirstChild(node);
                    console.log(childNode);
                    var childNodes = [];
                    while(!goog.isNull(childNode)) {
                        if(this.containsNode(childNode)) {
                            childNodes.push(childNode);
                        }
                        childNode = goog.editor.node.getNextSibling(childNode);
                    }
                    console.log(childNodes);
                    if(!goog.array.isEmpty(childNodes)) {
                        var newNode = goog.dom.createDom(goog.dom.TagName.STRONG);
                        goog.dom.insertSiblingBefore(newNode, childNodes[0]);
                        goog.dom.append(newNode, childNodes);
                    }

                }
            }, range);

        }

        goog.editor.range.normalizeNode(container);

        savedRange.restore().select();

/*

        goog.array.forEach(formattableNodes, function(node) {
            if(this.containsNode(node)) {
                //if block node is fully contained
                var newNode = goog.dom.createDom(goog.dom.TagName.STRONG, null, node.getChildren());
                goog.dom.replaceNode(newNode, node);
            } else if(this.containsNode(node, true)) {
                //else if block node is partially contained
                //right now wrapping text ranges, but need to wrap the full partial (docfrag?) bc might contain em

                var textNodes = goog.dom.findNodes(node, kinyelo.editor.isTextNode);
                goog.array.forEach(textNodes, function(textNode) {
                    if(newRange.containsNode(textNode)) {
                        var index = goog.editor.node.findInChildren(textNode.parentNode, function(node) { return node == textNode; });
                        var parentNode = textNode.parentNode;
                        if(!goog.isNull(index)) {
                            var newNode = goog.dom.createDom(goog.dom.TagName.STRONG, null, textNode);
                            goog.dom.insertChildAt(parentNode, newNode, index);
                        }
                    }
                });
            }
        }, newRange);

        savedRange.restore().select();*/
    } else {
        //create a new strong element
        //insert at cursor
        //place cursor inside
    }


}

//subclass the contenteditablefield so we can store range to use in instance methods

kinyelo.editor.isTextNode = function(node) {
    return node.nodeType == goog.dom.NodeType.TEXT;
}

kinyelo.editor.isTextyNode = function(node) {
    return node.nodeType == goog.dom.NodeType.TEXT;
}

kinyelo.editor.isInlineFormattable = function(node) {
    return goog.array.indexOf([goog.dom.TagName.P, goog.dom.TagName.LI, goog.dom.TagName.LI], node.tagName) != -1;
}
kinyelo.editor.isInlineElement = function(node) {
    return goog.array.indexOf([goog.dom.TagName.STRONG, goog.dom.TagName.EM], node.tagName) != -1;
}
kinyelo.editor.isTextOrInlineNode = function(node) {
    return (!kinyelo.editor.isInlineElement(node.parentNode) && node.nodeType == goog.dom.NodeType.TEXT) ||
        kinyelo.editor.isInlineElement(node);
}
kinyelo.editor.isTranferrableNode = function(node) {
    //only fully contained text nodes and partially contained element nodes, which will need to be recreated
    return goog.editor.node.isImportant(node) &&
        !goog.editor.node.isBlockTag(node) &&
        (node.nodeType == goog.dom.NodeType.ELEMENT && this.containsNode(node, true)) &&
        (node.nodeType == goog.dom.NodeType.TEXT && this.containsNode(node));
}

/** @inheritDoc */
kinyelo.editor.plugins.StrongPlugin.prototype.handleKeyboardShortcut = function(e, key, isModifierPressed) {
    if(isModifierPressed && key == 'b') {
        this.getFieldObject().execCommand(kinyelo.editor.plugins.StrongPlugin.COMMAND);
        return true;
    }
    return false;
}

/** @inheritDoc */
kinyelo.editor.plugins.StrongPlugin.prototype.queryCommandValue = function(command) {
    var range = this.getFieldObject().getRange();
    var container = range && range.getContainer();
    var ancestor = goog.dom.getAncestorByTagNameAndClass(container, goog.dom.TagName.STRONG);
    return !!ancestor;
}


/**
 * Configures the editor
 * @constructor
 */
kinyelo.Editor = function() {

    var strongButton = goog.ui.editor.ToolbarFactory.makeToggleButton(kinyelo.editor.plugins.StrongPlugin.COMMAND, 'Bold', 'Bold');
    strongButton.queryable = true;

    /**
     * Array of editor plugins
     * @type {Array.<string>}
     * @private
     */
    this.buttons_ = [
        strongButton
    ];


    /**
     * Element of the editable area's container (including headings)
     * @type {Element}
     * @private
     */
    this.parentElement_ = /** @type {!Element} */ (goog.dom.getElement(kinyelo.Editor.CONTAINER_ID_));

    var dom = goog.dom.getDomHelper(this.parentElement_);

    /**
     * Element of the main editable body
      * @type {!Element}
     * @private
     */
    this.editableElement_ = dom.createDom(goog.dom.TagName.DIV, {id: kinyelo.Editor.POST_CONTAINER_ID_});

    /**
     * the toolbar element
     * @type {!Element}
     * @private
     */
    this.toolbarElement_ = dom.createDom(goog.dom.TagName.DIV, {id: kinyelo.Editor.TOOLBAR_CONTAINER_ID_});

    /**
     * The toolbar for the rich text editor
     * @type {!goog.ui.Toolbar}
     * @protected
     */
    this.toolbar = goog.ui.editor.DefaultToolbar.makeToolbar(this.buttons_, this.toolbarElement_);
/*
    var customRenderer = goog.ui.ContainerRenderer.getCustomRenderer(goog.ui.ContainerRenderer, 'k-toolbar');
    this.toolbar.setRenderer(customRenderer);
*/
    this.parentElement_.appendChild(this.editableElement_);
    this.parentElement_.appendChild(this.toolbarElement_);


    /**
     * The field where editing occurs
     * @type {goog.editor.ContentEditableField}
     * @protected
     */
    this.opus = new goog.editor.ContentEditableField(kinyelo.Editor.POST_CONTAINER_ID_);

    /**
     * The toolbar controller
     * @type {goog.ui.editor.ToolbarController}
     * @protected
     */
    this.toolbarController = new goog.ui.editor.ToolbarController(this.opus, this.toolbar);

    this.initEditor_();
};
goog.exportSymbol('kinyelo.Editor', kinyelo.Editor);


/**
 * @type {string}
 * @private
 */
kinyelo.Editor.CONTAINER_ID_ = 'opus';
/**
 * @type {string}
 * @private
 */
kinyelo.Editor.POST_CONTAINER_ID_ = 'post-body';
/**
 * @type {string}
 * @private
 */
kinyelo.Editor.TOOLBAR_CONTAINER_ID_ = 'rte-toolbar';



/**
 * Initializes the editor in the DOM
 * @private
 */

kinyelo.Editor.prototype.initEditor_ = function() {
    this.opus.registerPlugin(new kinyelo.editor.plugins.StrongPlugin());
    //this.opus.registerPlugin(new goog.editor.plugins.BasicTextFormatter());
    this.opus.registerPlugin(new goog.editor.plugins.RemoveFormatting());
    this.opus.registerPlugin(new goog.editor.plugins.UndoRedo());
    this.opus.registerPlugin(new goog.editor.plugins.ListTabHandler());
    this.opus.registerPlugin(new goog.editor.plugins.SpacesTabHandler());
    this.opus.registerPlugin(new goog.editor.plugins.EnterHandler());
    this.opus.registerPlugin(new goog.editor.plugins.TagOnEnterHandler(goog.dom.TagName.P));
    this.opus.registerPlugin(new goog.editor.plugins.LoremIpsum('Click here to edit'));
    //this.opus.registerPlugin(new goog.editor.plugins.LinkDialogPlugin());
    //this.opus.setHtml(false, '<section><p><br /></p></section>', true, false);
    this.opus.makeEditable();
};

(function() {
    var rte = new kinyelo.Editor();
})();






/*



 kinyelo.editor.isCharacterDataNode = function(node) {
 var t = node.nodeType;
 return t == 3 || t == 4 || t == 8 ; // Text, CDataSection or Comment
 }

 kinyelo.editor.splitDataNode = function(node, index) {
 var newNode = node.cloneNode(false);
 newNode.deleteData(0, index);
 node.deleteData(index, node.length - index);
 goog.dom.insertSiblingAfter(newNode, node);
 return newNode;
 }

 kinyelo.editor.getNodeIndex = function(node) {
 var i = 0;
 while( (node = node.previousSibling) ) {
 i++;
 }
 return i;
 }
 kinyelo.editor.splitBoundaries = function(range) {
 var sc = range.getStartNode(), so = range.getStartOffset(), ec = range.getEndNode(), eo = range.getEndOffset();
 var startEndSame = (sc === ec);

 if (kinyelo.editor.isCharacterDataNode(ec) && eo > 0 && eo < ec.length) {
 kinyelo.editor.splitDataNode(ec, eo);

 }

 if (kinyelo.editor.isCharacterDataNode(sc) && so > 0 && so < sc.length) {

 sc = kinyelo.editor.splitDataNode(sc, so);
 if (startEndSame) {
 eo -= so;
 ec = sc;
 } else if (ec == sc.parentNode && eo >= kinyelo.editor.getNodeIndex(sc)) {
 eo++;
 }
 so = 0;

 }
 return goog.dom.Range.createFromNodes(sc, so, ec, eo);
 }



 kinyelo.editor.isFormattableNode = function(node) {
 return goog.editor.node.isEditable(node)
 && !goog.isNull(goog.style.getVisibleRectForElement(node))
 && (node.nodeType == Node.TEXT_NODE
 || (node.tagName == goog.node.TagName.IMG || node.TagName == goog.node.TagName.BR));
 }

 kinyelo.editor.setSelectionValue = function(command, newValue) {
 if(!goog.array.some(kinyelo.editor.getAllEffectivelyContainedNodes(this.getFieldObject().getRange()), kinyelo.editor.isFormattableNode)) {

 }
 }

 kinyelo.editor.isBefore = function(node1, node2) {
 return Boolean(node1.compareDocumentPosition(node2) & Node.DOCUMENT_POSITION_FOLLOWING);
 }

 kinyelo.editor.nextNode = function(node) {
 if (node.hasChildNodes()) {
 return node.firstChild;
 }
 return kinyelo.editor.nextNodeDescendants(node);
 }

 kinyelo.editor.nextNodeDescendants = function(node) {
 while (node && !node.nextSibling) {
 node = node.parentNode;
 }
 if (!node) {
 return null;
 }
 return node.nextSibling;
 }

 kinyelo.editor.getAllEffectivelyContainedNodes = function(range, condition) {
 if (!goog.isDef(condition)) {
 condition = goog.functions.TRUE;
 }
 var node = range.getContainer();

 var stop = goog.editor.node.getNextSibling(node);

 var nodeList = [];
 while (isBefore(node, stop)) {
 if (isEffectivelyContained(node, range)
 && condition(node)) {
 nodeList.push(node);
 }
 node = nextNode(node);
 }
 return nodeList;
 }

 kinyelo.editor.getPosition = function(nodeA, offsetA, nodeB, offsetB) {
 // "If node A is the same as node B, return equal if offset A equals offset
 // B, before if offset A is less than offset B, and after if offset A is
 // greater than offset B."
 var order = goog.dom.compareNodeOrder(nodeA, nodeB);
 if (order == 0) {
 if (offsetA == offsetB) {
 return 0;
 }
 if (offsetA < offsetB) {
 return -1;
 }
 if (offsetA > offsetB) {
 return 1;
 }
 }
 return order;

 }

 kinyelo.editor.getNodeLength = function(node) {
 switch (node.nodeType) {
 case Node.PROCESSING_INSTRUCTION_NODE:
 case Node.DOCUMENT_TYPE_NODE:
 return 0;

 case Node.TEXT_NODE:
 case Node.COMMENT_NODE:
 return node.length;

 default:
 return node.childNodes.length;
 }
 }

 kinyelo.editor.isEffectivelyContained = function(node, range) {
 if (range.isCollapsed()) {
 return false;
 }

 // "node is contained in range."
 if (range.containsNode(node)) {
 return true;
 }

 // "node is range's start node, it is a Text node, and its length is
 // different from range's start offset."
 if (node == range.getAnchorNode()
 && node.nodeType == Node.TEXT_NODE
 && kinyelo.editor.getNodeLength(node) != range.getAnchorOffset()) {
 return true;
 }

 // "node is range's end node, it is a Text node, and range's end offset is
 // not 0."
 if (node == range.getFocusNode()
 && node.nodeType == Node.TEXT_NODE
 && range.getFocusOffset() != 0) {
 return true;
 }

 // "node has at least one child; and all its children are effectively
 // contained in range; and either range's start node is not a descendant of
 // node or is not a Text node or range's start offset is zero; and either
 // range's end node is not a descendant of node or is not a Text node or
 // range's end offset is its end node's length."
 if (node.hasChildNodes()
 && [].every.call(node.childNodes, function(child) { return kinyelo.editor.isEffectivelyContained(child, range) })
 && (!goog.dom.contains(node, range.getAnchorNode())
 || range.getAnchorNode().nodeType != Node.TEXT_NODE
 || range.getAnchorOffset() == 0)
 && (!goog.dom.containes(node, range.getFocusNode())
 || range.getFocusNode().nodeType != Node.TEXT_NODE
 || range.getFocusOffset() == kinyelo.editor.getNodeLength(range.getFocusNode()))) {
 return true;
 }

 return false;
 }*/


/*

 kinyelo.editor.getNodeIndex = function(node) {
 var i = 0;
 while( (node = node.previousSibling) ) {
 i++;
 }
 return i;
 }

 kinyelo.editor.splitBoundaries = function(range) {
 //assertRangeValid(this);

 var sc = range.getAnchorNode(), so = range.getAnchorOffset(), ec = range.getFocusNode(), eo = range.getFocusOffset();
 var startEndSame = (sc === ec);

 if (kinyelo.editor.isCharacterDataNode(ec) && eo > 0 && eo < ec.length) {
 kinyelo.editor.splitDataNode(ec, eo);
 }

 if (dom.isCharacterDataNode(sc) && so > 0 && so < sc.length) {

 sc = kinyelo.editor.splitDataNode(sc, so);
 if (startEndSame) {
 eo -= so;
 ec = sc;
 } else if (ec == sc.parentNode && eo >= kinyelo.editor.getNodeIndex(sc)) {
 eo++;
 }
 so = 0;

 }
 boundaryUpdater(this, sc, so, ec, eo);
 }

 kinyelo.editor.applyToTextNode = function(textNode, tag) {
 var parent = textNode.parentNode;
 if (!(parent.childNodes.length == 1 && rangy.dom.arrayContains([tag], parent.tagName.toLowerCase()))) {
 var el = kinyelo.editor.createContainer(textNode);
 textNode.parentNode.insertBefore(el, textNode);
 el.appendChild(textNode);
 }
 }

 kinyelo.editor.createContainer = function(node, tag) {
 var domHelper = goog.dom.getDomHelper(node);
 var el = domHelper.createElement(tag);
 return el;
 }

 kinyelo.editor.applyToRange = function(range) {
 var textNodes = range.getNodes([wysihtml5.TEXT_NODE]);
 if (!textNodes.length) {
 try {
 var node = this.createContainer(range.endContainer.ownerDocument);
 range.surroundContents(node);
 this.selectNode(range, node);
 return;
 } catch(e) {}
 }

 range.splitBoundaries();
 textNodes = range.getNodes([wysihtml5.TEXT_NODE]);

 if (textNodes.length) {
 var textNode;

 for (var i = 0, len = textNodes.length; i < len; ++i) {
 textNode = textNodes[i];
 if (!this.getAncestorWithClass(textNode)) {
 this.applyToTextNode(textNode);
 }
 }

 range.setStart(textNodes[0], 0);
 textNode = textNodes[textNodes.length - 1];
 range.setEnd(textNode, textNode.length);

 if (this.normalize) {
 this.postApply(textNodes, range);
 }
 }
 }
 */