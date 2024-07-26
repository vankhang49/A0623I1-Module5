import "./style.scss";
import home from "./home.svg";
import setting from "./setting.svg";
import {useForm} from "react-hook-form";
import {useState} from "react";
import * as taskService from "../../service/TaskService";
import {toast} from "react-toastify";
import {Link, useLocation, useNavigate} from "react-router-dom";

export function TaskCreate() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    const onSubmit = async (data) => {
        let task = {
            "id": data.id,
            "name": data.name,
            "description": data.description,
            "endDate": data.endDate,
            "status": {
                "id": "1",
                "name": "chưa hoàn thành"
            }
        }
        try {
            await taskService.saveTask(task);
        } catch (error) {
            toast.error(error.message);
        }
        toast.success("Thêm mới thành công");
        navigate("/tasks");
    }


    return (
        <div className="app">
            <div className="header">
                <div className="menu-circle">
                    <h3>Thêm mới Công việc</h3>
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
                                    <label>Mã công việc</label>
                                    <input type="text" {...register("id")} className="form-label"/>
                                    <p style={{color: "red"}}></p>
                                </div>
                                <div className="form-element">
                                    <label>Tiêu đề</label>
                                    <input type="text" {...register("name")} className="form-label"/>
                                    <p style={{color: "red"}}></p>
                                </div>
                                <div className="form-element">
                                    <label>Mô tả</label>
                                    <textarea {...register("description")} className="form-label"></textarea>
                                    <p style={{color: "red"}}></p>
                                </div>
                                <div className="form-element">
                                    <label>Ngày kết thúc</label>
                                    <input type="date" {...register("endDate")} className="form-label"/>
                                    <p style={{color: "red"}}></p>
                                </div>
                                <input type="submit" value="Lưu"
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