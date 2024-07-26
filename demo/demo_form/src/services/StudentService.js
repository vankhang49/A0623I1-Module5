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

export const getAllStudent = () => students;

export const saveStudent = (student) => {
    students.push(student);
}