// Copyright 2008 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Plugin to handle enter keys.
 *
 */

goog.provide('kinyelo.editor.plugins.EnterHandler');
goog.require('goog.editor.plugins.EnterHandler');


/**
 * @param {opt_allowEnter=} boolean Whether or not to allow pressing enter in this field
 * @constructor
 * @extends {goog.editor.plugins.EnterHandler}
 */
kinyelo.editor.plugins.EnterHandler = function(opt_allowEnter) {
    goog.editor.plugins.EnterHandler.call(this);
    if(goog.isDefAndNotNull(opt_allowEnter)) {
        this.allowEnter_ = opt_allowEnter;
    }

};
goog.inherits(kinyelo.editor.plugins.EnterHandler, goog.editor.plugins.EnterHandler);

kinyelo.editor.plugins.EnterHandler.prototype.allowEnter_ = true;

/** @inheritDoc */
kinyelo.editor.plugins.EnterHandler.prototype.handleKeyPress = function(e) {
    if (!this.allowEnter_ && e.keyCode == goog.events.KeyCodes.ENTER) {
        e.preventDefault();
        return false;
    }
}

