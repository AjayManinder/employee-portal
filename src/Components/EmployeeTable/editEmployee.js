import React, { useState, useEffect } from "react";
import axios from "axios";
import "./crudEmployee/addEmployee.css";
const API_PROTOCOL = process.env.REACT_APP_API_PROTOCOL;
const API_HOST = process.env.REACT_APP_API_HOST;
const Employee_EP = process.env.REACT_APP_Employee_Endpoint;
const EditEmployee = ({ employeeData, updateEmployee, closeModal }) => {
  //Props in the form of employeeData, updateEmployee, closeModal  cchildren of EmployeeTable.js
  const [editedEmployee, setEditedEmployee] = useState(employeeData);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setEditedEmployee(employeeData);
  }, [employeeData]);

  const handleEditEmployee = async () => {
    try {
      if (
        !editedEmployee.empNo ||
        !editedEmployee.name ||
        !editedEmployee.percentage ||
        !editedEmployee.branch
      ) {
        setError("All fields are required");
        return;
      }

      await axios.put(
        `${API_PROTOCOL}://${API_HOST}/${Employee_EP}/${editedEmployee.empNo}`,
        editedEmployee
      );
      updateEmployee(editedEmployee);
      setShowModal(false);
      closeModal(); // Close modal in the parent component
    } catch (error) {
      setError("Error updating employee");
      console.error("Error updating employee:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setError("");
    setEditedEmployee(employeeData);
    closeModal(); // Close modal in the parent component
  };

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Edit Employee</h2>
            <label>Roll Number:</label>
            <input
              type="text"
              value={editedEmployee.empNo}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, empNo: e.target.value })
              }
              placeholder="Roll No"
            />
            <label>Name:</label>
            <input
              type="text"
              value={editedEmployee.name}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, name: e.target.value })
              }
              placeholder="Name"
            />
            <label>Percentage:</label>
            <input
              type="text"
              value={editedEmployee.percentage}
              onChange={(e) =>
                setEditedEmployee({
                  ...editedEmployee,
                  percentage: e.target.value,
                })
              }
              placeholder="Percentage"
            />
            <label>Branch:</label>
            <input
              type="text"
              value={editedEmployee.branch}
              onChange={(e) =>
                setEditedEmployee({ ...editedEmployee, branch: e.target.value })
              }
              placeholder="Branch"
            />
            {/* Other input fields for name, percentage, branch */}
            <button onClick={handleEditEmployee}>Update</button>
            {error && <p>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditEmployee;
