// The Facade however just defines a simpler interface to a module or system but doesn't add any additional functionality.

const module = (function() {
  const _private = {
    i: 5,

    get: function() {
      console.log('current value:', this.i);
    },

    set: function( val ) {
      this.i = val;
    },

    run: function() {
      console.log('running');
    },

    jump: function(){
      console.log('jumping');
    }
  };
 
  return {
    facade: function( args ) {
      _private.set(args.val);
      _private.get();

      if ( args.run ) {
        _private.run();
      }
    }
  };
}());
 
 
module.facade({ run: true, val: 10 });
