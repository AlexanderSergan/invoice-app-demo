app.service('snackbar', [ function() {

    this.show = text => $.snackbar({content: text, timeout: 1700})

    this.err = () => $snackbar({content: 'Something went wrong'})

}])
