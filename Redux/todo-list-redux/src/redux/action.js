

export const addTodoAction = (data) => {
    return {type: 'todos/todoAdded', payload: data}
}

export const deleteTodoAction = (data) => {
    return {type: 'todos/todoDeleted', payload: data}
}