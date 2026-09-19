import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

import Home from './pages/Home';
import About from  './pages/About'
import Contact from './pages/Contact'
import PlotGraph from './pages/Project';

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={< Home/>}/>
          <Route path="/about" element={< About/>}/>
          <Route path="/contact" element={< Contact/>} />
          <Route path="/project" element={< PlotGraph/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
