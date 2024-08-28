import React, { useState } from "react";
import "./employeeInfo.css";

function EmployeeAdditionalInfo({ employeeDetails }) {
  const [selectedTab, setSelectedTab] = useState("Primary");

  return (
    <div>
      <h2>CURRICULUM, HOURS & GPA</h2>
      <div>
        <button onClick={() => setSelectedTab("Primary")}>Primary</button>
        <button onClick={() => setSelectedTab("Secondary")}>Secondary</button>
        <button onClick={() => setSelectedTab("Hours & GPA")}>
          Hours & GPA
        </button>
      </div>
      <div>
        {selectedTab === "Primary" && (
          <div>
            <div className="employee-details-text-info">
              <span>Degree:</span>
              <span>{employeeDetails.curriculumPrimary?.degree}</span>
            </div>
            <div className="employee-details-text-info">
              <span>Study Path:</span>
              <span>{employeeDetails.curriculumPrimary?.studyPath}</span>
            </div>
            <div className="employee-details-text-info">
              <span>Level:</span>
              <span>{employeeDetails.curriculumPrimary?.level}</span>
            </div>
            <div className="employee-details-text-info">
              <span>Program:</span>
              <span>{employeeDetails.curriculumPrimary?.program}</span>
            </div>
            <div className="employee-details-text-info">
              <span>Employee:</span>
              <span>{employeeDetails.curriculumPrimary?.college}</span>
            </div>
            <div className="employee-details-text-info">
              <span>Major:</span>
              <span>{employeeDetails.curriculumPrimary?.major}</span>
            </div>
            <div className="employee-details-text-info">
              <span>Department:</span>
              <span>{employeeDetails.curriculumPrimary?.department}</span>
            </div>
            <div className="employee-details-text-info">
              <span>Concentration:</span>
              <span>{employeeDetails.curriculumPrimary?.concentration}</span>
            </div>
            <div className="employee-details-text-info">
              <span>Minor:</span>
              <span>{employeeDetails.curriculumPrimary?.minor}</span>
            </div>
            <div className="employee-details-text-info">
              <span>Admit Type:</span>
              <span>{employeeDetails.curriculumPrimary?.admitType}</span>
            </div>
            <div className="employee-details-text-info">
              <span>Admit Term:</span>
              <span>{employeeDetails.curriculumPrimary?.admitTerm}</span>
            </div>
            <div className="employee-details-text-info">
              <span>Catalog Term:</span>
              <span>{employeeDetails.curriculumPrimary?.catalogTerm}</span>
            </div>
          </div>
        )}
        {selectedTab === "Secondary" && (
          <div>
            {/* Secondary tab content goes here */}
            {/* You can leave this section empty for now */}
          </div>
        )}
        {selectedTab === "Hours & GPA" && (
          <div>
            {/* Hours & GPA tab content goes here */}
            {/* You can leave this section empty for now */}
          </div>
        )}
      </div>
      {/* Add buttons for selecting tabs */}
    </div>
  );
}

export default EmployeeAdditionalInfo;
