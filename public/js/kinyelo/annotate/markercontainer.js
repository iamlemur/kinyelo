goog.provide('kinyelo.annotate.MarkerContainer');

goog.require('kinyelo.annotate.Container');
goog.require('kinyelo.annotate.Marker');
goog.require('goog.ui.Container');
goog.require('goog.dom');
goog.require('goog.object');
goog.require('goog.events.Event');
goog.require('goog.events.EventType');
goog.require('goog.events.EventHandler');
goog.require('goog.editor.Field.EventType');
goog.require('goog.editor.Command');

/**
 *
 * @param {goog.editor.Field} field
 * @param {kinyelo.annotate.Container} annotationContainer
 * @constructor
 */
kinyelo.annotate.MarkerContainer = function(field, annotationContainer) {
    this.container_ = goog.dom.getElement(kinyelo.annotate.MarkerContainer.CONTAINER_ID);
    this.field_ = field;
    this.nodeList = [];
    this.markers = {};
    this.eventRegister_ = new goog.events.EventHandler(this);
    this.eventRegister_.listen(this.field_, goog.editor.Field.EventType.DELAYEDCHANGE, this.handleDelayedChange_);
    this.eventRegister_.listen(this.field_.getElement(), [
        goog.events.EventType.MOUSEOVER,
        goog.events.EventType.MOUSEMOVE,
        goog.events.EventType.MOUSEOUT
    ], this.handleHover_);
    goog.ui.Container.call(this, goog.ui.Container.Orientation.VERTICAL, goog.ui.ContainerRenderer.getInstance(), goog.dom.getDomHelper(this.container_));
}
goog.inherits(kinyelo.annotate.MarkerContainer, goog.ui.Container);

/**
 *
 * @type {string}
 */
kinyelo.annotate.MarkerContainer.CONTAINER_ID = 'annotation-markers';

/**
 * @type {Array}
 */
kinyelo.annotate.MarkerContainer.prototype.nodeList;

/**
 * @type {Object}
 */

kinyelo.annotate.MarkerContainer.prototype.markers;

/**
 * @type {Node=}
 */
kinyelo.annotate.MarkerContainer.prototype.focusedNode;

/**
 *
 * @param {!goog.events.Event} e
 * @private
 */
kinyelo.annotate.MarkerContainer.prototype.handleDelayedChange_ = function(e) {
    this.updateMarkers();
}

/**
 *
 * @type {boolean}
 */
kinyelo.annotate.MarkerContainer.prototype.usingLorem = true;


/**
 *
 * @param {goog.events.Event} e
 * @private
 */
kinyelo.annotate.MarkerContainer.prototype.handleHover_ = function(e) {
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
}

/**
 *
 * @param {number} id
 * @param {boolean=} opt_hide
 */
kinyelo.annotate.MarkerContainer.prototype.highlightMarker = function(id, opt_hide) {
    var marker = goog.object.get(this.markers, id);
    if(goog.isDef(marker)) {
        if(opt_hide) {
            marker.setHighlighted(false);
        } else {
            marker.setHighlighted(true);
        }
    }
}

/**
 *
 */
kinyelo.annotate.MarkerContainer.prototype.updateMarkers = function() {
    this.nodeList = goog.dom.findNodes(this.field_.getElement(), this.isAnnotatableNode_);
    if(this.getChildCount() != this.nodeList.length) {
        this.forEachChild(this.checkForDeletedNodes, this);
        goog.array.forEach(this.nodeList, function(node) {
            if(!goog.object.containsKey(this.markers, node.id)) {
                var marker = new kinyelo.annotate.Marker(node);
                goog.object.set(this.markers, node.id, marker);
                this.addChild(marker);
            }
        }, this);
    }
}

/**
 *
 * @param {kinyelo.annotate.Marker} control
 * @param {number} index
 */
kinyelo.annotate.MarkerContainer.prototype.checkForDeletedNodes = function(control, index) {
    if(!control.isStillValid()) {
        goog.object.remove(this.markers, control.getRelatedContentElementId());
        this.removeChild(control);
    }
}

/**
 *
 * @param {Node} node
 * @private
 */
kinyelo.annotate.MarkerContainer.prototype.isAnnotatableNode_ = function(node) {
    if(goog.editor.node.isBlockTag(node) &&
        node.tagName != goog.dom.TagName.SECTION) return node;
}