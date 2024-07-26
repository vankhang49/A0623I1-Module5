import axios from "axios";

export const getAllTypes = async () => {
    try {
        const temp = await axios.get("http://localhost:8080/types");
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const saveType = async (type) => {
    try {
        await axios.post("http://localhost:8080/types", type);
    }catch (e) {
        throw new Error("Không thể thêm mới!")
    }
}

export const updateType = async (id, type) => {
    try {
        await axios.post(`http://localhost:8080/types/${id}`, type);
    }catch (e) {
        throw new Error("Không thể cập nhật!")
    }
}

export const deleteType = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/types/${id}`);
    }catch (e) {
        throw new Error("Không thể xoá đối tượng!!!");
    }
}