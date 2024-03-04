'use client'
import React ,{ useState,useEffect }from "react";

export const Fourm = () => {


 const  userAccount_post = localStorage.getItem('user')

const [formData,setFormData] = useState({
  postBody:"",
  name:userAccount_post,
  formType: "forumPost",
})


const [posts, setPosts] = useState([]); // State to store posts
// make it render every post that gets added / able to see realtime update as posts get added without having to refresh  

//👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆👆


useEffect(() => {
  const fetchPosts = async () => {
    const response = await fetch('/api/account?type=posts',{
      method:'GET',
      headers:{"Content-Type": "application/json",},
    });
    if (response.ok) {
      const posts = await response.json();
      setPosts(posts);
    } else {
      // Handle errors
      console.error('Failed to fetch posts:', response.statusText);
    }
  };

  fetchPosts();
  const intervalId = setInterval(fetchPosts, 1000);

  return () => clearInterval(intervalId); // Cleanup on unmount
}, []);


const changeHandle = (e) =>{
  const {name,value } = e.target
  setFormData((prevState)=>({
    ...prevState,
    [name]:value,
  }))
}

const formSub = async (e) =>{
e.preventDefault()
 const res = await fetch("/api/account",{
      method:"POST",
      headers:{"Content-Type": "application/json",},
      // Wrapping ({form}) in curly braces will result in error mongoDB expects 
      // a non-nested object(obj inside another {form: { name: "", email: "", Password: "" }}) 
      // payload structure  👇🏻
      body: JSON.stringify(formData),
    })

    console.log(userAccount_post)
    
if(!res.ok){
throw new Error('Failed to create post')
}else{
alert('post created sucessfully')
console.log(formData)

}
}
  return (
    <div className="space-y-4 mt-2 mb-3">
      <form 
      className="flex flex-col items-center w-full"
      name="form"
      onSubmit={formSub}
      method="post">
        <h1 className="font-bold mt-2 mb-4">Finance Forum</h1>
      <div className="flex items-center space-x-4">
        <button className="flex justify-center items-center  ">
          <img
          className=" w-9 ml-4 h-9 rounded-xl hover:scale-110 transition-transform"
            width="48"
            height="48"
            src="https://img.icons8.com/color/48/filled-plus-2-math.png"
            alt="filled-plus-2-math"
          />
        </button>
        <div>
          <input
            name="postBody"
            className="w-full rounded-lg text-slate-300 bg-transparent  px-4 py-2"
            //rounded-lg text-slate-300 bg-transparent
            type="text"
            placeholder="Type message"
            value={formData.postBody}
            onChange={changeHandle}
          />
          <input
            name="name"
            className="hidden"

            type="text"
            placeholder="Type message"
            value={formData.name}
            onChange={changeHandle}
          />
        </div>
      </div>
      </form>
      {/* users chat goes down below  👇🏻 */}
      <div className = "flex flex-col items-center space-x-4 overflow-y-scroll max-h-96"> 
        {/* <p>Is Bitcoin the future ?</p> */}
        {posts.map((post, index) => (
        <div key={index} className="flex flex-col items-center space-x-4 m-8 ">
    {<span className="italic font-light">💲{post.name}</span>}
          <p>-{post.postBody}</p>
          <span className="font-light text-sm text-center">{new Date(post.createdAt).toLocaleString(navigator.language, {hour: '2-digit', minute:'2-digit', day:'2-digit', month:'numeric', year:'2-digit'})}</span>
        </div>
      ))}
      </div>
    </div>
  );
};
