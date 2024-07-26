import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as productService from "../../services/ProductService";
import * as typeService from "../../services/TypeService";
import {toast} from "react-toastify";
import logo from "./logo.svg";
import home from "./home.svg";
import bag from "./bag.svg";

export function ProductEdit() {
    const [product, setProduct] = useState({});
    const [types, setTypes] = useState([]);
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        const fetchData = async () => {
            await getProductById(state.id);
            await getTypesList();
        }
        fetchData()
    }, [state.id])


    const getProductById = async (id) => {
        const temp = await productService.findProductById(id);
        if (temp) {
            setProduct(temp)
            setValue("id", temp.id)
            setValue("code", temp.code)
            setValue("name", temp.name)
            setValue("description", temp.description)
            setValue("type", JSON.stringify(product.type));
            setValue("price", temp.price)
            setValue("quantity", temp.quantity)
            setValue("date", temp.date)

        }
    }

    const getTypesList = async () => {
        const temp = await typeService.getAllTypes();
        setTypes(temp);
    }

    const onSubmit = async (data) => {
        try {
            data.price = Number(data.price);
            data.quantity = Number(data.quantity);
            data.type = JSON.parse(data.type);
            console.log(data)
            await productService.updateProduct(data.id, data);
            toast.success("Cập nhật thành công!");
        } catch (error) {
            toast.error(error.message);
        }
        navigate("/products");
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
                <div className="header-content">
                    <h1>Cập nhật sản phẩm</h1>
                </div>
                <div className="form-add-edit">
                    <form onSubmit={handleSubmit(onSubmit)} className="form-operation">
                        <div className="form-element">
                            <label>Mã sản phẩm</label>
                            <input type="text" {...register("code", {
                                required: "Không được để trống!",
                                pattern: {
                                    value: /^PROD-\d{4}$/,
                                    message: "Mã sản phẩm phải bắt đầu bằng PROD- và theo sau là 4 chữ số!"
                                }
                            })} className="form-input"/>
                            {errors.code && <p style={{color: "red", fontSize: "16px"}}>{errors.code.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Name</label>
                            <input type="text" {...register("name", {
                                required: "Không được để trống!",
                                pattern: {
                                    value: /^[A-ZĐđÀ][A-Za-zĐđÀ-ỹ0-9 '"/]{4,50}$/,
                                    message: "Tên phải bắt đầu bằng chữ IN HOA và có thể chứa khoảng trắng và các ký tự đặc biệt!"
                                }
                            })} className="form-input"/>
                            {errors.name && <p style={{color: "red", fontSize: "16px"}}>{errors.name.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Mô tả</label>
                            <textarea {...register("description")} className="form-input"></textarea>
                        </div>
                        <div className="form-element">
                            <label>Loại sản phẩm</label>
                            <select {...register("type", {required: "Không được để trống!"})} className="form-input">
                                <option value="">--Chọn loại sản phẩm--</option>
                                {types?.map((type) => (
                                    <option key={type.id} selected={type.id === product.type.id}
                                            value={JSON.stringify(type)}>{type.name}</option>
                                ))}
                            </select>
                            {errors.type &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.type.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Giá cả</label>
                            <input type="text" {...register("price", {
                                required: "Không được để trống!",
                                min: {value: 1, message: "Giá phải lớn hơn 0!"},
                                pattern: {value: /^[1-9]\d*$/, message: "Giá phải lớn hơn 0!"}
                            })} className="form-input"/>
                            {errors.price &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.price.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Quantity</label>
                            <input type="text" {...register("quantity", {
                                required: "Không được để trống!",
                                min: {value: 1, message: "Số lượng phải lớn hơn 0!"},
                                pattern: {value: /^[1-9]\d*$/, message: "Số lượng phải lớn hơn 0!"}
                            })} className="form-input"/>
                            {errors.quantity &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.quantity.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Ngày đăng</label>
                            <input type="date" {...register("date", {required: "Không được để trống!"})}
                                   className="form-input"/>
                            {errors.date &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.date.message}</p>}
                        </div>
                        <div className="btn-form">
                            <button type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}