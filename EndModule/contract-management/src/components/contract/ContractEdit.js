import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as contractService from "../../services/ContractService";
import * as customerService from "../../services/CustomerService";
import * as typeService from "../../services/TypeService";
import {toast} from "react-toastify";
import logo from "./logo.svg";
import home from "./home.svg";
import bag from "./bag.svg";

export function ContractEdit() {
    const [contract, setContract] = useState({});
    const [customerList, setCustomerList] = useState([]);
    const [typeList, setTypeList] = useState([]);
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        const fetchData = async () => {
            await getOrderById(state.id);
            await getCustomersList();
            await getTypesList();
        }
        fetchData()
    }, [state.id])

    const getOrderById = async (id) => {
        const temp = await contractService.findContractById(id);
        if (temp) {
            setContract(temp)
            setValue("id", temp.id);
            setValue("date", temp.date);
            setValue("type", JSON.stringify(contract.type));
            setValue("customer", JSON.stringify(contract.customer));
            setValue("area", temp.area);
            setValue("price", temp.price);
        }
    }

    const getCustomersList = async () => {
        const temp = await customerService.getAllCustomers();
        setCustomerList(temp);
    }
    const getTypesList = async () => {
        const temp = await typeService.getAllTypes();
        setTypeList(temp);
    }

    const onSubmit = async (data) => {
        try {
            let customer = JSON.parse(data.customer);
            let type = JSON.parse(data.type);
            data.price = Number(data.price);
            data.area = Number(data.area);
            data.customer = customer;
            data.type = type;
            await contractService.updateContract(data.id, data);
            toast.success("Update successfully!");
        } catch (error) {
            toast.error(error.message);
        }
        navigate("/contracts");
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
                            <span>Contracts List</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="app-content">
                <div className="header-content">
                    <h1>Update order</h1>
                </div>
                <div className="form-add-edit">
                    <form onSubmit={handleSubmit(onSubmit)} className="form-operation">
                        <div className="form-element">
                            <label>Customer</label>
                            <select {...register("customer", {required: "Do not required!"})} className="form-input">
                                <option value="">--Choose one Customer--</option>
                                {customerList?.map((customer, index) => (
                                    <option key={index} selected={customer.id === contract.customer.id}
                                            value={JSON.stringify(customer)}>{customer.name}</option>
                                ))}
                            </select>
                            {errors.customer &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.customer.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Date</label>
                            <input type="date" {...register("date", {required: "Do not required!"})}
                                   className="form-input"/>
                            {errors.date &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.date.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Type</label>
                            <select {...register("type", {required: "Do not required!"})} className="form-input">
                                <option value="">--Choose one type--</option>
                                {typeList?.map((type, index) => (
                                    <option key={index} selected={type.id === contract.type.id}
                                            value={JSON.stringify(type)}>{type.name}</option>
                                ))}
                            </select>
                            {errors.type &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.type.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Area</label>
                            <input type="text" {...register("area", {
                                required: "Do not required!",
                                min: {value: 1, message: "Area must be more than 0!"},
                                pattern: {value: /^[1-9]\d*$/, message: "Area must be more than 0!"}
                            })} className="form-input"/>
                            {errors.area &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.area.message}</p>}
                        </div>
                        <div className="form-element">
                            <label>Price</label>
                            <input type="text" {...register("price", {
                                required: "Do not required!",
                                min: {value: 1, message: "Price must be more than 0!"},
                                pattern: {value: /^[1-9]\d*$/, message: "Price must be more than 0!"}
                            })} className="form-input"/>
                            {errors.price &&
                                <p style={{color: "red", fontSize: "16px"}}>{errors.price.message}</p>}
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