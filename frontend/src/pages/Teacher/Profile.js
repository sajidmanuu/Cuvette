import React from 'react';
import Sidebar from '../../components/Sidebar';
import '../../index.css'

const Profile = () => {
  return (
    <div className="custom-main-container">
      <Sidebar role="teacher" />
      <main className="d-flex flex-column w-100 p-5">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <p>Your profile details go here.</p>
      </main>
    </div>
  );
};

export default Profile;
