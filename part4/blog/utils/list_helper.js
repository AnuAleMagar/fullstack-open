var _=require('lodash')
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

//mostBlogs
const mostBlogs=(blogs)=>{
    if(blogs.length===0)return {}
     const grouped=_.groupBy(blogs,'author')
    let maxAuthor=null;
    let maxCount=0;
    for(let author in grouped){
        const count=grouped[author].length;
       if(count>maxCount){
        maxCount=count;
        maxAuthor=author;
       }
    }
    return {
        author:maxAuthor,
        blogs:maxCount,
    }
}
//most likes
const mostLikes=(blogs)=>{
     if(blogs.length===0)return {}
    const grouped=_.groupBy(blogs,'author')
    let maxAuthor=null;
    let maxLikes=0;
    for(let author in grouped){
        let authorLikes=0
        for(let blog of grouped[author]){
           authorLikes+=blog.likes;
        }
       if(authorLikes>maxLikes){
        maxAuthor=author;
        maxLikes=authorLikes;
       }
    }
    return {
        author:maxAuthor,
        likes:maxLikes
    }
}

module.exports={dummy,TotalLikes,favoriteBlog,mostBlogs,mostLikes}

