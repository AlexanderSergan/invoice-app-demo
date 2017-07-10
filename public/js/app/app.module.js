const app = angular.module('InvoiceApp', [
    'ui.router',

    'invoice',
    'invoices.list',
    'invoices.edit',

    'customer',
    'customer.edit',
    'customers.list',

    'random.userpic'
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

      .state('customers', {
          url: '/customers',
          component: 'customersList',
          resolve: {
              customers: (Data, snackbar) => Data.getCustomers().then(
                  res => res.data,
                  err => snackbar.err()
              )
          }
      })

      .state('customers.edit', {
        url: '/edit/{customerId:[0-9]+|new}',
        resolve: {
            customerId: $transition$ => $transition$.params().customerId
        },
        views: {
            'edit@customers': {
                component: 'customerEdit'
            }
        }
      })

});

// app.run($rootScope => {
//
// })
