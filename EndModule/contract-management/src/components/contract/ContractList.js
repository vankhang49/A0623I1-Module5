import "./style.scss";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import * as contractService from "../../services/ContractService";
import * as customerService from "../../services/CustomerService";
import * as typesService from "../../services/TypeService";
import {toast} from "react-toastify";
import Modal from "../modal/Modal";
import logo from "./logo.svg";
import home from "./home.svg";
import bag from "./bag.svg";
import eye from "./eye.svg";
import pencil from "./pencil.svg";
import trash from "./trash.svg";
import Moment from "moment";


export function ContractList() {
    const [contracts, setContracts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [types, setTypes] = useState([]);
    const [itemDelete, setItemDelete] = useState({});
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState();
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await getContractList("", "", "", "",1);
            await getCustomersList();
            await getTypesList();
        };
        fetchData();
    }, [])

    const getContractList = async (customerName, dateBefore, dateAfter,typeName, page) => {
        const temp = await contractService.getAllContracts(customerName, dateBefore, dateAfter, typeName, page);
        setContracts(temp);
    }

    const getCustomersList = async () => {
        const temp = await customerService.getAllCustomers();
        setCustomers(temp);
    }
    const getTypesList = async () => {
        const temp = await typesService.getAllTypes();
        setTypes(temp);
    }

    const showEditPage = (id) => {
        navigate("/contracts/edit", {state: {id: id}});
    }

    const showDetailPage = (id) => {
        navigate("/contracts/detail", {state: {id: id}});
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
        let customerName = data.customerName;
        let dateBefore = data.dateBefore;
        let dateAfter = data.dateAfter;
        let typeName = data.typeName;
        await getContractList(customerName, dateBefore, dateAfter, typeName,1);
    }

    const deleteProductById = async (id) => {
        try {
            await contractService.deleteContract(id);
            toast.success("Delete successfully!")
        } catch (error) {
            toast.error(error.message);
        }
        handleClose();
        await getContractList("", "", "","", 1);
    }

    const nextTasks = async (page) => {
        setPage(page);
        await getContractList("", "", "", "", page);
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
                        <Link to={"/contracts"}>
                            <img src={home} className="feather feather-home" alt="home"/>
                            <span>Home Page</span>
                        </Link>
                    </li>
                    <li className="sidebar-list-item active">
                        <Link to={"/contracts"}>
                            <img src={bag} className="feather feather-shopping-bag" alt="product"/>
                            <span>Contract List</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="app-content">
                <div className="app-content-header">
                    <h1 className="app-content-headerText">Order List</h1>
                    <Link to={"/contracts/create"} className="app-content-headerButton">Create New Contract</Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="app-content-actions">
                    <input className="search-bar search-name" placeholder="Search by name"
                           {...register("customerName")} type="text"/>
                    <input className="search-bar search-price" placeholder="Total price from"
                           {...register("dateBefore")} type="date"/>
                    <input  className="search-bar search-price" placeholder="To"
                            {...register("dateAfter")}  type="date"/>
                    <select {...register("typeName")} className="search-bar">
                        <option value="">--Choose one type--</option>
                        {types?.map((type) => (
                            <option key={type.id} value={type.name}>{type.name}</option>
                        ))}
                    </select>
                    <button className={"search-bar-btn"} type="submit">Search</button>
                </form>
                <div className="products-area-wrapper tableView">
                    <div className="products-header">
                        <div className="product-cell stt">No</div>
                        <div className="product-cell product-name">Customer name</div>
                        <div className="product-cell buy-date">Date</div>
                        <div className="product-cell amount">Area</div>
                        <div className="product-cell price">Price</div>
                        <div className="product-cell product-type">Type</div>
                        <div className="product-cell edit">Actions</div>
                    </div>
                    {contracts?.map((contract, index) => (
                        <div className="products-row" key={index}>
                            <div className="product-cell stt">{++index}</div>
                            <div className="product-cell product-name">{contract.customer.name}</div>
                            <div className="product-cell buy-date">{Moment(contract.date).format("DD/MM/yyyy")}</div>
                            <div className="product-cell amount">{contract.area}</div>
                            <div className="product-cell price">{'$' + contract.price.toLocaleString("vi-VN")}</div>
                            <div className="product-cell product-type">{contract.type.name}</div>
                            <div className="product-cell edit">
                                <a onClick={() => showDetailPage(contract.id)}>
                                    <img src={eye} alt="detail"/>
                                </a>
                                <a onClick={() => showEditPage(contract.id)}>
                                    <img src={pencil} alt="update"/>
                                </a>
                                <a onClick={() => handleOpen(contract.id, contract.customer.name)}>
                                    <img src={trash} alt="delete"/>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="page">
                    {page > 1 ?
                        <a className="page-a" onClick={() => nextTasks(page - 1)}>Previous page</a>
                        : null}
                    {page > 1 ?
                        <span>
                                <a className="page-a" onClick={() => nextTasks(1)}>1</a>
                                <a className="page-a" onClick={() => nextTasks(2)}>2</a>
                            </span>
                        : null}
                    {customers?.length === 12 ?
                        <a className="page-a" onClick={() => nextTasks(page + 1)}>Next page</a>
                        : null}
                </div>
            </div>
            <Modal isOpen={open}>
                <div className="head-modal">
                    <img src={trash} alt="warning"/>
                </div>
                <div>
                    <h2>Are you sure you will delete contract {itemDelete.id}?</h2>
                    <p>The contract is made by customer {itemDelete.name}</p>
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