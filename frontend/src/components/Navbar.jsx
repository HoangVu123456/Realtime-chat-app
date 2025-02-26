import { Home, Key, Settings, Trash, User, LogIn } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthstore } from '../store/useAuthstore';

const Navbar = () => {

    const { logout, auth_user } = useAuthstore();
  
    return (
    <div className="navbar">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><Link to="/"><Home className="w-4 h-4"/>Home</Link></li>
        <li><Link to="/signup"><Key className="w-4 h-4"/>Signup</Link></li>
        <li><Link to="/login"><LogIn className="w-4 h-4"/>Login</Link></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center">
    <a className="btn btn-ghost text-xl">Chat-app</a>
  </div>
  <div className="navbar-end flex items-center space-x-4">{auth_user?
    (<div className="flex items-center space-x-4">
        <button className="btn btn-ghost btn-circle">
            <Link to="/profile"><User/></Link>
        </button>
        <button className="btn btn-ghost btn-circle" onClick={logout}>
            <Trash/>
        </button>
        <button className="btn btn-ghost btn-circle">
        <Link to="/settings"><Settings/></Link>
    </button>
    </div>):
    (<button className="btn btn-ghost btn-circle">
        <Link to="/settings"><Settings/></Link>
    </button>)}
  </div>
</div>
  )
}

export default Navbar