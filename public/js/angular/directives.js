'use strict';

/* Directives */


angular.module('kinyelo.directives', [])
    .directive('rte', ['editableContentService', function(editableContentService) {
        return {
            //priority: 10,
            //terminal: false,
            //template: null,
            //template: 'Name: {{customer.name}} Address: {{customer.address}}'
            //templateURL: null,
            //replace: true,
            //compile: function (element, attributes, transclude) {},
            link: function ($scope, $element, $attrs) {
                $element.on('keyup mouseup', function(e) {
                    if(!getSelection().isCollapsed) {
                        //show toolbar
                    }
                    //on click, always check position and focus in node to avoid writing in elements like ol and section
                });
                $element.on('keydown', function(e) {
                    $scope.autoFormat(e);
                });
                //if empty, initiate with blank p and section
                var newSection = document.createElement('section');
                var newParagraph = document.createElement('p');
                var newTextContent = document.createTextNode('');
                newParagraph.setAttribute('id', generateHexID());
                newSection.setAttribute('id', generateHexID());
                newParagraph.appendChild(newTextContent);
                newSection.appendChild(newParagraph);
                $element.append(newSection);
                $element.focus();
                getSelection().collapse(newTextContent, 0);
            },
            //scope: true,
            //controller: function ($scope, $elemt, $attrs) {},
            //require: 'rteToolbar'
            //transclude: true
        };
    }])
    .directive('rteToolbar', function() {
        return {
            //same scope as parent
            scope: false,
            //isolate scope delimiting which elements are connected
            //scope: {
                //the highlight property is read-only from the toolbar bc it can't be changed here
                //'highlight': '@highlight'
            //},
            link: function($scope, $element, $attrs) {
                //console.log(toolbarController);
            }
        }
    }).directive('rteToolbarButton', function() {
        return {
            scope: false,
            link: function($scope, $element, $attrs) {
                $element.click(function(e) {
                    e.preventDefault();
                    $scope.changeFormat($attrs.action);
                })
            }
        }
    });
