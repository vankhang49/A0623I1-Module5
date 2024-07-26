import "./style.scss";
import home from "./home.svg";
import setting from "./setting.svg";
import {useEffect, useState} from "react";
import * as taskService from "../../service/TaskService";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import * as statusService from "../../service/StatusService";
import Modal from "../modal/Modal";
import trash from "./trash.png";
import {useForm} from "react-hook-form";


export function TaskList(){
    const [tasks, setTasks] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState();
    const [taskIdDelete, setTaskIdDelete] = useState({});
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });
    const navigate = useNavigate();

    useEffect( () => {
        getTaskList("", "", "", "", "1");
        getStatusList();
    }, []);

    const getTaskList = async (nameSearch, startDate, endDate, statusName, page) => {
        const temp = await taskService.getAllTasks(nameSearch, startDate, endDate, statusName, page);
        setTasks(temp);
    }

    const getStatusList = async () => {
        const temp = await statusService.getAllStatuses();
        setStatuses(temp);
    }

    const showEditPage = (id) => {
        navigate("/tasks/edit", {state:{id: id}});
    }

    const showDetailPage = (id) => {
        navigate("/tasks/detail", {state:{id: id}});
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (id) => {
        setOpen(true);
        setTaskIdDelete(id);
    };

    const deleteTaskById = async (id) => {
        try {
            await taskService.deleteTask(id);
        } catch (error) {
            toast.error(error.message);
        }
        setOpen(false);
        toast.success("Xoá thành công!")
        getTaskList();
    }

    const onSubmit = async (data) => {
        let nameSearch = data.nameSearch || "";
        let startDate = data.startDate || "";
        let endDate = data.endDate || "";
        let statusName = data.status || "";
        await getTaskList(nameSearch, startDate, endDate, statusName);
    }

    const nextTasks = async (page) => {
        setPage(page);
        await getTaskList("", "", "", "", page);
    }

    return(
        <>
            <div className="app">
                <div className="header">
                    <div className="menu-circle">
                        <h3>Question and Answer</h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="search-bar">
                        <input type="text" {...register("nameSearch")} className="searching search-name"
                               placeholder="Search by name's task"/>
                        <label>From:</label>
                        <input type="date" {...register("startDate")} className="searching"/>
                        <label>To:</label>
                        <input type="date" {...register("endDate")} className="searching"/>
                        <select {...register("status")} className="searching">
                            <option value="">--Chọn trạng thái--</option>
                            {statuses.map((status) => (
                                <option key={status.id} value={status.name}>{status.name}</option>
                            ))}
                        </select>
                        <button className="btn btn-search">Tìm kiếm</button>
                    </form>
                </div>
                <div className="wrapper">
                    <div className="left-side">
                        <div className="side-wrapper">
                            <div className="side-title">Main</div>
                            <div className="side-menu">
                                <Link to="/tasks">
                                    <img src={home} alt={home}/>
                                    Trang chủ
                                </Link>
                                <Link to="/tasks/create">
                                <img src={setting} alt={setting}/>
                                    Thêm mới công việc
                                </Link>
                            </div>
                        </div>
                        <div className="side-wrapper">
                            <div className="side-title ">
                                Loại câu hỏi
                                <a href="#">
                                    <img src={setting} alt={setting}/>
                                    <span className="setting-category">Cài đặt</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="main-container">
                        <div className="content-wrapper">
                            <div className="content-section">
                                <div className="content-section-title">Task list</div>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th style={{ width: 200 }}>Name</th>
                                        <th>End date</th>
                                        <th>Process</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {tasks && tasks.map((task, index) => (
                                        <tr key={index}>
                                            <td>{task.id}</td>
                                            <td>{task.name || 'Không có tên'}</td>
                                            <td>{task.endDate || 'Không có ngày kết thúc'}</td>
                                            <td>{task.status.name || 'Không có trạng thái'}</td>
                                            <td>
                                                <button onClick={()=> showDetailPage(task.id)}
                                                        className="content-button content-button-blue">Detail</button>
                                                <button onClick={() => showEditPage(task.id)}
                                                    className="content-button">Update</button>
                                                <button className="content-button content-button-red" onClick={() => handleOpen(task.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <div className="page">
                                    {console.log(page)}
                                    {page > 1 ?
                                    <a className="page-a" onClick={() =>nextTasks(page-1)}>Trang trước</a>
                                        : null}
                                    <span>
                                        <a className="page-a" onClick={() =>nextTasks(1)}>1</a>
                                        <a className="page-a" onClick={() =>nextTasks(2)}>2</a>
                                    </span>
                                    {tasks.length === 5 ?
                                    <a className="page-a" onClick={() =>nextTasks(page+1)}>Trang sau</a>
                                    : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overlay-app" />
            </div>
            <Modal isOpen={open}>
                <div className="head-modal">
                    <img src={trash} alt="warning"/>
                </div>
                <div>
                    <input id="productIdDelete" name="productIdDelete" type="hidden"/>
                    <h2>Bạn có chắc muốn xoá công việc {taskIdDelete}?</h2>
                    <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                         preserveAspectRatio="none">
                        <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
                    </svg>
                    <div className="modal-footer">
                        <button type="button" className="btn-accept" onClick={() => deleteTaskById(taskIdDelete)}>Accept</button>
                        <button type="button" className="btn-accept btn-cancel" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}