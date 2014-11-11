goog.provide('kinyelo.ui.annotate.Container');

goog.require('goog.ui.Container');
goog.require('goog.ui.registry');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('kinyelo.ui.annotate.ContainerRenderer');
goog.require('kinyelo.ui.Container');

/**
 *
 * @param {Object=} data
 * @constructor
 * @extends {kinyelo.ui.Container}
 */

kinyelo.ui.annotate.Container = function(data) {
    goog.base(this, goog.ui.Container.Orientation.VERTICAL, kinyelo.ui.annotate.ContainerRenderer.getInstance());
    this.setModel(data || null);
    this.setFocusable(false);
}
goog.inherits(kinyelo.ui.annotate.Container, kinyelo.ui.Container);


/**
 * @return {Object}
 * @override
 */
kinyelo.ui.annotate.Container.prototype.getModel;

kinyelo.ui.annotate.Container.prototype.handleMarkerClick = function(e) {
    console.log(e.target, 'click registered by annotation container');
    console.log(e.target.getId());
    var control = this.getChild(e.target.getId());
    control.setOpen(true);
    this.setOpenGroup(e.target.getId());
    this.forEachChild(function(child) {
        if(child.getId() != this.activeGroupId_) {
            child.setOpen(false);
        }
    }, this);
    var html = goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.HTML);
    goog.dom.classes.toggle(html[0], 'js-annotations');

    var element = e.target.getContentElement();
    var position = goog.style.getPosition(element);
    goog.style.setPosition(control.getContentElement(), null, position.y);

}

kinyelo.ui.annotate.Container.prototype.setOpenGroup = function(id) {
    this.activeGroupId_ = id;
}

kinyelo.ui.annotate.Container.prototype.handleOpenItem = function(e) {
    console.log('is this being called?');
}

/**
 * @type {number}
 * @private
 */
kinyelo.ui.annotate.Container.prototype.activeGroupId_;

goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.Container, kinyelo.ui.annotate.ContainerRenderer);

goog.ui.registry.setDecoratorByClassName(kinyelo.ui.annotate.ContainerRenderer.CSS_CLASS,
    function() { return new kinyelo.ui.annotate.Container(); });
