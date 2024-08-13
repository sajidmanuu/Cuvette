import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const signup=()=>{
    Navigate('/signup')
  }

  return (
    <nav className="bg-blue-600 text-white py-4 bg-dark">
      <div className="container mx-auto d-flex justify-content-between align-items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" style={{
            textDecoration: 'none',
            fontSize:'26px',
            color: '#ffffff',
            fontFamily:'Roboto'
          }}>School Management</Link>
        </h1>
        {/* {user ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-blue-800 px-4 py-2 rounded">
            Login
          </Link>
        )} */}
                {user ? (
          <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        ):(
          <Link to="/signup" className="bg-red-500 px-4 py-2 rounded">
            Signup
          </Link>
          
        )
        }
      </div>
    </nav>
  );
};

export default Navbar;
