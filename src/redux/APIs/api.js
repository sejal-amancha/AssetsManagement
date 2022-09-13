import axios from "axios";

const token = JSON.parse(localStorage.getItem("ADMIN"));
const headersParam = {
    Authorization: `Bearer ${token}`,
};

export const adminLoginApi = async (user) => await axios.post(`http://localhost:9091/api/user/login`, user);

export const adminChangePassApi = async (adminPass) => await axios.post(`http://localhost:9091/api/user/change-password`, adminPass, { headers: headersParam });

export const adminLogoutApi = async () => await axios.delete(`http://localhost:9091/api/user/logout`, { headers: headersParam });

export const loadUsersApi = async () => await axios.get("http://localhost:9091/api/user");

export const addEmployeeApi = async (newEmployee) => await axios.post(`http://localhost:9091/api/user/create`, newEmployee, { headers: headersParam });

export const updateEmployeeApi = async (updateEmployee) => await axios.patch(`http://localhost:9091/api/user/${updateEmployee.id}`, updateEmployee, { headers: headersParam });

export const deleteEmployeeApi = async (deleteEmployee) =>  await axios.delete(`http://localhost:9091/api/user/${deleteEmployee.payload.id}`, { headers: headersParam });

export const getSingleEmployeeApi = async (singlemployee) => await axios.get(`http://localhost:9091/api/user/${singlemployee}`, { headers : headersParam} );
