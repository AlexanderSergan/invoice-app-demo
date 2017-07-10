angular.module('fab').directive('fab', [
  '$timeout',
 function($timeout) {
  return {
    restrict: 'E',


    templateUrl: `/js/app/components/fab/fab.html`,
    link: function (scope, el, attrs) {

      let fab = angular.element('#fab'),
          menu = angular.element('#fab-menu'),
          wrapper = angular.element('#fab-wrapper')


      scope.toggleMenu = () => {
        console.log('p[em]');
        wrapper.toggleClass('menu-open')
        // scope.closeTimeout()
      }

      // scope.closeTimeout = () =>
      //     $timeout(()=> wrapper.removeClass('menu-open'), 3000)

      $timeout(()=>
       fab.removeClass('hid'), 1000)


    }

  }

}])
