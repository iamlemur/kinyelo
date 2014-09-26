goog.provide('kinyelo.ui.annotate.MarkerContainer');

goog.require('kinyelo.ui.annotate.MarkerContainerRenderer');
goog.require('goog.ui.Container');
goog.require('goog.events');
goog.require('kinyelo.events.annotations');
goog.require('kinyelo.ui.Container');
goog.require('kinyelo.ui.annotate.Marker');

/**
 *
 * @constructor
 * @extends {kinyelo.ui.Container}
 */
kinyelo.ui.annotate.MarkerContainer = function() {
    goog.base(this, goog.ui.Container.Orientation.VERTICAL, kinyelo.ui.annotate.MarkerContainerRenderer.getInstance());
    this.setFocusable(false);
    this.markers = {};
}
goog.inherits(kinyelo.ui.annotate.MarkerContainer, kinyelo.ui.Container);



/**
 * @return {null}
 * @override
 */
kinyelo.ui.annotate.MarkerContainer.prototype.getModel;

/**
 * @type {string}
 */
kinyelo.ui.annotate.MarkerContainer.CONTAINER_ID = 'annotation-markers';

/**
 * @type {Object}
 */
kinyelo.ui.annotate.MarkerContainer.prototype.markers;

/**
 *
 * @param e {goog.events.Event}
 * @public
 */
kinyelo.ui.annotate.MarkerContainer.prototype.handleNewAnnotation = function(e) {

    /** @type {kinyelo.ui.annotate.Marker} */
    var target = e.target;
    /** @type {string} */
    var anchor = e.target.getModel().anchor;
    var marker;
    if(!goog.object.containsKey(this.markers, anchor)) {
        marker = new kinyelo.ui.annotate.Marker(anchor);
        goog.object.add(this.markers, anchor, marker);
        console.log('adding child');
        this.addChild(marker, true);
    } else {
        marker = goog.object.get(this.markers, anchor);
        console.log('updating count');
        marker.updateCount();
    }

}




goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.MarkerContainer, kinyelo.ui.annotate.MarkerContainerRenderer);

goog.ui.registry.setDecoratorByClassName(kinyelo.ui.annotate.MarkerContainerRenderer.CSS_CLASS,
    function() { return new kinyelo.ui.annotate.MarkerContainer(); });


/**
 *
 * @param e {goog.events.Event}
 * @private
 */
/*kinyelo.Post.prototype.handleHover_ = function(e) {
    this.usingLorem = this.usingLorem ? this.field_.queryCommandValue(goog.editor.Command.USING_LOREM) : this.usingLorem;
    if(!this.usingLorem) {
        var node = goog.editor.node.findHighestMatchingAncestor(e.target, this.isAnnotatableNode_);
        if(!goog.isNull(node)) {
            if(!goog.isDef(this.focusedNode)) {
                this.focusedNode = node;
                this.highlightMarker(this.focusedNode.id);
            } else {
                if(this.focusedNode != node) {
                    this.highlightMarker(this.focusedNode.id, true);
                    this.focusedNode = node;
                    this.highlightMarker(this.focusedNode.id);
                }
            }
        }
    }
}*/

/**
 * @type {Array}
 */
//kinyelo.ui.annotate.MarkerContainer.prototype.nodeList;

/**
 * @type {Object}
 */

//kinyelo.ui.annotate.MarkerContainer.prototype.markers;

/**
 * @type {Node=}
 */
//kinyelo.ui.annotate.MarkerContainer.prototype.focusedNode;

/**
 *
 * @param {!goog.events.Event} e
 * @private
 */
/*kinyelo.ui.annotate.MarkerContainer.prototype.handleDelayedChange_ = function(e) {
    this.updateMarkers();
}*/

/**
 *
 * @type {boolean}
 */
//kinyelo.ui.annotate.MarkerContainer.prototype.usingLorem = true;


/**
 *
 * @param {goog.events.Event} e
 * @private
 */
/*kinyelo.ui.annotate.MarkerContainer.prototype.handleHover_ = function(e) {
    this.usingLorem = this.usingLorem ? this.field_.queryCommandValue(goog.editor.Command.USING_LOREM) : this.usingLorem;
    if(!this.usingLorem) {
        var node = goog.editor.node.findHighestMatchingAncestor(e.target, this.isAnnotatableNode_);
        if(!goog.isNull(node)) {
            if(!goog.isDef(this.focusedNode)) {
                this.focusedNode = node;
                this.highlightMarker(this.focusedNode.id);
            } else {
                if(this.focusedNode != node) {
                    this.highlightMarker(this.focusedNode.id, true);
                    this.focusedNode = node;
                    this.highlightMarker(this.focusedNode.id);
                }
            }
        }
    }
}*/

/**
 *
 * @param {number} id
 * @param {boolean=} opt_hide
 */
/*kinyelo.ui.annotate.MarkerContainer.prototype.highlightMarker = function(id, opt_hide) {
    var marker = goog.object.get(this.markers, id);
    if(goog.isDef(marker)) {
        if(opt_hide) {
            marker.setHighlighted(false);
        } else {
            marker.setHighlighted(true);
        }
    }
}*/

/**
 *
 */
/*kinyelo.ui.annotate.MarkerContainer.prototype.updateMarkers = function() {
    this.nodeList = goog.dom.findNodes(this.field_.getElement(), this.isAnnotatableNode_);
    if(this.getChildCount() != this.nodeList.length) {
        this.forEachChild(this.checkForDeletedNodes, this);
        goog.array.forEach(this.nodeList, function(node) {
            if(!goog.object.containsKey(this.markers, node.id)) {
                var marker = new kinyelo.ui.annotate.Marker(node);
                goog.object.set(this.markers, node.id, marker);
                this.addChild(marker);
            }
        }, this);
    }
}*/

/**
 *
 * @param {kinyelo.ui.annotate.Marker} control
 * @param {number} index
 */
/*kinyelo.ui.annotate.MarkerContainer.prototype.checkForDeletedNodes = function(control, index) {
    if(!control.isStillValid()) {
        goog.object.remove(this.markers, control.getRelatedContentElementId());
        this.removeChild(control);
    }
}*/

/**
 *
 * @param {Node} node
 * @private
 */
/*kinyelo.ui.annotate.MarkerContainer.prototype.isAnnotatableNode_ = function(node) {
    if(goog.editor.node.isBlockTag(node) &&
        node.tagName != goog.dom.TagName.SECTION) return node;
}*/