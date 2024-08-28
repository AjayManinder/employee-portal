import React, { useState } from "react";
import "./addEmployee.css";
import axiosInstance from "../../../axiosConfig";

const AddEmployee = ({ addEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    empNo: "",
    name: "",
    percentage: "",
    branch: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddEmployee = async () => {
    try {
      if (
        !newEmployee.empNo ||
        !newEmployee.name ||
        !newEmployee.percentage ||
        !newEmployee.branch
      ) {
        setError("All fields are required");
        return;
      }

      const response = await axiosInstance.post("/employees", newEmployee);
      addEmployee(response.data);
      setShowModal(false);
      setNewEmployee({
        // Clear the fields after successful addition
        empNo: "",
        name: "",
        percentage: "",
        branch: "",
      });
      setError(""); // Reset error message
    } catch (error) {
      setError("Error adding employee");
      console.error("Error adding employee:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setError("");
    setNewEmployee({ empNo: "", name: "", percentage: "", branch: "" });
  };

  return (
    <div>
      <button className="buttonModal" onClick={() => setShowModal(true)}>
        Add Employee
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>Add Employee</h2>
            <label>Roll Number</label>
            <input
              type="text"
              value={newEmployee.empNo}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, empNo: e.target.value })
              }
              placeholder="Roll No"
            />
            <label>Name</label>
            <input
              type="text"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              placeholder="Name"
            />
            <label>Percentage</label>
            <input
              type="text"
              value={newEmployee.percentage}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, percentage: e.target.value })
              }
              placeholder="Percentage"
            />
            <label>Branch</label>
            <input
              type="text"
              value={newEmployee.branch}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, branch: e.target.value })
              }
              placeholder="Branch"
            />
            {/* Other input fields for name, percentage, branch */}
            <button onClick={handleAddEmployee}>Add</button>
            {error && <p>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
