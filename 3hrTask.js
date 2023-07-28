// count variable for adding product price
var count=0;
let totalPrice=document.getElementById('totalPrice');
//
let form=document.getElementById('formId');
form.addEventListener('submit',onSubmit);

// show Output function  displays the data on html page
function showOutput(obj){
    let ul=document.getElementById('listItems');
    // creating list
    let list=document.createElement('li');
    // adding product details to list
    list.appendChild(document.createTextNode(`${obj.price}-${obj.product}`));
    // delete input
    let delBtn= document.createElement('input');
    delBtn.id='delete';
    delBtn.value='Delete';
    delBtn.type='button';
    // adding del input to list
    list.appendChild(delBtn);
    // adding list to 'ul' 
    ul.appendChild(list);
}

// to get content on page-refresh we have DOMContentLoaded eventlistener
window.addEventListener('DOMContentLoaded',getDetails);
var sum=0;
function getDetails(){
    // get api
    axios
        .get('https://crudcrud.com/api/a795f6d74f744850b76b7cf75b918922/products')
        .then((res)=>{
            // here we get "res.data" in form of array of objects so, we have to traverse.
            for (let index = 0; index < res.data.length; index++) {
                // sum to add price of each product
                sum=sum+Number.parseInt(res.data[index].price);
                // passing each object of res array to showoutput 
                showOutput(res.data[index]);
                // adding sum to display it on html page
                totalPrice.textContent='Rs:-'+sum;
                // storing sum in count variable
                count=sum;
            }
        })
        .catch((err)=>console.log(err));
}

// onsubmit save details to server
function onSubmit(e){
    e.preventDefault();
    // collecting form details
    let price=document.getElementById('price').value;
    let product=document.getElementById('product').value;
    // form-Details object
    const formData={
        price,
        product
    }
    //calling post method
    postMethod(formData);
    //calling showOutput method
    showOutput(formData);
    // adding count after adding new data to server
    count=count+Number.parseInt(formData.price);  
    // adding sum to display it on html page
    totalPrice.textContent='Rs:-'+count;

    function postMethod(obj){
        axios
            .post('https://crudcrud.com/api/a795f6d74f744850b76b7cf75b918922/products',obj)
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err));
    }   
    // making input fields empty
    document.getElementById('price').value="";
    document.getElementById('product').value="";

}

// delete event to delete data from server and also from html page
let ulList=document.getElementById('listItems')
ulList.addEventListener('click',onDelete);

function onDelete(e){
    let listItem=e.target.parentElement;
    const objArray=listItem.textContent.split('-');
    // stores id if found
    var urlAdder;
    // deletes from html page
    ulList.removeChild(listItem);
    // deletes price value;
    count=count-Number.parseInt(objArray[0].trim());
    // adding sum to display it on html page
    totalPrice.textContent='Rs:-'+count;
    // get api to search in server
    axios
        .get('https://crudcrud.com/api/a795f6d74f744850b76b7cf75b918922/products')
        .then((res)=>{
            for (let index = 0; index < res.data.length; index++) {
                if(res.data[index].price == objArray[0].trim() && res.data[index].product == objArray[1].trim()){
                    urlAdder=res.data[index]._id;// storing id in urlAdder
                }
            }
            // delete api
            axios.delete('https://crudcrud.com/api/a795f6d74f744850b76b7cf75b918922/products/'+urlAdder)
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err));
}