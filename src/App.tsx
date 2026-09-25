import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

import Home from './pages/Home';
import About from  './pages/About'
import Contact from './pages/Contact'
import PlotGraph from './pages/PlotGraph';
import Login from './pages/Login'
import Register from './pages/Register'

import './App.css'

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={< Home/>}/>
            <Route path="/about" element={< About/>}/>
            <Route path="/contact" element={< Contact/>} />
            <Route path="/plot" element={< PlotGraph/>} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={< Login/>} />
            <Route path="/register" element={< Register/>} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
