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
const favoriteBlog=(blogs)=>{
    if(blogs.length===0)return {}
    if(blogs.length===1)return blogs[0]
    let MaxIndex=0;
    let maxBlogCount=0;
    for(let i=0;i<blogs.length;i++){
        if(maxBlogCount<blogs[i].likes){
            MaxIndex=i;
            maxBlogCount=blogs[i].likes
        }
    }
    return blogs[MaxIndex]

}
module.exports={dummy,TotalLikes,favoriteBlog}

