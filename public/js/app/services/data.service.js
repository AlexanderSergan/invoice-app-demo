app.service('Data', ['$http', function($http) {

  this.endpoints = {
    invoices: '/api/invoices',
    customers: '/api/customers',
    products: '/api/products'
  }


  this.getInvoices = (id = '') => $http.get(`${this.endpoints.invoices}/${id}`)

  this.getCustomers = (id = '') => $http.get(`${this.endpoints.customers}/${id}`)

  this.getProducts = (id = '') => $http.get(`${this.endpoints.products}/${id}`)

  this.saveInvoice = (invoice) => $http.post(this.endpoints.invoices, invoice)

  this.deleteInvoice = (id) => $http.delete(`${this.endpoints.invoices}/${id}`)




} ])
