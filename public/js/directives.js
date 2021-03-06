(function (directives) {
  'use strict';

  directives.directive('keybinding', ['$document', '$parse', '$window', function ($document, $parse, $window) {
    var isMac = /Mac|iPod|iPhone|iPad/.test($window.navigator.platform);

    function isModifier(modifier, event, isMac) {
      var isShift = event.shiftKey;
      var isAlt = event.altKey;
      var isCtrl = isMac ? event.metaKey : event.ctrlKey;

      if (modifier) {
        switch (modifier) {
          case 'ctrl+shift':
          case 'shift+ctrl':
            return isShift && isCtrl;
          case 'alt+shift':
          case 'shift+alt':
            return isShift && isAlt;
          case 'ctrl+alt':
          case 'cmd+alt':
            return isAlt && isCtrl;
          case 'cmd+ctrl':
            return event.metaKey && event.CtrlKey;
          case 'shift':
            return isShift;
          case 'ctrl':
          case 'cmd':
            return isCtrl;
          case 'alt':
            return isAlt;
        }
      }
      return false;
    }

    function verifyKeyCode(event, modifier, key) {
      if (String.fromCharCode(event.keyCode) === key) {
        if (modifier) {
          return isModifier(modifier, event, isMac);
        }
        return true;
      }
      return false;
    }

    function verifyCondition($eval, condition) {
      if (condition) {
        return $eval(condition);
      }
      return true;
    }

    return {
      restrict: 'E',
      scope: {
        modifier: '@modifier',
        key: '@key',
        condition: '&',
        invoke: '&'
      },
      link: function (scope, $element, attr) {
        $document.bind('keydown', function (event) {
          if (verifyKeyCode(event, scope.modifier, scope.key) &&
              verifyCondition(scope.$eval, scope.condition)) {
            scope.$apply(scope.invoke);
          }
        });
      }
    };
  }]);

  directives.directive('autoFocus', ['$timeout',
    function ($timeout) {
      return {
        restrict: 'AC',
        link: function (scope, element) {
          $timeout(function () {
            element[0].focus();
          }, 5);
        }
      };
    }
  ]);

  directives.directive('onEnter', [
    function () {
      return {
        restrict: 'A',
        link: function (scope, element, attr) {
          element.bind('keydown', function (event) {
            if (event.keyCode === 13) {
              scope.$apply(function () {
                scope.$eval(attr.onEnter);
              });
            }
          });
        }
      };
    }
  ]);

  directives.directive('onMouseenter', [
    function () {
      return {
        restrict: 'A',
        link: function (scope, element, attr) {
          element.mouseenter(function () {
            scope.$apply(function () {
              scope.$eval(attr.onMouseenter);
            });
          });
        }
      };
    }
  ]);

  directives.directive('onMouseout', ['$timeout',
    function ($timeout) {
      return {
        restrict: 'A',
        link: function (scope, element, attr) {
          element.mouseleave(function () {
            $timeout(function () {
              scope.$apply(function () {
                scope.$eval(attr.onMouseout);
              });
            }, 50);
          });
        }
      };
    }
  ]);

  directives.directive('autoSelect', ['$timeout', function ($timeout) {
    return {
      restrict: 'AC',
      link: function (scope, element) {
        element.bind('focus', function () {
          $timeout(function () {
            element[0].select();
          }, 10);
        });
      }
    };
  }]);
})(angular.module('mdwiki.directives'));

