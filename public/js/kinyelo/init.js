goog.require('kinyelo.EditorApp');

(function() {
    var editor = new kinyelo.EditorApp();
    if(goog.isDefAndNotNull(post)) {
        editor.loadPost(post);
    }
})();

