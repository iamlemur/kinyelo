goog.provide('kinyelo.User');

goog.require('goog.array');

/**
 *
 * @param user {object}
 * @constructor
 */
kinyelo.User = function(user) {
    if(!goog.isNull(user.id) && !goog.isNull(user.username)) {
        this.id = user.id;
        this.username = user.username;
        if(!goog.isNull(user.avatar)) {
            this.avatar = user.avatar;
        }
    }
}

/**
 * @type {number}
 */
kinyelo.User.prototype.id;

/**
 * @type {string}
 */
kinyelo.User.prototype.avatar;

/**
 * @type {username}
 */
kinyelo.User.prototype.username;
