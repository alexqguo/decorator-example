const deprecated = (value, context) => {
  const { kind, name } = context;

  if (kind === 'class') {
    console.warn(`WARNING: Class ${name} is deprecated!!`);
    return class extends value {
      constructor(...args) {
        super(...args);
      }
    }
  }

  if (kind === 'method') {
    return function(...args) {
      console.warn(`WARNING: ${name} is deprecated!!`);
      return value.apply(this, args);
    }
  }
};

@deprecated
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  @deprecated
  greet(otherName) {
    return `Hello ${otherName}! My name is ${this.name}, I am ${this.age} years old`;
  }
}

const p = new Person('Alex', 30);
console.log(p.greet('Jeff Bezos'));