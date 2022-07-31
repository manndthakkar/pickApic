import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './Components/Header/Header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './Actions/User';
import { Home } from './Components/Home/Home';
import {Profile} from './Components/Profile/Main'
import { ToastContainer } from 'react-toastify';
import LoginMain from './Components/Profile/LoginMain';
import OtherUser from './Components/Profile/OtherUser';
import NoSuchPage from './Components/NoSuchPage/NoSuchPage';



function App() {

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(loadUser()) 
  }, [dispatch])


  return (
    <Router>
      <div className="App">
        <ToastContainer position="bottom-center" autoClose={2000} hideProgressBar={true} closeOnClick/>  {/* To get Alerts */}
        <Header/>
        <Routes>
          <Route exact path = "/" element={<Home/>}/>
          <Route path = "/profile" element={<Profile />}/>
          <Route path = "/login" element={<LoginMain />}/>
          <Route path = "/user/profile/:id" element={<OtherUser />}/>
          <Route   path = "*" element={<NoSuchPage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
