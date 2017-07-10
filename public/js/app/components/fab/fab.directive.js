/**
 * @ngdoc directive
 * @name fab:fab
 * @restrict E
 *
 * @description
 * Flying action button aka fab for items creation quick access
 *
 */
angular.module('fab').directive('fab', [
    '$timeout',
    function($timeout) {
        return {
            restrict: 'E',

            templateUrl: `/js/app/components/fab/fab.html`,
            link: function(scope, el, attrs) {

                let fab = angular.element('#fab'),
                    menu = angular.element('#fab-menu'),
                    wrapper = angular.element('#fab-wrapper')

                $timeout(() =>
                    fab.removeClass('hid'), 1000)




                scope.toggleMenu = () => {
                    wrapper.toggleClass('menu-open')
                    $timeout(() => document.addEventListener('click', closeMenuListener), 200)
                }

                scope.closeMenu = () =>
                    wrapper.removeClass('menu-open')


                const closeMenuListener = (e) => {
                    removeClickListener()
                    scope.closeMenu()
                }

                const removeClickListener = () =>
                document.removeEventListener('click', closeMenuListener)

            }

        }

    }
])
