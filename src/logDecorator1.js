const logDecorator = (value, args) => {
  const { kind, name } = args;
  console.log('value', value);
  console.log('args', args);
};

class Person {
  constructor(name) {
    this.name = name;
  }

  @logDecorator
  greet(otherName) {
    return `Hello ${otherName}! My name is ${this.name}`;
  }
}

const p = new Person('Alex');
console.log(p.greet('Jeff Bezos'));