
import axios from "axios";

export const getAllStatuses = async () => {
    try {
        const temp = await axios.get("http://localhost:8080/statuses");
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const saveStatus = async (task) => {
    try {
        await axios.post("http://localhost:8080/statuses", task);
    }catch (e) {
        throw new Error("Không thể thêm mới!")
    }
}

export const updateStatus = async (id, status) => {
    try {
        await axios.post(`http://localhost:8080/statuses/${id}`, status);
    }catch (e) {
        throw new Error("Không thể cập nhật!")
    }
}

export const deleteStatus = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/statuses/${id}`);
    }catch (e) {
        throw new Error("Không thể xoá trạng thái!!!");
    }
}