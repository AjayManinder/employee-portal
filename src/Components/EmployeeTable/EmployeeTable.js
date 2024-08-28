// EmployeeTable.js
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../axiosConfig";
// import AddEmployee from './addEmployee';
import EditEmployee from "./editEmployee";
import DeleteEmployee from "./deleteEmployee";
import { FaEdit } from "react-icons/fa";
import "./employeeTable.css";
import TableYearCrud from "./yearTab-Table/tableYearCrud";
import TableSubjectCrud from "./subjectTab-Table/tableSubject-Crud";
import { Context } from "../../App";

const EmployeeTable = () => {
  // useState Hook
  const [employees, setEmployees] = useState([]);
  const [fetchedEmployees, setFetchedEmployees] = useState([]);
  const [searchField, setSearchField] = useState("empNo");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [openDetails, setOpenDetails] = useState({});
  const [activeTab, setActiveTab] = useState("yearSemIds");
  // eslint-disable-next-line no-unused-vars
  const [editedYearSemester, setEditedYearSemester] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [editedSubject, setEditedSubject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  // eslint-disable-next-line no-unused-vars
  const [userDetails, setUserDetails] = useContext(Context);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const toggleDetails = (empNo) => {
    setOpenDetails((prevOpenDetails) => ({
      ...prevOpenDetails,
      [empNo]: !prevOpenDetails[empNo],
    }));
  };
  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get("/employees"); // Adjust the route based on your backend
      setFetchedEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  // useEffect Hook

  useEffect(() => {
    fetchEmployees();
  }, []);

  // useEffect Hook
  useEffect(() => {
    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    setEmployees(fetchedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee));
  }, [currentPage, fetchedEmployees, employeesPerPage]);

  // const addEmployee = (employee) => {
  //   setEmployees([...employees, employee]);
  // };

  const updateEmployeeList = (updatedEmployee) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee.empNo === updatedEmployee.empNo) {
        return updatedEmployee;
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  const handleYearSemesterEdit = (editedData) => {
    setEditedYearSemester(editedData);
    updateEmployeeListYearSemester(editedData);
    //  await fetchEmployees();
  };

  const updateEmployeeListYearSemester = (editedData) => {
    const updatedEmployees = employees.map((employee) => {
      if (
        employee.yearSemIds &&
        employee.yearSemIds[0] &&
        editedData._id === employee.yearSemIds[0]._id
      ) {
        return {
          ...employee,
          yearSemIds: [
            {
              ...employee.yearSemIds[0],
              ...editedData,
            },
          ],
        };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  const handleSubjectEdit = (editedSubjectData) => {
    setEditedSubject(editedSubjectData);
    updateEmployeeListSubject(editedSubjectData);
    //  await fetchEmployees();
  };

  const updateEmployeeListSubject = (editedSubjectData) => {
    const updatedEmployees = employees.map((employee) => {
      if (
        employee.subjectIds &&
        employee.subjectIds[0] &&
        editedSubjectData._id === employee.subjectIds[0]._id
      ) {
        return {
          ...employee,
          subjectIds: [
            {
              ...employee.subjectIds[0],
              ...editedSubjectData,
            },
          ],
        };
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  const editEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
  };

  const deleteEmployee = (empNo) => {
    const updatedEmployees = employees.filter(
      (employee) => employee.empNo !== empNo
    );
    setEmployees(updatedEmployees);
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "" || searchField.trim() === "") {
      // If search term or search field is empty, reset the search
      resetSearch();
    } else {
      const filteredEmployees = fetchedEmployees.filter((employee) => {
        if (searchField === "empNo") {
          return employee.empNo.toString().includes(searchTerm);
        } else if (searchField === "name") {
          return employee.name.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchField === "percentage") {
          return employee.percentage.toString().includes(searchTerm);
        }
        return false;
      });

      setEmployees(filteredEmployees);
      setIsSearchActive(true);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setIsSearchActive(false);
    setCurrentPage(1);

    // Set employees to the first page of fetchedEmployees
    setEmployees(fetchedEmployees.slice(0, employeesPerPage));
  };

  return (
    <div className="TableContainer">
      <div className="searchDropdown">
        <select onChange={(e) => setSearchField(e.target.value)}>
          <option value="empNo">Roll No</option>
          <option value="name">Name</option>
          <option value="percentage">Percentage</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={`Search by ${searchField}`}
        />
        <button onClick={handleSearch}>Search</button>
        {isSearchActive && <button onClick={resetSearch}>Reset</button>}
      </div>
      <div className="container1">
        <table className="table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Name</th>
              <th>Percentage</th>
              <th>Branch</th>
              {userDetails && userDetails.role_id.roleName === "admin" && (
                <th>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <React.Fragment key={employee.empNo}>
                <tr>
                  <td>
                    <button
                      className="btn-btn-link"
                      type="button"
                      onClick={() => toggleDetails(employee.empNo)}
                    >
                      {openDetails[employee.empNo] ? "^" : ">"}
                    </button>
                    {employee.empNo}
                  </td>
                  <td>{employee.name}</td>
                  <td>{employee.percentage}</td>
                  <td>{employee.branch}</td>
                  {userDetails && userDetails.role_id.roleName === "admin" && (
                    <>
                      <td className="actions">
                        <button
                          className="edit-btn"
                          onClick={() => editEmployee(employee)}
                        >
                          <FaEdit />
                        </button>
                        <DeleteEmployee
                          empNo={employee.empNo}
                          deleteEmployee={deleteEmployee}
                        />
                      </td>
                    </>
                  )}
                </tr>
                {openDetails[employee.empNo] && (
                  <tr>
                    <td colSpan="6">
                      <div>
                        <div className="nav-tabs">
                          <button
                            className={`nav-link ${
                              activeTab === "yearSemIds" ? "active" : ""
                            }`}
                            onClick={() => handleTabChange("yearSemIds")}
                          >
                            Year
                          </button>
                          <button
                            className={`nav-link ${
                              activeTab === "subjectIds" ? "active" : ""
                            }`}
                            onClick={() => handleTabChange("subjectIds")}
                          >
                            Subject
                          </button>
                        </div>
                        <div>
                          {activeTab === "yearSemIds" && (
                            <div className="content-tab">
                              {/* <div>
                                <strong>Year:</strong> {employee.yearSemIds.length > 0 ? employee.yearSemIds[0].year : 'N/A'}
                              </div>
                              <div>
                                <strong>Semester:</strong> {employee.yearSemIds.length > 0 ? employee.yearSemIds[0].sem : 'N/A'}
                              </div>
                              <div>
                                <strong>Status:</strong> {employee.yearSemIds.length > 0 ? employee.yearSemIds[0].status : 'N/A'}
                              </div> */}

                              <TableYearCrud
                                data={employee.yearSemIds[0]}
                                onEdit={handleYearSemesterEdit}
                              />
                            </div>
                          )}
                          {activeTab === "subjectIds" && (
                            <div>
                              {/* <div>
                                <strong>Subject ID:</strong> {employee.subjectIds.length > 0 ? employee.subjectIds[0].subID : 'N/A'}
                              </div>
                              <div>
                                <strong>Subject Name:</strong> {employee.subjectIds.length > 0 ? employee.subjectIds[0].name : 'N/A'}
                              </div>
                              <div>
                                <strong>Subject Description:</strong> {employee.subjectIds.length > 0 ? employee.subjectIds[0].description : 'N/A'}
                              </div> */}
                              <TableSubjectCrud
                                data={employee.subjectIds[0]}
                                onEditSubject={handleSubjectEdit}
                              />
                              {/* <div>
                                <strong>Topics:</strong> {
                                  employee.subjectIds.length > 0
                                    ? employee.subjectIds
                                      .filter(item => item && item.topics) // Remove items without status
                                      .map(item => item.topics)
                                      .join(', ')
                                    : 'N/A'
                                }
                              </div> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/*{userDetails && userDetails.role_id.roleName === 'admin' && (
      <AddEmployee addEmployee={addEmployee} />
      )} */}
      {selectedEmployee && (
        <EditEmployee
          employeeData={selectedEmployee}
          updateEmployee={updateEmployeeList}
          closeModal={closeModal}
        />
      )}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(fetchedEmployees.length / employeesPerPage)
          }
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
