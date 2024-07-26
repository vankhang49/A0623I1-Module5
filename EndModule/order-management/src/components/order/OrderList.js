import "./style.scss";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import * as orderService from "../../services/OrderService";
import * as productService from "../../services/ProductService";
import {toast} from "react-toastify";
import Modal from "../modal/Modal";
import Moment from "moment";
import logo from "./logo.svg";
import home from "./home.svg";
import bag from "./bag.svg";
import sort from "./sort.svg";
import eye from "./eye.svg";
import pencil from "./pencil.svg";
import trash from "./trash.svg";
import asc from "./asc.svg";
import desc from "./desc.svg";
import {getAllOrderByTopOrder} from "../../services/OrderService";

export function OrderList() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [itemDelete, setItemDelete] = useState({});
    const [topOrder, setTopOrder] = useState(1);
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState();
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await getOrderList("", "", "",1);
            await getProductsList();
        };
        fetchData();
    }, [])

    const getOrderList = async (nameSearch, dateBefore, dateAfter, page) => {
        const temp = await orderService.getAllOrders(nameSearch, dateBefore, dateAfter, page);
        setOrders(temp);
    }
    const getOrderListByTopOrder = async (top) => {
        const temp = await orderService.getAllOrderByTopOrder(top);
        setOrders(temp);
    }

    const getProductsList = async () => {
        const temp = await productService.getAllProducts();
        setProducts(temp);
    }

    const showEditPage = (id) => {
        navigate("/orders/edit", {state: {id: id}});
    }

    const showDetailPage = (id) => {
        navigate("/orders/detail", {state: {id: id}});
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (id, name) => {
        setOpen(true);
        setItemDelete({
            "id": id,
            "name": name
        });
    };

    const onSubmit = async (data) => {
        console.log(data)
        let nameSearch = data.nameSearch;
        let dateBefore = data.dateBefore;
        let dateAfter = data.dateAfter;
        await getOrderList(nameSearch, dateBefore, dateAfter, 1);
    }

    const handleChangeTopOrder = async (n) => {
        console.log(Number(n.target.value))
        setTopOrder(n.target.value);
    }

    const searchTopOrder = async() => {
        await getOrderListByTopOrder(topOrder);
    }

    const deleteProductById = async (id) => {
        try {
            await orderService.deleteOrder(id);
            toast.success("Delete successfully!")
        } catch (error) {
            toast.error(error.message);
        }
        handleClose();
        await getOrderList("", "", "", "1");
    }

    const nextTasks = async (page) => {
        setPage(page);
        await getOrderList("", "", "", page);
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
                            <span>Danh sách hoá đơn</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="app-content">
                <div className="app-content-header">
                    <h1 className="app-content-headerText">Danh sách hoá đơn</h1>
                    <Link to={"/orders/create"} className="app-content-headerButton">Thêm mới hoá đơn</Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="app-content-actions">
                    <input className="search-bar search-price" placeholder="Từ ngày"
                           {...register("dateBefore")} type="date"/>
                    <input  className="search-bar search-price" placeholder="Đến"
                            {...register("dateAfter")}  type="date"/>
                    <select {...register("nameSearch")} className="search-bar search-price">
                        <option value="">--Chọn một sản phẩm--</option>
                        {products.map((product)=> (
                            <option value={product.name}>{product.name}</option>
                        ))}
                    </select>
                    <button className={"search-bar-btn"} type="submit">Tìm kiếm</button>
                </form>
                <div className="top-order">
                    <span>Top</span>
                    <select onChange={(n)=>handleChangeTopOrder(n)} className="search-bar search-top-order">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <span>đơn hàng có tổng số tiền cao nhất</span>
                    <button type="button" className={"search-bar-btn"} onClick={() => searchTopOrder()}>Xem top</button>
                </div>
                {orders.length > 0 ? (
                <div className="products-area-wrapper tableView">
                    <div className="products-header">
                        <div className="product-cell stt">STT</div>
                        <div className="product-cell product-code">Mã đơn hàng</div>
                        <div className="product-cell product-name">Tên sản phẩm</div>
                        <div className="product-cell price">Giá($)</div>
                        <div className="product-cell product-type">Loại sản phẩm</div>
                        <div className="product-cell buy-date">Ngày mua</div>
                        <div className="product-cell amount">Số lượng</div>
                        <div className="product-cell total">Tổng tiền($)</div>
                        <div className="product-cell edit">Actions</div>
                    </div>
                    {orders?.map((order, index) => (
                        <div className="products-row" key={index}>
                            <div className="product-cell stt">{++index}</div>
                            <div className="product-cell product-code">{order.id}</div>
                            <div className="product-cell product-name">{order.product.name}</div>
                            <div className="product-cell price">{order.product.price.toLocaleString("vi-VN")}</div>
                            <div className="product-cell product-type">{order.product.category}</div>
                            <div className="product-cell buy-date">{Moment(order.buyDate).format("DD/MM/yyyy")}</div>
                            <div className="product-cell amount">{order.quantity}</div>
                            <div
                                className="product-cell total">{(order.quantity * order.product.price).toLocaleString("vi-VN")}
                            </div>
                            <div className="product-cell edit">
                                <a onClick={() => showDetailPage(order.id)}>
                                    <img src={eye} alt="detail"/>
                                </a>
                                <a onClick={() => showEditPage(order.id)}>
                                    <img src={pencil} alt="update"/>
                                </a>
                                <a onClick={() => handleOpen(order.id, order.product.name)}>
                                    <img src={trash} alt="delete"/>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                    ):(<p style={{fontSize:"24px", color:"red"}}>Không có kết quả</p>)}
                <div className="page">
                {page > 1 ?
                        <a className="page-a" onClick={() => nextTasks(page - 1)}>Trang trước</a>
                        : null}
                    {page > 1 ?
                        <span>
                                <a className="page-a" onClick={() => nextTasks(1)}>1</a>
                                <a className="page-a" onClick={() => nextTasks(2)}>2</a>
                            </span>
                        : null}
                    {orders?.length === 10 ?
                        <a className="page-a" onClick={() => nextTasks(page + 1)}>Trang sau</a>
                        : null}
                </div>
            </div>
            <Modal isOpen={open}>
                <div className="head-modal">
                    <img src={trash} alt="warning"/>
                </div>
                <div>
                    <h2>Are you sure you will delete order {itemDelete.id}?</h2>
                    <p>Order with product {itemDelete.name}</p>
                    <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                         preserveAspectRatio="none">
                        <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
                    </svg>
                    <div className="modal-footer">
                        <button type="button" className="btn-accept"
                                onClick={() => deleteProductById(itemDelete.id)}>Accept
                        </button>
                        <button type="button" className="btn-accept btn-cancel" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}