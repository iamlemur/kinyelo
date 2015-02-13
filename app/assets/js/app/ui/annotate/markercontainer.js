goog.provide('app.ui.annotate.MarkerContainer');

goog.require('goog.object');
goog.require('goog.editor.Field.EventType');
goog.require('goog.ui.Component');
goog.require('goog.ui.Container.Orientation');

goog.require('kinyelo.ui.Control');
goog.require('kinyelo.ui.Container');
goog.require('app.ui.annotate.Marker');
goog.require('app.ui.annotate.MarkerContainerRenderer');

/**
 * @param {!kinyelo.editor.AdvancedField} field
 * @constructor
 * @extends {kinyelo.ui.Container}
 */
app.ui.annotate.MarkerContainer = function(field) {
    goog.base(this, goog.ui.Container.Orientation.VERTICAL, app.ui.annotate.MarkerContainerRenderer.getInstance());

    /**
     * @type {!kinyelo.editor.AdvancedField}
     * @private
     */
    this.field_ = field;

    this.setId('marker-container');
    /**
     *
     * @type {app.ui.annotate.Marker}
     * @private
     */
    this.activeMarker_ = null;

    this.setFocusable(false);
}
goog.inherits(app.ui.annotate.MarkerContainer, kinyelo.ui.Container);

goog.ui.registry.setDefaultRenderer(app.ui.annotate.MarkerContainer, app.ui.annotate.MarkerContainerRenderer);

/**
 * @param element
 * @returns {boolean}
 * @inheritDoc
 */
app.ui.annotate.MarkerContainer.prototype.canDecorate = function(element) {
    return false;
}

/**
 * @const
 * @type {string}
 */
app.ui.annotate.MarkerContainer.CONTAINER_ID = 'post-markers';


/**
 *
 * @returns {!kinyelo.editor.AdvancedField}
 */
app.ui.annotate.MarkerContainer.prototype.getField = function() {
    return this.field_;
}


/** @inheritDoc */
app.ui.annotate.MarkerContainer.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    //TODO: add event listeners
    this.getHandler().listen(
        this,
        goog.ui.Component.EventType.CHECK,
        this.handleMarkerCheck,
        false,
        this
    );
    this.getHandler().listen(
        this.getField(),
        goog.editor.Field.EventType.DELAYEDCHANGE,
        this.handleDelayedChange,
        false,
        this
    );
}

/**
 *
 * @param {Node} annotatableNode
 */
app.ui.annotate.MarkerContainer.prototype.addMarker = function(annotatableNode) {
    var control = new app.ui.annotate.Marker(annotatableNode);
    this.addChild(control, true);
}

/**
 *
 * @param {goog.events.Event} e
 */
app.ui.annotate.MarkerContainer.prototype.handleDelayedChange = function(e) {
    goog.array.forEach(this.getField().getAnnotatableNodes(), function(node) {
        var child = this.getChild(app.ui.Container.generateChildId(node.id, app.ui.annotate.Marker.ID_FRAGMENT));
        if(goog.isNull(child)) {
            this.addMarker(node);
        }
    }, this);
    this.forEachChild(function(child) {
        if(!child.isValid()) {
            console.log('removing dead marker');
            this.removeChild(child, true);
        } else {
            child.getRenderer().updatePosition(child);
        }
    }, this);

}


/**
 * @param {app.ui.annotate.Marker=} marker
 */
app.ui.annotate.MarkerContainer.prototype.setActiveMarker = function(marker) {
    this.activeMarker_ = marker || null;
}

/**
 * @returns {app.ui.annotate.Marker}
 */
app.ui.annotate.MarkerContainer.prototype.getActiveMarker = function() {
    return this.activeMarker_;
}

/**
 *
 * @param {goog.events.Event} e
 */
app.ui.annotate.MarkerContainer.prototype.handleMarkerCheck = function(e) {
    //if(e.type == goog.ui.Component.EventType.CHECK) {
    if(!goog.isNull(this.getActiveMarker())) {
        var previousMarker = this.getActiveMarker();
        previousMarker.setChecked(false);
    }
    this.setActiveMarker(e.target);
    //}
}


