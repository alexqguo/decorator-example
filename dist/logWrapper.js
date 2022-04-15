function logWrapper(fn) {
  return function (...args) {
    console.log(`Function invoked with ${JSON.stringify(args)} at ${+new Date()}`);
    return fn.apply(this, args);
  };
}

;

class Person {
  constructor(name) {
    this.name = name;
  }

  intro() {
    return `My name is ${this.name}`;
  }

}

const p = new Person('Alex');
const decoratedIntro = logWrapper(p.intro.bind(p));
console.log(decoratedIntro());