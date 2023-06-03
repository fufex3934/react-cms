import React from 'react'

const Home = () => {
  return (
    <main>
      <img src="https://cdn.pixabay.com/photo/2013/03/02/02/41/alley-89197_1280.jpg" 
      alt="" 
      className='absolute object-cover h-full w-full'
      />
      <section className='relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8'>
        <h1 className='text-6xl font-bold uppercase
         text-green-100 leading-none lg:leading-snug'>
          Hello!, I am Fufi
          </h1>
      </section>
    </main>
  )
}

export default Home
