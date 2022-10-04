import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};
       
export const newAllocationApi = async (newAllocation) => await axios.post(`http://localhost:9091/api/employee/assign-items`, newAllocation, { headers: headersParam });

           