import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import * as userService from "../service/UserService";

export function UserDetail() {
    const [user, setUser] = useState({});
    const {state} = useLocation();

    useEffect(() => {
        getUser();
    },[]);

    const getUser = async () => {
        console.log(state.id)
        const temp = await userService.findUserById(state.id);
        setUser(temp);
    }

    // if (!user) {
    //     return <div>User not found!</div>
    // }

    return(
        <div>
            <div className="userId">
                <label>Id: </label>
                <span>{user.id}</span>
            </div>
            <div className="userName">
                <label>name: </label>
                <span>{user.name}</span>
            </div>
            <div className="userArticle">
                <label>Articles: </label>
                {user.articles && user.articles.map((article, index)=>(
                    <div key={index}>
                        <span>{article.title}</span>
                        <p>{article.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}