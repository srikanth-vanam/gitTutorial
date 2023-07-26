// GET REQUEST
function getTodos() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos',{params:{_limit:5}})
      .then(res => showOutput(res));
    console.log('GET Request');
  }
  
  // POST REQUEST
  function addTodo() {
    axios
      .post('https://jsonplaceholder.typicode.com/posts')
      .then(res=>showOutput(res));
    console.log('POST Request');
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    axios //used put also
      .patch('https://jsonplaceholder.typicode.com/posts/1',{
        title:"no-tilte",
        isCompleted:false
      })
      .then(res=>showOutput(res));
    console.log('PUT/PATCH Request');
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios
      .delete('https://jsonplaceholder.typicode.com/posts/1')
      .then(res=> showOutput(res))
      .catch(err => console.log(err))
    console.log('DELETE Request');
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    axios.all([
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/posts/1')
    ])
    .then(axios.spread((posts,posts1)=>showOutput(posts1)))// res=> log res[0],log res[1];
    .catch(err => console.log(err))
    console.log('Simultaneous Request');
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    const obj={
      headers:{
        'content-Type':'application/json',
        authorization:'headertoken'
      }
    }
    axios.post('https://jsonplaceholder.typicode.com/posts',{
      title:'headers'
    },obj)
    .then( res => showOutput(res))
    .catch(err => console.log(err))
    console.log('Custom Headers');
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const options={
      method:'get',
      url:'https://jsonplaceholder.typicode.com/posts/1',
      data:{
        title:'transformRspinse'
      },
      transformResponse:axios.defaults.transformResponse.concat(data=>{
        data.title=data.title.toUpperCase();
        return data;
      })
    }
    axios(options).then(res=>showOutput(res))
    console.log('Transform Response');
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios
      .get('https://jsonplaceholder.typicode.com/todoss',{params:{_limit:5}})
      .then(res => showOutput(res))
      .catch(err=>{
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        else if(err.request){
          console.log(err.request);
        }
        else{
          console.log(err.message);
        }
      })
    console.log('Error Handling');
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    console.log('Cancel Token');
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(
    config=>{
      console.log(`method:${config.method} url:${config.url}`);
      return config;
    },error=>{
      return Promise.reject(error);
    }
  );
  // AXIOS INSTANCES
  
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
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);