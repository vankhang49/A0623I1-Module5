import {useEffect, useState} from "react";
import * as clothingService from "../../services/ClothingService";
import * as categoryService from "../../services/CategoryService";
import "./style.scss";
import {Link, useNavigate} from "react-router-dom";
import home from "./home.svg";
import setting from "./setting.svg";
import eye from "./eye.svg";
import pencil from "./pencil.svg";
import trash from "./trash.svg";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import Modal from "../modal/Modal";

export function ClothingList() {
    const [clothes, setClothes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [itemDelete, setItemDelete] = useState({});
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState();
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    const navigate = useNavigate();

    useEffect(() => {
        getClothesList("", "", "", "", "1");
        getCategoriesList();
    }, [])


    const getClothesList = async (titleSearch, startDate, endDate, categoryType, page) => {
        const temp = await clothingService.getAllClothes(titleSearch, startDate, endDate, categoryType, page);
        setClothes(temp);
    }

    const getCategoriesList = async () => {
        const temp = await categoryService.getAllCategories();
        setCategories(temp);
    }

    const showEditPage = (id) => {
        navigate("/clothes/edit", {state:{id: id}});
    }

    const showDetailPage = (id) => {
        navigate("/clothes/detail", {state:{id: id}});
    }

    const showCreatePage = () => {
        console.log(clothes.length + 1)
        navigate("/clothes/create", {state:{index: clothes.length + 1}});
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = (id, title) => {
        setOpen(true);
        setItemDelete({
            "id": id,
            "title": title
        });
    };

    const deleteClothById = async (id) => {
        try {
            await clothingService.deleteCloth(id);
            toast.success("Xoá thành công!")
        } catch (error) {
            toast.error(error.message);
        }
        handleClose();
        await getClothesList("", "", "", "", "1");
    }

    const onSubmit = async (data) => {
        let titleSearch = data.titleSearch || "";
        let startDate = data.startDate || "";
        let endDate = data.endDate || "";
        let categoryType = data.categoryType || "";
        await getClothesList(titleSearch, startDate, endDate, categoryType);
    }

    const nextTasks = async (page) => {
        setPage(page);
        await getClothesList("", "", "", "", page);
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
                        <Link to={"/clothes"} className={"active"}>Home page</Link>
                        <a onClick={showCreatePage}>Add new product</a>
                    </div>
                </div>
                <div className="content">
                    <div className="header-content">
                        <form onSubmit={handleSubmit(onSubmit)} className="search-bar">
                            <input type="text" {...register("titleSearch")} className="searching search-name"
                                   placeholder="Search by title"/>
                            <label>From:</label>
                            <input type="date" {...register("startDate")} className="searching"/>
                            <label>To:</label>
                            <input type="date" {...register("endDate")} className="searching"/>
                            <select {...register("categoryType")} className="searching">
                                <option value="">--Chọn danh mục--</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.type}>{category.type}</option>
                                ))}
                            </select>
                            <button className="btn btn-search">Search</button>
                        </form>
                    </div>
                    <div className="table-content">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Title</th>
                                <th>Date added</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {clothes.map((clothe, index) => (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{clothe.title}</td>
                                    <td>{clothe.date}</td>
                                    <td>{clothe.quantity}</td>
                                    <td>
                                        <a onClick={()=>showDetailPage(clothe.id)}>
                                            <img src={eye} alt="detail"/>
                                        </a>
                                        <a onClick={()=>showEditPage(clothe.id)}>
                                            <img src={pencil} alt="update"/>
                                        </a>
                                        <a onClick={()=>handleOpen(clothe.id, clothe.title)}>
                                            <img src={trash} alt="delete"/>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
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
                        :null}
                        {clothes.length === 5 ?
                            <a className="page-a" onClick={() => nextTasks(page + 1)}>Next page</a>
                            : null}
                    </div>
                </div>
            </div>
            <Modal isOpen={open}>
                <div className="head-modal">
                    <img src={trash} alt="warning"/>
                </div>
                <div>
                    <h2>Bạn có chắc muốn xoá sản phẩm {itemDelete.id}?</h2>
                    <p>Sản phẩm {itemDelete.title}</p>
                    <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                         preserveAspectRatio="none">
                        <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
                    </svg>
                    <div className="modal-footer">
                        <button type="button" className="btn-accept" onClick={() => deleteClothById(itemDelete.id)}>Accept</button>
                        <button type="button" className="btn-accept btn-cancel" onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}