import React, { useState } from "react";
import { Formik } from "formik";
import "./App.css";

function App() {
  const REGEX = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
  };

  const [form, setForm] = useState({});

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  function handleValidate() {
    const errors = {};
    if (!form.username) {
      errors.username = "Required";
    }
    if (!form.email) {
      errors.email = "Required";
    } else if (!REGEX.email.test(form.email)) {
      errors.email = "Invalid email address!";
    }
    if (!form.phoneNumber) {
      errors.phoneNumber = "Required";
    }
    return errors;
  }

  function handleSubmit() {
    alert("Add contact successfully!!!");
  }
  return (
      <div>
        <h1>Contact form</h1>
        <Formik
            initialValues={form}
            validate={handleValidate}
            onSubmit={handleSubmit}
        >
          {({errors, handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <div
                    className={`custom-input ${
                        errors.username ? "custom-input-error" : ""
                    }`}
                >
                  <label>Name</label>
                  <input
                      type="text"
                      name="username"
                      value={form.username || ""}
                      onChange={handleChange}
                  />
                  <p className="error">{errors.username}</p>
                </div>
                <div
                    className={`custom-input ${
                        errors.email ? "custom-input-error" : ""
                    }`}
                >
                  <label>Email</label>
                  <input
                      type="email"
                      name="email"
                      value={form.email || ""}
                      onChange={handleChange}
                  />
                  <p className="error">{errors.email}</p>
                </div>
                <div
                    className={`custom-input ${
                        errors.phoneNumber ? "custom-input-error" : ""
                    }`}
                >
                  <label>Phone</label>
                  <input
                      type="text"
                      name="phoneNumber"
                      value={form.phoneNumber || ""}
                      onChange={handleChange}
                  />
                  <p className="error">{errors.phoneNumber}</p>
                </div>
                <div className={`custom-input`}>
                  <label>Message</label>
                  <textarea
                      name="message"
                      value={form.message || ""}
                      onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit">Submit</button>
              </form>
          )}
        </Formik>
      </div>
  );
}

export default App;
