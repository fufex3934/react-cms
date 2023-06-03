import {createClient} from '@sanity/client';

export default createClient({
    projectId: '9a8oikal',
    dataset: 'production',
    useCdn: true, 
    apiVersion: '2023-06-03', 
  })