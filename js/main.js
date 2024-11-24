class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
    this.employeeType = "";
  }
}

class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.employeeType = "Part Time";
    this.calculatePay();
  }

  calculatePay = () => {
    this.annualSalary = this.payRate * this.hours * 52;
  };
}

class Manager extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.employeeType = "Manager";
    this.calculatePay();
  }

  calculatePay = () => {
    this.annualSalary = this.payRate * 40 * 52 - 1000;
  };
}

class Main {
  constructor() {
    this.employees = [
      new Manager("John", 35, 25, 40),
      new PartTime("Luke", 22, 10, 15),
      new Manager("Frodo", 42, 25, 40),
    ];
    this.menu();
  }

  menu = () => {
    console.clear();
    console.log("Cade's Subshop");
    console.log("ID" + "\tName" + "\tSalary" + "\tHours" + "\tPay" + "\tFT/PT");

    this.displayEmployee();

    const menuSelect = prompt(
      "Enter your selection: " +
        "\n1. Add Employee" +
        "\n2. Remove Employee" +
        "\n3. Edit Employee" +
        "\n4. Display Employees" +
        "\n5. Exit"
    );

    if (menuSelect === "1") {
      this.addEmployee();
    } else if (menuSelect === "2") {
      this.removeEmployee();
    } else if (menuSelect === "3") {
      this.editEmployee();
    } else if (menuSelect === "4") {
      this.displayEmployees();
      this.menu();
    } else if (menuSelect === "5") {
      alert("Have a nice day!");
      return;
    } else {
      alert("Invalid Option, select a new choice from the menu.");
      this.menu();
    }
  };

  addEmployee = () => {
    const name = prompt("Enter Employee Name: ");
    const age = parseInt(prompt("Enter Employee Age: "));
    const payRate = parseFloat(prompt("Enter thier pay rate: "));
    const hours = parseInt(prompt("Enter their hours per week: "));

    let newEmployee;
    if (hours >= 40) {
      newEmployee = new Manager(name, age, payRate, hours);
    } else {
      newEmployee = new PartTime(name, age, payRate, hours);
    }

    this.employees.push(newEmployee);
    alert(`${newEmployee.name} added Successfully`);
    this.menu();
  };

  removeEmployee = () => {
    const removingEmployee = prompt(
      "Enter the employee ID or name to be removed"
    );
    let employeeToBeRemoved;

    if (isNaN(removingEmployee)) {
      employeeToBeRemoved = this.employees.filter(
        (employee) =>
          employee.name.toLowerCase() === removingEmployee.toLowerCase()
      );

      if (employeeToBeRemoved.length > 0) {
        this.employees = this.employees.filter(
          (employee) =>
            employee.name.toLowerCase() !== removingEmployee.toLowerCase()
        );
        alert(`Employee was Successfully removed`);
      } else {
        alert("Employee not found");
      }
    } else {
      const id = parseInt(removingEmployee) - 1;
      if (this.employees[id]) {
        this.employees.splice(id, 1);
        alert(`Employee was removed Successfully`);
      } else {
        alert("Employee not found");
      }
    }
    this.menu();
  };

  editEmployee = () => {
    const employeeToBeEditied = prompt(
      "Enter the employee ID to edit pay rate"
    );
    const id = parseInt(employeeToBeEditied) - 1;

    if (this.employees[id]) {
      const newPay = parseFloat(prompt("Enter new pay rate: "));
      const employee = this.employees[id];
      employee.payRate = newPay;
      employee.calculatePay();

      alert(`Employees pay has been updated successfully`);
    } else {
      alert("Employee not found");
    }
    this.menu();
  };

  displayEmployee = () => {
    this.employees.forEach((employee, index) => {
      console.log(
        `${index + 1}\t${employee.name}\t$${employee.annualSalary.toFixed(
          2
        )}\t${employee.hours}\t$${employee.payRate.toFixed(2)}\t${
          employee.employeeType
        }`
      );
    });
  };
}

(() => {
  new Main();
})();
