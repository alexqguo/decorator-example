const logDecorator = (value, context) => {
  const { kind, name } = context;
  console.log('value', value);
  console.log('context', context);
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