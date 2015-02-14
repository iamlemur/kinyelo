goog.provide('app.models.Author');

goog.require('kinyelo.models.Model');

/**
 *
 * @param {number=} id
 * @param {string=} username
 * @param {string=} avatarURL
 * @constructor
 * @extends {kinyelo.models.Model}
 */
app.models.Author = function(id, username, avatarURL) {

    kinyelo.models.Model.call(this);

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
goog.inherits(app.models.Author, kinyelo.models.Model);


/**
 *
 * @returns {string}
 */
app.models.Author.prototype.getAvatarURL = function() {
    return this.avatarURL_;
}

/**
 *
 * @returns {string}
 */
app.models.Author.prototype.getUsername = function() {
    return this.username_;
}

/**
 *
 * @returns {number}
 */
app.models.Author.prototype.getId = function() {
    return this.id_;
}

/**
 *
 * @returns {string}
 */
app.models.Author.prototype.getURL = function() {
    return 'http://www.google.com';
}