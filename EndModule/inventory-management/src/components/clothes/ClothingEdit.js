import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import * as clothingService from "../../services/ClothingService";
import * as categoryService from "../../services/CategoryService";
import {toast} from "react-toastify";
import home from "./home.svg";
import setting from "./setting.svg";

export function ClothingEdit(){
    const [cloth, setCloth] = useState({});
    const [categories, setCategories] = useState([]);
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        const fetchData = async () => {
            await getClothById(state.id);
            await getCategoriesList();
        }
        fetchData()
    }, [state.id])


    const getClothById = async (id) => {
        const temp = await clothingService.findClothById(id);
        if(temp) {
            setCloth(temp)
            setValue("id", temp.id)
            setValue("title", temp.title)
            setValue("date", temp.date)
            setValue("quantity", temp.quantity)
            setValue("category", JSON.stringify(cloth.category));
        }
    }

    const getCategoriesList = async () => {
        const temp = await categoryService.getAllCategories();
        setCategories(temp);
    }

    const onSubmit = async (data) => {
        try {
            data.category = JSON.parse(data.category);
            console.log(data)
            // await clothingService.updateCloth(data.id, data);
        } catch (error) {
            toast.error(error.message);
        }
        toast.success("Add new successfully!");
        navigate("/clothes");
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
                        <h2>Add new product</h2>
                    </div>
                    <div className="form-add-edit">
                        <form onSubmit={handleSubmit(onSubmit)} className="form-operation">
                            <div className="form-element">
                                <label>Id</label>
                                <input type="text" {...register("id")} disabled className="form-input"/>
                            </div>
                            <div className="form-element">
                                <label>Title</label>
                                <input type="text" {...register("title", {
                                    require: "Do not require!",
                                    pattern: {
                                        value: /^[A-Z][a-zA-z0-9 '"/]+$/,
                                        message: "Titles must be properly formatted, start with capital letters, include letters, numbers and spaces!"
                                    }
                                })} className="form-input"/>
                                {errors.title && <p style={{color: "red", fontSize: "16px"}}>{errors.title.message}</p>}
                            </div>
                            <div className="form-element">
                                <label>Date</label>
                                <input type="date" {...register("date")} className="form-input"/>
                            </div>
                            <div className="form-element">
                                <label>Quantity</label>
                                <input type="text" {...register("quantity", {
                                    require: "Do not require!",
                                    min: {value: 1, message: "Quantity must be greater than 0!"},
                                    pattern: {value: /^[1-9]\d*$/, message: "Quantity must be greater than 0!"}
                                })} className="form-input"/>
                                {errors.quantity &&
                                    <p style={{color: "red", fontSize: "16px"}}>{errors.quantity.message}</p>}
                            </div>
                            <div className="form-element">
                                <label>Category</label>
                                <select {...register("category", {required: "Do not require"})} className="form-input">
                                    <option value="">--Chọn danh mục--</option>
                                    {categories?.map((category) => (
                                        <option key={category.id} selected={category?.id === cloth.category?.id}
                                                value={JSON.stringify(category)}>{category.type}</option>
                                    ))}
                                </select>
                                {errors.category &&
                                    <p style={{color: "red", fontSize: "16px"}}>{errors.category.message}</p>}
                            </div>
                            <div className="btn-form">
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}