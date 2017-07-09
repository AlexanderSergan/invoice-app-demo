/**
 * @ngdoc component
 * @name invoiceEdit
 */
angular.module('invoices.edit').component('invoiceEdit', {

    bindings: {
        invoiceId: '<'
    },
    templateUrl: '/js/app/components/invoiceEdit/invoiceEdit.html',
    controller: function(Data, snackbar, $state) {
        this.customers = []
        this.products = []
        this.invoiceItems = []
        this.quantity = ''


        this.$onInit = () => {

            this.fetchData() //gets customers and products for selects
            this.showModal()

            if (this.invoiceId == 'new') return;

            this.initInvoiceById(this.invoiceId)
        }


        this.fetchData = () => {
            Data.getCustomers().then(
                res => this.customers = res.data            ,
                err => snackbar.err()
            )
            Data.getProducts().then(
                res => this.products = res.data,
                err => snackbar.err()
            )
        }


        this.initInvoiceById = id => {
            Data.getInvoices(id).then(
                res => {
                    if (res.data === null) {
                        snackbar.show('This invoice was probably removed', this.invoiceId)
                        // this.handleClose()
                    }
                    this.invoice = res.data

                },
                err => snackbar.err()
            )
            this.initInvoiceItems(id)
        }


        this.initInvoiceItems = id =>
            Data.getInvoiceItems(id).then(
                res => this.invoiceItems = res.data,
                err => snackbar.err()
            )



        /**
         *         Methods
         */

        this.saveInvoice = () => {
            this.invoice.total  = this.getInvoiceTotal()
            this.invoice.discount = this.invoice.discount || 0
            Data.saveInvoice(this.invoice).then(
                res => {
                    snackbar.show(this.invoice.id ? 'Invoice updated.' : 'Invoice saved.')
                    if (this.invoiceId == 'new') {
                      $state.go('invoices.edit', {invoiceId: res.data.id}, {reload: true, notify: true})
                    }
                    this.invoice = res.data
                  },
                  err => snackbar.err()
            )
        }


        this.saveInvoiceItem = item => Data.saveInvoiceItem(item).then(
          res => {
              snackbar.show('Invoice item added.')
              this.invoiceItems.push(res.data)
              this.newProductId = ''
              this.quantity = ''

              this.saveInvoice()
          },
          err => snackbar.err()
        )

        this.getInvoiceTotal = () => {
            if (this.invoiceItems.length === 0)
                return 0

            let total = 0
            this.invoiceItems.map( item =>
                total += this.invoice.discount
                       ? item.quantity * this.getItemPrice(item.product_id) - item.quantity * this.getItemPrice(item.product_id) * this.invoice.discount/100
                       : item.quantity * this.getItemPrice(item.product_id)
             )
            return total
        }

        this.getItemPrice = (id) => {
            let price
            this.products.map ( product => {
              if (product.id == id) {
                price = product.price
              }
            })
            return price
        }


        /**
         *    Handlers
         */

        this.handleDiscountChange = () =>
            this.saveInvoice()


        this.handleProductDelete = index => {
            this.invoiceItems.splice(index, 1)
            this.saveInvoice()
          }

        this.handleAddInvoiceItem = () => {
            let item = {
                invoice_id: this.invoice.id,
                product_id: this.newProductId,
                quantity: this.quantity
            }
            this.saveInvoiceItem(item)
        }

        this.handleClose = () =>{
            $state.go('invoices', {}, { 'reload' : true})

            setTimeout(()=> {                             // modal quick fix; TODO: needs investigation
              $('.modal-backdrop.fade.in').hide()
            }, 100)
        }

        this.showModal = () => {
            this.modalNewInvoice = angular.element('#modal-new-invoice')
            this.modalNewInvoice.modal()
            this.modalNewInvoice.on('hidden.bs.modal', e => this.handleClose()
            )
        }


    }

})
