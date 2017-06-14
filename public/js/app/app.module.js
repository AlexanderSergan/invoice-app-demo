const app = angular.module('MockApp', [
    'ui.router',
    'invoices'
])


app.config(function($stateProvider, $urlRouterProvider) {


    $stateProvider

        .state('invoices', {
            url: '/',
            templateUrl: '/js/app/invoices/invoices.html',
            controller: 'InvoicesController'
        })

        $urlRouterProvider.otherwise('/invoices');
});
