import axios from "axios";

const token = JSON.parse(localStorage.getItem("ADMIN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadComboApi = async () =>
            await axios.get(`http://localhost:9091/api/combo/`, { headers: headersParam });

export const createComboApi = async (comboData) => 
            await axios.post(`http://localhost:9091/api/combo/create`,comboData, {headers: headersParam});

export const updateComboApi = async (comboData) => 
            await axios.patch(`http://localhost:9091/api/combo/${comboData.id}`, comboData, { headers : headersParam });

export const getSingleComboApi = async (comboData) => 
            await axios.get(`http://localhost:9091/api/combo/${comboData.id}`, { headers : headersParam });

export const deleteComboApi = async (comboData) => 
            await axios.delete(`http://localhost:9091/api/combo/${comboData.id}`, { headers: headersParam });