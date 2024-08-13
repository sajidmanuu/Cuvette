import React, { useState } from "react";
import api from "../../utils/api"; // Import the Axios instance
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";

const SignupPage = () => {
  const [role, setRole] = useState("student"); // Default role is 'student'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState(""); // Added gender field
  const [dob, setDob] = useState(""); // Added DOB field
  const [mobile, setMobile] = useState(""); // Added mobile field
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await api.post("/auth/signup", { name, email, password, role, gender, dob, mobile });
      navigate("/login");
    } catch (error) {
      alert("Signup failed");
    }
  };

  const fields = [
    {
      label: "Name",
      type: "text",
      id: "name",
      value: name,
      onChange: (e) => setName(e.target.value),
      required: true,
    },
    {
      label: "Email",
      type: "email",
      id: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      required: true,
    },
    {
      label: "Gender",
      type: "text",
      id: "gender",
      value: gender,
      onChange: (e) => setGender(e.target.value),
      required: true,
    },
    {
      label: "Date of Birth",
      type: "date",
      id: "dob",
      value: dob,
      onChange: (e) => setDob(e.target.value),
      required: true,
    },
    {
      label: "Mobile",
      type: "tel",
      id: "mobile",
      value: mobile,
      onChange: (e) => setMobile(e.target.value),
      required: true,
    },
    {
      label: "Password",
      type: "password",
      id: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
      required: true,
    },
    {
      label: "Confirm Password",
      type: "password",
      id: "confirmPassword",
      value: confirmPassword,
      onChange: (e) => setConfirmPassword(e.target.value),
      required: true,
    },
  ];

  return (
    <div className="main-container h-screen bg-gray-100">
      <div className="section-container bg-white shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>

        {/* Role Selection */}
        <div className="mb-4">
          <h6 className="block text-sm font-medium mb-1">Select Role</h6>
          <div className="d-flex gap-4">
            <div className="d-flex align-items-center gap-2">
              <input
                id="student"
                type="radio"
                value="student"
                checked={role === "student"}
                onChange={() => setRole("student")}
              />
              <label htmlFor="student">Student</label>
            </div>
            <div className="d-flex align-items-center gap-2">
              <input
                id="teacher"
                type="radio"
                value="teacher"
                checked={role === "teacher"}
                onChange={() => setRole("teacher")}
              />
              <label htmlFor="teacher">Teacher</label>
            </div>
          </div>
        </div>

        {/* Form */}
        <Form fields={fields} onSubmit={handleSubmit} submitText="Sign Up" />
      </div>
    </div>
  );
};

export default SignupPage;
