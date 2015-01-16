goog.provide('kinyelo.Book');

goog.require('goog.events.EventHandler');
goog.require('kinyelo.editor.SingleLineField');
goog.require('kinyelo.editor.SimpleField');
goog.require('goog.ui.ac.RichRemote');

/**
 *
 * @constructor
 */
kinyelo.Book = function() {

    this.eventRegister_ = new goog.events.EventHandler(this);
    this.eventRegister_.listen(window, 'beforeunload', this.handleUnload_);

    /**
     * @type {HTMLElement}
     * @private
     */
    this.container_ = goog.dom.getElementByClass('book-container');
    if(goog.dom.classes.has(this.container_, 'book-edit')) {
        this.initEditMode();
    } else if (goog.dom.classes.has(this.container_, 'book-create')) {
        this.initCreateMode();
    } else {

    }



}
goog.exportSymbol('kinyelo.Book.suggestedPost', kinyelo.Book.suggestedPost);

kinyelo.Book.prototype.initEditMode = function() {
    this.decorateContent();
    this.decoratePostFinder();
}

kinyelo.Book.prototype.initCreateMode = function() {
    this.decorateContent();
    this.decorateSubmitButtons();
}

kinyelo.Book.prototype.decoratePostFinder = function() {
    var queryForm = goog.dom.getElementByClass('add-post-search');
    this.postSearchQueryInput_ = goog.dom.getFirstElementChild(queryForm);
    this.eventRegister_.listen(this.postSearchQueryInput_, goog.events.EventType.KEYUP, this.searchPosts_);
    this.eventRegister_.listen(queryForm, goog.events.EventType.SUBMIT, function(e) {e.preventDefault()});

    //for when toggling between searching reading list, etc.
    var ac = new goog.ui.ac.RichRemote(kinyelo.Book.POST_SEARCH_URL, this.postSearchQueryInput_);

    var postSearchResultsContainer = goog.dom.getElementByClass('add-post-search-results');

}

kinyelo.Book.POST_SEARCH_URL = '/posts/search/title';

kinyelo.Book.prototype.searchPosts_ = function(e) {
    if(e.keyCode == goog.events.KeyCodes.ENTER) {
        e.preventDefault();
        var url = kinyelo.Book.POST_SEARCH_URL;
        var callback = goog.bind(this.handlePostSearchResults_, this);

        var requestMap = new goog.structs.Map();
        requestMap.set('token', this.postSearchQueryInput_.value);
        requestMap.set('max_matches', 10);
        requestMap.set('autocomplete', 0);

        var requestData = goog.Uri.QueryData.createFromMap(requestMap);

        goog.net.XhrIo.send(goog.Uri.create(null, null, null, null, url, requestData), callback, 'GET', null, kinyelo.Book.requestHeaders);
    }
}

kinyelo.Book.prototype.handlePostSearchResults_ = function(e) {
    var xhr = e.target;
    if(xhr.isComplete()) {
        console.log('complete');
        console.log(xhr.getResponseJson());
        //TODO: remove the search indicator
        //TODO: add the results to results container
    } else {
        console.log('not complete');
        //TODO: show the search indicator
    }
}

/**
 * @type {goog.structs.Map}
 * @const
 */
kinyelo.Book.requestHeaders = new goog.structs.Map(goog.net.XhrIo.CONTENT_TYPE_HEADER, goog.net.XhrIo.FORM_CONTENT_TYPE);

kinyelo.Book.suggestedPost = function(item) {
    item.render = function(node, token) {
        var dom_ = goog.dom.getDomHelper(node);
        dom_.appendChild(node, dom_.createTextNode(item.title));
    };
    item.select = function(target) {
        target.value = item.id;
    };
    return item;
}

kinyelo.Book.prototype.decorateSubmitButtons = function() {
    //var customRenderer = goog.ui.ControlRenderer.getCustomRenderer(goog.ui.ButtonRenderer, 'ky');
    var submitButton = this.container_.querySelector('nav.actions > ul > li > button.submit');

    var cancelButton = this.container_.querySelector('nav.actions > ul > li > button.cancel');

    this.eventRegister_.listen(submitButton, goog.events.EventType.MOUSEUP, this.handleSubmit_);
}

kinyelo.Book.prototype.decorateContent = function() {
    this.title_ = new kinyelo.editor.SingleLineField(kinyelo.Book.BOOK_TITLE_ID);
    this.summary_ = new kinyelo.editor.SimpleField(kinyelo.Book.BOOK_SUMMARY_ID);
}

kinyelo.Book.prototype.handleSubmit_ = function(e) {
    var form = goog.dom.getElement('transporter');
    var title = goog.dom.createDom(goog.dom.TagName.INPUT, {type: 'text', name: 'title', value: this.title_.getCleanContents()});
    var summary = goog.dom.createDom(goog.dom.TagName.INPUT, {type: 'text', name: 'summary', value: this.summary_.getCleanContents()});
    goog.dom.append(form, title, summary);
    form.submit();
}

/**
 * @type {string}
 * @const
 */
kinyelo.Book.BOOK_SUMMARY_ID = 'book-summary';

/**
 * @type {string}
 * @const
 */
kinyelo.Book.BOOK_TITLE_ID = 'book-title';

/**
 * @type {kinyelo.editor.Field=}
 * @private
 */
kinyelo.Book.prototype.title_ = null;

/**
 * @type {kinyelo.editor.Field=}
 * @private
 */
kinyelo.Book.prototype.summary_ = null;

/**
 * @type {goog.events.EventHandler=}
 * @private
 */
kinyelo.Book.prototype.eventRegister_ = null;


kinyelo.Book.prototype.handleUnload_ = function() {

}