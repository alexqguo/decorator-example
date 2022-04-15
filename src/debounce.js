const debounceImpl = (func, timeout) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
};

const debounce = (timeout) => {
  return (value, context) => {
    if (context.kind === 'method') {
      return debounceImpl(value, timeout);
    }
  };
}

class ApiClient {
  constructor(apiContext) {
    this.apiContext = apiContext
  }

  // @debounce(1000)
  post(apiPath, body) {
    console.log(`Calling ${apiPath} with ${JSON.stringify(body)}`);
  }
}

const client = new ApiClient({ csrfToken: '12345' });

for(let i = 0; i < 1000; i++) {
  client.post('/keywords/recommendations', { campaignId: 'ABCDE' });
}