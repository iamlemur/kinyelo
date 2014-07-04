goog.provide('kinyelo.EditorApp');

goog.require('kinyelo.editor.AdvancedField');
goog.require('goog.events.EventHandler');
goog.require('goog.dom');
goog.require('goog.editor.Command');



/**
 *
 * @constructor
 */
kinyelo.EditorApp = function() {
    this.rte_ = new kinyelo.editor.EdvancedField(kinyelo.editor.AdvancedField.POST_CONTAINER_ID);
    this.eventRegister_ = new goog.events.EventHandler(this);
    this.eventRegister_.listen(this.rte_, goog.editor.Field.EventType.DELAYEDCHANGE, this.handleDelayedChange_);
    this.eventRegister_.listen(window, 'beforeunload', this.handleUnload_);
    this.title_ = goog.dom.getElement(kinyelo.EditorApp.POST_TITLE_ID);
}

/**
 * @type {goog.events.EventHandler=}
 * @private
 */
kinyelo.EditorApp.prototype.eventRegister_ = null;

/**
 * @type {kinyelo.editor.Field=}
 * @private
 */
kinyelo.EditorApp.prototype.rte_ = null;

/**
 * @type {HTMLElement=}
 * @private
 */
kinyelo.EditorApp.prototype.title_ = null;

/**
 * @type {string}
 * @const
 */
kinyelo.EditorApp.POST_TITLE_ID = 'post-title';

/**
 * @type {goog.structs.Map}
 * @const
 */
kinyelo.EditorApp.postHeaders = new goog.structs.Map(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);

/**
 * @type {number=}
 * @private
 */
kinyelo.EditorApp.prototype.post_id_ = null;

kinyelo.EditorApp.prototype.handleDelayedChange_ = function() {
    //TODO: fix these hard-coded urls
    var url = "/posts";
    var callback = null;
    var postMap = new goog.structs.Map();
    postMap.set('content', this.rte_.getCleanContents());
    postMap.set('title', goog.dom.getTextContent(this.title_));
    postMap.set('status', 'draft');

    console.log('post id', this.post_id_);
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
    goog.net.XhrIo.send(url, callback, 'POST', postData.toString(), kinyelo.EditorApp.postHeaders);

}


kinyelo.EditorApp.prototype.handleUnload_ = function() {
    if(this.rte_.isModified()) {
        console.log('modified');
        return goog.getMsg('You have unsaved changes. Click cancel to return to the page and save them or click OK to discard');
    }
}

kinyelo.EditorApp.prototype.handleCreateResponse_ = function(e) {
    var xhr = e.target;
    if(xhr.isComplete()) {
        var response = xhr.getResponseJson();
        console.log(response);
        this.post_id_ = response.payload.id;
        //TODO: fix these hard-coded urls
        history.replaceState(response.payload.id, response.payload.title, '/posts/' + response.payload.id + '/edit');
    }
}

kinyelo.EditorApp.prototype.handleSaveResponse_ = function(e) {
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

kinyelo.EditorApp.prototype.loadPost = function(post) {
    goog.dom.setTextContent(this.title_, post.title);
    this.post_id_ = post.id;
    if(this.rte_.queryCommandValue(goog.editor.Command.USING_LOREM)) {
        this.rte_.execCommand(goog.editor.Command.CLEAR_LOREM);
        this.rte_.setHtml(false, post.content, true, false);
    }
}