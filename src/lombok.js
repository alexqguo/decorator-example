const Builder = (value, context) => {
  if (context.kind === 'class') {
    const propertyMap = new Map();
    const properties = Object.getOwnPropertyNames(new value);

    return class extends value {
      static builder() {
        const builderFns = properties.reduce((acc, cur) => {
          return {
            ...acc,
            [cur]: function(arg) {
              propertyMap.set(cur, arg);
              return this;
            }
          };
        }, {});

        return {
          ...builderFns,
          build: () => {
            const instance = new value();
            propertyMap.forEach((value, key) => {
              Object.defineProperty(instance, key, { value });
            })
            return instance;
          },
        };
      }
      constructor(...args) {
        super(...args);
      }
    };
  }
};

@Builder
class Person {
  name;
  age;
}

console.log(new Person('Alex', 30));
console.log(
  Person.builder()
    .name('Alex')
    .age(30)
    .build()
);
