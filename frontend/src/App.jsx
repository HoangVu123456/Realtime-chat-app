import React, {useEffect} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

// import components
import Navbar from './components/Navbar';

// import pages
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

// import store
import { useAuthstore } from './store/useAuthstore.js';
import { useTheme } from './store/useTheme.js';

import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

const App = () => {

  const { auth_user, checkAuth, check_auth, onlineuser } = useAuthstore();
  const { theme } = useTheme();

  useEffect(() => {checkAuth();}, [checkAuth]);

  console.log({onlineuser});
  console.log({auth_user});

  if (check_auth&&!auth_user) 
    return (
  <div className="flex items-center justify-center h-screen">
    <Loader className="size-10 animate-spin"/>
  </div>
  )
  
  return (
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path="/" element={auth_user? <HomePage/>: <Navigate to="/login"/>}/>
        <Route path="/signup" element={!auth_user? <SignUp/>: <Navigate to="/"/>}/>
        <Route path="/login" element={!auth_user? <Login/>: <Navigate to="/"/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/profile" element={auth_user? <Profile/>: <Navigate to="/login"/>}/>
      </Routes>

      <Toaster/>
</div>
  );
};

export default App;