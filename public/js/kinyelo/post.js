goog.provide('kinyelo.Post');

goog.require('kinyelo.editor.SingleLineField');
goog.require('kinyelo.editor.AdvancedField');
goog.require('kinyelo.annotate.Container');
goog.require('kinyelo.ui.annotate.Container');
goog.require('kinyelo.ui.annotate.MarkerContainer');
goog.require('kinyelo.events.annotations');
goog.require('goog.events.EventHandler');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.editor.Command');
goog.require('goog.debug.Logger');
goog.require('goog.net.XmlHttp');
goog.require('goog.net.XhrIo');
goog.require('goog.structs.Map');
goog.require('goog.Uri.QueryData');
goog.require('goog.ui.ContainerScroller');
goog.require('goog.editor.Field');
goog.require('kinyelo.editor.Anchor');
goog.require('kinyelo.User');


/**
 *
 * @constructor
 * @extend {goog.events.EventTarget}
 */
kinyelo.Post = function() {

    this.title_ = new kinyelo.editor.SingleLineField(kinyelo.Post.POST_TITLE_ID);
    this.rte_ = new kinyelo.editor.AdvancedField(kinyelo.Post.POST_CONTAINER_ID);
    this.eventRegister_ = new goog.events.EventHandler(this);

    this.retrieveAnnotations_();
}
goog.inherits(kinyelo.Post, goog.events.EventTarget);

/**
 * @type {string}
 * @const
 */
kinyelo.Post.POST_CONTAINER_ID = 'post-body';

/**
 * @type {string}
 * @const
 */
kinyelo.Post.POST_TITLE_ID = 'post-title';

/**
 * @type {goog.structs.Map}
 * @const
 */
kinyelo.Post.postHeaders = new goog.structs.Map(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);

/**
 * @type {goog.events.EventHandler}
 * @private
 */
kinyelo.Post.prototype.eventRegister_;

/**
 * @type {kinyelo.editor.AdvancedField}
 * @private
 */
kinyelo.Post.prototype.rte_ = new kinyelo.editor.AdvancedField(kinyelo.Post.POST_CONTAINER_ID);
/**
 * @type {kinyelo.editor.SingleLineField}
 * @private
 */
kinyelo.Post.prototype.title_;

/**
 * @type {number=}
 * @private
 */
kinyelo.Post.prototype.post_id_;

/**
 * @type {Object}
 */
kinyelo.Post.prototype.highlights;

/**
 * @type {Object}
 */
kinyelo.Post.prototype.anchors;

/**
 * @type {Object}
 */
kinyelo.Post.prototype.users;

/**
 * @type {Object}
 */
kinyelo.Post.prototype.annotations;

/**
 *
 * @param node {Node}
 * @returns {boolean}
 */
kinyelo.Post.isAnnotatableNode = function(node) {
    return goog.editor.node.isBlockTag(node)
    && goog.editor.node.isEditable(node) &&
    node.tagName != goog.dom.TagName.SECTION;
}


/**
 *
 * @private
 */
kinyelo.Post.prototype.retrieveAnnotations_ = function() {
    //this.sampleData_ = kinyelo.Post.sampleAnnotations;
    //TODO: fix these hard-coded urls
    var url = "/posts/1/annotations";
    goog.net.XhrIo.send(url, goog.bind(this.loadAnnotations_, this));
}


/**
 *
 * @private
 */
kinyelo.Post.prototype.loadAnnotations_ = function(e) {

    var xhr = e.target;
    if(xhr.isComplete()) {

        //get all anchors in the RTE of post ready
        var anchors = goog.dom.findNodes(this.rte_.getElement(), kinyelo.Post.isAnnotatableNode);

        //go through all the anchors and create objects for them
        goog.array.forEach(anchors, function(anchor) {
            goog.object.add(this.anchors, anchor.id, new kinyelo.editor.Anchor(anchor.id));
        }, this);


        //retrieve JSON
        var response = xhr.getResponseJson();

        //get all the annotations in a map
        this.annotations = goog.array.toObject(response.annotations, function(annotation) {
            return annotation.id;
        });

        //get all the highlights in a map
        if(!goog.isNull(response.highlights)) {
            this.highlights = goog.array.toObject(response.highlights, function(highlight) {
                return highlight.id;
            });

            //iterate through annotations to see if highlight is reference
            //then check for existence and add to anchor
            goog.array.forEach(response.annotations, function(annotation) {
                if(annotation.highlight_id != null) {
                    if(goog.object.containsKey(this.highlights, annotation.highlight_id)) {
                        var anchor = goog.object.get(this.anchors, annotation.anchor);
                        anchor.addHighlight(annotation.id, goog.object.get(this.highlights, annotation.highlight_id));
                    }
                }
            }, this);

        }

        //
        if(!goog.isNull(response.self)) {
            this.currentUser = new kinyelo.User(response.self);
            goog.object.add(this.users, response.self.id, this.currentUser);
        }

        if(!goog.isNull(response.users)) {
            goog.array.forEach(response.users, function(user) {
                goog.object.add(this.users, user.id, new kinyelo.User(user));
            }, this);
        }

        this.markerContainer = new kinyelo.ui.annotate.MarkerContainer();
        this.markerContainer.render(goog.dom.getElement('annotation-markers'));

        this.annotationsModel = new kinyelo.annotate.Container(this.currentUser, this.annotations, this.users);
        this.annotationsContainer = new kinyelo.ui.annotate.Container(this.annotationsModel);

        this.eventRegister_.listen(this.rte_, goog.editor.Field.EventType.DELAYEDCHANGE, this.handleDelayedChange_);
        this.eventRegister_.listen(window, 'beforeunload', this.handleUnload_);

        this.eventRegister_.listen(
            this.markerContainer,
            kinyelo.events.annotations.EventType.MARKER_CLICKED,
            function(e) {
                console.log('marker clicked');
            },
            false);
    }

}

