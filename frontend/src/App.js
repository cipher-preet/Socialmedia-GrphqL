import './App.css';
import {Routes , Route } from "react-router-dom"
import Home from './Components/Pages/Home';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import MenuBar from './Components/MenuBar';


function App() {
  return (
   <div className="ui container">
    <MenuBar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>


   </div>
  );
}

export default App;
