'use strict';

/* Controllers */

angular.module('kinyelo.controllers', ['kinyelo.services']).
    controller('editableAreaController', ['editableContentService', '$scope', function(editableContentService, $scope) {
        $scope.showToolbar = false;
        $scope.autoFormat = function(event, element) {
            if(element.tagName.toLowerCase() == "p") {
                var selection = getSelection();
                var content = selection.anchorNode.textContent.trim();
                if(selection.isCollapsed) {
                    if(new RegExp("^\\d+\\.").test(content)) {
                        event.preventDefault();
                        editableContentService.execCommand('insertorderedlist');
                        selection.anchorNode.textContent = selection.anchorNode.textContent.slice(selection.anchorNode.textContent.indexOf('.')+1);
                    }
                }
            }
        };
    }])
    .controller('rteToolbarController', ['editableContentService', '$scope', function(editableContentService, $scope) {
        $scope.activeFormats = [];
        console.log($scope.showToolbar);
        $scope.changeFormat = function(format) {
            $scope.activeFormats.push(format);
            if(editableContentService.formattableBlockNames.indexOf(format) == -1) {
                editableContentService.execCommand(format);
            } else {
                editableContentService.execCommand('formatblock', false, format);
                //editableContentService.formatBlock(format);
            }
        };
        $scope.buttons = [
            {'format': 'bold', 'name': 'b', 'class': 'bold'},
            {'format':'italic', 'name':'i', 'class': 'italic'},
            {'format': 'h1', 'name': 'h1', 'class': 'h1'},
            {'format': 'h2', 'name': 'h2', 'class': 'h2'},
            {'format': 'blockquote', 'name': 'blockquote', 'class': 'blockquote'},
            {'format': 'p', 'name': 'p', 'class': 'p'}];
    }]);