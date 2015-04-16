goog.provide('app.models.Annotation');

goog.require('kinyelo.models.Model');

goog.require('app.models.Author');
goog.require('app.models.Reply');

goog.require('goog.events');
goog.require('goog.Uri.QueryData');

/**
 * @param {!app.models.Post} post
 * @param {?number} id
 * @param {!HTMLElement} annotatable
 * @param {app.models.Author} author
 * @param {!string} content
 * @param {string=} highlight
 * @constructor
 * @extends {kinyelo.models.Model}
 */
app.models.Annotation = function(post, id, annotatable, author,  content, highlight) {

    kinyelo.models.Model.call(this);

    this.setParentEventTarget(post);

    /**
     * we do this because we want to check the anchor even exists before creating the annotation
     * and when checking, we already have the reference
     * and this also
     * @type {!HTMLElement}
     * @private
     */
    this.annotatable_ = annotatable;

    /**
     *
     * @type {!app.models.Author}
     * @private
     */
    this.author_ = author;

    /**
     *
     * @type {!string}
     * @private
     */
    this.content_ = content;

    /**
     *
     * @type {?string}
     * @private
     */
    this.highlight_ = goog.isDefAndNotNull(highlight) ? highlight : null;

    /**
     *
     * @type {Array.<app.models.Reply>}
     * @private
     */
    this.replies_ = [];

    /**
     * @type {?number}
     * @private
     */
    this.id_ = id;

    /**
     * @type {!app.models.Post}
     * @private
     */
    this.post_ = post;

    this.dispatchEvent(app.models.Annotation.EventType.CREATE);

}
goog.inherits(app.models.Annotation, kinyelo.models.Model);

/**
 *
 * @enum {string}
 */
app.models.Annotation.EventType = {
    CREATE: goog.events.getUniqueId('create'),
    DELETE: goog.events.getUniqueId('delete'),
    READY: goog.events.getUniqueId('ready')
}

/**
 * @param {!app.models.Reply} reply
 */
app.models.Annotation.prototype.addReply = function(reply) {
    this.replies_.push(reply);
}

/**
 * @returns {!HTMLElement}
 */
app.models.Annotation.prototype.getAnnotatable = function() {
    return this.annotatable_;
}


/**
 *
 * @returns {!app.models.Author}
 */
app.models.Annotation.prototype.getAuthor = function() {
    return this.author_;
}

/**
 *
 * @returns {!string}
 */
app.models.Annotation.prototype.getContent = function() {
    return this.content_;
}

/**
 *
 * @returns {Array.<app.models.Reply>}
 */
app.models.Annotation.prototype.getReplies = function() {
    return this.replies_;
}

/**
 *
 * @returns {!app.models.Post}
 */
app.models.Annotation.prototype.getPost = function() {
    return this.post_;
}

/**
 *
 * @enum {string}
 */
app.models.Annotation.Type = {
    COMMENT: "comment",
    POST: "post",
    CHARACTER: "character"
}


/**
 *
 * @enum {string}
 */
app.models.Annotation.State = {
    PUBLIC: "PUBLIC",
    PRIVATE: "PRIVATE"
}

/**
 *
 * @param {Function=} opt_callback
 */
app.models.Annotation.prototype.save = function(opt_callback) {
    /**
     * @type {Function}
     */
    this.saveCustomCallback_ = opt_callback;
    var url = "/posts/1/annotations";
    goog.net.XhrIo.send(
        url,
        goog.bind(
            this.afterSave_,
            this
        ),
        "POST",
        goog.Uri.QueryData.createFromMap(this.getDto())
    );
}

app.models.Annotation.prototype.getDto = function() {
    var ret = {
        id: this.id_,
        content: this.content_,
        type: app.models.Annotation.Type.COMMENT,
        annotatable_id: this.getAnnotatable().id,
        state: app.models.Annotation.State.PUBLIC
    };
    return ret;
}

/**
 *
 * @param {string} id
 */
app.models.Annotation.prototype.setId = function(id) {
    this.id_ = id;
    if(this.isValid()) {
        //TODO: re-evaluate, figure that when setting an ID this way always means the annotation was created
        //TODO: on the frontend and now stored on the backend
        this.dispatchEvent(app.models.Annotation.EventType.READY);
    }
}


/**
 *
 * @returns {boolean}
 */
app.models.Annotation.prototype.isValid = function() {
    //TODO: check that model is valid here
    return true;
}


/**
 *
 * @returns {?number}
 */
app.models.Annotation.prototype.getId = function() {
    return this.id_;
}

/**
 *
 * @param {goog.events.Event} e
 * @private
 */
app.models.Annotation.prototype.afterSave_ = function(e) {

    console.log('in the save callback for annotation model', e);

    var result = goog.json.parse(e.target.getResponseText());

    //TODO: sync model with payload?

    if(!goog.isNull(this.saveCustomCallback_)) {
        goog.partial(this.saveCustomCallback_, result)();
        this.saveCustomCallback_ = null;
    }
    if(goog.isNull(this.getId())) {
        this.setId(result.payload.id);
    }

}