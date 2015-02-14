goog.provide('app.ui.Post');

goog.require('goog.dom');
goog.require('goog.array');
goog.require('goog.object');
goog.require('goog.net.XmlHttp');
goog.require('goog.net.XhrIo');
goog.require('goog.structs.Map');
goog.require('goog.Uri');

goog.require('kinyelo.editor.SingleLineField');
goog.require('kinyelo.editor.AdvancedField');
goog.require('app.ui.annotate.Container');
goog.require('app.ui.annotate.MarkerContainer');
goog.require('app.ui.annotate.Annotation');
goog.require('kinyelo.ui.Component');
goog.require('app.models.Post');
goog.require('app.models.Annotation');
goog.require('app.models.Reply');
goog.require('app.models.Author');
goog.require('app.models.Post');


/**
 * @param {string} id
 * @param {goog.dom.DomHelper} opt_domHelper
 * @constructor
 * @extends {kinyelo.ui.Component}
 */
app.ui.Post = function(id, opt_domHelper) {

    kinyelo.ui.Component.call(this, opt_domHelper);

    /**
     * @type {goog.Uri}
     * @private
     */
    this.uri_ = new goog.Uri(window.location);

    /**
     * @type {kinyelo.editor.SingleLineField}
     * @private
     */
    this.title_ = new kinyelo.editor.SingleLineField(app.ui.Post.POST_TITLE_ID);

    /**
     * @type {kinyelo.editor.AdvancedField}
     * @private
     */
    this.rte_ = new kinyelo.editor.AdvancedField(app.ui.Post.POST_BODY_ID);

    this.setId(id);

    if(goog.isNull(this.title_) || goog.isNull(this.rte_)) throw "Not on posts page";

    this.model_ = new app.models.Post(this, this.id_, this.title_, this.rte_);

    this.getMetadata_();

}
goog.inherits(app.ui.Post, kinyelo.ui.Component);

/**
 * @type {string}
 * @const
 */
app.ui.Post.POST_BODY_ID = 'post-body';

/**
 * @type {string}
 * @const
 */
app.ui.Post.POST_TITLE_ID = 'post-title';

/**
 * @type {string}
 * @const
 */
app.ui.Post.POST_CONTAINER_ID = 'opus';


/**
 * @type {goog.structs.Map}
 * @const
 */
app.ui.Post.postHeaders = new goog.structs.Map(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);

/** @inheritDoc */
app.ui.Post.prototype.canDecorate = function() {
    return true;
}

/** @inheritDoc */
app.ui.Post.prototype.decorateInternal = function(element) {
    goog.base(this, 'decorateInternal', element);
}

/** @inheritDoc */
app.ui.Post.prototype.enterDocument = function() {
    //called immediately because post will always be in the document and is therefore always decorated
    goog.base(this, 'enterDocument');
    //TODO: add listeners;

    /**
     * @type {!Object}
     * @private
     */
    this.ui_ = goog.object.create();

    this.ui_.markerContainer = new app.ui.annotate.MarkerContainer(this.getModel());
    this.addChild(this.ui_.markerContainer, true);

    this.ui_.markerContainer.init();

    this.getModel().update();

    this.ui_.annotationsContainer = new app.ui.annotate.Container(this);
    this.ui_.annotationsContainer.render();

/*
    this.getHandler().listen(this.getModel(), app.models.Annotation.EventType.CREATED,
        function(e) { console.log('post model hears that annotation model was created', e); },
        false
    );
*/

}

/**
 * sends the request for bundled data we need to initialize UI
 * @private
 */
app.ui.Post.prototype.getMetadata_ = function() {
    //TODO: fix these hard-coded urls
    var url = "/posts/1/metadata";

    //TODO: goog.net.NetworkTester p169


    goog.net.XhrIo.send(url,
        goog.bind(
            this.loadMetadata_,
            this
        )
    );
}



/**
 * load bundled data
 * @private
 */
