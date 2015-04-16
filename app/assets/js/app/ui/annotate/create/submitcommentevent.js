goog.provide('app.ui.annotate.create.SubmitCommentEvent');

goog.require('kinyelo.events.Event');

/**
 *
 * @param {!string} content
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {kinyelo.events.Event}
 */
app.ui.annotate.create.SubmitCommentEvent = function(content, opt_domHelper) {
    kinyelo.events.Event.call(this, app.ui.annotate.create.Form.EventType.SUBMIT_COMMENT, opt_domHelper);

    /**
     *
     * @type {!string}
     * @private
     */
    this.content_ = content;
}
goog.inherits(app.ui.annotate.create.SubmitCommentEvent, kinyelo.events.Event);

/**
 *
 * @returns {!string}
 */
app.ui.annotate.create.SubmitCommentEvent.prototype.getContent = function() {
    return this.content_;
}