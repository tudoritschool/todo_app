// Library import
import { useState, useEffect } from "react";

// Components import
import SearchComponent from "./SearchComponent";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

function TodoList() {
	const [initialTodos, setInitialTodos] = useState(null);

	// ALL STATES::
	const [todoList, setTodoList] = useState(initialTodos);

	const [searchText, setSearchText] = useState("");

	// EFFECTS
	// useEffect(()=>{}, [])
	useEffect(() => {
		console.log(searchText);

		if (initialTodos) {
			const newFilteredList = initialTodos.filter((todo) => {
				return todo.title
					.toLocaleLowerCase()
					.includes(searchText.toLowerCase());
			});
			setTodoList(newFilteredList);
		}
	}, [searchText]);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((res) => res.json())
			.then((todoListFetch) => {
				console.log(todoListFetch);
				setInitialTodos(todoListFetch);
				setTodoList(todoListFetch);
			});
	}, []);

	// EVENTS::
	const handleAddTodo = (todoName) => {
		const newTodo = { tile: todoName, completed: false };
		setTodoList([...todoList, newTodo]);
	};

	const handleCompleteTodo = (indexTodo) => {
		console.log(indexTodo);
		//PARTEA 2
		// Se cauta todo-ul si se schimba completed => true
		// se foloseste map pentru a crea un array nou
		// setTodoList(newTodoList)

		const newTodoList = todoList.map((todo, index) => {
			if (index !== indexTodo) {
				return todo;
			}
			return { ...todo, completed: true };
		});
		console.log(newTodoList);
		setTodoList(newTodoList);
	};

	return (
		<>
			<h1>Todo List</h1>
			{todoList === null || initialTodos === null ? (
				<h2>Loading...</h2>
			) : (
				<>
					<SearchComponent
						searchText={searchText}
						setSearchText={setSearchText}
					/>
					{todoList.map((todo, index) => (
						<TodoItem
							name={todo.title}
							completed={todo.completed}
							key={"todo_" + index}
							onComplete={handleCompleteTodo}
							index={index}
						/>
					))}
					<AddTodo onAddTodo={handleAddTodo} />
				</>
			)}
		</>
	);
}

export default TodoList;
