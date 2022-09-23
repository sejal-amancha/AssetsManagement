import axios from "axios";

const token = JSON.parse(localStorage.getItem("ADMIN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadDepartmentsApi = async () =>  await axios.get("http://localhost:9091/api/department/getall", { headers : headersParam});

export const addNewDepartmentApi = async (newDepartment) => await axios.post("http://localhost:9091/api/department/create", newDepartment, { headers : headersParam})

export const updateDepartmentApi = async (updateDepartment) => await axios.put(`http://localhost:9091/api/department/${updateDepartment.id}`, updateDepartment, { headers: headersParam })

export const getSingleDepartmentApi = async (singleDepartment) =>  await axios.get(`http://localhost:9091/api/department/${singleDepartment}`, { headers: headersParam })

export const deleteDepartmentApi = async (deleteDepartment) => await axios.delete(`http://localhost:9091/api/department/${deleteDepartment.id}`, { headers: headersParam })