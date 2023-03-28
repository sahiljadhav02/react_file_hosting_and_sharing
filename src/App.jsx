import reactLogo from './assets/react.svg'

import './App.css'
import FileUpload from './FileUpload';



function App() {

  return (
    <div className="App">
      <div>
        
          <img src={reactLogo} className="logo react" alt="React logo" />
    
      </div>
      <h1>React File Hosting</h1>
      <div className="card">
     <FileUpload />

    </div>
 
    </div>
  )
}

export default App
