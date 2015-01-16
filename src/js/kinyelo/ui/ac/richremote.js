goog.provide('kinyelo.ui.ac.RichRemote');

goog.require('goog.ui.ac.RichRemote');



/**
 * @inheritDoc
 * @constructor
 * @extends {goog.ui.ac.RichRemote}
 */
kinyelo.ui.ac.RichRemote = function(url, input, opt_multi, opt_useSimilar) {
    goog.base(this, url, input, opt_multi, opt_useSimilar);
    var matcher = new kinyelo.ui.ac.RichRemoteArrayMatcher(url,
        !opt_useSimilar);
    this.matcher_ = matcher;
};
goog.inherits(kinyelo.ui.ac.RichRemote, goog.ui.ac.RichRemote);

