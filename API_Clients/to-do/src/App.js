import './App.css';
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import * as toDoService from "./services/ToDoService"
import {saveToDo} from "./services/ToDoService";

function App() {
    const [toDoList, setToDoList] = useState([]);
    const {register, handleSubmit, formState: {errors}} = useForm({
        criteriaMode: "all"
    });

    useEffect(() => {
        getAll();
    }, [])

    const onSubmit = (data) => {
        let toDo = {
            "userId": null,
            "id": toDoList.length,
            "title": data.title,
            "completed": false
        }
        saveToDo(toDo);
        getAll();
    };

    const getAll = async () => {
        const temp = await toDoService.getAllToDo();
        setToDoList(temp);
    }
  return (
      <div className="container" style={{paddingTop: "10px"}}>
          <h1>Todo List</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                  <label>Title</label>
                  <input {...register("title")} />
              </div>
              <input type="Add"/>
          </form>
          <div className="todo-list">
              <ul>
                  {toDoList.map((toDo) =>
                      <li>{toDo.title}</li>
                  )}
              </ul>
          </div>
      </div>
  );
}

export default App;
