import React from 'react';
import Sidebar from '../../components/Sidebar';
import '../../index.css'

const Dashboard = () => {
  return (
    <div className="custom-main-container">
      <Sidebar role="admin" />
      <main className="d-flex flex-column w-100 p-5">
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <p>Welcome to the admin dashboard. Manage your classes, students, and teachers here.</p>
      </main>
    </div>
  );
};

export default Dashboard;
