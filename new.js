const form=document.getElementById('formId');
// const btn=document.getElementById('addExpense');
form.addEventListener('submit',formDetails);

// event handeler to handle the form details.
function formDetails(e){
    e.preventDefault();
    let amount=document.getElementById('amount').value;
    let description=document.getElementById('description').value;
    let category=document.getElementById('category').value;
    
    console.log(amount,description,category);
    const formObject={
        "amount":amount,
        "description":description,
        "category":category
    }
    // Unordered list
    let ul=document.getElementById('listItems');
    // creating new list 
    let li=document.createElement('li');
    // appending form details into list
    li.appendChild(document.createTextNode(`${amount}-${description}-${category}`));
    // appending li to ul
    ul.appendChild(li);
    //adding to localStorage
    localStorage.setItem(description,JSON.stringify(formObject));
    // adding delete,edit btns (inputs)
    let deleteBtn=document.createElement('input');
    deleteBtn.type='button';
    deleteBtn.id='delBtn';
    deleteBtn.value="Delete Expense";
    li.appendChild(deleteBtn);
    //edit btn
    let editBtn=document.createElement('input');
    editBtn.id='edit';
    editBtn.type="button";
    editBtn.value="Edit Expense";
    li.appendChild(editBtn);
    // making form inputs to empty
    document.getElementById('amount').value="";
    document.getElementById('description').value="";

}

const ul=document.getElementById('listItems');
ul.addEventListener('click',expenseManager);

function expenseManager(e){
    e.preventDefault();
    // getting list element from button
    let liDel=e.target.parentElement;
    // getting click list textcontent
    let editArr=liDel.textContent.split('-');
    let key=editArr[1];

    // if clicks on editBtn 
    if(e.target.id==='edit'){
        let editObj=JSON.parse(localStorage.getItem(key));
        document.getElementById('amount').value=editObj.amount;
        document.getElementById('description').value=editObj.description;
        document.getElementById('category').value=editObj.category;
    }
    
    
    localStorage.removeItem(key);
    ul.removeChild(liDel);
    
}