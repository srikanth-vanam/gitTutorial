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
console.log("background is changed to red by using tagname");
let Li=document.getElementsByTagName('li');
console.log(Li.length);
for (let index = 0; index < Li.length; index++) {
    Li[index].style.backgroundColor='red';
}