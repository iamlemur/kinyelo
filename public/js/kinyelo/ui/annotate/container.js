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
    control.setActive(true);
    var html = goog.dom.getElementsByTagNameAndClass(goog.dom.TagName.HTML);
    goog.dom.classes.toggle(html[0], 'js-annotations');

    var element = e.target.getContentElement();
    var position = goog.style.getPosition(element);
    goog.style.setPosition(control.getContentElement(), null, position.y);

}

goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.Container, kinyelo.ui.annotate.ContainerRenderer);

goog.ui.registry.setDecoratorByClassName(kinyelo.ui.annotate.ContainerRenderer.CSS_CLASS,
    function() { return new kinyelo.ui.annotate.Container(); });
