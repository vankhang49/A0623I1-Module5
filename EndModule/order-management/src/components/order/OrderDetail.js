import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as orderService from "../../services/OrderService";
import logo from "./logo.svg";
import home from "./home.svg";
import bag from "./bag.svg";

export function OrderDetail() {
    const [oder, setOder] = useState({});
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        const fetchData = async () => {
            await getOrderById(state.id);
        }
        fetchData();
    }, [state.id])

    const getOrderById = async (id) => {
        const temp = await orderService.findOrderById(id);
        setOder(temp);
    }

    return (
        <div className="app-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="app-icon">
                        <img src={logo} alt="logo"/>
                    </div>
                </div>
                <ul className="sidebar-list">
                    <li className="sidebar-list-item">
                        <Link to={"/orders"}>
                            <img src={home} className="feather feather-home" alt="home"/>
                            <span>Home Page</span>
                        </Link>
                    </li>
                    <li className="sidebar-list-item active">
                        <Link to={"/orders"}>
                            <img src={bag} className="feather feather-shopping-bag" alt="product"/>
                            <span>Order List</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="app-content">
                <div className="app-content-header">
                    <h1>Oder information</h1>
                </div>
                <div className="detail">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>Oder code:</th>
                            <td>{oder.id}</td>
                        </tr>
                        <tr>
                            <th>Buy date:</th>
                            <td>{oder.buyDate}</td>
                        </tr>
                        <tr>
                            <th>Product name:</th>
                            <td>{oder.product?.name}</td>
                        </tr>
                        <tr>
                            <th>Price:</th>
                            <td>{oder.product?.price}</td>
                        </tr>
                        <tr>
                            <th>Quantity:</th>
                            <td>{oder.quantity}</td>
                        </tr>
                        <tr>
                            <th>Total Price:</th>
                            <td>{oder.total}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}