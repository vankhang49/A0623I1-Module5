
import axios from "axios";

export const getAllClothes = async (titleSearch, startDate, endDate, categoryType, page) => {
    try {
        if (page < 1) {
            page = 1;
        }
        let temp;
        if (endDate === "") {
            temp = await axios.get(`http://localhost:8080/clothes?title_like=${titleSearch}` +
                `&date_gte=${startDate}&category.type_like=${categoryType}&_page=${page}&_limit=5&_sort=quantity&_order=asc`);
        } else {
            temp = await axios.get(`http://localhost:8080/clothes?title_like=${titleSearch}` +
                `&date_gte=${startDate}&date_lte=${endDate}&category.type_like=${categoryType}&_page=${page}&_limit=5&_sort=quantity&_order=asc`);
        }
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const findClothById = async (id) => {
    try {
        const temp = await axios.get("http://localhost:8080/clothes/" + id);
        return temp.data;
    } catch (e) {
        throw new Error("Clothing not found!")
    }
}

export const saveCloth = async (cloth) => {
    try {
        await axios.post("http://localhost:8080/clothes", cloth);
    }catch (e) {
        throw new Error("Can't not save Cloth!")
    }
}

export const updateCloth = async (id, cloth) => {
    try {
        await axios.put(`http://localhost:8080/clothes/${id}`, cloth);
    }catch (e) {
        throw new Error("Can't update Cloth!")
    }
}

export const deleteCloth = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/clothes/${id}`);
    }catch (e) {
        throw new Error("Can't delete Cloth!!!");
    }
}