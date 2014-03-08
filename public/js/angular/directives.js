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
                });
                $element.on('keydown', function(e) {
                    if(e.keyCode == 13) { $scope.autoFormat(e, this); }
                });
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
