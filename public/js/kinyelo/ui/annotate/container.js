goog.provide('kinyelo.ui.annotate.Container');

goog.require('goog.ui.Container');
goog.require('goog.ui.registry');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('kinyelo.ui.annotate.ContainerRenderer');
goog.require('kinyelo.ui.Container');
goog.require('kinyelo.annotate.Anchor');
goog.require('kinyelo.ui.annotate.Anchor');

/**
 *
 * @param {Object=} model
 * @constructor
 * @extends {goog.ui.Container}
 */

kinyelo.ui.annotate.Container = function(model) {
    goog.base(this, goog.ui.Container.Orientation.VERTICAL);
    this.setModel(model || null);
    this.setFocusable(false);

    //initialize
    goog.object.forEach(model.getAnnotationMap(), this.addAnchor, this);

    this.render();
}
goog.inherits(kinyelo.ui.annotate.Container, goog.ui.Container);

/**
 *
 * @param {Array.<object>} annotations
 * @param {string} anchorId
 */
kinyelo.ui.annotate.Container.prototype.addAnchor = function(annotations, anchorId) {
    this.addChild(new kinyelo.ui.annotate.Anchor(
        new kinyelo.annotate.Anchor(anchorId, annotations)
    ));
}

/**
 * @return {kinyelo.annotate.Container}
 * @override
 */
kinyelo.ui.annotate.Container.prototype.getModel;

goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.Container, kinyelo.ui.annotate.ContainerRenderer);
goog.ui.registry.setDecoratorByClassName(kinyelo.ui.annotate.ContainerRenderer.CSS_CLASS,
    function() { return new kinyelo.ui.annotate.Container(); });




/*

kinyelo.ui.annotate.Container.prototype.handleMarkerClick = function(e) {
    console.log(e.target, 'click registered by annotation container');
    console.log(e.target.getId());

    var marker = e.target;
    //get controol by reading the ID of the marker
    var control = this.getChild(marker.getId());
    control.setOpen(true);
    //set the open annotation group for the container
    this.setOpenGroup(e.target.getId());
    //hide all other groups
    this.forEachChild(function(child) {
        if(child.getId() != this.activeGroupId_) {
            child.setOpen(false);
        }
    }, this);
    //set the class on the body for viewing
    var html = goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.HTML);
    goog.dom.classes.toggle(html[0], 'js-annotations');

    var position = goog.style.getPosition(marker.getContentElement());
    goog.style.setPosition(control.getContentElement(), null, position.y);

}

kinyelo.ui.annotate.Container.prototype.setOpenGroup = function(id) {
    this.activeGroupId_ = id;
}

kinyelo.ui.annotate.Container.prototype.handleOpenItem = function(e) {
    console.log('is this being called?');
}
*/
/**
 * @type {number}
 * @private
 */
//kinyelo.ui.annotate.Container.prototype.activeGroupId_;

