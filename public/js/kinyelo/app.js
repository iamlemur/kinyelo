goog.provide('kinyelo.App');

goog.require('kinyelo.Post');
goog.require('kinyelo.Book');

/**
 * @constructor
 */
kinyelo.App = function() {
    try {
        this.book_ = new kinyelo.Book();
    } catch(e) {

    }
    try {
        this.post_ = new kinyelo.Post();
    } catch(e) {

    }
}

