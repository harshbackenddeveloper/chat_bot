import { Route, Routes } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import TestChat from './components/TestChat';

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<TestChat />} />
      </Routes>
    </>
  )
}

export default App;