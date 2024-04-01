import { Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage'
import FileUploadPage from './pages/FileUploadPage'
import LoadingPage from './pages/LoadingPage';
import FailedPage from './pages/FailedPage';
import CollectorCardPage from './pages/CollectorCardPage';

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <div className="root-container-div">
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/upload' element={<FileUploadPage />} />
        <Route exact path='/loading' element={<LoadingPage />} />
        <Route exact path='/failed' element={<FailedPage />} />
        <Route exact path='/result' element={<CollectorCardPage />} />
      </Routes>
      </div>
    </>
  )
}

export default App
