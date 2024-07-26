import {useEffect, useState} from "react";
import * as userService from "../service/UserService";
import {useNavigate} from "react-router-dom";

export function UserList(){
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = async () => {
        const temp = await userService.getAllUsers();
        setUsers(temp);
    }

    const showUserDetails = async (id) => {
        navigate("/users/detail", {state:{id: id}});
    }

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {users !== null ? users.map((user,index) => (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>
                            <button onClick={()=>showUserDetails(user.id)}>Detail</button>
                        </td>
                    </tr>
                )):(
                    <div>User not found!</div>
                )}
                </tbody>
            </table>
        </div>
    );
}