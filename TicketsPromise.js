console.log('person1:shows tickets');
console.log('person2:shows tickets');
const bringTickets=  ()=>{
    const getMovieTicks= new Promise( (resolve, reject)=>{
        setTimeout( ()=>{
            resolve('tickets');
        },2000)
    })
    const getPopcorn=getMovieTicks.then((t)=>{
        console.log(` I got the tickes`);
        return new Promise( (resolve, reject)=>{
            resolve(`${t} popcorn`);
        })
        
    })
    
    const popcorn=getPopcorn.then((th)=>{
         console.log(` I got the popcorn`);
         return new Promise( (resolve, reject)=>{
             setTimeout( ()=>{
                 resolve(`${th} butter`);
             },1000)
         })
     });

    const getColdDrinks=popcorn.then((b)=>{
        console.log(` here is the butter`);
       return new Promise( (resolve, reject)=>{
           setTimeout( ()=>{
               resolve(` ${b} coldDrinks`);
           },1000)
       })
    })
   getColdDrinks.then((cd)=>{
       console.log(` here we have ${cd}`);
   })
}
bringTickets();
console.log('person4:shows tickets');
console.log('person5:shows tickets');