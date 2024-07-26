import { useLocation } from "react-router-dom";

function EmployeeDetail() {
    const {state} = useLocation();
    const employee = state.employee;
    return(
        <div>
            <h3>Employee id {employee.id} information</h3>
            <div>
                <label>ID: <span>{employee.id}</span></label>
                <label>Name: <span>{employee.name}</span></label>
                <label>Age: <span>{employee.age}</span></label>
            </div>
        </div>
    );
}
export default EmployeeDetail;