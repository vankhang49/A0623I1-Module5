import React, { useState } from "react";
import { Formik } from "formik";
import "./App.css";

function App() {
  const REGEX = {
    receiver: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };

  const [form, setForm] = useState({
    uploadFile: null
  });

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleValidate() {
    const errors = {};
    if (!form.receiver) {
      errors.receiver = "Required";
    } else if (!REGEX.receiver.test(form.receiver)) {
      errors.receiver = "Invalid email address!";
    }
    if (!form.title) {
      errors.title = "Required";
    }
    if (!form.message) {
      errors.message = "Required";
    }
    return errors;
  }

  function handleSubmit() {
    alert("Send successfully!!!");
  }
  return (
      <div>
        <h1>Email form</h1>
        <Formik
            initialValues={form}
            validate={handleValidate}
            onSubmit={handleSubmit}
        >
          {({errors, handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <div
                    className={`custom-input ${
                        errors.receiver ? "custom-input-error" : ""
                    }`}
                >
                  <label>To</label>
                  <input
                      type="email"
                      name="receiver"
                      value={form.receiver || ""}
                      onChange={handleChange}
                  />
                  <p className="error">{errors.receiver}</p>
                </div>
                <div
                    className={`custom-input ${
                        errors.title ? "custom-input-error" : ""
                    }`}
                >
                  <label>Title</label>
                  <input
                      type="text"
                      name="title"
                      value={form.title || ""}
                      onChange={handleChange}
                  />
                  <p className="error">{errors.title}</p>
                </div>
                <div
                    className={`custom-input ${
                        errors.message ? "custom-input-error" : ""
                    }`}
                >
                  <label>Message</label>
                  <textarea
                      name="message"
                      value={form.message || ""}
                      onChange={handleChange}
                  ></textarea>
                  <p className="error">{errors.message}</p>
                </div>
                <div className="custom-input">
                  <input
                      type="file"
                      name="uploadFile"
                      value={form.uploadFile || ""}
                      onChange={handleChange}
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
          )}
        </Formik>
      </div>
  );
}

export default App;
