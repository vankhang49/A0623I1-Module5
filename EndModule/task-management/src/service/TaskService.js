import axios from "axios";

export const getAllTasks = async (nameSearch, startDate, endDate, statusName, page) => {
    try {
        if (page < 1) {
            page = 1;
        }
        let temp;
        if (endDate === "") {
            temp = await axios.get(`http://localhost:8080/tasks?name_like=${nameSearch}`
                + `&endDate_gte=${startDate}&status.name_like=${statusName}&_page=${page}&_limit=5&_sort=id&_order=asc`);
        } else {
            temp = await axios.get(`http://localhost:8080/tasks?name_like=${nameSearch}&endDate_gte=${startDate}`
                + `&endDate_lte=${endDate}&status.name_like=${statusName}&_page=${page}&_limit=5&_sort=id&_order=asc`);
        }
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const findTaskById = async (taskId) => {
    try {
        const temp = await axios.get("http://localhost:8080/tasks/" + taskId);
        return temp.data;
    } catch (e) {
        throw new Error("Không tìm thấy công việc!")
    }
};

export const saveTask = async (task) => {
    try {
        await axios.post("http://localhost:8080/tasks", task);
    }catch (e) {
        throw new Error("Không thể thêm mới!")
    }
};

export const updateTask = async (id, task) => {
    try {
        await axios.put(`http://localhost:8080/tasks/${id}`, task);
    }catch (e) {
        throw new Error("Không thể cập nhật!")
    }
};

export const deleteTask = async (id) => {
    try {
        console.log(id)
        console.log(`http://localhost:8080/tasks/${id}`)
        await axios.delete(`http://localhost:8080/tasks/${id}`);
    }catch (e) {
        throw new Error("Không thể xoá task!!!");
    }
};