const time = (value, context) => {
  const { kind, name } = context;

  if (kind === 'method') {
    const startTime = +new Date(); // execution environment agnostic
    return function(...args) {
      const result = value.apply(this, args);
      const endTime = +new Date();
      const totalTime = endTime - startTime;
      console.log(`Operation ${name} took ${totalTime}ms`);
      return result;
    }
  }
};

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  @time
  greet(otherName) {
    for (let i = 0; i < 9999999999; i++) {
      this.name = this.name;
    }
    return `Hello ${otherName}! My name is ${this.name}, I am ${this.age} years old`;
  }
}

const p = new Person('Alex', 30);
console.log(p.greet('Jeff Bezos'));