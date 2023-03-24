import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className='min-h-[100vh] bg-softBlueGray px-2 py-4'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}


export default App;
