import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeList.css";
import ProfilePhoto from '../../Assets/ProfilePhoto.jpg'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      photo: "",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      mobile: "1234567890",
      dob: "1999-01-01",
      country: "USA",
      state: "California",
      skills: ["Communication", "Time Management"],
    },
    {
      id: 2,
      photo: "",
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      mobile: "2345678901",
      dob: "1998-02-02",
      country: "Canada",
      state: "Ontario",
      skills: ["Self-motivation", "Leadership"],
    },
  ]);

  const navigate = useNavigate();
  const handleCreate = (id) => {
    navigate('/');
  };

  const handleEdit = (id) => {
    navigate("/EditEmployee");
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <>
    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full h-screen absolute">
      <div className="employee-list">
        <table>
          <thead>
            <tr className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
              <th>Photo</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <img
                    src={ProfilePhoto}
                    alt={`${employee.firstName} ${employee.lastName}`}
                  />
                </td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>
                  <button onClick={() => handleEdit(employee.id)}>Edit</button>
                  <button onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleCreate}>Create</button>
      </div>
      </div>  
    </>
  );
};

export default EmployeeList;


