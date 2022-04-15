const logDecorator = (value, args) => {
  const { kind, name } = args;

  if (kind === 'class') {
    // If it's a class decorator, create a new wrapper and return it
    return class extends value {
      constructor(...args) {
        super(...args);
        console.log(`Constructor invoked with arguments: ${JSON.stringify(args)}`);
      }
    }
  }

  if (kind === 'method') {
    // If it's a method decorator, return a new function wrapping the original
    return function(...args) {
      console.log(`Function ${name} invoked with ${JSON.stringify(args)}`);
      return value.apply(this, args);
    }
  }
};

@logDecorator
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  @logDecorator
  greet(otherName) {
    return `Hello ${otherName}! My name is ${this.name}, I am ${this.age} years old`;
  }
}

const p = new Person('Alex', 30);
console.log(p.greet('Jeff Bezos'));