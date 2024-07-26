import axios from "axios";

export const getAllProducts = async (nameSearch, beforePrice, afterPrice, typeName, page, codeSort, codeDirection,
                                     nameSort, nameDirection, typeSort, typeDirection, priceSort, priceDirection,
                                     quantitySort, quantityDirection) => {
    try {
        if (page < 1) {
            page = 1;
        }
        let temp;
        if (afterPrice === "") {
            temp = await axios.get(`http://localhost:8080/products?name_like=${nameSearch}` +
                `&price_gte=${beforePrice}&type.name_like=${typeName}&_page=${page}&_limit=12` +
                `&_sort=${codeSort},${nameSort},${typeSort},${priceSort},${quantitySort}` +
                `&_order=${codeDirection},${nameDirection},${typeDirection},${priceDirection},${quantityDirection}`);
        } else {
            temp = await axios.get(`http://localhost:8080/products?name_like=${nameSearch}` +
                `&price_gte=${beforePrice}&price_lte=${afterPrice}&type.name_like=${typeName}` +
                `&_sort=${codeSort},${nameSort},${typeSort},${priceSort},${quantitySort}` +
                `&_order=${codeDirection},${nameDirection},${typeDirection},${priceDirection},${quantityDirection}`);
        }
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const findProductById = async (id) => {
    try {
        const temp = await axios.get("http://localhost:8080/products/" + id);
        return temp.data;
    } catch (e) {
        throw new Error("Product not found!")
    }
}

export const saveProduct = async (product) => {
    try {
        await axios.post("http://localhost:8080/products", product);
    }catch (e) {
        throw new Error("Can't not save Product!")
    }
}

export const updateProduct = async (id, product) => {
    try {
        await axios.put(`http://localhost:8080/products/${id}`, product);
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