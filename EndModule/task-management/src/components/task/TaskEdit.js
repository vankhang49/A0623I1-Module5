import "./style.scss";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import home from "./home.svg";
import * as taskService from "../../service/TaskService";
import {toast} from "react-toastify";
import * as statusService from "../../service/StatusService";
import {options} from "axios";

export function TaskEdit() {
    const [task, setTask] = useState({});
    const [statuses, setStatuses] = useState([]);
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        getTask(state.id);
        getStatusList();
    }, []);

    const getTask = async (id) => {
        console.log(id)
        const temp = await taskService.findTaskById(id);
        setTask(temp);
    }

    const getStatusList = async () => {
        const temp = await statusService.getAllStatuses();
        setStatuses(temp);
    }
    const onSubmit = async (data) => {
        let newTask = {
            "id": data.id,
            "name": data.name,
            "description": data.description,
            "endDate": data.endDate,
            "status": statuses.find(status => status.id === data.status)
        }
        console.log(newTask)
        try {
            await taskService.updateTask(data.id ,newTask);
        } catch (error) {
            toast.error(error.message);
        }
        toast.success("Cập nhật thành công!");
        navigate("/tasks");
    }

    return (
        <div className="app">
            <div className="header">
                <div className="menu-circle">
                    <h3>Cập nhật công việc</h3>
                </div>
            </div>
            <div className="wrapper">
                <div className="left-side">
                    <div className="side-wrapper">
                        <div className="side-title">Main</div>
                        <div className="side-menu">
                            <Link to={"/tasks"}>
                                <img src={home} alt={home}/>
                                Quay lại trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="main-container">
                    <div className="content-wrapper">
                        <div className="content-section">
                            <form onSubmit={handleSubmit(onSubmit)} className="form-operation">
                                <div className="form-element">
                                    <input type="text" {...register("id")} defaultValue={task.id}
                                           className="form-label"/>
                                    <label>Tiêu đề</label>
                                    <input type="text" {...register("name")} defaultValue={task.name}
                                           className="form-label"/>
                                    <p style={{color: "red"}}></p>
                                </div>
                                <div className="form-element">
                                    <label>Mô tả</label>
                                    <textarea {...register("description")} defaultValue={task.description}
                                              className="form-label"></textarea>
                                    <p style={{color: "red"}}></p>
                                </div>
                                <div className="form-element">
                                    <label>Ngày kết thúc</label>
                                    <input type="date" {...register("endDate")} defaultValue={task.endDate}
                                           className="form-label"/>
                                    <p style={{color: "red"}}></p>
                                </div>
                                <div className="form-element">
                                    <label>Tình trạng</label>
                                    <select {...register("status")} defaultValue={task.status} className="form-label">
                                        {statuses?.map((status) => (
                                            status.id === task.status.id ?
                                                <option key={status.id} selected value={status.id}>{status.name}</option>:
                                                <option key={status.id} value={status.id}>{status.name}</option>
                                        ))}
                                    </select>
                                    <p style={{color: "red"}}></p>
                                </div>
                                <input type="submit" value="Cập nhật"
                                       className="content-button content-button-blue"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay-app"></div>
        </div>
    );

}