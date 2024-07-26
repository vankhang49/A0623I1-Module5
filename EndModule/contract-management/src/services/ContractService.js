import axios from "axios";

export const getAllContracts = async (customerName, dateBefore, dateAfter, typeName, page) => {
    try {
        if (page < 1) {
            page = 1;
        }
        let temp;
        if (dateAfter === "") {
            temp = await axios.get(`http://localhost:8080/contracts?customer.name_like=${customerName}` +
                `&date_gte=${dateBefore}&type.name_like=${typeName}` +
                `&_page=${page}&_limit=12&_sort=price&_order=asc`);
        } else {
            temp = await axios.get(`http://localhost:8080/contracts?customer.name_like=${customerName}` +
                `&date_gte=${dateBefore}&date_lte=${dateAfter}&type.name_like=${typeName}` +
                `&_page=${page}&_limit=12&_sort=price&_order=asc`);
        }
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const findContractById = async (id) => {
    try {
        const temp = await axios.get("http://localhost:8080/contracts/" + id);
        return temp.data;
    } catch (e) {
        throw new Error("Contract not found!")
    }
}

export const saveContract = async (contract) => {
    try {
        await axios.post("http://localhost:8080/contracts", contract);
    }catch (e) {
        throw new Error("Can't not save contract!")
    }
}

export const updateContract = async (id, contract) => {
    try {
        await axios.put(`http://localhost:8080/contracts/${id}`, contract);
    }catch (e) {
        throw new Error("Can't update contract!")
    }
}

export const deleteContract = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/contracts/${id}`);
    }catch (e) {
        throw new Error("Can't delete contract!!!");
    }
}