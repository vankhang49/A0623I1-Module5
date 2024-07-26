import axios from "axios";

export const getAllUser = async () => {
    try {
        const temp = await axios.get("http://localhost:8080/users");
        // console.log(temp.data)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const saveUser = async (user) => {
    try {
        await axios.post("http://localhost:8080/users", user);
    }catch (e) {
        throw new Error("Không thể thêm mới")
    }
}

export const deleteUser = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/users/${id}`);
    }catch (e) {
        throw new Error("Không thể xoá user!!!");
    }
}