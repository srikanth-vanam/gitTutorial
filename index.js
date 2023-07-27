const form = document.getElementById('formId');
const detailsDiv = document.getElementById('details');

// on refresh get data from crudCrud and Using showOutput() to add li tag on page
window.addEventListener('DOMContentLoaded',()=>{
  axios
    .get('https://crudcrud.com/api/51e7dff7cbef45caabaed2bba042fd8c/appointment')
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
      .post('https://crudcrud.com/api/51e7dff7cbef45caabaed2bba042fd8c/appointment',formData)
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

// below code not need for this task.......
///////
// var del=document.getElementById('details');
// del.addEventListener('click',deletItem);
function deletItem(e){
    let parent=e.target.parentElement;
    var array=e.target.parentElement.textContent.split('-');
    let key=array[1].trim();
    var arr=JSON.parse(localStorage.getItem(key));
    console.log(arr);
    localStorage.removeItem(key);
    del.removeChild(parent);
    // console.log(array[1].trim());
    // 14th question feature
    if(e.target.id=='edit'){
      document.getElementById('username').value = arr.name;
      document.getElementById('email').value = arr.email;
      document.getElementById('number').value = arr.phone;
      console.log("inside the edit one");
    }
}
