import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Navbar from './Components/Navbar';
import NoteState from './context/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert]=useState(null);

  const switchAlert=(msg,type)=>{
    setAlert({
      msg:msg,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  } 

  return (
    <>
      <NoteState switchAlert={switchAlert}>
        <BrowserRouter>
          <Navbar title="iNotebook"/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
                {/* <Route index element={<Home/>} /> */}
                <Route exact path="/" element={<Home switchAlert={switchAlert} />} />
                <Route exact path="/about" element={<About/>} />
                <Route exact path="/login" element={<Login switchAlert={switchAlert} />} />
                <Route exact path="/signup" element={<Signup switchAlert={switchAlert} />} />
            </Routes>
          </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
