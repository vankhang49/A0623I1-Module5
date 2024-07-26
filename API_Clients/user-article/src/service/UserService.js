import axios from "axios";

export async function getAllUsers() {
    try {
        const temp = await axios.get("http://localhost:8080/users");
        console.log(temp)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function findUserById(id) {
    try {
        const temp = await axios.get("http://localhost:8080/users/" + id);
        console.log(temp)
        return temp.data;
    } catch (e) {
        console.log(e)
        return null;
    }
}

export async function saveUser(user) {
    try {
        await axios.post("http://localhost:8080/users", user);
    } catch (e) {
        throw new Error("Không thể thêm mới")
    }
}

export async function updateUser(user) {
    try {
        await axios.put("http://localhost:8080/users/" + user.id, user);
    }catch (e) {
        throw new Error("Cập nhật thất bại!");
    }
}

export async function deleteUser(id) {
    try {
        await axios.delete(`http://localhost:8080/users/${id}`);
    }catch (e) {
        throw new Error("Xoá thất bại!");
    }
}