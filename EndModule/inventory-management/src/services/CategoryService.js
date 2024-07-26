import axios from "axios";

export const getAllCategories = async () => {
    try {
        const temp = await axios.get("http://localhost:8080/categories");
        console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const saveCategory = async (category) => {
    try {
        await axios.post("http://localhost:8080/categories", category);
    }catch (e) {
        throw new Error("Không thể thêm mới!")
    }
}

export const updateCategory = async (id, category) => {
    try {
        await axios.post(`http://localhost:8080/categories/${id}`, category);
    }catch (e) {
        throw new Error("Không thể cập nhật!")
    }
}

export const deleteCategory = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/categories/${id}`);
    }catch (e) {
        throw new Error("Không thể xoá đối tượng!!!");
    }
}