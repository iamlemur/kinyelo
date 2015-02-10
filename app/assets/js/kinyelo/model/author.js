goog.provide('kinyelo.model.Author');

/**
 *
 * @param {number=} id
 * @param {string=} username
 * @param {string=} avatarURL
 * @constructor
 */
kinyelo.model.Author = function(id, username, avatarURL) {
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

