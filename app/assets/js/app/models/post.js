goog.provide('app.models.Post');

goog.require('kinyelo.models.Model');
goog.require('app.models.Annotatable');

/**
 * @param {goog.events.EventTarget} parent
 * @param {number} id
 * @param {!kinyelo.editor.Field} title
 * @param {!kinyelo.editor.Field} content
 * @param {?app.models.Author=} author
 * @constructor
 * @extends {kinyelo.models.Model}
 */
app.models.Post = function(parent, id, title, content, author) {

    kinyelo.models.Model.call(this);

    this.setParentEventTarget(parent);

    /**
     *
     * @type {number}
     * @private
     */
    this.id_ = id;

    /**
     *
     * @type {!kinyelo.editor.Field}
     * @private
     */
    this.titleField_ = title;

    /**
     *
     * @type {!kinyelo.editor.Field}
     * @private
     */
    this.contentField_ = content;

    /**
     *
     * @type {app.models.Author}
     * @private
     */
    this.author_ = goog.isDefAndNotNull(author) ? author: null;

    /**
     *
     * @type {Array.<app.models.Annotatable>}
     * @private
     */
    this.annotatables_ = [];

    /**
     * @type {Array}
     * @private
     */
    this.annotatableIndexIds_ = []

    /**
     *
     * @type {!Object}
     * @private
     */
    this.participants_ = goog.object.create();

    this.getHandler().listen(this.contentField_,
        goog.editor.Field.EventType.DELAYEDCHANGE,
        this.update,
        false
    );

}
goog.inherits(app.models.Post, kinyelo.models.Model);

/**
 *
 * @returns {string}
 */
app.models.Post.prototype.getTitle = function() {
    return this.titleField_.getOriginalElement().innerHTML;
}

/**
 *
 * @returns {string}
 */
app.models.Post.prototype.getContent = function() {
    return this.contentField_.getOriginalElement().innerHTML;
}


/**
 *
 * @returns {!app.models.Author}
 */
app.models.Post.prototype.getAuthor = function() {
    return this.author_;
}

/**
 *
 * @returns {!kinyelo.editor.Field}
 */
app.models.Post.prototype.getContentField = function() {
    return this.contentField_;
}

/**
 *
 * @param {!app.models.Author} author
 */
app.models.Post.prototype.setAuthor = function(author) {
    this.author_ = author;
}

/**
 *
 * @type {boolean}
 */
app.models.Post.prototype.published = false;

/**
 *
 * @param {goog.events.Event=} opt_e
 */
app.models.Post.prototype.update = function(opt_e) {

    //get rid of deleted annotatables
    goog.array.forEach(this.annotatables_, function(annotatable, index) {
        annotatable.validate();
    }, this);

    //get current set of annotatables
    var annotatableNodes = this.contentField_.getAnnotatableNodes();

    //map existing models to new array, create new model if not existing
    this.annotatables_ = goog.array.map(annotatableNodes, function (node, index, array) {
        var annotatable = this.getAnnotatableById(node.id);
        return annotatable ? annotatable : new app.models.Annotatable(this, node);
    }, this);

    this.annotatableIndexIds_ = goog.array.map(annotatableNodes, function (node, index, array) {
        return node.id;
    }, this)

}


/**
 *
 * @param id
 * @returns {app.models.Annotatable|null}
 */
app.models.Post.prototype.getAnnotatableById = function(id) {
    var index = this.annotatableIndexIds_.indexOf(id);
    if(index != -1) {
        return this.annotatables_[index];
    }
    return null;
}

/**
 *
 * @param {object} data
 * @returns {app.models.Annotation}
 */
app.models.Post.prototype.addAnnotation = function(data) {
    console.log('app.models.Post.prototype.addAnnotation');
    //TODO: handle highlights later
    var annotatable = this.getAnnotatableById(data.annotatable_id);
    if(annotatable) {
        var author = goog.object.get(this.participants_, data.user_id);
        var annotation = new app.models.Annotation(annotatable, data.id, annotatable, author, data.content, null);
        return annotation;
    } else {
        //TODO: send to serve to delete annotation with invalid reference
    }

    return null;
}

app.models.Post.prototype.setParticipants = function(participants) {
    this.participants_ = participants;
}