import "./style.scss";
import home from "./home.svg";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import * as taskService from "../../service/TaskService";

export function TaskDetail() {
    const [task, setTask] = useState({});
    const {state} = useLocation();

    useEffect(  () => {
        async function fetchData() {
            await getTask(state.id);
        }
        fetchData();
    }, []);

    const getTask = async (id) => {
        const temp = await taskService.findTaskById(id);
        setTask(temp);
    }

    return (
        <div className="app">
            <div className="header">
                <div className="menu-circle">
                    <h3>View</h3>
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
                            <div className="content-section-title">Thông tin công việc</div>
                            <table className="table">
                                <tbody>
                                <tr>
                                    <th>Tiêu đề:</th>
                                    <td>{task.name}</td>
                                </tr>
                                <tr>
                                    <th>Mô tả:</th>
                                    <td>{task.description}</td>
                                </tr>
                                <tr>
                                    <th>Ngày kết thúc:</th>
                                    <td>{task.endDate}</td>
                                </tr>
                                <tr>
                                    <th>Tình trạng:</th>
                                    <td>{task.status?.name}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="overlay-app"/>
        </div>

    );
}