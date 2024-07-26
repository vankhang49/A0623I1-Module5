import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as productService from "../../services/ProductService";
import logo from "./logo.svg";
import home from "./home.svg";
import bag from "./bag.svg";

export function ProductDetail() {
    const [product, setProduct] = useState({});
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        getProductById(state.id);
    }, [state.id])

    const getProductById = async (id) => {
        const temp = await productService.findProductById(id);
        setProduct(temp);
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
                        <Link to={"/products"}>
                            <img src={home} className="feather feather-home" alt="home"/>
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    <li className="sidebar-list-item active">
                        <Link to={"/products"}>
                            <img src={bag} className="feather feather-shopping-bag" alt="product"/>
                            <span>Sản phẩm</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="app-content">
                <div className="app-content-header">
                    <h1>Thông tin sản phẩm</h1>
                </div>
                <div className="detail">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>Mã sản phẩm:</th>
                            <td>{product.code}</td>
                        </tr>
                        <tr>
                            <th>Tên sản phẩm:</th>
                            <td>{product.name}</td>
                        </tr>
                        <tr>
                            <th>Mô tả:</th>
                            <td>{product.description}</td>
                        </tr>
                        <tr>
                            <th>Loại sản phẩm:</th>
                            <td>{product.type?.name}</td>
                        </tr>
                        <tr>
                            <th>Giá cả:</th>
                            <td>{product.price}</td>
                        </tr>
                        <tr>
                            <th>Số lượng:</th>
                            <td>{product.quantity}</td>
                        </tr>
                        <tr>
                            <th>Ngày đăng:</th>
                            <td>{product.date}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}