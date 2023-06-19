axios.defaults.headers.common['2ndAuthorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// GET REQUEST
function getTodos() {
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10', {
    timeout: 4000
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// POST REQUEST
function addTodo() {
  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'I HAVE ALWAYS LOVED AR',
    completed: false
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// PUT REQUEST
function updateTodoViaPut() {
  axios.put('https://jsonplaceholder.typicode.com/todos/21', {
    title: 'I LOVE AR',
    completed: false
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// PATCH REQUEST
function updateTodoViaPatch() {
  axios.patch('https://jsonplaceholder.typicode.com/todos/21', {
    title: 'I WILL ALWAYS LOVE AR',
    completed: true
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/21', {
    timeout: 4000
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10', {
      timeout: 4000
    }),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10', {
      timeout: 4000
    })
  ])
  .then(axios.spread((todos, posts) => showOutput(posts)))
  .catch(err => console.error(err))
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'I AM YNS'
    }
  }

  axios.post('https://jsonplaceholder.typicode.com/todos', {
    title: 'I HAVE ALWAYS LOVED AR',
    completed: false
  }, config)
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'i love u 2, yns'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase()
      return data
    })
  }

  axios(options)
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/2dooze', {
    timeout: 4000
  })
  .then(res => showOutput(res))
  .catch(err => {
    if (err.response) {
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
    } else if (err.request) {
      console.error(err.request)
    } else {
      console.error(err.message)
    }
  })

}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source()

  axios.get('https://jsonplaceholder.typicode.com/todos', {
    cancelToken: source.token
  })
  .then(res => showOutput(res))
  .catch(thrown => {
    if (axios.isCancel(thrown)) {
      console.log('Uh oh! Ur GET request has been cancelled!')
    }
  })

  if (true) {
    source.cancel('Uh oh! Ur GET request has been cancelled!')
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(`I jus sent a ${config.method.toUpperCase()} request to ${config.url} at ${new Date().getTime()}`)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('put').addEventListener('click', updateTodoViaPut);
document.getElementById('patch').addEventListener('click', updateTodoViaPatch);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
