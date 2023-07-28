let form=document.getElementById('formId');
var count=0;
var totalValue=0;
let totalPrice=document.getElementById('totalPrice');
form.addEventListener('submit',onSubmit);

// show Output function
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

    list.appendChild(delBtn);
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
                // passing each object of res array to showoutput 
                // showOutput displays the data on html page
                sum=sum+Number.parseInt(res.data[index].price);
                showOutput(res.data[index]);
                totalPrice.textContent='Rs:-'+sum;
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
    // adding total price of products
    // if( sum==0){
    count=count+Number.parseInt(formData.price);    
    // }
    // else if(sum !=0){
    //     count=Number.parseInt(formData.price)+sum;
    // }
    // var value=sum+count;
    totalPrice.textContent='Rs:-'+count;

    function postMethod(obj){
        axios
            .post('https://crudcrud.com/api/a795f6d74f744850b76b7cf75b918922/products',obj)
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err));
    }   
    document.getElementById('price').value="";
    document.getElementById('product').value="";

}

let ulList=document.getElementById('listItems')
ulList.addEventListener('click',onDelete);
function onDelete(e){
    let listItem=e.target.parentElement;
    const objArray=listItem.textContent.split('-');
    var urlAdder;
    console.log(objArray);
    ulList.removeChild(listItem);
    // deletes price value;
    count=count-Number.parseInt(objArray[0].trim());
    totalPrice.textContent='Rs:-'+count;
    // get api to search in server
    axios
        .get('https://crudcrud.com/api/a795f6d74f744850b76b7cf75b918922/products')
        .then((res)=>{
            for (let index = 0; index < res.data.length; index++) {
                if(res.data[index].price == objArray[0].trim() && res.data[index].product == objArray[1].trim()){
                    urlAdder=res.data[index]._id;
                    console.log("id is:",urlAdder);
                }
            }
            // delete api
            axios.delete('https://crudcrud.com/api/a795f6d74f744850b76b7cf75b918922/products/'+urlAdder)
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err));
}