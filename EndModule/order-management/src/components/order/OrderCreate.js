import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as productService from "../../services/ProductService";
import * as orderService from "../../services/OrderService";
import {toast} from "react-toastify";
import logo from "./logo.svg";
import home from "./home.svg";
import bag from "./bag.svg";

export function OrderCreate() {
    const [productList, setProductList] = useState([]);
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        getProductsList();
    }, [])

    const getProductsList = async () => {
        const temp = await productService.getAllProducts();
        setProductList(temp);
    }

    const onSubmit = async (data) => {
        try {
            let product = JSON.parse(data.product);
            data.quantity = Number(data.quantity);
            data.product = product;
            data.total = product.price * Number(data.quantity);
            await orderService.saveOrder(data);
            toast.success("Add new successfully!");
        } catch (error) {
            toast.error(error);
        }
        navigate("/orders");
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
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    <li className="sidebar-list-item active">
                        <Link to={"/orders"}>
                            <img src={bag} className="feather feather-shopping-bag" alt="product"/>
                            <span>Danh sách đơn hàng</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="app-content">
                <div className="app-content-header">
                    <h1>Thêm mới đơn hàng</h1>
                </div>
                <div className="form-add-edit">
                    <form onSubmit={handleSubmit(onSubmit)} className="form-operation">
                        <div className="form-element">
                            <label>Sản phẩm</label>
                            <select {...register("product", {required: "Không được để trồng!"})} className="form-input">
                                <option value="">--Choose one Product--</option>
                                {productList?.map((product, index) => (
                                    <option key={index}
                                            value={JSON.stringify(product)}>{product.name}</option>
                                ))}
                            </select>
                            {errors.product &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.product.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Số lượng</label>
                            <input type="text" {...register("quantity", {
                                required: "Do not required!",
                                min: {value: 1, message: "Số lượng phải lớn hơn 0 và phải là số nguyên!"},
                                pattern: {value: /^[1-9]\d*$/, message: "Số lượng phải lớn hơn 0 và phải là số nguyên!"}
                            })} className="form-input"/>
                            {errors.quantity &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.quantity.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Ngày mua</label>
                            <input type="date" {...register("buyDate", {required: "Do not required!"})}
                                   className="form-input"/>
                            {errors.buyDate &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.buyDate.message}</p>}
                        </div>
                        <div className="btn-form">
                            <button type="submit">Lưu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
