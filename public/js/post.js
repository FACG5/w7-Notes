window.addEventListener('load', ()=> {
    fetchdata('GET', '/post', null, (err,res) => {
      if(err){
        console.log(err);
      }
      else{
        let arr = JSON.parse(res)
        rendering(arr);}
      })
})

const rendering=(arr)=> {
  const postsContainer = document.getElementById('post');
  postsContainer.textContent= "";
for (let i = 0; i < arr.length; i++) {
  let title=arr[i].title;
  let description=arr[i].description;
  let name=arr[i].name;
let postContainer = document.createElement("div");
  let head = document.createElement("h2");
    head.textContent = 'The title : ' + title;
    postContainer.appendChild(head);
  let post = document.createElement("p");
    post.textContent = description;
    postContainer.appendChild(post);
  let poster = document.createElement("p");
    poster.textContent = 'Posted By : ' + name;
    postContainer.appendChild(poster);
    postsContainer.appendChild(postContainer);
    let line = document.createElement('hr');
    postContainer.appendChild(line);
  }
}
