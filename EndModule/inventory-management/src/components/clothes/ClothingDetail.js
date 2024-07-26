import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as clothingService from "../../services/ClothingService";
import * as categoryService from "../../services/CategoryService";
import {toast} from "react-toastify";
import home from "./home.svg";
import setting from "./setting.svg";

export function ClothingDetail() {
    const [cloth, setCloth] = useState({});
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        getClothById(state.id);
    }, [state.id])

    const getClothById = async (id) => {
        const temp = await clothingService.findClothById(id);
        setCloth(temp);
    }

    return (
        <div className="container">
            <div className="dashboard">
                <div className="side-bar">
                    <div className="side-bar-appear">
                        <img src={home} alt={home}/>
                        <img src={setting} alt={setting}/>
                    </div>
                    <div className="side-bar-hidden">
                        <Link to={"/clothes"}>Home Page</Link>
                        <Link to={"/clothes/create"}>Add new product</Link>
                    </div>
                </div>
                <div className="content">
                    <div className="header-content">
                        <h2>Product Information</h2>
                    </div>
                    <div className="detail">
                        <table className="table">
                            <tbody>
                            <tr>
                                <th>Title:</th>
                                <td>{cloth.title}</td>
                            </tr>
                            <tr>
                                <th>Date added:</th>
                                <td>{cloth.date}</td>
                            </tr>
                            <tr>
                                <th>Quantity:</th>
                                <td>{cloth.quantity}</td>
                            </tr>
                            <tr>
                                <th>Category:</th>
                                <td>{cloth.category?.type}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}