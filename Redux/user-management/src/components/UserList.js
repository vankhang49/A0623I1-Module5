import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteUserMiddleware, getAllUserMiddleware} from "../redux/middleware/UserMiddleware";


export function UserList(){
    const users = useSelector(state => state.users);
    const [style, setStyle] = useState({
        display: "none"
    })
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUsers = async () => {
            await dispatch(getAllUserMiddleware());
        };
        fetchUsers();
    }, [dispatch]);

    const showList = async () => {
        setStyle({
            display: "block"
        })
    }

    const removeUser = async (id) => {
        await dispatch(deleteUserMiddleware(id));
        toast.success("Xóa thành công");
    }

    return(
        <div className="container">
            <h1>User list</h1>
            <button type="button" onClick={showList}>Get users</button>
            <table className="table" style={style}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {users.length > 0 ? users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.website}</td>
                        <td>
                            <button type="button" onClick={() => removeUser(user.id)}>Delete</button>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="5">No users found</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}