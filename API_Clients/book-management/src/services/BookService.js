import axios from "axios";

export async function getAllBooks() {
    try {
        const temp = await axios.get("http://localhost:8080/books");
        console.log(temp)
        return temp.data;
    } catch (e) {
        console.log(e)
        return [];
    }
}

export async function findBookById(id) {
    try {
        const temp = await axios.get("http://localhost:8080/books/" + id);
        console.log(temp)
        return temp.data;
    } catch (e) {
        console.log(e)
        return null;
    }
}

export async function saveBook(book) {
    try {
        await axios.post("http://localhost:8080/books", book);
    } catch (e) {
        throw new Error("Không thể thêm mới")
    }
}

export async function updateBook(book) {
    try {
        await axios.put("http://localhost:8080/books/" + book.id, book);
    }catch (e) {
        throw new Error("Cập nhật thất bại!");
    }
}

export async function deleteBook(id) {
    try {
        await axios.delete(`http://localhost:8080/books/${id}`);
    }catch (e) {
        throw new Error("Xoá thất bại!");
    }
}