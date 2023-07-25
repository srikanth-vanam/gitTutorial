console.log('person1:shows tickets');
console.log('person2:shows tickets');
const bringTickets= async ()=>{
    const getMovieTicks= new Promise( (resolve, reject)=>{
        setTimeout( ()=>{
            resolve('tickets');
        },2000)
    })
    const ticket=await getMovieTicks;
    console.log(` I got the ${ticket}`);

    const getPopcorn= new Promise( (resolve, reject)=>{
        setTimeout( ()=>{
            resolve('popcorn');
        },2000)
    })
    const popcorn=await getPopcorn;
    console.log(` here is the ${popcorn}`);


    const getButter = new Promise( (resolve, reject)=>{
        setTimeout( ()=>{
            resolve('butter');
        },1000)
    })
    const butter=await getButter;
    console.log(` here is the ${butter}`);

    const getColdDrinks= new Promise( (resolve, reject)=>{
        setTimeout( ()=>{
            resolve('coldDrinks');
        },1000)
    })
    const coldDrinks= await getColdDrinks;
    console.log(` here we have ${coldDrinks}`);

    return ticket
}
bringTickets().then((t) => {console.log(t)});
console.log('person4:shows tickets');
console.log('person5:shows tickets');