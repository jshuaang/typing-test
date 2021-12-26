import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Type from './Type/Type';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/type' element={<Type />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
