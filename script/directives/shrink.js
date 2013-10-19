
(function() {

  'use strict';
  
  angular.module('receipter').directive('shrink', function() {
    
    return {
      restrict: 'A',
      replace: false,
      transclude: false,
      link: function() {
        var main = document.querySelector('main');
        var header         = document.querySelector('header');

        main.addEventListener('scroll',function() {
          if (this.scrollTop > header.offsetHeight) {
            header.style['-webkit-transform'] = 'translate3d(0,-' + header.offsetHeight +  'px,0)';
          } else {
            header.style['-webkit-transform'] = 'translate3d(0,0,0)';
          }
        });
      }
    };

  });

})();