import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import * as studentService from "../../services/StudentService"
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {addStudentMiddleware} from "../../redux/middleware/StudentMiddleware";

function StudentCreate() {
    const dispatch = useDispatch();
    const [student, setStudent] = useState({
        id: "",
        name: "",
        age: "",
        address: ""
    })

    const navigate = useNavigate();

    const validateStudent = {
        id: Yup.number()
            .min(0, "Id không được nhỏ hơn 0")
            .max(10000000000),
        name: Yup.string()
            .required("Name không được để trống")
            .min(3, "Name không được nhỏ hơn 3 ký tự")
            .matches(/^[A-Za-z ]{3,100}$/, "Name phải đúng định dạng")
    }

    useEffect(() => {
    //     Call API để lấy thông tin đối tượng cần cập nhật

    }, [])

    const saveStudent = async (value) => {
        console.log(value);
        console.log(student)
    //     Call API thêm mới
    //     try {
    //         await studentService.saveStudent(value);
    //     }catch (e) {
        // }
        dispatch(addStudentMiddleware(value))
        toast.success("Thêm mới thành công")
    //     Chuyển về list
        navigate("/student")

    }

    return (
        <>
            <Formik initialValues={student} onSubmit={saveStudent} validationSchema={Yup.object(validateStudent)}>
                <Form>
                   ID: <Field name="id"></Field>
                    <ErrorMessage name="id" component="p"></ErrorMessage>
                   Name: <Field name="name"></Field>
                    <ErrorMessage name="name" component="span"></ErrorMessage>
                   Age: <Field name="age"></Field>
                   Address: <Field name="address"></Field>
                    <button type="submit">Thêm mới</button>
                </Form>
            </Formik>
        </>
    )
}

export default StudentCreate;