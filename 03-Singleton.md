```js
const mySingleton = (function () {
 
  let instance;
 
  function init() {
 
    function privateMethod() {
      // do sth
    }
 
    const privateRandom = 'I am a private random string';
 
    return {
 
      publicMethod: function () {
        // do sth
      },
 
      publicProperty: 'I am public',
 
      getRandomNumber: function() {
        return privateRandom;
      }
    };
 
  };
 
  return {
 
    getInstance: function () { 
      if ( !instance ) {
        instance = init();
      }
 
      return instance;
    }
  };
})();
 

 
// Usage:
const singleA = mySingleton.getInstance();
const singleB = mySingleton.getInstance();
console.log( singleA.getRandomNumber() === singleB.getRandomNumber() ); // true
```
