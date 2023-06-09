import React,{useState,useEffect} from 'react'
import createClient from '../client';
import { Link } from 'react-router-dom';

const Post = () => {
  const [postData,setPostData] = useState(null);
  useEffect(()=>{
    const fetchData = async()=>{
      try{
       const data = await createClient.fetch(`*[_type == "post"]{
        title,
        slug,
        mainImage{
          asset->{
            _id,
            url
          },
          alt
        }
      }`);
      setPostData(data);
      }catch(error){
        console.error(error);
      }
    }
    fetchData();
    
  },[]);
  return (
    <main className='bg-green-100 min-h-screen p-12'>
      <section className='container mx-auto'>
        <h1 className='text-5xl flex justify-center'>Blog Posts Page</h1>
        <h2 className='text-lg text-gray-600 flex justify-center mb-12'>welcome to my page of blog posts</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {postData && postData.map((post,index)=>(
          <article>
            <Link to={`/post/ ${post.slug.current}`} key={post.slug.current}>
            <span className='block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-green-400' key={index}>
              <img src= {post.mainImage.asset.url} 
              alt={post.mainImage.alt}
              className='h-full w-full rounded-r object-cover absolute'
               />
              <span className='flex relative h-full  justify-end items-end pr-4 pb-4 '>
                <h3 className='text-white font-bold text-lg px-3 py-4 bg-red-700  bg-opacity-75 rounded'>{post.title}</h3>
              </span>
            </span>
            </Link>
          </article>
          
  )) }
        </div>
      </section>
    </main>
  )
}

export default Post
