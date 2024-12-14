import logo from './logo.svg';
import './App.css';

import { DisplayBooks } from './components/DisplayBooks';

import { NavBarComponent } from './components/NavBarComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddBooks from './components/AddBooks';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import Error from './components/Error';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <div className="App">
      <div className="container">
        {/* PUBLIC ROUTES */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Registration/>} />


          {/* PROTECTED ROUTES */}
          <Route element={<RequireAuth />}>
            <Route path="/display" element={<DisplayBooks />} />
            <Route path="/add" element={<AddBooks />} />
            <Route path="/edit-book/:isbn" element={<AddBooks />} />
          </Route>

          {/* CATCH ALL ROUTES */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>


    </div>
  );
}

export default App;
