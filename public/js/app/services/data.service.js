/**
 * @ngdoc service
 * @name InvoiceApp:Data
 * @overview provides data service
 * @requires $http
 */
app.service('Data', ['$http', function($http) {

    this.endpoints = {
        invoices: '/api/invoices',
        customers: '/api/customers',
        products: '/api/products'
    }


    this.getInvoices = (id = '') => $http.get(`${this.endpoints.invoices}/${id}`)

    this.getCustomers = (id = '') => $http.get(`${this.endpoints.customers}/${id}`)

    this.getProducts = (id = '') => $http.get(`${this.endpoints.products}/${id}`)

    this.getInvoiceItems = id => $http.get(`${this.endpoints.invoices}/${id}/items`)



    this.saveInvoice = invoice => invoice.id ?
                                  $http.put(`${this.endpoints.invoices}/${invoice.id}`, invoice) :
                                  $http.post(this.endpoints.invoices, invoice)
    // this.saveInvoice = (invoice) => $http.post(this.endpoints.invoices, invoice)
    // this.editInvoice = (invoice) => $http.put(`${this.endpoints.invoices}/${invoice.id}`, invoice)

    this.saveInvoiceItem = (item) => $http.post(`${this.endpoints.invoices}/${item.invoice_id}/items`, item)
    this.deleteInvoiceItem = (invoice_id, product_id) => $http.delete(`${this.endpoints.invoices}/${invoice_id}/items/${product_id}`)

    this.deleteInvoice = (id) => $http.delete(`${this.endpoints.invoices}/${id}`)




}])
