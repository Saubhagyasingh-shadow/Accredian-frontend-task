import {BrowserRouter,Routes,Route} from  'react-router-dom';
import Register from './Register.js';
import Home from './Home';
import Login from './Login.js';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>

        <Route path='/register' element={<Register/>}></Route>
         <Route path='/Login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
