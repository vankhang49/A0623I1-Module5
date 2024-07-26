import React, { useState } from "react";
import { Formik } from "formik";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({});
  const [indexSelected, setIndexSelected] = useState(-1);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleValidate() {
    const errors = {};
    if (!form.nameBook) {
      errors.nameBook = "Required";
    }
    if (!form.amount) {
      errors.amount = "Required";
    }
    return errors;
  }

  function handleSelect(book, index){
    setForm(book)
    setIndexSelected(index)
  }

  function handleDelete(index){
    let newBook = JSON.parse(JSON.stringify(books));
    newBook.splice(index, 1);
    setBooks(newBook);
    setMessage(`Delete book at index ${index} successfully!!!`);
  }

  function handleSubmit() {
    let newBook = JSON.parse(JSON.stringify(books));
    if (indexSelected > -1) {
      newBook.splice(indexSelected, 1, form);
      setMessage(`Update Book at index ${indexSelected} successfully!!!`);
    } else {
      newBook.push(form);
      setMessage("Add new book successfully!!!");
    }
    setBooks(newBook);
    setForm({});
    setIndexSelected(-1);
  }

  return (
      <div className="container">
        <h1>Contact form</h1>
        <Formik
            initialValues={form}
            validate={handleValidate}
            onSubmit={handleSubmit}
        >
          {({errors, handleSubmit}) => (
              <form onSubmit={handleSubmit} className="form width-auto">
                <div
                    className={`custom-input ${
                        errors.nameBook ? "custom-input-error" : ""
                    }`}
                >
                  <label>Tiêu đề</label>
                  <input
                      type="text"
                      name="nameBook"
                      value={form.nameBook || ""}
                      onChange={handleChange}
                  />
                  <p className="error">{errors.nameBook}</p>
                </div>
                <div
                    className={`custom-input ${
                        errors.amount ? "custom-input-error" : ""
                    }`}
                >
                  <label>Số lượng</label>
                  <input
                      type="number"
                      name="amount"
                      value={form.amount || ""}
                      onChange={handleChange}
                  />
                  <p className="error">{errors.amount}</p>
                </div>
                <button type="submit">Submit</button>
              </form>
          )}
        </Formik>
        <table className="table">
          <thead>
          <tr>
            <th>Title</th>
            <th>Number</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
                <tr key={index}>
                  <td>{book.nameBook}</td>
                  <td>{book.amount}</td>
                  <td>
                    <button type='button' onClick={() => handleSelect(form, index)}>Edit</button>
                    <button type='button' onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div className="message">
          <span>{message}</span>
        </div>
      </div>
  );
}

export default App;
