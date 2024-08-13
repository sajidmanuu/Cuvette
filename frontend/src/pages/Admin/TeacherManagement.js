import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Sidebar from "../../components/Sidebar";
import "../../index.css";
import { Navigate } from "react-router-dom";

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [classes, setClasses] = useState([]);
  const [addNew, toggleAddNew] = useState(false);

  // Fetch all teachers with assigned class details
  useEffect(() => {
    const fetchTeachers = async () => {
      const { data } = await api.get("/teachers");
      setTeachers(data);
    };

    fetchTeachers();
  }, []);

  // Fetch all classes
  useEffect(() => {
    const fetchClasses = async () => {
      const { data } = await api.get("/classes");
      console.log("Classes data:", data);
      setClasses(data);
    };

    fetchClasses();
  }, []);

  const handleAddTeacher = async (e) => {
    e.preventDefault();

    try {
      const newTeacher = { name, salary };
      await api.post("/teachers", newTeacher);
      setName("");
      setSalary("");

      // Fetch the updated list of teachers
      const { data } = await api.get("/teachers");
      setTeachers(data);
      toggleAddNew(false);
    } catch (error) {
      alert("Failed to add teacher");
    }
  };

  const handleEditTeacher = async (e) => {
    e.preventDefault();

    try {
      const updatedTeacher = { name, salary };
      await api.put(`/teachers/${selectedTeacher._id}`, updatedTeacher);

      // Fetch the updated list of teachers
      const { data } = await api.get("/teachers");
      setTeachers(data);
      setSelectedTeacher(null);
      setName("");
      setSalary("");
      // window.reload();
    } catch (error) {
      alert("Failed to update teacher");
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await api.delete(`/teachers/${id}`);

        // Fetch the updated list of teachers
        const { data } = await api.get("/teachers");
        setTeachers(data);
      } catch (error) {
        alert("Failed to delete teacher");
      }
    }
  };

  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setName(teacher.name);
    setSalary(teacher.salary);
    toggleAddNew(true);
  };

  return (
    <div className="custom-main-container">
      <Sidebar role="admin" />
      <main className="d-flex flex-column w-100 p-5">
        <div className="d-flex justify-content-between align-items-center w-100 mb-5">
          <h2 className="text-2xl font-semibold m-0">Teacher Management</h2>
          <button
            onClick={() => toggleAddNew(!addNew)}
            className="w-full px-4 py-2 bg-blue-500 text-dark rounded"
          >
            {addNew ? "- Cancel" : "+ Add New"}
          </button>
        </div>
        {/* Add/Edit Teacher Form */}
        {addNew && (
          <form
            onSubmit={selectedTeacher ? handleEditTeacher : handleAddTeacher}
            className="section-container bg-white rounded shadow-md align-self-center mb-3"
          >
            <h3 className="text-xl font-semibold mb-4">
              {selectedTeacher ? "Edit Teacher" : "Add New Teacher"}
            </h3>
            <div className="mb-4">
              <label className="form-label mb-1">
                Teacher Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded input-field"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label mb-1">Salary</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full border border-gray-300 rounded input-field"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-dark rounded"
            >
              {selectedTeacher ? "Update Teacher" : "Add Teacher"}
            </button>
          </form>
        )}
        {/* Teachers Table */}
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Teacher Name</th>
              <th className="px-4 py-2 border">Assigned Class</th>
              <th className="px-4 py-2 border">Salary</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td className="px-4 py-2 border">{teacher?.name}</td>
                <td className="px-4 py-2 border">
                  {teacher?.assignedClass
                    ? teacher.assignedClass.name
                    : "No Class Assigned"}
                </td>
                <td className="px-4 py-2 border">${teacher.salary}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => handleSelectTeacher(teacher)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default TeacherManagement;
