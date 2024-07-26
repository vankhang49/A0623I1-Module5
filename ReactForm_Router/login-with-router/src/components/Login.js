import React, { useState } from "react";
import {Formik, useFormik} from "formik";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
    let navigate = useNavigate();


    const REGEX = {
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    };

    const [form, setForm] = useState({});
    const [message, setMessage] = useState({});

    function sendDataToHomePage(email){
        navigate("/employee", { state: { email: email } });
    }

    function handleChange(event) {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    function handleValidate() {
        const errors = {};
        if (!form.email) {
            errors.email = "Required";
        } else if (!REGEX.email.test(form.email)) {
            errors.email = "Invalid email address!";
        }
        if (!form.password) {
            errors.password = "Required";
        }
        return errors;
    }

    function handleSubmit() {
        if (form.email === "admin@gmail.com") {
            if (form.password === "letmein") {
                console.log("success");
                sendDataToHomePage(form.email);
            } else {
                message.password = "Invalid password!";
            }
        } else {
            message.email = "Invalid email address!";
        }
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
                            <p className="error">{errors.email || message.email}</p>
                        </div>
                        <div
                            className={`custom-input ${
                                errors.password ? "custom-input-error" : ""
                            }`}
                        >
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password || ""}
                                onChange={handleChange}
                            />
                            <p className="error">{errors.password || message.password}</p>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
