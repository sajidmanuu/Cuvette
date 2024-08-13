import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import Sidebar from '../../components/Sidebar';
import '../../index.css';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [classId, setClassId] = useState('');
  const [feesPaid, setFeesPaid] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editStudent, setEditStudent] = useState(null);
  const [classes, setClasses] = useState([]);

  // Fetch students with pagination and filters
  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await api.get('/students', {
        params: {
          page: currentPage,
          limit: 10,
          name,
          classId,
          feesPaid,
        },
      });
      setStudents(data.students);
      setTotalPages(data.pagesStudents);
    };

    fetchStudents();
  }, [currentPage, name, classId, feesPaid]);

  // Fetch classes for the form
  useEffect(() => {
    const fetchClasses = async () => {
      const { data } = await api.get('/classes');
      setClasses(data);
    };

    fetchClasses();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'classId') setClassId(value);
    if (name === 'feesPaid') setFeesPaid(value);
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();
    
    try {
      await api.put(`/students/${editStudent._id}`, editStudent);
      setEditStudent(null);
      // Refresh the student list
      const { data } = await api.get('/students', {
        params: { page: currentPage, limit: 10 },
      });
      setStudents(data.students);
    } catch (error) {
      alert('Failed to update student');
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.delete(`/students/${id}`);
        // Refresh the student list
        const { data } = await api.get('/students', {
          params: { page: currentPage, limit: 10 },
        });
        setStudents(data.students);
      } catch (error) {
        alert('Failed to delete student');
      }
    }
  };

  return (
    <div className="custom-main-container">
      <Sidebar role="admin" />
      <main className="d-flex flex-column w-100 p-5">
        <h2 className="text-2xl font-semibold mb-4">Student Management</h2>

        {/* Filter and Pagination */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleFilterChange}
            placeholder="Search by name"
            className="border border-gray-300 rounded px-2 py-1"
          />
          <select name="classId" value={classId} onChange={handleFilterChange} className="border border-gray-300 rounded px-2 py-1">
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
          <select name="feesPaid" value={feesPaid} onChange={handleFilterChange} className="border border-gray-300 rounded px-2 py-1">
            <option value="">Fees Paid</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Edit Student Form */}
        {editStudent && (
          <form onSubmit={handleEditStudent} className="section-container bg-white rounded shadow-md mb-4">
            <h3 className="text-xl font-semibold mb-4">Edit Student</h3>
            <div className="mb-4">
              <label className="form-label mb-1">Name</label>
              <input
                type="text"
                value={editStudent.name}
                onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                className="w-full border border-gray-300 rounded input-field"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label mb-1">Email</label>
              <input
                type="email"
                value={editStudent.email}
                onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })}
                className="w-full border border-gray-300 rounded input-field"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label mb-1">Gender</label>
              <input
                type="text"
                value={editStudent.gender}
                onChange={(e) => setEditStudent({ ...editStudent, gender: e.target.value })}
                className="w-full border border-gray-300 rounded input-field"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label mb-1">Date of Birth</label>
              <input
                type="date"
                value={editStudent.dob}
                onChange={(e) => setEditStudent({ ...editStudent, dob: e.target.value })}
                className="w-full border border-gray-300 rounded input-field"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label mb-1">Mobile</label>
              <input
                type="text"
                value={editStudent.mobile}
                onChange={(e) => setEditStudent({ ...editStudent, mobile: e.target.value })}
                className="w-full border border-gray-300 rounded input-field"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label mb-1">Class</label>
              <select
                value={editStudent.class?._id}
                onChange={(e) => setEditStudent({ ...editStudent, class: e.target.value })}
                className="w-full border border-gray-300 rounded input-field"
                required
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="form-label mb-1">Fees Paid</label>
              <select
                value={editStudent.feesPaid}
                onChange={(e) => setEditStudent({ ...editStudent, feesPaid: e.target.value === 'true' })}
                className="w-full border border-gray-300 rounded input-field"
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update Student
            </button>
          </form>
        )}

        {/* Students Table */}
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Gender</th>
              <th className="px-4 py-2 border">Date of Birth</th>
              <th className="px-4 py-2 border">Mobile</th>
              <th className="px-4 py-2 border">Class</th>
              <th className="px-4 py-2 border">Fees Paid</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td className="px-4 py-2 border">{student.name}</td>
                <td className="px-4 py-2 border">{student.email}</td>
                <td className="px-4 py-2 border">{student.gender}</td>
                <td className="px-4 py-2 border">{student.dob}</td>
                <td className="px-4 py-2 border">{student.mobile}</td>
                <td className="px-4 py-2 border">{student.class?.name || 'N/A'}</td>
                <td className="px-4 py-2 border">{student.feesPaid ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => {
                      setEditStudent(student);
                    }}
                    className="px-2 py-1 bg-yellow-500 text-dark rounded mr-2 bg-red"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student._id)}
                    className="px-2 py-1 bg-red-500 text-dark rounded bg-yellow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default StudentManagement;
