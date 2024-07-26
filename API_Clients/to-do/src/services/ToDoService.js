import axios from "axios";

const toDoList = [];

export const getAllToDo = async () => {
    try {
        const temp = await axios.get("http://localhost:8080/toDo");
        console.log(temp)
        return temp.data;
        console.log(temp.data);
    } catch (e) {
        console.log(e)
        return [];
    }
};

export const saveToDo = async (toDo) => {
    try {
        await axios.post("http://localhost:8080/toDo", toDo);
    }catch (e) {
        throw new Error("Không thể thêm mới")
    }
}

export const deleteToDo = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/toDo/${id}`);
    }catch (e) {

    }
}