goog.provide('kinyelo.ui.ac.Remote');

goog.require('goog.ui.ac.Remote');

/**
 * @inheritDoc
 * @constructor
 * @extends {goog.ui.ac.Remote}
 */
kinyelo.ui.ac.Remote = function(url, input, opt_multi, opt_useSimilar) {
  goog.base(this, url, input, opt_multi, opt_useSimilar);
};
goog.inherits(kinyelo.ui.ac.Remote, goog.ui.ac.Remote);

