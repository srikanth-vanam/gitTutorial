const form = document.getElementById('formId');
const detailsDiv = document.getElementById('details');

// on Page-Reloading(refresh) it will get data from crudCrud and Using showOutput() to add li tag on page
window.addEventListener('DOMContentLoaded',()=>{
  axios
    .get('https://crudcrud.com/api/e496ba72a8c24acaab76cb4aa277f33a/appointment')
    .then((res)=>{
      for (let index = 0; index < res.data.length; index++) {
        // to add each data on html page as listItem
         showOutput(res.data[index]);
      }
      console.log(res.data);
    })
    .catch( (err)=> console.log(err))
})

// this fuction will add listItems on html page
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

// submit fun will take the formData & performs PUT or POST based on conditions
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

  // below axios will checks for the newly inserted form-details in server
  // if it is present in server then calls PUT api else calls POST api
  // i have used flagPost boolean variable for api-call toggling b/w the POST & PUT 
  var flagPost=true;
  var putId;
  axios
    .get('https://crudcrud.com/api/e496ba72a8c24acaab76cb4aa277f33a/appointment')
    .then((res)=>{
      for (let index = 0; index < res.data.length; index++) {
        // the if() checks the data is already present in server or not  if it's there then calls Put api's function
        if(res.data[index].name==formData.name || res.data[index].email == formData.email){
            flagPost=false;
            putId=res.data[index]._id;
            updateDetails(formData);
        }
      }
      // this if-block is to call Post-api using the flagPost toggler if the form-data is not on server
      if(flagPost==true){
        saveToCrud();
      }
    })
    .catch((err)=>console.log(err));

  function updateDetails(obj){
    // update's if data is present in the server
    axios.put('https://crudcrud.com/api/e496ba72a8c24acaab76cb4aa277f33a/appointment/'+putId,obj)
    .then((resp)=>console.log("updated succesly",resp))
    .catch((er)=>console.log(er))
  }

  function saveToCrud(){
    //post's if the data is not in the server
    axios
      .post('https://crudcrud.com/api/e496ba72a8c24acaab76cb4aa277f33a/appointment',formData)
      .then((res)=>console.log(res.data))
      .catch( (err)=> console.log(err));
      
  }
  
  // showOutput will create li tag and add data on html page
  showOutput(formData);
  // Clear input fields after submission
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('number').value = '';
}

var del=document.getElementById('details');
del.addEventListener('click',deleteItem);

// This function will delete data from server if clicked on delete btn only
// if edit btn is clicked it will delete data from html page only not from server
function deleteItem(e){
    let parent=e.target.parentElement;
    var array=e.target.parentElement.textContent.split('-');
    var urlId;
    // to delete listItem on html page
    del.removeChild(parent);

    if(e.target.id==='edit'){
      document.getElementById('username').value=array[0].trim();
      document.getElementById('email').value=array[1].trim();
      document.getElementById('number').value=array[2].trim();
    }   
    else{
      // to delete data from server based on id 
      // first using GET to get id 
      // second using DELETE to delete based on matched id
      axios
      .get('https://crudcrud.com/api/e496ba72a8c24acaab76cb4aa277f33a/appointment')
      .then((res)=>{
        // GET to get id by using email via traversing the obj's array
        for (let index = 0; index < res.data.length; index++) {
          if(res.data[index].email==array[1].trim()){
            // collecting id that will be passed to delete api's url
              urlId=res.data[index]._id;
          }
        }
        // // to delete from crudcrud
        const options={
          method:'delete',
          url:'https://crudcrud.com/api/e496ba72a8c24acaab76cb4aa277f33a/appointment/'+urlId,
        }
        axios(options)
        .then((res)=>console.log(res,"deleted successfully"))
        .catch((err)=>console.log(err));
      })
      .catch((err)=>console.log(err));
    }
}