app.ui.Post.prototype.loadMetadata_ = function(e) {

    var xhr = e.target;
    if(xhr.isComplete()) {


        var nodes = this.rte_.getAnnotatableNodes();
        /**
         * Map of all annotatable nodes in the RTE
         * @type {!object}
         */
        this.annotatableNodes = goog.array.toObject(
            nodes,
            function(node) {
                return node.id;
            }
        );


        /**
         * All the data flatly initialized in their models
         * @type {!Object}
         * @private
         */
        this.metadata_ = goog.object.create();


        //retrieve JSON
        var response = xhr.getResponseJson();

        //get all the contributors to this project
        var participants = goog.object.map(
            goog.array.toObject(response.participants, app.ui.Post.mapResults),
            function(e) { return new app.models.Author(e.id, e.username, e.avatar) }
        );

        this.getModel().setParticipants(participants);

        //TODO: highlights

        //get all the replies to later link with annotation models
        var annotations = goog.object.map(
            goog.array.toObject(response.annotations, app.ui.Post.mapResults),
            goog.bind(this.getModel().addAnnotation, this.getModel()),
            this
        );

        //TODO: replies
/*
        //get all the replies to later link with annotation models
        this.metadata_.replies = goog.object.map(
            goog.array.toObject(response.replies, app.ui.Post.mapResults),
            this.loadReply,
            this
        );*/

        //TODO: we need to load the current user data somewhere else
        var appInstance = kinyelo.App.getInstance();
        appInstance.setUser(response.user);


        //set the author of the post from the list of contributors
        if(goog.object.containsKey(participants, response.author.id)) {
            this.getModel().setAuthor(goog.object.get(participants, response.author.id));
        }

/*
        this.getHandler().listen(this.ui_.annotationsContainer, app.ui.annotate.Annotation.EventType.ANNOTATION_RENDERED,
            goog.bind(this.ui_.markerContainer.handleAnnotationRendered, this.ui_.markerContainer),
            false
        );
*/
/*
        this.getHandler().listen(this.ui_.markerContainer, goog.ui.Component.EventType.CHECK,
            goog.bind(this.ui_.annotationsContainer.activateAnnotatable, this.ui_.annotationsContainer),
            false
        );

        this.getHandler().listen(this.ui_.annotationsContainer, app.ui.annotate.Container.EventType.ANNOTATIONS_HIDDEN,
            goog.bind(this.ui_.markerContainer.handleAnnotationsHidden, this.ui_.markerContainer),
            false
        );
*/
        this.getModel().update();

        console.log(this.getModel());

    }

}


/**
 *
 * @param {!object} r
 * @returns {?app.models.Reply}
 */
app.ui.Post.prototype.loadReply = function(r) {
    //TODO: do I need to clean up this code by cloning na de-referencing?
    if(goog.object.containsKey(this.metadata_.annotations, r.annotation_id)) {
        var annotation = goog.object.get(this.metadata_.annotations, r.annotation_id);
        if(goog.object.containsKey(this.metadata_.participants, r.user_id)) {
            var author = goog.object.get(this.metadata_.participants, r.user_id);
        } else {
            var author = new app.models.Author();
        }
        var reply = new app.models.Reply(annotation, author, r.content);
        annotation.addReply(reply);
        return reply;
    }
    return null;
}

/**
 *
 * @param {!object} result
 * @returns {string}
 */
app.ui.Post.mapResults = function(result) {
    return result.id;
}




