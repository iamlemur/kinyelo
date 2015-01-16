goog.provide('kinyelo.editor.plugins.ToolbarToggler');

goog.require('goog.events.EventHandler');
goog.require('goog.math.Coordinate');
goog.require('goog.math.Size');
goog.require('goog.style');

/**
 *
 * @constructor
 * @extend {goog.editor.Plugin}
 */
kinyelo.editor.plugins.ToolbarToggler = function() {
    goog.editor.Plugin.call(this);
    this.eventRegister_ = new goog.events.EventHandler(this);
}
goog.inherits(kinyelo.editor.plugins.ToolbarToggler, goog.editor.Plugin);

/** @override */
kinyelo.editor.plugins.ToolbarToggler.prototype.getTrogClassId = function() {
    return 'ToolbarToggler';
}

/**
 *
 * @param e
 * @param opt_target
 */
kinyelo.editor.plugins.ToolbarToggler.prototype.handleSelectionChange = function(e, opt_target) {
    var range = this.getFieldObject().getRange();
    //TODO: again have to do this for chrome
    var container = range.getContainer().parentNode;
    if(!range.isCollapsed()) {
        var start = range.getStartPosition();
        var end = range.getEndPosition();
        var diff = goog.math.Coordinate.difference(end, start);
        var toolbar = this.getFieldObject().getToolbarElement();
        this.getFieldObject().getToolbar().setVisible(true);
        var toolbarSize = goog.style.getSize(toolbar);
        goog.style.setPosition(toolbar, Math.min(start.x, end.x) + (Math.abs(diff.x)/2) - (toolbarSize.width/2), Math.min(start.y, end.y) - toolbarSize.height - 16);
    } else {
        this.getFieldObject().getToolbar().setVisible(false);
    }
}

/**
 * @type {goog.events.EventHandler=}
 * @private
 */
kinyelo.editor.plugins.ToolbarToggler.prototype.eventRegister_ = null;
