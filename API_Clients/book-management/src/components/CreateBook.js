import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import * as bookService from "../services/BookService";
import {toast} from "react-toastify";

export default function CreateBook() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm({
        criteriaMode: "all"
    });

    const onSubmit = async (data) => {
        let book = {
            "id": state.size,
            "title": data.title,
            "quantity": data.quantity,
        }
        try {
            await bookService.saveBook(book);
        } catch (e){
            toast.error(e);
        }
        toast.success("Thêm mới thành công!")
        navigate("/library");
    };

    return (
        <div className="container" style={{paddingTop: "10px"}}>
            <h1>Add a new book</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title</label>
                    <input {...register("title")} />
                </div>
                <div>
                    <label>Quantity</label>
                    <input {...register("quantity")} />
                </div>
                <input type="submit"/>
            </form>
        </div>
    );
}