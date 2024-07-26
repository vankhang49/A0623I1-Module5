import {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import * as studentService from "../../services/StudentService"
import Modal from 'react-modal';
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {deleteStudentMiddleware} from "../../redux/middleware/StudentMiddleware";

function StudentListFunc() {
    const students = useSelector(state => state.students);
const dispatch = useDispatch();
    const [studentDelete, setStudentDelete] = useState({});

    // Tham số thứ nhất là callback để xử lý side effect
    useEffect(() => {
        //     Call API => học bài API client
        // getAll();
        Modal.setAppElement('body');
    }, [])
    // Tham số thứ 2 dependencies
    //
    // const getAll = async () => {
    //     const temp = await studentService.getAllStudent();
    //     setStudents(temp);
    // }

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const changeInfoDelete = (student) => {
        setStudentDelete(student);
        openModal();
    }

    const removeStudent = async () => {
        closeModal();
dispatch(deleteStudentMiddleware(studentDelete.id));
        toast.success("Xóa thành công");
    }

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
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student, index) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.address}</td>
                        <td><button onClick={() => changeInfoDelete(student)}>Xóa</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <div>Bạn có muốn xóa học sinh {studentDelete.name}</div>
                <button onClick={removeStudent}>Xóa</button>
            </Modal>
        </>
    )
}

export default StudentListFunc;