goog.provide('kinyelo.Post');

goog.require('kinyelo.editor.SingleLineField');
goog.require('kinyelo.editor.AdvancedField');
goog.require('kinyelo.annotate.Container');
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


/**
 *
 * @constructor
 */
kinyelo.Post = function() {
    this.title_ = new kinyelo.editor.SingleLineField(kinyelo.Post.POST_TITLE_ID);
    this.rte_ = new kinyelo.editor.AdvancedField(kinyelo.Post.POST_CONTAINER_ID);
    this.annotations_ = new kinyelo.annotate.Container(this.rte_);
    //this.annotationsScroller_ = new goog.ui.ContainerScroller(this.annotations_);
    this.eventRegister_ = new goog.events.EventHandler(this);
    //this.eventRegister_.listen(this.rte_, goog.editor.Field.EventType.DELAYEDCHANGE, this.handleDelayedChange_);
    this.eventRegister_.listen(window, 'beforeunload', this.handleUnload_);
}

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
 * @type {kinyelo.editor.Field=}
 * @private
 */
kinyelo.Post.prototype.title_ = null;

/**
 * @type {kinyelo.editor.Field=}
 * @private
 */
kinyelo.Post.prototype.rte_ = null;

/**
 * @type {goog.events.EventHandler=}
 * @private
 */
kinyelo.Post.prototype.eventRegister_ = null;


/**
 * @type {goog.structs.Map}
 * @const
 */
kinyelo.Post.postHeaders = new goog.structs.Map(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);

/**
 * @type {number=}
 * @private
 */
kinyelo.Post.prototype.post_id_ = null;

kinyelo.Post.prototype.handleDelayedChange_ = function() {
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