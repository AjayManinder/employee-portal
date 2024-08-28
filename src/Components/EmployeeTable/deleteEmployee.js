import React from "react";
import axiosInstance from "../../axiosConfig";
import { FaTrash } from "react-icons/fa";

const DeleteEmployee = ({ empNo, deleteEmployee }) => {
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/employees/${empNo}`);
      deleteEmployee(empNo);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <button className="edit-btn" onClick={handleDelete}>
      <FaTrash />
    </button>
  );
};

export default DeleteEmployee;
