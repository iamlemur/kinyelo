goog.provide('kinyelo.App');

goog.require('kinyelo.ui.Post');
goog.require('goog.Uri');

/**
 * @constructor
 */
kinyelo.App = function() {
    /**
     * @type {?goog.Uri}
     * @private
     */
    this.url_ = new goog.Uri(window.location);
    this.changePage();
}
goog.addSingletonGetter(kinyelo.App);
goog.exportSymbol('kinyelo.App', kinyelo.App);

/**
 * @type {?kinyelo.model.Author}
 */
kinyelo.App.prototype.user_ = null;

/**
 *
 * @param {!object} data
 */
kinyelo.App.prototype.setUser = function(data) {
    //TODO: eventually make this a child class of author as the user model
    this.user_ = new kinyelo.model.Author(data.id, data.username);
}

/**
 *
 */
kinyelo.App.prototype.changePage = function() {
    var tokens = this.url_.getPath().substr(1).split('/');
    if(tokens[0] == "posts") {
        if(parseInt(tokens[1], 10)) {
            this.post_ = new kinyelo.ui.Post(tokens[1] ? tokens[1] : null);
            //TODO: when we switch the app to a component represented by the page DOM
            //TODO: switch to the DomHelper of the frame of the component
            this.post_.decorate(goog.dom.getElement(kinyelo.ui.Post.POST_CONTAINER_ID));
        }
    }
}

/**
 *
 * @returns {?kinyelo.model.Author}
 */
kinyelo.App.prototype.getUser = function() {
    return this.user_;
}