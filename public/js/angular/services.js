'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('kinyelo.services', []).factory('editableContentService', function($window) {

    var getContainingBlockNode = function() {
        var selectedNode = getSelection().anchorNode.parentNode;
        while(!isBlockNode(selectedNode)) {
            var parent = selectedNode.parentNode;
            if(!isEditable(parent)) {
                break;
            }
            selectedNode = parent;
        }
        return selectedNode;
    }
    return {
        getContainingBlockNode: getContainingBlockNode
    }

});
