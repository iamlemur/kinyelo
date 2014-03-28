'use strict';

/* Controllers */

angular.module('kinyelo.controllers', ['kinyelo.services'])
    .controller('editableAreaController', ['editableContentService', '$scope', function(editableContentService, $scope) {
        $scope.showToolbar = false;
        $scope.analyze = function(node, container, selection) {
            //node and container are always the same

            console.log("node", node); //<p>
//            console.log("node.nextSibling", node.nextSibling);
//            console.log("node.textContent.length", node.textContent.length); //15
//            console.log("node.nodeType", node.nodeType); //1
//            console.log("node.tagName", node.tagName); //p
            console.log("node.parentNode", node.parentNode); //p
            console.log("getSelection()", selection); //focusNode = textNode, anchorNode = textNode
//            console.log("getSelection().anchorOffset", selection.anchorOffset); //15
//            console.log("getSelection().anchorNode.nodeType", selection.anchorNode.nodeType); //3
//            console.log("getSelection().anchorNode.tagName", selection.anchorNode.tagName); //undefined
//            console.log("getSelection().focusOffset", selection.focusOffset); //15
//            console.log("getSelection().focusNode.nodeType", selection.focusNode.nodeType); //3
//            console.log("getSelection().focusNode.tagName", selection.focusNode.tagName); //undefined
            console.log("getActiveRange()", container); //startContainer = textNode, endContainer = textNode
//            console.log("getActiveRange().commonAncestorContainer", container.commonAncestorContainer); //TextNode
//            console.log("getActiveRange().nodeType", container.nodeType); //3
//            console.log("getActiveRange().tagName", container.tagName); //undefined
//            console.log("getActiveRange().textContent", container.textContent); //
//            console.log("node.parentNode.childrenNodes.lastChild === node", node.parentNode.childrenNodes && node.parentNode.childrenNodes.lastChild === node); //
            console.log("container.parentNode", container.parentNode); //p
            console.log("container.nextSibling", container.nextSibling);
            console.log("isWhitespaceNode", isWhitespaceNode(node));
            console.log("isCollapsedWhitespaceNode", isCollapseWhitespaceNode(node));
        };
        $scope.autoFormat = function(event) {
            var selection = getSelection();
            var range = null;
            if($(selection.anchorNode).text().substr(0,2) == "1.") {
                range = selection.getRangeAt(0);
                range.setStart(selection.anchorNode, 0);
                range.deleteContents();
                range.collapse();
                event.preventDefault();
                myExecCommand('insertorderedlist');
            //if user hits return key
            } else if(event.keyCode == "13") {
                var node = editableContentService.getContainingBlockNode();
                range = getActiveRange();
                var container = range.commonAncestorContainer;

                //if(range.startContainer == range.endContainer)
                //if you are in a text node, content is not empty
                //if(container.nodeType != Node.TEXT_NODE) {
                //the behavior seems to set the selection as the section when in whitespace
                if(node.tagName.toLowerCase().trim() == "section") {
                    event.preventDefault();
                    var newSection = document.createElement('section');
                    //now determine we do nothing/don't allow or create new section
                    //if content follows, we insert before
                    console.log(container);
                    if(container == node.childNodes[0] && container.textContent.length == 0) {
                        console.log('first paragraph and is empty');
                        return true;
                    }
                    console.log(container.nextSibling);
                    //retrieve the current section
                    var currentSection;
                    if(container.nextSibling && container.nextSibling.tagName.toLowerCase() != "section") { //or section?
                        currentSection = node.parentNode;
                    } else {
                        currentSection = node;
                    }
                    console.log(currentSection);
                    var newChildren = [];
                    for(var i = 0; i < currentSection.childNodes.length; i++) {
                        if(currentSection.childNodes[i] == container) {
                            var j = i;
                            while(i < currentSection.childNodes.length) {
                                newChildren.push(currentSection.removeChild(currentSection.childNodes[i]));
                            }
                        }
                    }
                    for(var i = 0; i < newChildren.length; i++) {
                        newSection.appendChild(newChildren[i]);
                    }
                    currentSection.parentNode.insertBefore(newSection, currentSection.nextSibling);
                    getSelection().collapse(newChildren[0], 0);
                } else {
                    //this.analyze(node, container, selection);
                }
            }
        };
    }])
    .controller('rteToolbarController', ['editableContentService', '$scope', function(editableContentService, $scope) {
        $scope.changeFormat = function(format) {
            if(formattableBlockNames.indexOf(format) == -1) {
                myExecCommand(format, false);
            } else {
                var selectedNode = editableContentService.getContainingBlockNode();
                if(format == selectedNode.tagName.toLowerCase()) {
                    myExecCommand('formatblock', false, 'p');
                } else {
                    myExecCommand('formatblock', false, format);
                }
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