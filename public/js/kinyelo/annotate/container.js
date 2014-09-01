goog.provide('kinyelo.annotate.Container');

goog.require('goog.structs.Map');
goog.require('goog.object');
goog.require('kinyelo.editor.Field');
goog.require('kinyelo.annotate.Group');
goog.require('goog.array');
goog.require('goog.ui.Container');
goog.require('goog.ui.ContainerRenderer');
goog.require('goog.ui.Container.Orientation');
goog.require('goog.dom');

/**
 *
 * @param {kinyelo.editor.Field} editor
 * @constructor
 */
kinyelo.annotate.Container = function(editor) {
    this.editor_ = editor;
    this.container_ = goog.dom.getElement(kinyelo.annotate.Container.CONTAINER_ID);
    goog.ui.Container.call(this, goog.ui.Container.Orientation.VERTICAL, goog.ui.ContainerRenderer.getInstance(), goog.dom.getDomHelper(this.container_));
    this.retrieveAnnotations_();
}
goog.inherits(kinyelo.annotate.Annotation, goog.ui.Container);

/**
 * @type {string}
 * @const
 */
kinyelo.annotate.Container.CONTAINER_ID = 'annotations';

/**
 * @type {object}
 */
kinyelo.annotate.Container.prototype.annotationMap;

/**
 *
 * @type {Object|null}
 */
kinyelo.annotate.Container.prototype.annotations = null;

/**
 *
 * @returns {HTMLElement}
 */
kinyelo.annotate.Container.prototype.getContainerElement = function() {
    return this.container_;
}

/**
 *
 * @type {goog.structs.Map}
 */
kinyelo.annotate.Container.prototype.groups = new goog.structs.Map();

/**
 *
 * @private
 */
kinyelo.annotate.Container.prototype.retrieveAnnotations_ = function() {
    this.sampleData_ = kinyelo.annotate.Container.sampleData;
    goog.array.sortObjectsByKey(this.sampleData_.annotations, "createdAt");
    this.annotationMap = goog.array.bucket(this.sampleData_.annotations, this.organizeAnnotations, this);
    this.groups = goog.object.map(this.annotationMap, function(group,key) {
        this.groups.set(key, new kinyelo.annotate.Group(group, this));
    }, this);
}

/**
 *
 * @param {Object} element
 * @param {number} index
 * @param {Array} array
 */
kinyelo.annotate.Container.prototype.organizeAnnotations = function(element, index, array) {
    return element.anchor;
}


kinyelo.annotate.Container.sampleData = {
    "self": {
        "id": "dce2602520fb",
        "username": "asiral",
        "avatar": {
            "url": "/img/avatar1.jpg"
        },
        "url": "/authors/asiral"
    },
    "authors": [
        {
            "username": "asiral",
            "avatar": {
                "url": "/img/avatar1.jpg"
            },
            "url": "/authors/asiral",
            "id": "dce2602520fb"
        }
    ],
    "highlights": [
        {
            "highlightId": "1c107a20a11b",
            "content": "placeholder content",
            "anchor": "f565"
        }
    ],
    "annotations": [
        {
            "postId": "12",
            "type": "comment",
            "noteId": "1c107a20a11c",
            "content": "Made another comment!",
            "state": "PUBLIC",
            "author": "dce2602520fb",
            "anchor": "f566",
            "highlightId": "",
            "isRemoved": false,
            "createdAt": 1369578673673,
            "updatedAt": 0,
            "stateUpdatedAt": 1369580806529,
            "removedAt": 0
        },
        {
            "postId": "12",
            "type": "comment",
            "noteId": "1c107a20a11b",
            "content": "Great post, take a look at my thoughts over here, we share a lot of opinions — https://medium.com/adventures-in-consumer-technology/379a24ab845f",
            "state": "PUBLIC",
            "author": "dce2602520fb",
            "anchor": "f565",
            "highlightId": "1c107a20a11b",
            "isRemoved": false,
            "createdAt": 1369578673672,
            "updatedAt": 0,
            "stateUpdatedAt": 1369580806529,
            "removedAt": 0,
            "replies": [
                {
                    "type": "comment",
                    "postId": "f7b8c66109ea",
                    "noteId": "1c107a20a11b",
                    "replyId": "d9ea9ca583af",
                    "content": "Yes we do. I tried Path, but I wasn’t ready to abandon Facebook at that point. Also, I want a tool that builds communities around great content. Working on some related ideas.",
                    "author": "dce2602520fb",
                    "state": "",
                    "isRemoved": false,
                    "createdAt": 1369580986050,
                    "updatedAt": 0,
                    "removedAt": 0,
                    "stateUpdatedAt": 0
                }
            ]
        }
    ]
}