goog.provide('kinyelo.Book');

goog.require('goog.events.EventHandler');
goog.require('kinyelo.editor.SingleLineField');
goog.require('kinyelo.editor.SimpleField');

/**
 *
 * @constructor
 */
kinyelo.Book = function() {
    this.title_ = new kinyelo.editor.SingleLineField(kinyelo.Book.BOOK_TITLE_ID);
    this.rte_ = new kinyelo.editor.SimpleField(kinyelo.Book.BOOK_SUMMARY_ID);
    this.eventRegister_ = new goog.events.EventHandler(this);
    this.eventRegister_.listen(window, 'beforeunload', this.handleUnload_);
}

/**
 * @type {string}
 * @const
 */
kinyelo.Book.BOOK_SUMMARY_ID = 'book-summary';

/**
 * @type {string}
 * @const
 */
kinyelo.Book.BOOK_TITLE_ID = 'book-title';

/**
 * @type {kinyelo.editor.Field=}
 * @private
 */
kinyelo.Book.prototype.title_ = null;

/**
 * @type {kinyelo.editor.Field=}
 * @private
 */
kinyelo.Book.prototype.rte_ = null;

/**
 * @type {goog.events.EventHandler=}
 * @private
 */
kinyelo.Book.prototype.eventRegister_ = null;


kinyelo.Book.prototype.handleUnload_ = function() {
    if(this.rte_.isModified()) {
        console.log('modified');
        return goog.getMsg('You have unsaved changes. Click cancel to return to the page and save them or click OK to discard');
    }
}