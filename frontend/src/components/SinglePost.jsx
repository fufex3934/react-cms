import React, { useEffect, useState } from 'react';
import createClient from '../client';
import { useParams } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

const builder = imageUrlBuilder(createClient);

function urlFor(source) {
  return builder.image(source);
}

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await createClient.fetch(`*[slug.current == "${slug}"]{
          title,
          _id,
          slug,
          mainImage{
            asset->{
              _id,
              url
            }
          },
          body,
          "name":author->name,
          "authorImage":author->image
        }`);
        if (data.length > 0) {
          setSinglePost(data[0]);
        } else {
          setSinglePost(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [slug]);

  // if (!singlePost) return <p>Loading...</p>;

  const { title, name, authorImage, mainImage, body } = singlePost;

  return (
    <main className='bg-gray-200 min-h-screen p-12'>
      <article className='container mx-auto bg-green-100 rounded-lg'>
        <header className='relative'>
          <div className='absolute h-full w-full flex items-center justify-center p-8'>
            <div className='bg-white bg-opacity-75 rounded p-12'>
              <h1 className='font-bold text-3xl lg:text-lg mb-4'>{title}</h1>
              <div className='flex justify-center text-gray-800'>
                <img
                  src={urlFor(authorImage).url()}
                  alt={name}
                  className='w-10 h-10 rounded-full'
                />
                <p className='flex items-center pl-2 text-2xl'>{name}</p>
              </div>
            </div>
          </div>
          <img
            src={urlFor(mainImage.asset).url()}
            alt={title}
            className='w-full object-cover rounded-t h-[400px]'
          />
        </header>
        <div className='px-16 lg:px-48 py-12 lg:py-20 max-w-full'>
          <BlockContent
            blocks={body}
            dataset='production'
            projectId='9a8oikal'
          />
        </div>
      </article>
    </main>
  );
};

export default SinglePost;
