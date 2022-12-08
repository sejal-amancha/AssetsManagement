import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`,
};

export const adminLoginApi = async (user) => await axios.post(`http://localhost:9091/api/user/login`, user);

export const adminChangePassApi = async (adminPass) => await axios.post(`http://localhost:9091/api/user/change-password`, adminPass, { headers: headersParam });

export const adminLogoutApi = async () => await axios.delete(`http://localhost:9091/api/user/logout`, { headers: headersParam });

export const loadUsersApi = async () => await axios.get(`http://localhost:9091/api/employee`, { headers: headersParam });

export const addEmployeeApi = async (newEmployee) => await axios.post(`http://localhost:9091/api/employee/create`, newEmployee, { headers: headersParam });

export const updateEmployeeApi = async (updateEmployee) => await axios.put(`http://localhost:9091/api/employee/${updateEmployee.id}`, updateEmployee, { headers: headersParam });

export const deleteEmployeeApi = async (deleteEmployee) => await axios.delete(`http://localhost:9091/api/employee/${deleteEmployee.payload.id}`, { headers: headersParam });

export const getSingleEmployeeApi = async (singlemployee) => await axios.get(`http://localhost:9091/api/employee/getemployee/${singlemployee}` );

export const getSingleEmployeeAssignmentApi = async (singlemployeeAssignment) => await axios.get(`http://localhost:9091/api/employee/${singlemployeeAssignment}`, { headers : headersParam});


