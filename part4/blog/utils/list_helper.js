const dummy=(blogs)=>{
 return 1
}
const TotalLikes=(blogs)=>{
 if(blogs.length===0)return 0
 if(blogs.length===1)return blogs[0].likes;
 let sum=0;
 for(let blog of blogs){
    sum+=blog.likes;
 }
 return sum;
}
module.exports={dummy,TotalLikes}

