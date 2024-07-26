import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import * as bookService from "../services/BookService";
import {toast} from "react-toastify";

export default function UpdateBook() {
    const [book, setBook] = useState({});
    const navigate = useNavigate();
    const {state} = useLocation();
    const {register, handleSubmit} = useForm({
        defaultValues: book,
        criteriaMode: "all"
    });

    useEffect(() =>{
        getBook();
    }, [])

    async function getBook(){
        const temp = await bookService.findBookById(state.id);
        setBook(temp);
    }

    const onSubmit = async (data) => {
        let newBook = {
            "id": book.id,
            "title": data.title,
            "quantity": data.quantity,
        }
        try {
            await bookService.updateBook(newBook);
        } catch (e){
            toast.error(e);
        }
        toast.success("Cập nhật thành công!")
        navigate("/library");
    };

    return (
        <div className="container" style={{paddingTop: "10px"}}>
            <h1>Edit</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Title</label>
                    <input {...register("title")} defaultValue={book.title} />
                </div>
                <div>
                    <label>Quantity</label>
                    <input {...register("quantity")} defaultValue={book.quantity} />
                </div>
                <input type="submit" value="Add" />
            </form>
        </div>
    );
}