import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';


function App() {
  return (
    <div className="App">
<Routes>
  <Route path='/' element={<SignUp/>}/>
  <Route path='/signInPage' element={<SignIn/>}/>
  <Route path='/ProfilePage' element={<ProfilePage/>}/>
</Routes>
    </div>
  );
}

export default App;
