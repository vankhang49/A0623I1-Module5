import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as orderService from "../../services/OrderService";
import * as productService from "../../services/ProductService";
import {toast} from "react-toastify";
import logo from "./logo.svg";
import home from "./home.svg";
import bag from "./bag.svg";

export function OrderEdit() {
    const [order, setOrder] = useState({});
    const [products, setProducts] = useState([]);
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        const fetchData = async () => {
            await getOrderById(state.id);
            await getProductsList();
        }
        fetchData()
    }, [state.id])

    const getOrderById = async (id) => {
        const temp = await orderService.findOrderById(id);
        if (temp) {
            setOrder(temp)
            setValue("id", temp.id);
            setValue("product", JSON.stringify(order.product));
            setValue("quantity", temp.quantity);
            setValue("buyDate", temp.buyDate);
        }
    }

    const getProductsList = async () => {
        const temp = await productService.getAllProducts();
        setProducts(temp);
    }

    const onSubmit = async (data) => {
        try {
            let product = JSON.parse(data.product);
            console.log(product);
            data.quantity = Number(data.quantity);
            data.product = product;
            data.total = product.price * Number(data.quantity);
            console.log(data)
            await orderService.updateOrder(data.id, data);
        } catch (error) {
            toast.error(error.message);
        }
        toast.success("Update successfully!");
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
                <div className="header-content">
                    <h1>Cập nhật đơn hàng</h1>
                </div>
                <div className="form-add-edit">
                    <form onSubmit={handleSubmit(onSubmit)} className="form-operation">
                        <div className="form-element">
                            <label>Mã đơn hàng</label>
                            <input type="text" disabled {...register("quantity")} className="form-input"/>
                        </div>
                        <div className="form-element">
                            <label>Sản phẩm</label>
                            <select {...register("product", {required: "Do not required!"})} className="form-input">
                                <option value="">--Choose one Product--</option>
                                   {products?.map((product, index) => (
                                       <option key={index} selected={product.id === order.product.id}
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
                            <button type="submit">Cập nhật</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}