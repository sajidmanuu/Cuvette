import React from 'react';
import Sidebar from '../../components/Sidebar';
import '../../index.css'

const Dashboard = () => {
  return (
    <div className="custom-main-container">
      <Sidebar role="teacher" />
      <main className="d-flex flex-column w-100 p-5">
        <h2 className="text-2xl font-semibold">Teacher Dashboard</h2>
        <p>Welcome to the teacher dashboard. Manage your classes and view your profile here.</p>
      </main>
    </div>
  );
};

export default Dashboard;