//
//
//
//
//
//
//
//
//
//
//
//
//
//
///**
// * @type {Object}
// */
//app.ui.Post.prototype.highlights;
//
///**
// * @type {Object}
// */
//app.ui.Post.prototype.anchors;
//
///**
// * @type {Object}
// */
//app.ui.Post.prototype.users;
//
///**
// * @type {Object}
// */
//app.ui.Post.prototype.annotations;
//
//
//
//
//
//
///**
// *
// * @private
// */
//app.ui.Post.prototype.loadAnnotations_ = function(e) {
//
//    var xhr = e.target;
//    if(xhr.isComplete()) {
//
//        //get all anchors in the RTE of post ready
//        var anchors = goog.dom.findNodes(this.rte_.getElement(), app.ui.Post.isAnnotatableNode);
//
//        //go through all the anchors and create objects for them
//        //TODO: why are we using new closure object here but basic objects below?
//        this.anchors = goog.object.create();
//        goog.array.forEach(anchors, function(anchor) {
//            goog.object.add(this.anchors, anchor.id, new kinyelo.editor.Anchor(anchor.id));
//        }, this);
//
//
//        //retrieve JSON
//        var response = xhr.getResponseJson();
//
//        //get all the annotations in a map
//        this.annotations = goog.array.toObject(response.annotations, function(annotation) {
//            return annotation.id;
//        });
//
//        //get all the highlights in a map
//        if(!goog.isNull(response.highlights)) {
//            this.highlights = goog.array.toObject(response.highlights, function(highlight) {
//                return highlight.id;
//            });
//
//            //iterate through annotations to see if highlight is reference
//            //then check for existence and add to anchor
//            goog.array.forEach(response.annotations, function(annotation) {
//                if(annotation.highlight_id != null) {
//                    //if the the highlights for the document has the highlight associated with the annotation
//                    if(goog.object.containsKey(this.highlights, annotation.highlight_id)) {
//                        var anchor = goog.object.get(this.anchors, annotation.anchor);
//                        //add the highlight to the anchor, keyed by annotation ID
//                        anchor.addHighlight(annotation.id, goog.object.get(this.highlights, annotation.highlight_id));
//                    }
//                }
//            }, this);
//
//        }
//
//        //
//        if(!goog.isNull(response.self)) {
//            this.currentUser = new kinyelo.User(response.self);
//            goog.object.add(this.users, response.self.id, this.currentUser);
//        }
//
//        if(!goog.isNull(response.users)) {
//            goog.array.forEach(response.users, function(user) {
//                goog.object.add(this.users, user.id, new kinyelo.User(user));
//            }, this);
//        }
//
//        this.markerContainer = new app.ui.annotate.MarkerContainer();
//        //TODO: implicit dependency that annotation-markers will be available since we know we are on a post page
//        this.markerContainer.render(goog.dom.getElement('annotation-markers'));
//
//        this.annotationsModel = new kinyelo.annotate.Container(this.currentUser, this.annotations, this.users);
//        this.annotationsContainer = new app.ui.annotate.Container(this.annotationsModel);
//
//        this.eventRegister_.listen(this.rte_, goog.editor.Field.EventType.DELAYEDCHANGE, this.handleDelayedChange_);
//        this.eventRegister_.listen(window, 'beforeunload', this.handleUnload_);
//
//        this.eventRegister_.listen(
//            this.markerContainer,
//            kinyelo.events.annotations.EventType.MARKER_CLICKED,
//            function(e) {
//                console.log('marker clicked');
//            },
//            false);
//    }
//
//}
//
//app.ui.Post.prototype.initListeners = function() {
//    //clear all first
//
//    /*
//
//    this.eventRegister_.listen(
//        this.annotationsContainer,
//        kinyelo.events.annotations.EventType.NEW_ANNOTATION,
//        function(e) {
//            this.handleNewAnnotation(e);
//        },
//        false,
//        this.markerContainer
//    );
//
//    this.eventRegister_.listen(this.rte_.getElement(), [
//        goog.events.EventType.MOUSEOVER,
//        goog.events.EventType.MOUSEMOVE,
//        goog.events.EventType.MOUSEOUT
//    ], this.handleHover_);
//    */
//
//}
//
//
///**
// *
// * @param {goog.events.Event} e
// * @private
// */
//app.ui.Post.prototype.handleDelayedChange_ = function(e) {
//
//    // auto save
//    this.savePost_(e);
//
//}
//
///**
// *
// * @param {goog.events.Event} e
// * @private
// */
//app.ui.Post.prototype.savePost_ = function(e) {
//    //TODO: fix these hard-coded urls
//    var url = "/posts";
//    var callback = null;
//    var postMap = new goog.structs.Map();
//    postMap.set('content', this.rte_.getCleanContents());
//    postMap.set('title', this.title_.getCleanContents());
//    postMap.set('status', 'draft');
//
//    if(goog.isNull(this.post_id_)) {
//        //if we are creating
//        callback = goog.bind(this.handleCreateResponse_, this);
//    } else {
//        //we are saving
//        url += "/" + this.post_id_;
//        postMap.set('_method', 'PUT');
//        callback = goog.bind(this.handleSaveResponse_, this);
//
//    }
//    var postData = goog.Uri.QueryData.createFromMap(postMap);
//    goog.net.XhrIo.send(url, callback, 'POST', postData.toString(), app.ui.Post.postHeaders);
//}
//
//
///**
// *
// * @param {goog.events.Event} e
// */
//app.ui.Post.prototype.handleHover_ = function(e) {
//    var ancestor = goog.dom.getAncestor(e.target, app.ui.Post.isAnnotatableNode, true);
//    //ancestor.id
//    console.log(e);
//}
//
//
//app.ui.Post.prototype.handleUnload_ = function() {
//    if(this.rte_.isModified()) {
//        console.log('modified');
//        return goog.getMsg('You have unsaved changes. Click cancel to return to the page and save them or click OK to discard');
//    }
//}
//
//app.ui.Post.prototype.handleCreateResponse_ = function(e) {
//    var xhr = e.target;
//    if(xhr.isComplete()) {
//        var response = xhr.getResponseJson();
//        console.log(response);
//        this.post_id_ = response.payload.id;
//        //TODO: fix these hard-coded urls
//        history.replaceState(response.payload.id, response.payload.title, '/posts/' + response.payload.id + '/edit');
//    }
//}
//
//app.ui.Post.prototype.handleSaveResponse_ = function(e) {
//    var xhr = e.target;
//    if(xhr.isComplete()) {
//        console.log('complete');
//        console.log(xhr.getResponseJson());
//        //remove the saving indicator
//    } else {
//        console.log('not complete');
//        //show the saving indicator
//    }
//}
///*
//app.ui.Post.prototype.loadPost = function(post) {
//    goog.dom.setTextContent(this.title_, post.title);
//    this.post_id_ = post.id;
//    if(this.rte_.queryCommandValue(goog.editor.Command.USING_LOREM)) {
//        this.rte_.execCommand(goog.editor.Command.CLEAR_LOREM);
//        this.rte_.setHtml(false, post.content, true, false);
//    }
//}*/



app.ui.Post.sampleAnnotations = {
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