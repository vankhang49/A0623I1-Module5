import "./style.scss";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import * as productService from "../../services/ProductService";
import * as typeService from "../../services/TypeService";
import {toast} from "react-toastify";
import Modal from "../modal/Modal";
import logo from "./logo.svg";
import home from "./home.svg";
import bag from "./bag.svg";
import sort from "./sort.svg";
import eye from "./eye.svg";
import pencil from "./pencil.svg";
import trash from "./trash.svg";
import asc from "./asc.svg";
import desc from "./desc.svg";

export function ProductList() {
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const [itemDelete, setItemDelete] = useState({});
    const [nameSet, setNameSet] = useState("");
    const [priceBefore, setPriceBefore] = useState("");
    const [priceAfter, setPriceAfter] = useState("");
    const [typeName, setTypeName] = useState("");
    const [codeSort, setCodeSort] = useState({
        field: "",
        direction: ""
    });
    const [nameSort, setNameSort] = useState({
        field: "",
        direction: ""
    });
    const [typeSort, setTypeSort] = useState({
        field: "",
        direction: ""
    });
    const [priceSort, setPriceSort] = useState({
        field: "",
        direction: ""
    });
    const [quantitySort, setQuantitySort] = useState({
        field: "",
        direction: ""
    });
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState();
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await getProductsList("", "", "", "", "1",
                codeSort.field, codeSort.direction, nameSort.field, nameSort.direction, typeSort.field,
                typeSort.direction, priceSort.field, priceSort.direction, quantitySort.field, quantitySort.direction);
            await getTypesList();
        };
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            await getProductsList("", "", "", "", "1",
                codeSort.field, codeSort.direction, nameSort.field, nameSort.direction, typeSort.field,
                typeSort.direction, priceSort.field, priceSort.direction, quantitySort.field, quantitySort.direction);
        }
        fetchData();
    }, [codeSort, nameSort, typeSort, priceSort, quantitySort]);

    const getProductsList = async (nameSearch, beforePrice, afterPrice, typeName, page, codeSort, codeDirection,
                                   nameSort, nameDirection, typeSort, typeDirection, priceSort, priceDirection,
                                   quantitySort, quantityDirection) => {
        const temp = await productService.getAllProducts(nameSearch, beforePrice, afterPrice, typeName, page,
            codeSort, codeDirection, nameSort, nameDirection, typeSort, typeDirection, priceSort, priceDirection,
            quantitySort, quantityDirection);
        setProducts(temp);
    }

    const getTypesList = async () => {
        const temp = await typeService.getAllTypes();
        setTypes(temp);
    }

    const handleChangeNameSearch = (obj) => {
        setNameSet(obj.target.value);
    }
    const handleChangePriceBefore = (obj) => {
        setPriceBefore(obj.target.value);
    }
    const handleChangePriceAfter = (obj) => {
        setPriceAfter(obj.target.value);
    }
    const handleChangeTypeName = (obj) => {
        setTypeName(obj.target.value);
    }

    const searchData = async () => {
        await getProductsList(nameSet, priceBefore, priceAfter, typeName, "1",
            codeSort.field, codeSort.direction, nameSort.field, nameSort.direction, typeSort.field,
            typeSort.direction, priceSort.field, priceSort.direction, quantitySort.field, quantitySort.direction);
    }

    const showEditPage = (id) => {
        navigate("/products/edit", {state: {id: id}});
    }

    const showDetailPage = (id) => {
        navigate("/products/detail", {state: {id: id}});
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



    const deleteProductById = async (id) => {
        try {
            await productService.deleteProduct(id);
            toast.success("Xoá thành công!")
        } catch (error) {
            toast.error(error.message);
        }
        handleClose();
        await getProductsList("", "", "", "", "1");
    }

    const nextTasks = async (page) => {
        setPage(page);
        await getProductsList("", "", "", "", page);
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
                    <h1 className="app-content-headerText">Danh sách sản phẩm</h1>
                    <Link to={"/products/create"} className="app-content-headerButton">Thêm mới sản phẩm</Link>
                </div>
                <div className="app-content-actions">
                    <input className="search-bar search-name" placeholder="Search by name"
                           onChange={(obj)=>handleChangeNameSearch(obj)} type="text"/>
                    <input className="search-bar search-price" placeholder="Price from"
                           onChange={(obj)=>handleChangePriceBefore(obj)} type="number"/>
                    <input  className="search-bar search-price" placeholder="To"
                            onChange={(obj)=>handleChangePriceAfter(obj)} type="number"/>
                    <select onChange={(obj)=>handleChangeTypeName(obj)} className="search-bar">
                        <option value="">--Chọn loại sản phẩm--</option>
                        {types?.map((type) => (
                            <option key={type.id} value={type.name}>{type.name}</option>
                        ))}
                    </select>
                    <button className={"search-bar-btn"} onClick={searchData}>Search</button>
                </div>
                <div className="products-area-wrapper tableView">
                    <div className="products-header">
                        <div className="product-cell stt">
                            STT
                        </div>
                        <div className="product-cell product-code">
                            Mã sản phẩm
                            {codeSort.direction === "" ?
                                <button className="sort-button"
                                        onClick={() => setCodeSort({field: "code", direction: "asc"})}>
                                    <img src={sort} alt="sort"/>
                                </button>
                                : codeSort.direction === "asc" ?
                                    <button className="sort-button"
                                            onClick={() => setCodeSort({field: "code", direction: "desc"})}>
                                        <img src={asc} alt="sort"/>
                                    </button>
                                    :
                                    <button className="sort-button"
                                            onClick={() => setCodeSort({field: "", direction: ""})}>
                                        <img src={desc} alt="sort"/>
                                    </button>
                            }
                        </div>
                        <div className="product-cell product-name">
                            Tên sản phẩm
                            {nameSort.direction === "" ?
                                <button className="sort-button"
                                        onClick={() => setNameSort({field: "name", direction: "asc"})}>
                                    <img src={sort} alt="sort"/>
                                </button>
                                : nameSort.direction === "asc" ?
                                    <button className="sort-button"
                                            onClick={() => setNameSort({field: "name", direction: "desc"})}>
                                        <img src={asc} alt="sort"/>
                                    </button>
                                    :
                                    <button className="sort-button"
                                            onClick={() => setNameSort({field: "", direction: ""})}>
                                        <img src={desc} alt="sort"/>
                                    </button>
                            }
                        </div>
                        <div className="product-cell product-type">
                            Loại sản phẩm
                            {typeSort.direction === "" ?
                                <button className="sort-button"
                                        onClick={() => setTypeSort({field: "type.name", direction: "asc"})}>
                                    <img src={sort} alt="sort"/>
                                </button>
                                : typeSort.direction === "asc" ?
                                    <button className="sort-button"
                                            onClick={() => setTypeSort({field: "type.name", direction: "desc"})}>
                                        <img src={asc} alt="sort"/>
                                    </button>
                                    :
                                    <button className="sort-button"
                                            onClick={() => setTypeSort({field: "", direction: ""})}>
                                        <img src={desc} alt="sort"/>
                                    </button>
                            }
                        </div>
                        <div className="product-cell price">
                            Giá cả
                            {priceSort.direction === "" ?
                                <button className="sort-button"
                                        onClick={() => setPriceSort({field: "price", direction: "asc"})}>
                                    <img src={sort} alt="sort"/>
                                </button>
                                : priceSort.direction === "asc" ?
                                    <button className="sort-button"
                                            onClick={() => setPriceSort({field: "price", direction: "desc"})}>
                                        <img src={asc} alt="sort"/>
                                    </button>
                                    :
                                    <button className="sort-button"
                                            onClick={() => setPriceSort({field: "", direction: ""})}>
                                        <img src={desc} alt="sort"/>
                                    </button>
                            }
                        </div>
                        <div className="product-cell amount">
                            Số lượng
                            {quantitySort.direction === "" ?
                                <button className="sort-button"
                                        onClick={() => setQuantitySort({field: "quantity", direction: "asc"})}>
                                    <img src={sort} alt="sort"/>
                                </button>
                                : quantitySort.direction === "asc" ?
                                    <button className="sort-button"
                                            onClick={() => setQuantitySort({field: "quantity", direction: "desc"})}>
                                        <img src={asc} alt="sort"/>
                                    </button>
                                    :
                                    <button className="sort-button"
                                            onClick={() => setQuantitySort({field: "", direction: ""})}>
                                        <img src={desc} alt="sort"/>
                                    </button>
                            }
                        </div>
                        <div className="product-cell edit">Chỉnh sửa</div>
                    </div>
                    {products?.map((product, index) => (
                        <div className="products-row" key={index}>
                            <div className="product-cell stt">{++index}</div>
                            <div className="product-cell product-code">{product.code}</div>
                            <div className="product-cell product-name">{product.name}</div>
                            <div className="product-cell product-type">{product.type.name}</div>
                            <div className="product-cell price">{'$' + product.price}</div>
                            <div className="product-cell amount">{product.quantity}</div>
                            <div className="product-cell edit">
                                <a onClick={() => showDetailPage(product.id)}>
                                    <img src={eye} alt="detail"/>
                                </a>
                                <a onClick={() => showEditPage(product.id)}>
                                    <img src={pencil} alt="update"/>
                                </a>
                                <a onClick={() => handleOpen(product.id, product.name)}>
                                    <img src={trash} alt="delete"/>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                {/*<div className="page">*/}
                {/*    {page > 1 ?*/}
                {/*        <a className="page-a" onClick={() => nextTasks(page - 1)}>Trang trước</a>*/}
                {/*        : null}*/}
                {/*    {page > 1 ?*/}
                {/*        <span>*/}
                {/*                <a className="page-a" onClick={() => nextTasks(1)}>1</a>*/}
                {/*                <a className="page-a" onClick={() => nextTasks(2)}>2</a>*/}
                {/*            </span>*/}
                {/*        : null}*/}
                {/*    {products?.length === 12 ?*/}
                {/*        <a className="page-a" onClick={() => nextTasks(page + 1)}>Trang sau</a>*/}
                {/*        : null}*/}
                {/*</div>*/}
            </div>
            <Modal isOpen={open}>
                <div className="head-modal">
                    <img src={trash} alt="warning"/>
                </div>
                <div>
                    <h2>Bạn có chắc muốn xoá sản phẩm {itemDelete.id}?</h2>
                    <p>Sản phẩm {itemDelete.name}</p>
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