kinyelo.Post.prototype.initListeners = function() {
    //clear all first

    /*

    this.eventRegister_.listen(
        this.annotationsContainer,
        kinyelo.events.annotations.EventType.NEW_ANNOTATION,
        function(e) {
            this.handleNewAnnotation(e);
        },
        false,
        this.markerContainer
    );

    this.eventRegister_.listen(this.rte_.getElement(), [
        goog.events.EventType.MOUSEOVER,
        goog.events.EventType.MOUSEMOVE,
        goog.events.EventType.MOUSEOUT
    ], this.handleHover_);
    */

}


/**
 *
 * @param {goog.events.Event} e
 * @private
 */
kinyelo.Post.prototype.handleDelayedChange_ = function(e) {

    // auto save
    this.savePost_(e);

}

/**
 *
 * @param {goog.events.Event} e
 * @private
 */
kinyelo.Post.prototype.savePost_ = function(e) {
    //TODO: fix these hard-coded urls
    var url = "/posts";
    var callback = null;
    var postMap = new goog.structs.Map();
    postMap.set('content', this.rte_.getCleanContents());
    postMap.set('title', this.title_.getCleanContents());
    postMap.set('status', 'draft');

    if(goog.isNull(this.post_id_)) {
        //if we are creating
        callback = goog.bind(this.handleCreateResponse_, this);
    } else {
        //we are saving
        url += "/" + this.post_id_;
        postMap.set('_method', 'PUT');
        callback = goog.bind(this.handleSaveResponse_, this);

    }
    var postData = goog.Uri.QueryData.createFromMap(postMap);
    goog.net.XhrIo.send(url, callback, 'POST', postData.toString(), kinyelo.Post.postHeaders);
}


/**
 *
 * @param {goog.events.Event} e
 */
kinyelo.Post.prototype.handleHover_ = function(e) {
    var ancestor = goog.dom.getAncestor(e.target, kinyelo.Post.isAnnotatableNode, true);
    //ancestor.id
    console.log(e);
}


kinyelo.Post.prototype.handleUnload_ = function() {
    if(this.rte_.isModified()) {
        console.log('modified');
        return goog.getMsg('You have unsaved changes. Click cancel to return to the page and save them or click OK to discard');
    }
}

kinyelo.Post.prototype.handleCreateResponse_ = function(e) {
    var xhr = e.target;
    if(xhr.isComplete()) {
        var response = xhr.getResponseJson();
        console.log(response);
        this.post_id_ = response.payload.id;
        //TODO: fix these hard-coded urls
        history.replaceState(response.payload.id, response.payload.title, '/posts/' + response.payload.id + '/edit');
    }
}

kinyelo.Post.prototype.handleSaveResponse_ = function(e) {
    var xhr = e.target;
    if(xhr.isComplete()) {
        console.log('complete');
        console.log(xhr.getResponseJson());
        //remove the saving indicator
    } else {
        console.log('not complete');
        //show the saving indicator
    }
}
/*
kinyelo.Post.prototype.loadPost = function(post) {
    goog.dom.setTextContent(this.title_, post.title);
    this.post_id_ = post.id;
    if(this.rte_.queryCommandValue(goog.editor.Command.USING_LOREM)) {
        this.rte_.execCommand(goog.editor.Command.CLEAR_LOREM);
        this.rte_.setHtml(false, post.content, true, false);
    }
}*/



kinyelo.Post.sampleAnnotations = {
    "self": {
        "id": "dce2602520fb",
        "username": "asiral",
        "avatar": {
            "url": "/img/avatar1.jpg"
        },
        "url": "/authors/asiral"
    },
    "users": [
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
            "authorId": "dce2602520fb",
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
            "noteId": "1c107a20a11d",
            "content": "Made yet another comment!",
            "state": "PUBLIC",
            "authorId": "dce2602520fb",
            "anchor": "f566",
            "highlightId": "",
            "isRemoved": false,
            "createdAt": 1369578673674,
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
            "authorId": "dce2602520fb",
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
                    "authorId": "dce2602520fb",
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