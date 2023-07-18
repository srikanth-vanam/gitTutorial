let listItems=document.getElementById('items');
listItems.addEventListener('click',removeBtn);

function removeBtn(e){

    if(e.target.classList.contains("delete")){
        // console.log(1);
        if(confirm("Are u sure ?")){
            var li=e.target.parentElement;
            listItems.removeChild(li);
        }
    }
}
console.log(listItems)

let formEle=document.getElementById('addForm');
formEle.addEventListener('submit',addListItem);
function addListItem(e){
    e.preventDefault();
    // input value
    var inputValue=document.getElementById('item').value;
    // creating li 
    let newLi=document.createElement('li');
    // adding class
    newLi.className='list-group-item';
    newLi.appendChild(document.createTextNode(inputValue));
    console.log(inputValue);
    // adding btn
    let btn=document.createElement('button');
    btn.className="btn btn-danger btn-sm float-right delete";
    btn.textContent="X";
    
    let editBtn=document.createElement('button');
    editBtn.className="btn btn-primary btn-sm float-right"
    editBtn.textContent='edit'

    newLi.appendChild(btn);
    newLi.appendChild(editBtn);
    // adding li to ul
    listItems.appendChild(newLi);
}