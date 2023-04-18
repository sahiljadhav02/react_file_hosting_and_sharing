import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import ImageView from './ImageView'
import './index.css'
import Pdf_Viewer from './Pdf_Viewer'
import VideoPlayer from './VideoPlayer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
  <Routes>
  <Route path="/" element={<App />} />
  <Route path="/home" element={<App />} />

    <Route path="/ccldata/image/:img/:ext" element={<ImageView />} exact/>
    <Route path="/ccldata/pdf/:pdf" element={<Pdf_Viewer />} exact/>
    <Route path="/ccldata/video/:vid/:ext" element={<VideoPlayer />} exact/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
