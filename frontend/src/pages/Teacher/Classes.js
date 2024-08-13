import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';
import api from '../../utils/api';
import '../../index.css'

const Classes = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const { data } = await api.get('/api/classes');
      setClasses(data);
    };

    fetchClasses();
  }, []);

  return (
    <div className="custom-main-container">
      <Sidebar role="teacher" />
      <main className="d-flex flex-column w-100 p-5">
        <h2 className="text-2xl font-semibold mb-4">My Classes</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Class Name</th>
              <th className="px-4 py-2 border">Year</th>
              <th className="px-4 py-2 border">Students</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls._id}>
                <td className="px-4 py-2 border">{cls.name}</td>
                <td className="px-4 py-2 border">{cls.year}</td>
                <td className="px-4 py-2 border">{cls.students.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Classes;
