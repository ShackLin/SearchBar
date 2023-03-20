const Auth='4z46aJtEQWEjvCJpSGP0vkymkgS8kRnTKH29Q2w3RaKqs3YDEYi4JCsL'
const input=document.querySelector("input");
const searchIcon=document.querySelector(".searchIcon");
const showMore=document.querySelector(".showMore");
let pagner=3;
let Search=false;
let query="";

input.addEventListener("input",(e)=>{
    e.preventDefault()
    query=e.target.value
})

 function StartPhotos(pagner){
     fetch(`https://api.pexels.com/v1/curated?page=${pagner}`,{
        headers:{
            Authorization:Auth
        }})
     .then(response=>{
         return response.json();
    })
    .then(data=>{
        //  console.log(data);
         data.photos.forEach((photo)=>{
           const Items=document.createElement('div');
             Items.classList.add('items');
             Items.innerHTML=`
             <a href="${photo.src.original}">
             <img src="${photo.src.medium}">
             <h3>"${photo.photographer}"</h3>
             </a>
             `         
             document.querySelector(".gallery").appendChild(Items);
         })
       })
     .catch(error=>{
        console.log(error)
     })      
 }
 StartPhotos(pagner);

function SearchPhotos(query,pagner){
    fetch(`https://api.pexels.com/v1/search?query=${query}&page=${pagner}`,{
        headers:{
            Authorization:Auth
        }
    })
    .then(response=>{
        return response.json();
    })
    .then(data=>{
        data.photos.forEach((photo)=>{
            const Items=document.createElement('div');
            Items.classList.add('items');
            Items.innerHTML=`
            <a href="${photo.src.original}">
            <img src="${photo.src.medium}">
            <h3>"${photo.photographer}"</h3>
            </a>
            `         
            document.querySelector(".gallery").appendChild(Items);
            console.log('This is a Test');
        })
    })
    .catch(error=>{
        console.log(error);
    })
}
SearchPhotos(query,pagner);

searchIcon.addEventListener("click",()=>{
    if(input.value==="") return;
    ClearAllPhoto();
    Search=true;
    SearchPhotos(query,pagner=3);
})

function ClearAllPhoto(){
    input.value="";
    document.querySelector(".gallery").innerHTML="";
    pagner=1;
}
ClearAllPhoto();

showMore.addEventListener("click",()=>{
    if(!Search){
        pagner+3;
        StartPhotos(pagner)
    }else{
        if(query.value==="")return;
        pagner++;
        SearchPhotos(query,pagner)
    }
})

function scrollWindow(){
    window.scrollTo(0,0);
}
scrollWindow()

function DisappearSearch(){
    let lastPos=0;
    const Search=document.querySelector(".search")
    document.addEventListener('scroll',function(){
        let currentPos=window.scrollY;
        if(currentPos>lastPos+1){
            Search.style.top="-100px"
        }else{
            Search.style.top="0px"
        }
        lastPos=currentPos
    })
}
DisappearSearch()
