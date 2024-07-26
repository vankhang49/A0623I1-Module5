import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as bookService from "../services/BookService";
import Modal from 'react-modal';
import {toast} from "react-toastify";

export default function Library(){
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const [bookDelete, setBookDelete] = useState({});
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getBookList();
    }, [])

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function getBookList(){
        const temp = await bookService.getAllBooks();
        setBooks(temp);
    }

    function showCreatePage(){
        navigate("/library/create", {state:{size: books.length}});
    }

    function showEditPage(id){
        navigate("/library/edit", {state:{id: id}});
    }

    function changeInfoDelete (book) {
        setBookDelete(book);
        openModal();
    }
    async function removeBook(){
        closeModal();
        try {
            await bookService.deleteBook(bookDelete.id);
        } catch (e){
            toast.error(e);
        }
        toast.success("Xóa thành công!");
        getBookList();
    }

    return(
        <div>
            <h2>Library</h2>
            <button onClick={showCreatePage}>Add new book</button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.quantity}</td>
                        <td>
                            <button onClick={() => showEditPage(book.id)}>Edit</button>
                            <button onClick={() => changeInfoDelete(book)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>close</button>
                <div>Bạn có muốn xóa cuốn sách {bookDelete.name}?</div>
                <button onClick={removeBook}>Xóa</button>
            </Modal>
        </div>
    );
}