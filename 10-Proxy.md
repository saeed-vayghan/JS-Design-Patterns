```js
function GeoCoder() {
  this.getLatLng = function(address) {

    if (address === 'Amsterdam') {

      return '52.3700° N, 4.8900° E';

    } else if (address === 'London') {

      return '51.5171° N, 0.1062° W';

    } else {

      return '';
    }
  };
}

function GeoProxy() {
  const geocoder = new GeoCoder();
  const geocache = {};

  return {
    getLatLng: function(address) {
      if (!geocache[address]) {
        geocache[address] = geocoder.getLatLng(address);
      }

      console.log(address, ':', geocache[address]);

      return geocache[address];
    },

    getCount: function() {
      let count = 0;

      for (let code in geocache) {
        count++;
      }

      return count;
    }
  };
};


function run() {
  var geo = new GeoProxy();

  geo.getLatLng('London');
  geo.getLatLng('London');
  geo.getLatLng('Amsterdam');
}
```
