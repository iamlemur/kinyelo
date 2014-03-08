'use strict';


// Declare app level module which depends on filters, and services
angular.module('kinyelo', [
        'kinyelo.directives',
        'kinyelo.services',
        'kinyelo.controllers'
], function($interpolateProvider) {
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');
});
