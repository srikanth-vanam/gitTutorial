const form = document.getElementById('formId');
const detailsDiv = document.getElementById('details');

// on refresh get data from crudCrud and Using showOutput() to add li tag on page
window.addEventListener('DOMContentLoaded',()=>{
  axios
    .get('https://crudcrud.com/api/47feaa5cf936419abd3dc565403108c5/appointment')
    .then((res)=>{
      for (let index = 0; index < res.data.length; index++) {
         showOutput(res.data[index]);
      }
      console.log(res.data);
    })
    .catch( (err)=> console.log(err))
})

function showOutput(object){
  const list = document.createElement('li');
  list.textContent = `${object.name} - ${object.email} - ${object.phone}`;
  // Append the paragraph element to the "details" div
  detailsDiv.appendChild(list);

  //  adding delete button to li content
  const deleteBtn = document.createElement('input');
  deleteBtn.id='deleter';
  deleteBtn.type="button";
  deleteBtn.value="Delete";
  list.appendChild(deleteBtn);
  //  edit btn feature
  const editBtn=document.createElement('input');
  editBtn.id='edit';
  editBtn.type='button';
  editBtn.value='edit';
  list.appendChild(editBtn); 
}

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  // Get form input values
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var phoneNumber = document.getElementById('number').value;

    console.log('Uname:', username);
    console.log('email:', email);
    console.log('phNum:', phoneNumber);
  // Create an object with the form data
  const formData = {
    name: username,
    email: email,
    phone: phoneNumber,
  };

  function saveToCrud(){
    axios
      .post('https://crudcrud.com/api/47feaa5cf936419abd3dc565403108c5/appointment',formData)
      .then((res)=>console.log(res.data))
      .catch( (err)=> console.log(err));

  }
  saveToCrud();
  // showOutput will create li tag and add data on html page
  showOutput(formData);
  // Clear input fields after submission
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('number').value = '';
}

var del=document.getElementById('details');
del.addEventListener('click',deleteItem);
// to delete based on id 
// first using GET to get id 
// second using DELETE to delete based on matched id
function deleteItem(e){
    let parent=e.target.parentElement;
    var array=e.target.parentElement.textContent.split('-');
    // console.log("array is",array);
    var urlId;
    // GET to get id by using email via traversing the obj's array
    axios
    .get('https://crudcrud.com/api/47feaa5cf936419abd3dc565403108c5/appointment')
    .then((res)=>{
      // console.log("inside get axios");
      for (let index = 0; index < res.data.length; index++) {
        if(res.data[index].email==array[1].trim()){
            // console.log("inside get axios1");
            urlId=res.data[index]._id;
            // console.log("url obj id is:",urlId);
         }
      }
      // // to delete from crudcrud
      const options={
        method:'delete',
        url:'https://crudcrud.com/api/47feaa5cf936419abd3dc565403108c5/appointment/'+urlId,
      }
      axios(options)
      .then((res)=>console.log(res,"deleted successfully"))
      .catch((err)=>console.log(err));
    })
    .catch((err)=>console.log(err));
    del.removeChild(parent);
    
}
