goog.provide('kinyelo.annotate.Container');

goog.require('goog.array');
goog.require('goog.object');
goog.require('kinyelo.annotate.Anchor');
goog.require('goog.events.EventTarget');


/**
 *
 * @param {object} annotations
 * @param {object} users
 * @param {object} currentUser
 * @constructor
 * @extends {goog.events.EventTarget}
 */
kinyelo.annotate.Container = function(currentUser, annotations, users) {
    /**
     * @type {Object}
     * @private
     */
    if(goog.isDefAndNotNull(annotations)) {
        this.annotations = annotations;
    } else {
        this.annotations = goog.object.create()
    }

    if(goog.isDefAndNotNull(users)) {
        this.users = users;
    } else {
        this.users = goog.object.create();
    }

    if(goog.isDefAndNotNull(currentUser)) {
        this.currentUser = currentUsers;
    } else {
        this.currentUser = goog.object.create();
    }

    goog.array.forEach(this.annotations, function(annotation) {
        var tmp = goog.object.get(this.users, annotation.user_id);
        if(goog.isDef(tmp)) {
            annotation.author = tmp;
        }
    }, this);

    goog.array.sortObjectsByKey(this.annotations, "createdAt");

    this.annotationMap = goog.array.bucket(this.annotations, function(element) {
        return element.anchor;
    });

    this.anchors = goog.object.create();

    goog.object.forEach(this.annotationMap, function(annotations, anchorId) {
        this.addAnchor(anchorId, annotations);
    }, this);

}
goog.inherits(kinyelo.annotate.Container, goog.events.EventTarget);

/**
 * @type {object}
 */
kinyelo.annotate.Container.prototype.anchors;

kinyelo.annotate.Container.prototype.addAnchor = function(annotations, anchorId) {
    goog.object.add(this.anchors, anchorId, new kinyelo.annotate.Anchor(this, anchorId, annotations));
}

/**
 * @type {object}
 */
kinyelo.annotate.Container.prototype.annotationMap;

/**
 * @type {object}
 */
kinyelo.annotate.Container.prototype.annotations;

/**
 * @type {object}
 */
kinyelo.annotate.Container.prototype.currentUser;

/**
 * @type {object}
 */
kinyelo.annotate.Container.prototype.users;

/**
 * @returns {Object}
 */
kinyelo.annotate.Container.prototype.getAnnotationMap = function() {
    return this.annotationMap;
}
