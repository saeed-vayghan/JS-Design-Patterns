
// With object literals
const myModule = {
 
  property: 'value',
 
  config: {
    caching: true,
    language: 'en'
  },
 
  doSomething: function () {
    // do sth
  },
 
  reportConfig: function () {
    console.log(config);
  },
 
  updateConfig: function(newConfig) { 
    if ( typeof newConfig === 'object' ) {
      this.config = newConfig;
    }
  }
};
 
myModule.doSomething();
myModule.updateConfig({
  language: 'fa',
  caching: false
});



// Anonymous function
const basketModule = (function () {
 
  const basket = [];
 
  function doSomethingPrivate() {
    // do sth
  }
 
  function doSomethingElsePrivate() {
    // do sth
  }
 
  return {
 
    addItem: function(values) {
      basket.push(values);
    },
 
    getItemCount: function () {
      return basket.length;
    },
 
    doSomething: doSomethingPrivate,
 
    getTotal: function () {
 
      let i = this.getItemCount();
      let j = 0;
 
      while (i--) {
        j += basket[i].price;
      }
 
      return j;
    }
  };
})();

basketModule.addItem({ item: 'bread', price: 0.5 }); 
console.log( basketModule.getItemCount() );


// Revealing Module Pattern 
const revealingModule = (function () {
 
  const privateVar = 'First Last Namse';
  const publicVar  = 'First Nick Namse';

  function privateFunction() {
    console.log(privateVar);
  }

  function publicSetName( strName ) {
    privateVar = strName;
  }

  function publicGetName() {
    privateFunction();
  }

  // Reveal private functions and properties
  return {
    setName: publicSetName,
    greeting: publicVar,
    getName: publicGetName
  };
})();

revealingModule.setName('My New Name');
