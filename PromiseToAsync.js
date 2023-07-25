const posts=[{title:'post1'},{title:'post2'}];
var lastUserActivityTime;

function printPost(){
    posts.forEach( (post)=>{
        console.log(post);
    })
}

function createPost(){
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            posts.push({title:'Post'+(posts.length+1)});
            resolve();
        },500);
    })
}

function updateTime(){
    return new Promise( (resolve, reject) => {
        setTimeout( ()=>{
            lastUserActivityTime=new Date().getTime();
            resolve();
        },1000);
    })
}

function deletePost(){
    return new Promise( (resolve, reject) => {
        setTimeout( ()=>{
            posts.pop();
            resolve();
        },1000);
    })
}

async function main() {
    try {
        await Promise.all([createPost(), updateTime()]);
        printPost();

        console.log("Last Active Time is:", lastUserActivityTime);

        await deletePost();
        printPost();
    } catch (error) {
        console.error(error);
    }
}

main();