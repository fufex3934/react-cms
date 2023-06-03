import React from 'react';
import{BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import SinglePost from './components/SinglePost';
import Post from './components/Post';
import Project from './components/Project';
import Navbar from './components/Navbar';
function App() {

  return (
    <>
     <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/post/:slug' element={<SinglePost/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/project' element={<Project/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
