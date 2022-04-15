const time = (value, context) => {
  const { kind, name } = context;

  if (kind === 'method') {
    return async function(...args) {
      const startTime = +new Date(); // execution environment agnostic
      const result = await value.apply(this, args);
      const endTime = +new Date();
      const totalTime = endTime - startTime;
      console.log(`Operation ${name} took ${totalTime}ms`);
      return result;
    }
  }
};

class ApiClient {
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  // @time
  // post(apiPath, body) {
  //   for (let i = 0; i < 9999999999; i++) {
  //     this.apiContext = this.apiContext;
  //   }
  //   console.log(`Calling ${apiPath} with ${JSON.stringify(body)}`);
  // }

  @time
  async asyncPost(apiPath, body) {
    console.log(`Calling ${apiPath} with ${JSON.stringify(body)}`);

    return new Promise(resolve => {
      setTimeout(resolve, 1500);
    });
  }
}

(async () => {
  const client = new ApiClient({});
  // client.post('/syncKeywords', {});

  await client.asyncPost('/keywords', {});
  console.log('Called API successfully\n');
})();