/**
 * @param {goog.events.Event} e
 */
app.ui.annotate.MarkerContainer.prototype.handleAnnotationsHidden = function(e) {
    this.getActiveMarker().setChecked(false);
    this.setActiveMarker();
}


/**
*
* @param e {goog.events.Event}
*/
app.ui.annotate.MarkerContainer.prototype.handleAnnotationRendered = function(e) {

    /** @type {app.ui.annotate.Annotation} */
    var target = e.target;
    /** @type {Node} */
    var annotatable = target.getModel().getAnnotatable();
    var childId = app.ui.Container.generateChildId(annotatable.id, app.ui.annotate.Marker.ID_FRAGMENT);
    var marker = this.getChild(childId);
    if(!goog.isNull(marker)) {
        marker.updateCount();
    } else {
        //TODO: create marker here? or elsewhere to ensure it is always available here?
    }

}

/**
 *
 * @returns {HTMLElement}
 * @overrides
 */
app.ui.annotate.MarkerContainer.prototype.getContentElement = function() {
    return this.getElement().firstElementChild;
}





//
///**
// *
// * @param e {goog.events.Event}
// * @public
// */
//app.ui.annotate.MarkerContainer.prototype.handleNewAnnotation = function(e) {
//
//    /** @type {app.ui.annotate.Marker} */
//    var target = e.target;
//    /** @type {string} */
//    var anchor = e.target.getModel().anchor;
//    var marker;
//    if(!goog.object.containsKey(this.markers, anchor)) {
//        marker = new app.ui.annotate.Marker(anchor);
//        goog.object.add(this.markers, anchor, marker);
//        console.log('adding child');
//        this.addChild(marker, true);
//    } else {
//        marker = goog.object.get(this.markers, anchor);
//        console.log('updating count');
//        marker.updateCount();
//    }
//
//}





/**
 *
 * @param e {goog.events.Event}
 * @private
 */
/*kinyelo.ui.Post.prototype.handleHover_ = function(e) {
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
//app.ui.annotate.MarkerContainer.prototype.nodeList;

/**
 * @type {Object}
 */

//app.ui.annotate.MarkerContainer.prototype.markers;

/**
 * @type {Node=}
 */
//app.ui.annotate.MarkerContainer.prototype.focusedNode;

/**
 *
 * @param {!goog.events.Event} e
 * @private
 */
/*app.ui.annotate.MarkerContainer.prototype.handleDelayedChange_ = function(e) {
    this.updateMarkers();
}*/

/**
 *
 * @type {boolean}
 */
//app.ui.annotate.MarkerContainer.prototype.usingLorem = true;


/**
 *
 * @param {goog.events.Event} e
 * @private
 */
/*app.ui.annotate.MarkerContainer.prototype.handleHover_ = function(e) {
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
/*app.ui.annotate.MarkerContainer.prototype.highlightMarker = function(id, opt_hide) {
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
/*app.ui.annotate.MarkerContainer.prototype.updateMarkers = function() {
    this.nodeList = goog.dom.findNodes(this.field_.getElement(), this.isAnnotatableNode_);
    if(this.getChildCount() != this.nodeList.length) {
        this.forEachChild(this.checkForDeletedNodes, this);
        goog.array.forEach(this.nodeList, function(node) {
            if(!goog.object.containsKey(this.markers, node.id)) {
                var marker = new app.ui.annotate.Marker(node);
                goog.object.set(this.markers, node.id, marker);
                this.addChild(marker);
            }
        }, this);
    }
}*/

/**
 *
 * @param {app.ui.annotate.Marker} control
 * @param {number} index
 */
/*app.ui.annotate.MarkerContainer.prototype.checkForDeletedNodes = function(control, index) {
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
/*app.ui.annotate.MarkerContainer.prototype.isAnnotatableNode_ = function(node) {
    if(goog.editor.node.isBlockTag(node) &&
        node.tagName != goog.dom.TagName.SECTION) return node;
}*/