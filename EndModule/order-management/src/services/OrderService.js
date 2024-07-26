import axios from "axios";

export const getAllOrders = async (nameSearch, dateBefore, dateAfter, page) => {
    try {
        if (page < 1) {
            page = 1;
        }
        let temp;
        if (dateAfter === "") {
            temp = await axios.get(`http://localhost:8080/orders?buyDate_gte=${dateBefore}` +
                `&product.name_like=${nameSearch}` +
                `&_page=${page}&_limit=10&_sort=product.price&_order=asc`);
        } else {
            temp = await axios.get(`http://localhost:8080/orders?buyDate_gte=${dateBefore}&buyDate_lte=${dateAfter}` +
                `&product.name_like=${nameSearch}` +
                `&_page=${page}&_limit=10&_sort=product.price&_order=asc`);
        }
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const getAllOrderByTopOrder = async (top) => {
    try {
        const temp = await axios.get(`http://localhost:8080/orders?_limit=${top}&_sort=total&_order=desc`);
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const findOrderById = async (id) => {
    try {
        const temp = await axios.get("http://localhost:8080/orders/" + id);
        return temp.data;
    } catch (e) {
        throw new Error("Order not found!")
    }
}

export const saveOrder = async (order) => {
    try {
        await axios.post("http://localhost:8080/orders", order);
    }catch (e) {
        throw new Error("Can't not save Order!")
    }
}

export const updateOrder = async (id, order) => {
    try {
        await axios.put(`http://localhost:8080/orders/${id}`, order);
    }catch (e) {
        throw new Error("Can't update Order!")
    }
}

export const deleteOrder = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/orders/${id}`);
    }catch (e) {
        throw new Error("Can't delete Order!!!");
    }
}