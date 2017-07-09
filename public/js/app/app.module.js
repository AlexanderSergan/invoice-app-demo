const app = angular.module('InvoiceApp', [
    'ui.router',
  
    'invoice',
    'invoices.list',
    'invoices.edit'
])


app.config(function($stateProvider, $urlServiceProvider) {

    $urlServiceProvider.rules.otherwise({
        state: 'invoices'
    });

    $stateProvider
        .state('invoices', {
            url: '/invoices',
            component: 'invoicesList',
            resolve: {
                invoices: (Data, snackbar) => Data.getInvoices().then(
                    res => res.data,
                    err => snackbar.err()
                )
            }
        })

        .state('invoices.edit', {
            url: '/edit/{invoiceId:[0-9]+|new}',
            resolve: {
                invoiceId: $transition$ => $transition$.params().invoiceId
            },
            views: {
                'edit@invoices': {
                    component: 'invoiceEdit',
                }
            }
      })

});

// app.run($rootScope => {
//
// })
