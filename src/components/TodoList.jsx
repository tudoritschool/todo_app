// Library import
import { useState } from "react";

// Components import
import SearchComponent from "./SearchComponent";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

function TodoList() {
	const [todoList, setTodoList] = useState([
		{ name: "Do yoga", completed: false },
		{ name: "50 push-ups", completed: false },
		{ name: "Order pizza", completed: false },
	]);

	const handleAddTodo = (todoName) => {
		const newTodo = { name: todoName, completed: false };
		setTodoList([...todoList, newTodo]);
	};

	const handleCompleteTodo = (indexTodo) => {
		console.log(indexTodo);
		//PARTEA 2
		// Se cauta todo-ul si se schimba completed => true
		// se foloseste map pentru a crea un array nou
		// setTodoList(newTodoList)
	};

	return (
		<>
			<h1>Todo List</h1>
			<SearchComponent />
			{todoList.map((todo, index) => (
				<TodoItem
					name={todo.name}
					completed={todo.completed}
					key={"todo_" + index}
					onComplete={handleCompleteTodo}
					index={index}
				/>
			))}
			<AddTodo onAddTodo={handleAddTodo} />
		</>
	);
}

export default TodoList;
