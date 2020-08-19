```js
function Click(origin) {
  this.origin   = origin,
  this.handlers = [], // observers

  this.subscribe = function(fn) {
    this.handlers.push(fn);
  },

  this.unsubscribe = function(fn) {
    this.handlers = this.handlers.filter(item => { if (item !== fn) return item; })
  },

  this.fire = function(msg) {
    const origin = this.origin

    this.handlers.forEach(function(item) {
      item.call(this, { origin, msg });
    });
  }
}

const Logger = (function() {
  let log = ';'

  return {
    add: function(msg) {
      log += msg + '\n';
    },

    show: function() {
      console.log(log);
      log = '';
    }
  }
})();

function run() {
  const clickHandler = function({ origin, msg }) { 
    logger.add(`${msg} fired in contexts: ${origin}`);
  };

  const fclick = new Click('Firefox');
  const oclick = new Click('Opera');

  fclick.subscribe(clickHandler);
  fclick.subscribe(clickHandler);
  fclick.subscribe(clickHandler);
  fclick.fire('event #1');

  fclick.unsubscribe(clickHandler);
  fclick.fire('event #2');

  oclick.subscribe(clickHandler);
  oclick.fire('event #3');

  logger.show();
}
```
