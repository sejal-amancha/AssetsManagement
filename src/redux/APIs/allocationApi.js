import axios from "axios";

const token = JSON.parse(localStorage.getItem("ADMIN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadAllocationApi = async () => 
            await axios.get(`http://localhost:9091/api/allocation/`, {headers: headersParam});
        
export const newAllocationApi = async (newAllocateId) => 
            await axios.post(`http://localhost:9091/api/allocation/create`, newAllocateId, { headers: headersParam });

export const updateAllocationApi = async (uAllocationId) =>
            await axios.patch(`http://localhost:9091/api/allocation/${uAllocationId.id}`, uAllocationId, { headers: headersParam });

export const deleteAllocationApi = async (dAllocationId) =>
            await axios.delete(`http://localhost:9091/api/allocation/${dAllocationId.id}`, { headers: headersParam });



           