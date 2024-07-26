import { useDispatch } from "react-redux";
import { deleteTodoAction } from "../redux/action";

export default function TodoListItem(props){
    const dispatch = useDispatch()

    const handleRemove = (id) =>{
        dispatch(deleteTodoAction(id))
    };

    return (
        <div>
            <h4>{ props.todo.text }</h4>
            <button className="btn btn-danger" type="button" onClick={() => handleRemove(props.todo.id)}>
                Remove
            </button>
            <hr/>
        </div>
    )
}