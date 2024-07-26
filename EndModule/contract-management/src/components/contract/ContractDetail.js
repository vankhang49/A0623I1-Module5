import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as contractService from "../../services/ContractService";
import logo from "./logo.svg";
import home from "./home.svg";
import bag from "./bag.svg";

export function ContractDetail() {
    const [contract, setContract] = useState({});
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        const fetchData = async () => {
            await getContractById(state.id);
        }
        fetchData();
    }, [state.id])

    const getContractById = async (id) => {
        const temp = await contractService.findContractById(id);
        setContract(temp);
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
                <div className="app-content-header">
                    <h1>Contract information</h1>
                </div>
                <div className="detail">
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>Contract code:</th>
                            <td>{contract.id}</td>
                        </tr>
                        <tr>
                            <th>Customer name:</th>
                            <td>{contract.customer?.name}</td>
                        </tr>
                        <tr>
                            <th>Date:</th>
                            <td>{contract.date}</td>
                        </tr>
                        <tr>
                            <th>Type:</th>
                            <td>{contract.type?.name}</td>
                        </tr>
                        <tr>
                            <th>Area:</th>
                            <td>{contract.area}</td>
                        </tr>
                        <tr>
                            <th>Price:</th>
                            <td>{contract.price}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}