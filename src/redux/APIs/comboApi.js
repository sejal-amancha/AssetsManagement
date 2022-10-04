import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadComboApi = async () =>await axios.get(`http://localhost:9091/api/category/item-list`, { headers: headersParam });

