// Generated by CoffeeScript 1.9.3
(function() {
  var slice = [].slice;

  module.exports = function(options) {
    return function(teacup) {
      var originalMethods, plusClassRegex;
      originalMethods = {};
      (function() {
        var isSelector, normalizeArgs, parseSelector, render, renderContents;
        render = teacup.render, renderContents = teacup.renderContents, isSelector = teacup.isSelector, parseSelector = teacup.parseSelector, normalizeArgs = teacup.normalizeArgs;
        return originalMethods = {
          render: render,
          renderContents: renderContents,
          isSelector: isSelector,
          parseSelector: parseSelector,
          normalizeArgs: normalizeArgs
        };
      })();
      teacup.classStack = ['global', '_'];
      teacup.render = function() {
        var arg, args, i, len, ref, template;
        template = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        for (i = 0, len = args.length; i < len; i++) {
          arg = args[i];
          if (arg.classNamespace) {
            teacup.classStack[0] = arg.classNamespace;
          }
        }
        return (ref = originalMethods.render).call.apply(ref, [teacup, template].concat(slice.call(args)));
      };
      teacup.renderContents = function() {
        var contents, isFunc, ref, rest;
        contents = arguments[0], rest = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        isFunc = typeof contents === 'function';
        if (isFunc) {
          teacup.classStack.push('_');
        }
        (ref = originalMethods.renderContents).call.apply(ref, [teacup, contents].concat(slice.call(rest)));
        if (isFunc) {
          return teacup.classStack.pop();
        }
      };
      teacup.isSelector = function(string) {
        var ref;
        return string.length > 1 && ((ref = string.charAt(0)) === '#' || ref === '.' || ref === '+');
      };
      plusClassRegex = new RegExp('\\+([^\\#\\.\\+]+)', 'g');
      return teacup.parseSelector = function(selector) {
        var i, klass, len, plusClass, ref;
        plusClass = plusClassRegex.exec(selector);
        selector = selector.replace(plusClassRegex, '');
        if (!(klass = plusClass != null ? plusClass[1] : void 0)) {
          originalMethods.parseSelector.call(teacup, selector);
          return;
        }
        teacup.classStack[teacup.classStack.length - 1] = klass;
        selector += '.';
        ref = teacup.classStack;
        for (i = 0, len = ref.length; i < len; i++) {
          klass = ref[i];
          if (klass !== '_') {
            selector += klass + '-';
          }
        }
        return originalMethods.parseSelector.call(teacup, selector.slice(0, -1));
      };
    };
  };

}).call(this);
