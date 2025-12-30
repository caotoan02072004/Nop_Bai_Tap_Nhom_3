// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

Cypress.on('window:before:load', (win) => {
  // 1. Override webdriver
  Object.defineProperty(win.navigator, 'webdriver', {
    get: () => undefined,
    configurable: true
  });
  
  // 2. Override plugins
  Object.defineProperty(win.navigator, 'plugins', {
    get: () => [1, 2, 3, 4, 5],
  });
  
  // 3. Override languages
  Object.defineProperty(win.navigator, 'languages', {
    get: () => ['en-US', 'en', 'vi'],
  });
  
  // 4. Add chrome object
  win.chrome = {
    runtime: {},
  };
  
  // 5. Override permissions
  const originalQuery = win.navigator.permissions?.query;
  if (originalQuery) {
    win.navigator.permissions.query = (parameters) => (
      parameters.name === 'notifications' ?
        Promise.resolve({ state: 'default' }) :
        originalQuery(parameters)
    );
  }
  
  // Ngăn chặn debugger statements
  win.eval = new Proxy(win.eval, {
    apply(target, thisArg, argumentsList) {
      const code = argumentsList[0];
      if (typeof code === 'string' && code.includes('debugger')) {
        return;
      }
      return Reflect.apply(target, thisArg, argumentsList);
    }
  });
  
  // Override console để chặn phát hiện DevTools qua console
  const noop = () => {};
  const consoleProxy = new Proxy(win.console, {
    get(target, prop) {
      // Giữ nguyên các method quan trọng
      if (['log', 'warn', 'error', 'info', 'debug'].includes(prop)) {
        return target[prop];
      }
      return noop;
    }
  });
  
  // 7. Chặn việc phát hiện DevTools qua timing
  const threshold = 160;
  const widthThreshold = win.outerWidth - win.innerWidth > threshold;
  const heightThreshold = win.outerHeight - win.innerHeight > threshold;
  
  // Override các thuộc tính window size
  Object.defineProperty(win, 'outerWidth', {
    get: () => win.innerWidth,
  });
  
  Object.defineProperty(win, 'outerHeight', {
    get: () => win.innerHeight,
  });
  
  // 8. Chặn Firebug detection
  win.Firebug = undefined;
  
  // 9. Override toString để tránh phát hiện
  const originalToString = Function.prototype.toString;
  Function.prototype.toString = function() {
    if (this === win.navigator.webdriver) {
      return 'function webdriver() { [native code] }';
    }
    return originalToString.call(this);
  };
  
  // 10. Chặn DevTools detection qua element inspection
  const element = new Image();
  Object.defineProperty(element, 'id', {
    get: function() {
      // Không làm gì cả
    }
  });
  
  // 11. Disable debugger
  win.Function.prototype.constructor = new Proxy(win.Function.prototype.constructor, {
    construct(target, args) {
      const code = args[args.length - 1];
      if (typeof code === 'string' && (code.includes('debugger') || code.includes('devtools'))) {
        return function() {};
      }
      return Reflect.construct(target, args);
    }
  });
});