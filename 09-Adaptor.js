// old interface
function Shipping() {
  this.request = (zipStart, zipEnd, weight) => {
    const cost = '$49.75';
    console.log(cost);
    return cost;
  }
}

// new interface
function AdvancedShipping() {
  this.login          = (credentials) => { /* ... */ };
  this.setStart       = (start) => { /* ... */ };
  this.setDestination = (destination) => { /* ... */ };
  this.calculate      = (weight) => { return '$39.50'; };
}

// adapter interface
function ShippingAdapter(credentials) {
  const shipping = new AdvancedShipping();

  shipping.login(credentials);

  return {
    request: (zipStart, zipEnd, weight) => {
      shipping.setStart(zipStart);
      shipping.setDestination(zipEnd);

      const cost = shipping.calculate(weight);
      console.log(cost);
      return cost;
    }
  };
}


function run() {
  const shipping = new Shipping();

  const credentials = { token: '30a8-6ee1' };
  const adapter     = new ShippingAdapter(credentials);

  // original shipping object and interface
  let cost = shipping.request('78701', '10010', '2 lbs');

  // new shipping object with adapted interface
  cost = adapter.request('78701', '10010', '2 lbs');
}
