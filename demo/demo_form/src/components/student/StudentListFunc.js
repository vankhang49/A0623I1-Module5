import {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import * as studentService from "../../services/StudentService"

function StudentListFunc() {
    const [students, setStudents] = useState([]);

    // Tham số thứ nhất là callback để xử lý side effect
    useEffect(() => {
        //     Call API => học bài API client
        let temp = studentService.getAllStudent();
        setStudents(temp);

    }, [])
    // Tham số thứ 2 dependencies

    return (
        <>

            <Link to="/student/create">
                <button>Create</button>
            </Link>
            <table border="1" width="400px">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student, index) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    )
}

export default StudentListFunc;