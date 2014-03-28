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
        $scope.enforceID = function(event) {
            var node = editableContentService.getContainingBlockNode();
            console.log(node);
            if(!node.getAttribute('id') && node.nodeType == Node.ELEMENT_NODE) {
                node.setAttribute('id', generateHexID());
            }
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
                if(node.parentNode.childNodes[0] == node && node.parentNode.childNodes.length == 1 && node.textContent == "") {
                    console.log('first element and only element, do not let hit enter');
                    event.preventDefault();
                    getSelection().collapse(node, 0);
                    return true;
                }
                //the behavior seems to set the selection as the section when in whitespace
                if(node.previousSibling != null && node.previousSibling.tagName.toLowerCase() == "p" && node.previousSibling.textContent.trim() == "" && node.tagName.toLowerCase() == "p") {
                    console.log(node, node.previousSibling);
                    event.preventDefault();
                    console.log('1st case');
                    var arSections = this.splitSection(node, container, false);
                    arSections[0].parentNode.insertBefore(arSections[1], arSections[0].nextSibling);
                    getSelection().collapse(arSections[1].childNodes[0].childNodes[0], 0);
                    return true;
                }
                if(node.tagName.toLowerCase().trim() == "section") {
                    console.log('2nd case');
                    event.preventDefault();
                    console.log(container, node);
                    //now determine we don't allow(do nothing) or create new section
                    if(container == node.childNodes[0] && container.textContent.length == 0) {
                        console.log('first paragraph and is empty');
                        return true;
                    }
                    //retrieve the current section
                    var arSections = this.splitSection(node, container, false);
                    arSections[0].parentNode.insertBefore(arSections[1], null)
                    getSelection().collapse(arSections[1].childNodes[0], 0);
                } else if(node.textContent.length && node.previousSibling && !node.previousSibling.textContent.length) {
                    console.log('3rd case');
                    //however also need to detect if pressing enter at a filled child of section and if
                    //previous child is already blank
                    event.preventDefault();
                    var arSections = this.splitSection(node, container, true);
                    arSections[0].parentNode.insertBefore(arSections[1], arSections[0]);
                    //getSelection().collapse(arSections[1].childNodes[0], 0);
                } else if(node.textContent.length) {
                    console.log('4th case');
                    //node.setAttribute('id', generateHexID());
                    //this.analyze(node, container, selection);
                }
            }
        };
        $scope.splitSection = function(node, container, cutBefore) {
            console.log(node, container, getSelection());
            container = getSelection().focusNode;
            var newSection = document.createElement('section');
            newSection.setAttribute('id', generateHexID());
            var currentSection;
            if(container.nodeType == Node.TEXT_NODE) {
                currentSection = node.parentNode;
                container = container.parentNode;
            } else {
                currentSection = node;
            }
            console.log("currentSection is now", currentSection);
            var newChildren = [];
            var arChildren = [].slice.call(currentSection.childNodes).filter(function(element) { return element.nodeType == Node.ELEMENT_NODE });
            console.log(arChildren);
            console.log(node);
            if(arChildren.indexOf(node)) {
                if(cutBefore) {
                    for(var i = 0; i < arChildren.indexOf(node); i++) {
                        newChildren.push(currentSection.removeChild(currentSection.childNodes[i]));
                    }
                } else {
                    for(var i = arChildren.indexOf(container); i < arChildren.length; i++) {
                        if(currentSection.childNodes[i]) {
                            newChildren.push(currentSection.removeChild(currentSection.childNodes[i]));
                        }
                    }
                }
            }
            console.log(newChildren);
            for(var i = 0; i < newChildren.length; i++) {
                newSection.appendChild(newChildren[i]);
            }
            return [currentSection, newSection];
        }
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