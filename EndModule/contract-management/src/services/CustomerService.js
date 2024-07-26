import axios from "axios";

export const getAllCustomers = async () => {
    try {
        const temp = await axios.get("http://localhost:8080/customers");
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const saveCustomer = async (customer) => {
    try {
        await axios.post("http://localhost:8080/customers", customer);
    }catch (e) {
        throw new Error("Can not save Customer!")
    }
}

export const updateCustomer = async (id, customer) => {
    try {
        await axios.post(`http://localhost:8080/customers/${id}`, customer);
    }catch (e) {
        throw new Error("Can't update Customer!")
    }
}

export const deleteCustomer = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/customers/${id}`);
    }catch (e) {
        throw new Error("Can't delete Customer!!!");
    }
}