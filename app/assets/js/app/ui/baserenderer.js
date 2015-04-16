goog.provide('app.ui.BaseRenderer');

goog.require('goog.dom');

app.ui.BaseRenderer = function() {

}

/**
 *
 * @type {string}
 */
app.ui.BaseRenderer.EDITABLE_FIELD_CLASS = 'editable';


/**
 * @param {app.models.Author} model
 * @returns {Element}
 */
app.ui.BaseRenderer.prototype.getAvatar = function(model) {

    var avatarImage = goog.dom.createDom(goog.dom.TagName.IMG, {
        'src': model.getAvatarURL()
    });
    var avatar = goog.dom.createDom(goog.dom.TagName.A, {
        'href': model.getURL(),
        'title': 'Go to the profile of ' + model.getUsername(),
        'class': 'avatar',
        'rel': 'nofollow'
    }, avatarImage);

    return avatar;

}

/**
 * Expects a model, specifically an Author model
 * @param {app.models.Author} model
 * @returns {Element}
 */
app.ui.BaseRenderer.prototype.getAuthorLink = function(model) {
    var link = goog.dom.createDom(goog.dom.TagName.A, {
        'href': model.getURL(),
        'title': 'Go to the profile of ' + model.getUsername(),
        'class': 'author'
    }, model.getUsername());

    return link;
}

