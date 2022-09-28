import './App.css';
import MainPage from './pages/MainPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ReturnItem from './pages/ReturnItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { About } from './pages/About';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/page/return-item' element={<ReturnItem/>} />
          <Route path='/page/sign-in' element={<SignIn/>}/>
          <Route path='/' element={<MainPage />}/>
          <Route path='/page/sign-up' element={<SignUp/>}/>
          <Route path='/page/about' element={<About/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
