import axios from "axios";

const token = JSON.parse(localStorage.getItem("ADMIN"));
const headersParam = {
    "Authorization" : `Bearer ${token}`
};

export const loadProductsApi = async () => 
            await axios.get("http://localhost:9091/api/product", { headers : headersParam});

export const addNewProductApi = async (newProduct) => 
            await axios.post("http://localhost:9091/api/product/create", newProduct, { headers : headersParam})

export const updateProductApi = async (updateProduct) => 
            await axios.patch(`http://localhost:9091/api/product/${updateProduct.id}`, updateProduct, { headers: headersParam })

export const getSingleProductApi = async (singleProduct) =>  
            await axios.get(`http://localhost:9091/api/product/${singleProduct}`, { headers: headersParam })

export const deleteProductApi = async (deleteProduct) =>
            await axios.delete(`http://localhost:9091/api/product/${deleteProduct.id}`, { headers: headersParam })