goog.provide('app.ui.annotate.Annotatable');

goog.require('goog.object');
goog.require('goog.events');
goog.require('goog.dom.classes');

goog.require('kinyelo.ui.Component');
goog.require('app.ui.annotate.Annotation');



/**
 *
 * @param {!app.models.Annotatable} model
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {kinyelo.ui.Component}
 */
app.ui.annotate.Annotatable = function(model, opt_domHelper) {
    goog.base(this, opt_domHelper);
    //this.id_ = model.getNode().id;
    this.setModel(model);

    //TODO: set the supported states, p231
    //this.setSupportedState(goog.ui.Component.State.OPENED, true);


}
goog.inherits(app.ui.annotate.Annotatable, kinyelo.ui.Component);

/**
 * @const
 * @type {string}
 */
app.ui.annotate.Annotatable.CSS_CLASS = 'annotation-list';

/** @inheritDoc */
app.ui.annotate.Annotatable.prototype.canDecorate = function() {
    return false;
}


/** @inheritDoc */
app.ui.annotate.Annotatable.prototype.createDom = function() {
    var dom = this.getDomHelper();
    var element = dom.createDom('ul', app.ui.annotate.Annotatable.CSS_CLASS);
    var wrapper = dom.createDom('div', app.ui.annotate.Annotatable.WRAPPER_CLASS, [element, this.getButtons()]);
    //TODO: add data-id here?
    this.setElementInternal(wrapper);

    goog.array.forEach(this.getModel().getAnnotations(), function(annotation) {
        var control = new app.ui.annotate.Annotation(annotation);
        this.addChild(control, true);
    }, this);
    console.log('adding annotatable UI annotations');

}

app.ui.annotate.Annotatable.prototype.getButtons = function() {
    var dom = this.getDomHelper();
    var buttons = dom.createDom(
        goog.dom.TagName.UL,
        app.ui.annotate.Annotatable.ACTION_BUTTON_CLASS,
        [
            this.getButton(app.models.Annotation.Type.COMMENT),
            this.getButton(app.models.Annotation.Type.CHARACTER),
            this.getButton(app.models.Annotation.Type.POST)
        ]
    );
    return buttons;
}

/**
 *
 * @param {!string} type
 * @returns {}
 */
app.ui.annotate.Annotatable.prototype.getButton = function(type) {
    var dom = this.getDomHelper();

    var label = "";
    switch(type) {
        case app.models.Annotation.Type.COMMENT:
            label = "add a comment";
            break;
        case app.models.Annotation.Type.CHARACTER:
            label = "suggest a character";
            break;
        case app.models.Annotation.Type.POST:
            label = "connect a post";
            break;
    }

    var button = dom.createDom(
        goog.dom.TagName.BUTTON,
        type,
        dom.createTextNode(label)
    );

    var li = dom.createDom(
        goog.dom.TagName.LI,
        null,
        button
    );

    return li;


}

/**
 *
 * @returns {Node}
 * @inheritDoc
 */
app.ui.annotate.Annotatable.prototype.getContentElement = function() {
    return this.getElement().firstChild;
}

/**
 * @type {string}
 */
app.ui.annotate.Annotatable.TOGGLE_CLASS = 'js-annotations';

/**
 * @type {string}
 */
app.ui.annotate.Annotatable.ACTION_BUTTON_CLASS = 'actions';

/**
 * @type {string}
 */
app.ui.annotate.Annotatable.WRAPPER_CLASS = 'annotatable-wrapper';


/**
 *
 */
app.ui.annotate.Annotatable.prototype.showAnnotations = function() {
    var dom = this.getDomHelper();
    var html = dom.getDocument().documentElement;
    goog.dom.classes.add(html, app.ui.annotate.Annotatable.TOGGLE_CLASS);

    var overlay = dom.getElement(app.ui.annotate.Annotatable.OVERLAY_ID);
    if(!goog.isNull(overlay)) {
        this.getHandler().listen(overlay, goog.events.EventType.CLICK, goog.bind(this.hideAnnotations, this));
    }

    this.updatePosition();

}

/**
 *
 * @param {goog.events.Event} opt_e
 */
app.ui.annotate.Annotatable.prototype.hideAnnotations = function(opt_e) {

    this.getModel().setActive(false);

    var dom = this.getDomHelper();
    var html = dom.getDocument().documentElement;
    goog.dom.classes.remove(html, app.ui.annotate.Annotatable.TOGGLE_CLASS);
    console.log('hiding annotations');
    this.dispose();

}


/** @inheritDoc */
/*app.ui.annotate.Annotatable.prototype.getId = function() {
    return this.id_;
}*/

/**
 * @const
 * @type {string}
 */
app.ui.annotate.Annotatable.OVERLAY_ID = 'active-nav-overlay';

/**
 * @inheritDoc
 */
app.ui.annotate.Annotatable.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    //TODO: add listeners

    this.showAnnotations();
}

/**
 * @inheritDoc
 */
app.ui.annotate.Annotatable.prototype.exitDocument = function() {
    goog.base(this, 'exitDocument');
    //TODO: add listeners

}


/**
 *
 * @param {goog.events.Event} e
 */
/*app.ui.annotate.Annotatable.prototype.addChild = function(e) {

    console.log('annotatable UI detected creation of annotation, adding a child of the annotatable UI container', this.getChildIds());
    var annotation = e.target;
    var child = new app.ui.annotate.Annotation(annotation);
    goog.base(this, 'addChild', child, false);

}*/

/**
 *
 * @param {goog.events.Event} e
 */
/*app.ui.annotate.Annotatable.prototype.deleteChild = function(e) {
    e.target.getAnnotatable().getId();
    //TODO: have UI annotations return IDs to then remove them
    console.log('annotatable UI detected deletion of annotation, deleting a child of the anntotatable UI container', this.getChildIds());
    //goog.base(this, 'removeChild', )
}*/


app.ui.annotate.Annotatable.prototype.updatePosition = function() {
    var position = goog.style.getClientPosition(/** @type {HTMLElement} */ this.getModel().getNode());
    goog.style.setPosition(this.getElement(), null, position.y);
}