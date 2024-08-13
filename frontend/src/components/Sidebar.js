import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Sidebar = ({ role }) => {
  return (
    <aside className="sidebar">
      <nav>
        <ul
          style={{
            listStyleType: "none",
            padding: "0px",
          }}
        >
          {role === "admin" && (
            <>
              <li className="mb-4 w-100 side-menu">
                <Link
                  to="/admin/classes"
                  className="d-block rounded hover:bg-gray-700 text-decoration-none text-white w-100"
                >
                  Class Management
                </Link>
              </li>
              <li className="mb-4 w-100 side-menu">
                <Link
                  to="/admin/students"
                  className="d-block rounded hover:bg-gray-700 text-decoration-none text-white w-100"
                >
                  Student Management
                </Link>
              </li>
              <li className="w-100 side-menu">
                <Link
                  to="/admin/teachers"
                  className="d-block rounded hover:bg-gray-700 text-decoration-none text-white w-100"
                >
                  Teacher Management
                </Link>
              </li>
            </>
          )}
          {role === "teacher" && (
            <>
              <li className="mb-4">
                <Link
                  to="/teacher/dashboard"
                  className="d-block rounded hover:bg-gray-700 text-decoration-none text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/teacher/classes"
                  className="d-block rounded hover:bg-gray-700 text-decoration-none text-white"
                >
                  My Classes
                </Link>
              </li>
            </>
          )}
          {role === "student" && (
            <>
              <li className="mb-4">
                <Link
                  to="/student/dashboard"
                  className="d-block rounded hover:bg-gray-700 text-decoration-none text-white"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/student/classes"
                  className="block px-4 py-2 rounded hover:bg-gray-700 text-decoration-none text-white"
                >
                  My Classes
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
