import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../../axiosConfig";
import "./subject.css";
import { Context } from "../../../App";

const SubjectRegistration = () => {
  const [subjects, setSubjects] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [employeeSubjects, setEmployeeSubjects] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useContext(Context);

  useEffect(() => {
    axiosInstance.get("/subjects")
      .then(response => {
        setSubjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
      });

    axiosInstance.get(`/employees/${userDetails?.employee?._id}`)
      .then(response => {
        setEmployeeSubjects(response.data.subjectIds);
      })
      .catch(error => {
        console.error('Error fetching employee subjects:', error);
      });
  }, [userDetails]); 
  

  const handleRegisterSubject = async (subjectId) => {
    try {
      const empNo = userDetails?.employee?.empNo;
      if (!empNo) {
        // Handle case where empNo is not available
        return;
      }
  
      // Fetch the current list of employee subjects
      const response = await axiosInstance.get(`/employees/${empNo}`);
      const currentSubjects = response.data.subjectIds;
  
      console.log('Current Subjects:', currentSubjects);
  
      // Check if the subject is already present in the employee's subjects
      if (currentSubjects.includes(subjectId)) {
        throw new Error('Subject already registered!');
      }

  
      // Make a POST request to add the subject to the employee's record
      await axiosInstance.post(`/employees/${empNo}/subjects`, { subjectId });
  
      // Update the list of employee subjects
      setEmployeeSubjects([...currentSubjects, subjectId]);
  
      alert('Subject added successfully!');
    } catch (error) {
      console.error('Error adding subject:', error);
      alert(error.message || 'An error occurred while adding subject.');
    }
  };
  return (
    <div className="subject-registration">
      <h2>Subject Registration</h2>
      <div className="subject-list">
        {subjects.map(subject => (
          <li key={subject._id} className="subject">
            <div>
              <h1>{subject.name}</h1>
              <li>{subject.description}</li>
              <ol>
                <li>Credits: {subject.subjectCredits}</li>
                <li>Topics: {subject.topics.join(', ')}</li>
              </ol>
            </div>
            <div className="register-subject-container">
              <button
                className="register-subject"
                onClick={() => handleRegisterSubject(subject._id)}
              >
                Register
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default SubjectRegistration;
