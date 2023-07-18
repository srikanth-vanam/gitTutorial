let header=document.getElementById('header-title');
console.log(header.textContent);
console.log(header.innerText);
header.style.border='2px solid black'
// header.innerText="Alvidha"
// console.log(header.textContent);
// console.log(header.innerText);
// header.innerHTML='<h4>HEllO</h4>'

let li=document.querySelectorAll('#items');
// console.log(li);
for (let index = 0; index < li.length; index++) {
    console.log(li[index].textContent);
}

let Title=document.querySelector('.title');
Title.style.fontWeight='bold';
Title.style.color='green';


let newLi=document.getElementsByClassName('list-group-item');
console.log(newLi.length);
for(let i=0;i<newLi.length;i++){
    newLi[i].style.backgrounColor='red';
}
// console.log("background is changed to red by using tagname");
// let Li=document.getElementsByTagName('li');
// console.log(Li.length);
// for (let index = 0; index < Li.length; index++) {
//     Li[index].style.backgroundColor='red';
// }

// 6th question
// Li[1].style.backgroundColor='green'
// console.log("TEXT color is green")
// Li[2].style.display='none'

// let liTag=document.querySelectorAll('.list-group-item:nth-child(odd)')
// liTag.forEach(element => {
//     element.style.backgroundColor='green'
// });

// parentNode and Element
let Item=document.querySelector('#items');
console.log(Item.parentNode);
console.log(Item.parentElement);
//childNodes
console.log(Item.childNodes);
console.log(Item.children);
Item.children[1].style.backgroundColor='yellow'
//firstChild , firstElementChild & lastChild / ElememtChild
console.log(Item.firstChild)
console.log(Item.firstElementChild)
console.log(Item.lastChild)
console.log(Item.lastElementChild)
//sibblings
console.log(Item.nextSibling);
console.log(Item.nextElementSibling);
console.log(Item.previousSibling);
console.log(Item.previousElementSibling);
// Creatng Element
//Adding Hello in header
let newDiv=document.createElement('div');
console.log(newDiv);
let container=document.querySelector('header .container');
let h1=document.querySelector('header h1');
let newText=document.createTextNode('Hello');
newDiv.appendChild(newText);
console.log(newDiv);
container.insertBefore(newDiv,h1);
// Adding hello in List-Items
let ulItems=document.querySelector('#items');
let li1=document.querySelector('.list-group-item');
let hello=document.createTextNode('Hello'); 
ulItems.insertBefore(hello,li1);
