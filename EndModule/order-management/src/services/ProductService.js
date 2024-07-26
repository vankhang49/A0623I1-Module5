import axios from "axios";

export const getAllProducts = async () => {
    try {
        const temp = await axios.get("http://localhost:8080/products");
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const saveProduct = async (product) => {
    try {
        await axios.post("http://localhost:8080/products", product);
    }catch (e) {
        throw new Error("Can not save Product!")
    }
}

export const updateProduct = async (id, product) => {
    try {
        await axios.post(`http://localhost:8080/products/${id}`, product);
    }catch (e) {
        throw new Error("Can't update Product!")
    }
}

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/products/${id}`);
    }catch (e) {
        throw new Error("Can't delete Product!!!");
    }
}