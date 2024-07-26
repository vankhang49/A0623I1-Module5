import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Employee(){
    let navigate = useNavigate();
    const employees = [
        {
            id: 1,
            name: "Hoa",
            age: 20
        },
        {
            id: 2,
            name: "Khánh",
            age: 25
        },
        {
            id: 3,
            name: "Tú",
            age: 22
        },
    ]
    function sendDataToEmployeeDetail(employee){
        console.log(employee)
        navigate("/employee/detail", { state: { employee: employee } });
    }

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Detail</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee,index) => (
                    <tr key={index}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.age}</td>
                        <td>
                            <button className="btn-detail" onClick={() => sendDataToEmployeeDetail(employee)}>Detail</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
export default Employee;