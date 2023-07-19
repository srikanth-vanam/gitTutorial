let listItems=document.getElementById('items');
listItems.addEventListener('click',removeBtn);

function removeBtn(e){

    if(e.target.classList.contains("delete")){
        // console.log(1);
        if(confirm("Are u sure ?")){
            let li=e.target.parentElement;
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
    // 9th question part -> adding only discription to li tag
    let discriptionValue=document.getElementById('discription').value;
    newLi.appendChild(document.createTextNode(" "+discriptionValue));
    console.log(discriptionValue);
    // adding delete and eidt btns
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

//search filter 9th quesiton 
let filter=document.getElementById('filter');
filter.addEventListener('keyup',itemsFilter);

function itemsFilter(e){
    var str=e.target.value.toLowerCase();
    var li=document.getElementsByTagName('li');
    // console.log(str);
    Array.from(li).forEach(item=>{
        // checking first text and second text
        // This line also works--->item.childNodes[1].textContent.toLowerCase().indexOf(str)!=-1)
        if(item.firstChild.textContent.toLowerCase().indexOf(str)!=-1 || item.firstChild.nextSibling.textContent.toLowerCase().indexOf(str)!=-1){
            let str1=document.getElementById('discription').value.toLowerCase();
            let str2=item.firstChild.nextSibling.textContent.trim().toLowerCase();
            if( str1===str2){
                console.log(1);
                let diiv=document.createElement('p');
                diiv.appendChild(document.createTextNode(str1));
                item.appendChild(diiv);
            }
            item.style.display='block'
        }
        else{
            item.style.display='none'
        }
    })
}

// 10th question
let formId=document.getElementById('addForm');
formId.addEventListener('submit',(e)=>{
    e.preventDefault();
    let key=document.getElementById('item').value;
    let Value=document.getElementById('discription').value;
    localStorage.setItem(key,Value);
    console.log(key,Value);
})