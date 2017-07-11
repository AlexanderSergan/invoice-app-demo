/**
 * @ngdoc directive
 * @name products.list.directive:directive
 * @restrict 'A'
 *
 * @description
 * Template directive for products list table item
 *
 * @param {number} index - index of iteratee
 * @param {Object} product - product data object
 *
 */
angular.module('products.list').directive('productsListItem', function() {
  return {

    scope: {
      index: '<',
      product: '<',
    },
    replace: true,
    restrict: 'A',
    template: `
    <tr >
        <td class="product-item-index centered">{{index + 1}} </td>
        <td> {{product.name }} </td>
        <td> {{product.price }}$ </td>
        <td>
            <button class="btn btn-primary btn-sm" type="button" ui-sref="products.edit({productId: product.id})" >edit </button>

        </td>
    </tr>
    `

  }
})
