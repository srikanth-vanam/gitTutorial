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


