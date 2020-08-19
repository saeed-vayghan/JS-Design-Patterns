```js
function Vehicle (model, year, miles) {
  this.model = model;
  this.year  = year;
  this.miles = miles;
 
  this.demo = function () {
    return `${this.model} has been drived ${this.miles} miles`
  };
};
 
// Usage
const civic  = new Vehicle('Honda Civic', 2009, 20000);
const mondeo = new Vehicle('Ford Mondeo', 2010, 5000);
 
console.log(civic.demo());
console.log(mondeo.demo());


// Better Implementation
function Vehicle ( model, year, miles ) {
  this.model = model;
  this.year  = year;
  this.miles = miles;
};
  
// using Object.prototype.newMethod rather than Object.prototype so as to avoid redefining the prototype object
Vehicle.prototype.demo = function () {
  return `${this.model} has been drived ${this.miles} miles`
};
```
