const logDecorator = (value, context) => {
  const { kind, name } = context;

  if (kind === 'method') {
    return function(...args) {
      console.log(`Function ${name} invoked with ${JSON.stringify(args)}`);
      return value.apply(this, args);
    }
  }
};

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  @logDecorator
  greet(otherName) {
    return `Hello ${otherName}! My name is ${this.name}`;
  }
}

const p = new Person('Alex', 30);
console.log(p.greet('Jeff Bezos'));