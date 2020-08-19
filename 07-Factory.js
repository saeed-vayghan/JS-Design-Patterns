function Factory() {
  return (type) => {
    let employee;

    if (type === 'fulltime') {

      employee = new FullTime();
    
    } else if (type === 'parttime') {

      employee = new PartTime();
    }

    employee.type = type;

    employee.say = function () {
      console.log(this.type, ': rate', this.hourly, '/hour');
    }

    return employee;
  }
}

const FullTime = function () {
  this.hourly = '$12';
};

const PartTime = function () {
  this.hourly = '$11';
};


function run() {
  const employees = [];
  const factory = new Factory();

  employees.push(factory('fulltime'));
  employees.push(factory('parttime'));
  
  for (let i = 0, len = employees.length; i < len; i++) {
    employees[i].say();
  }
}
