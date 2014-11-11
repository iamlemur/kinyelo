goog.provide('kinyelo.ui.Test');

goog.require('goog.ui.Control');

/**
 *
 * @constructor
 * @extends {goog.ui.Control}
 */
kinyelo.ui.Test = function() {
    goog.base(this);
}
goog.inherits(kinyelo.ui.Test, goog.ui.Control);

kinyelo.ui.Test.IdFragment = {
    ICON: 'ic',
    LABEL: 'la'
};

/**
 * @inheritDoc
 */
kinyelo.ui.Test.prototype.enterDocument = function() {
    var icon = this.getElementByFragment(kinyelo.ui.Test.IdFragment.ICON);
    this.getHandler().listen(icon, goog.events.EventType.HOVER, function(e) { console.log('hovered over icon'); });
}

kinyelo.ui.Test.prototype.createDom = function() {
    var dom = this.dom_;
    var iconId = this.makeId(kinyelo.ui.Test.IdFragment.ICON);
    var labelId = this.madeId(kinyelo.ui.Test.IdFragment.LABEL);
    var element = dom.createDom('div', undefined,
        dom.createDom('div', {'id': iconId, 'class': 'icon'}),
        dom.createDom('span', {'id': labelId }, 'asiral'));
    this.setElementInternal(element);
}

kinyelo.ui.Test.prototype.canDecorate = goog.functions.FALSE;

/*
kinyelo.ui.Test.prototype.getContentElement = function() {
    //override this when adding children because this is used to determine the parent element of where the children
    //are added, for example, when adding a reply thread control of an annotation, the child reply thread
    //will need to be added in a particular place in the DOM structure
}*/