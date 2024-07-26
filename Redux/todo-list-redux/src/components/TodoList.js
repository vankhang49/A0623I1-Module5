import TodoListItem from './TodoListItem';
import { useSelector } from 'react-redux'

const selectTodos = state => state.todos

export default function TodoList() {
    const todos = useSelector(selectTodos)
    return (
        <div>
            {todos.map(todo => {
                return (
                    <TodoListItem todo= { todo } key={ todo.id } />
                );
            })}
        </div>
    );
}