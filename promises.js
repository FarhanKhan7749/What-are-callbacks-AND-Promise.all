// What are the callback (Task 8)
/*
const posts = [
    {title:'post one',body:'this is post one',createAt: Math.floor(new Date().getTime()/1000)},
    {title:'post two',body:'this is post two',createAt: Math.floor(new Date().getTime()/1000)}
];

function getPosts(){
    let output = '';
    posts.forEach((post,index)=>{
    output += `<li>${post.title} & create ${Math.floor(new Date().getTime()/1000) - post.createAt} second ago</li>`;
    })
    document.body.innerHTML = output;
}

let intervalId = 0;
function lastEditedInSecondsAgo(){
    clearInterval(intervalId)
    setInterval(()=>{
        let output = '';
        posts.forEach((post,index)=>{
            output += `<li>${post.title} & create ${Math.floor(new Date().getTime()/1000) - post.createAt} second ago</li>`;
        })
        document.body.innerHTML = output;
    },1000);
}
function createPost(post,callback){
    setTimeout(()=>{
        posts.push({...post,createAt: Math.floor(new Date().getTime()/1000)})
        callback();
    },2000)
}

function create4thPost(post,callback){
    setTimeout(()=>{
        posts.push({...post,createAt: Math.floor(new Date().getTime()/1000)})
        callback();
    },3000)
}
createPost({title:'post three', body:'this is post three'},getPosts);
create4thPost({title:'post four', body:'this is post four'},getPosts)
//lastEditedInSecondsAgo();

*/


//1) create a promise as per the youtuber does

const posts = [
    {title:'post one',body:'this is post one',lastSeen : UpdateLastUpdateActivityTime},
    {title:'post two',body:'this is post two',lastSeen : UpdateLastUpdateActivityTime}
];

function getPosts(){
    setTimeout(()=>{
        let output = '';
        posts.forEach((post,index)=>{
            output += `<li>${post.title}</li>`;
        })
        document.body.innerHTML = output;
    },1000);
}
function createPost(post){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            posts.push(post)
            
            const error = false;
            if(!error){
                resolve()
            }else{
                reject("ERROR: Something went wrong")
            }
        },2000); 
    });
};
//2)Create a new function called delete post which uses promises and deletes in 1 second (processing time - mimic it with setimeout). Everytime you call it, it should delete the last element of the array
function deletePost(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(posts.length > 0){
                resolve(posts.pop());
            }else{
                reject("ERROR: array is empty");
            }
        },1000); 
    });
};

function create4thPost(post){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            posts.push(post)
            
            const error = false;
            if(!error){
                resolve()
            }else{
                reject("ERROR: Something went wrong")
            }
        },2000); 
    });
};
//3)Continue deleting the elements up till all the elements are deleted from the array. Now when you delete again an error would be thrown , catch the error and console log in the browser-> Array is empty now. You dont have to use for loop as there are only 3 posts . Just call delete post 3 times. 
// createPost({title: 'post three', body:'this is post three'})
// .then(()=>{
//     getPosts();
//     deletePost().then(()=>{
//         getPosts();
//         deletePost().then(()=>{
//             getPosts();
//             deletePost().then(()=>{
//                 getPosts();
//                 deletePost().then(()=>{
//                     getPosts();
//                 }).catch(err => console.log(err));
//             }).catch(err => console.log(err));
//         }).catch(err => console.log(err));
//     }).catch(err => console.log(err));
// }).catch(err => console.log(err));



//4)Try creating a post (post four) and once the post is created, call delete post after 1 second and delete post 4 .how would you do it. Write the code.
// createPost({title: 'post three', body:'this is post three'})
// .then(()=>{
//     getPosts();
//     create4thPost({title: 'post four', body:'this is post four'}).then(()=>{
//        getPosts();
//        deletePost().then(()=>{
//         getPosts();
//         deletePost().then(()=>{
//             getPosts();
//             deletePost().then(()=>{
//                 getPosts();
//                 deletePost().then(()=>{
//                     getPosts();
//                 }).catch(err => console.log(err));
//             }).catch(err => console.log(err));
//         }).catch(err => console.log(err));
//     }).catch(err => console.log(err));
//     }
//     )
// }).catch(err => console.log(err));



//Promise All
//1) implement the code which the youtuber does based on promise.all
const promise1 = Promise.resolve('hello world');
const promise2 = 20;
const promise3 = new Promise((resolve,reject)=>setTimeout(resolve,2000,'Goodbye'));

Promise.all([promise1,promise2,promise3]).then(values => console.log(values));


const user ={
    username : "farhan",
    lastUpdateActivityTime : "1-jan-2023"
};
//console.log(user);
//2)I want you to create one more promise called updateLastUserActivityTime. Every time the user creates a post, this promise should be parallely called (should execute in 1 second) .When both the promises (createPost and updateLastUserActivityTime resolve), I want you to console log all the posts created and lastActivityTime of the user.
//AND
//3)Once both the above promises are resolved , I want you to delete the last post by calling the deletion promise. Once successfully deleted, I want you to log the new set of Posts of the user.
function UpdateLastUpdateActivityTime () {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            user.lastUpdateActivityTime = new Date().getTime();
            resolve(console.log(`user last activity time = ${user.lastUpdateActivityTime}`))
            reject('EROOR')
        },1000)
    })
}
//UpdateLastUpdateActivityTime();
// this for to create post
Promise.all([createPost({title: 'post three', body:'this is post three'}),UpdateLastUpdateActivityTime()])
.then(()=>{
    getPosts();
    Promise.all([deletePost(),UpdateLastUpdateActivityTime()]).then(()=>{getPosts()});
})


