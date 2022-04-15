const retry = ({ times, errorName }) => {
  let attempts = 0;

  return (value, context) => {
    if (context.kind === 'method') {
      return async function(...args) {
        while (attempts < times) {
          try {
            const result = await value.apply(this, args);
            return result;
          } catch (e) {
            console.log(`Failed with ${e.name}::${e.message}`);
            attempts++;

            if (errorName && e.name !== errorName) throw e;
          }
        }
      }
    }
  };
}

class ApiClient {
  constructor(apiContext) {
    this.apiContext = apiContext;
    this.failCount = 0;
  }

  @retry({ times: 3 })
  async asyncPost(apiPath, body) {
    console.log(`Calling ${apiPath} with ${JSON.stringify(body)}`);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (++this.failCount < 3) reject(new TypeError('Failed to fetch'));

        resolve('Hello');
      }, 1500);
    });
  }
}

(async () => {
  const client = new ApiClient({});

  const result = await client.asyncPost('/keywords', {});
  console.log(`API success: ${result}`);
})();