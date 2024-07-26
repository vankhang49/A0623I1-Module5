import axios from "axios";

const students =[
    {
        id: 1,
        name: "haiTT",
        age: 20,
        address: "Quảng Nam"
    },
    {
        id: 2,
        name: "haiTT1",
        age: 20,
        address: "Quảng Nam"
    },
    {
        id: 3,
        name: "haiTT2",
        age: 20,
        address: "Quảng Nam"
    }
]

export const getAllStudent = async () => {
    // use promise
    // axios.get("http://localhost:8080/students").then(data => {
    //
    // }).catch(err => {
    //
    // });

    // async/await
    try {
        const temp = await axios.get("http://localhost:8080/students");
        console.log(temp)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }

};

export const saveStudent = async (student) => {
    try {
        await axios.post("http://localhost:8080/students", student);
    }catch (e) {
        throw new Error("Không thể thêm mới")
    }
}

export const deleteStudent = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/students/${id}`);
    }catch (e) {

    }
}