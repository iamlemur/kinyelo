goog.provide('kinyelo.ui.annotate.Author');

goog.require('goog.ui.Component');

/**
 *
 * @param {kinyelo.annotate.Author} author
 * @constructor
 */
kinyelo.ui.annotate.Author = function(author) {
    goog.base(this);

    /**
     *
     * @type {kinyelo.annotate.Author}
     * @private
     */
    this.author_ = author;
}
goog.inherits(kinyelo.ui.annotate.Author, goog.ui.Component);

kinyelo.ui.annotate.Author.prototype.getLabelText = function() {
    return this.author_.username;
}

kinyelo.ui.annotate.Author.prototype.createDom = function() {

}

//				<a href="#" title="Go to the profile of..." class="avatar" rel="nofollow"><img src="/img/avatar1.jpg" /></a>
//<a href="#" title="Go to the profile of..." class="author">jcomp</a>