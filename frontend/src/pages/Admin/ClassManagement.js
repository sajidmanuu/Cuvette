import React, { useEffect, useState } from "react";
import api from "../../utils/api"; // Import the Axios instance
import Sidebar from "../../components/Sidebar";
import "../../index.css";

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [teacher, setTeacher] = useState("");
  const [studentFees, setStudentFees] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [addNew, toggleAddNew] = useState(false);

  useEffect(() => {
    const fetchClasses = async () => {
      const { data } = await api.get("/classes");
      setClasses(data);
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data } = await api.get("/teachers"); // Adjust the endpoint if necessary
      setTeachers(data);
    };

    fetchTeachers();
  }, []);

  const handleAddClass = async (e) => {
    e.preventDefault();

    try {
      const newClass = { name, year, teacher, studentFees };
      await api.post("/classes", newClass);
      setName("");
      setYear("");
      setTeacher("");
      setStudentFees("");
      // Optionally fetch the updated list of classes
      const { data } = await api.get("/classes");
      setClasses(data);
    } catch (error) {
      alert("Failed to add class");
    }
  };

  return (
    <div className="custom-main-container">
      <Sidebar role="admin" />
      <main className="d-flex flex-column w-100 p-5">
        <div className="d-flex justify-content-between align-items-center w-100 mb-5">
          <h2 className="text-2xl font-semibold m-0">Class Management</h2>
          <button onClick={() => toggleAddNew(!addNew)} className="w-full px-4 py-2 bg-blue-500 text-dark rounded">
            {(addNew)? "- Add New" : "+ Add New"}
          </button>
        </div>

        {/* Add Class Form */}
        {addNew && (
          <form
            onSubmit={handleAddClass}
            className="section-container bg-white rounded shadow-md align-self-center mb-3"
          >
            <h3 className="text-xl font-semibold mb-4">Add New Class</h3>
            <div className="mb-4">
              <label className="form-label mb-1">Class Name</label>
              <br />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded input-field"
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label mb-1">Year</label>
              <br />
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 rounded input-field"
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label mb-1">Teacher</label>
              <br />
              <select
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="w-full border border-gray-300 rounded input-field"
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="form-label mb-1">Student Fees</label>
              <br />
              <input
                type="number"
                value={studentFees}
                onChange={(e) => setStudentFees(e.target.value)}
                className="w-full border border-gray-300 rounded input-field"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-dark rounded"
            >
              Add Class
            </button>
          </form>
        )}
        {/* Classes Table */}
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Class Name</th>
              <th className="px-4 py-2 border">Year</th>
              <th className="px-4 py-2 border">Teacher</th>
              {/* <th className="px-4 py-2 border">Number of Students</th> */}
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls._id}>
                <td className="px-4 py-2 border">{cls.name}</td>
                <td className="px-4 py-2 border">{cls.year}</td>
                <td className="px-4 py-2 border">{cls.teacher?.name}</td>
                {/* <td className="px-4 py-2 border">{cls.students?.length}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ClassManagement;
