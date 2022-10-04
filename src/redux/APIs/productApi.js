import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("ADMIN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadProductsApi = async () =>  await axios.get("http://localhost:9091/api/item/", { headers : headersParam});

export const addNewProductApi = async (newProduct) => await axios.post("http://localhost:9091/api/item/create", newProduct, { headers : headersParam})

export const updateProductApi = async (updateProduct) => await axios.put(`http://localhost:9091/api/item/${updateProduct.id}`, updateProduct, { headers: headersParam })

export const getSingleProductApi = async (singleProduct) => await axios.get(`http://localhost:9091/api/item/${singleProduct}`, { headers: headersParam })

export const deleteProductApi = async (deleteProduct) => await axios.delete(`http://localhost:9091/api/item/${deleteProduct.id}`, { headers: headersParam })