goog.provide('kinyelo.ui.annotate.Button');

goog.require('goog.ui.CustomButton');
goog.require('kinyelo.ui.annotate.ButtonRenderer');

/**
 * @inheritDoc
 * @constructor
 * @extends {goog.ui.CustomButton}
 */
kinyelo.ui.annotate.Button = function(content, opt_renderer, opt_domHelper) {
    goog.base(this, content, opt_renderer, opt_domHelper);
}
goog.inherits(kinyelo.ui.annotate.Button, goog.ui.CustomButton);


goog.ui.registry.setDefaultRenderer(kinyelo.ui.annotate.Button, kinyelo.ui.annotate.ButtonRenderer);

goog.ui.registry.setDecoratorByClassName(kinyelo.ui.annotate.ButtonRenderer.CSS_CLASS,
    function() { return new kinyelo.ui.annotate.Button(); });
