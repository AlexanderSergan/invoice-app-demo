/**
 * @ngdoc directive
 * @name random.userpic:randomUserpic
 * @overview - sets random male userpic for img element (https://randomuser.me)
 * @restrict - attribute
 *
 */
angular.module('random.userpic').directive('randomUserpic', function() {

  return {

      restrict: 'A',
      link: function (scope, el, attrs) {
           let min = 0,
               max = 99,
               val = Math.floor(Math.random() * (max - min) + min)

           attrs.$set('src', `https://randomuser.me/api/portraits/med/men/${val}.jpg`)
      }
  }


})
