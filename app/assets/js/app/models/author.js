goog.provide('app.model.Author');

goog.require('kinyelo.Model');

/**
 *
 * @param {number=} id
 * @param {string=} username
 * @param {string=} avatarURL
 * @constructor
 * @extends {kinyelo.Model}
 */
app.model.Author = function(id, username, avatarURL) {
    /**
     *
     * @type {number}
     * @private
     */
    this.id_ = goog.isDefAndNotNull(id) ? id : null;
    /**
     *
     * @type {string}
     * @private
     */
    this.username_ = goog.isDefAndNotNull(username) ? username : null;
    /**
     *
     * @type {string}
     * @private
     */
    this.avatarURL_ = goog.isDefAndNotNull(avatarURL) ? avatarURL : null;
}
goog.inherits(app.model.Author, kinyelo.Model);


/**
 *
 * @returns {string}
 */
app.model.Author.prototype.getAvatarURL = function() {
    return this.avatarURL_;
}

/**
 *
 * @returns {string}
 */
app.model.Author.prototype.getUsername = function() {
    return this.username_;
}

/**
 *
 * @returns {number}
 */
app.model.Author.prototype.getId = function() {
    return this.id_;
}

/**
 *
 * @returns {string}
 */
app.model.Author.prototype.getURL = function() {
    return 'http://www.google.com';
}