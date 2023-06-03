import React, { useState, useEffect } from 'react';
import createClient from '../client';

const Project = () => {
  const [projectData, setProjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await createClient.fetch(
          `*[_type == "project"]{
            title,
            date,
            place,
            description,
            projectType,
            link,
            tags
          }`
        );
        setProjectData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className='bg-green-100 min-h-screen p-12'>
      <section className='container mx-auto'>
        <h1 className='text-5xl flex justify-center'>My Project</h1>
        <h2 className='text-lg text-gray-600 flex justify-center mb-12'>
          Welcome to my Project Page
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <section className='grid grid-cols-2 gap-8'>
            {projectData.map((project, index) => (
              <article
                key={index}
                className='relative rounded-lg shadow-xl bg-white p-16'
              >
                <h3 className='text-gray-800 text-3xl font-bold mb-2 hover:text-red-700'>
                  <a
                    href={project.link}
                    alt={project.title}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {project.title}
                  </a>
                </h3>
                <div className='text-gray-500 text-sm space-x-4'>
                  <span>
                    <strong className='font-bold'>Finished On</strong>:{' '}
                    {new Date(project.date).toLocaleDateString()}
                  </span>
                  <span>
                    <strong>Company</strong>: {project.place}
                  </span>
                  <span>
                    <strong className='font-bold'>Type</strong>: {project.projectType}
                  </span>
                  <p className='m-6 text-gray-700 text-lg leading-relaxed'>
                    {project.title}
                  </p>
                  <a
                    href={project.link}
                    rel='noopener noreferrer'
                    target='_blank'
                    className='text-red-500 font-bold hover:underline hover:text-red-400 text-lg'
                  >
                    View the Project{' '}
                    <span role='image' aria-label='right pointer' className=''>
                      👉
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  );
};

export default Project;
