import { element } from "prop-types";
import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {

	let initialState = { label: "", done: false }
	const [inputValue, setInputValue] = useState(initialState)
	const [list, setList] = useState([]);

	const handleChange = (event) => {
		setInputValue({
			...inputValue,
			[event.target.name]: event.target.value
		})
	}

	const getTasks = async () => {
		try {
			let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/pieromastro`)
			let data = await response.json()
			console.log(response.status);
			if (response.status == 404) {
				createTodos();
			}
			else {
				setList(data)
			}
		} catch (error) {
			//En caso de que ocurra un error
			console.log(error);
		}
	}
	const createTodos = async () => {
		try {
			let response = await fetch(`https://assets.breatheco.de/apis/fake/todos/user/pieromastro`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify([])
			})
			let data = await response.json()
			if (response.ok) {
				getTasks();
			}
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => { getTasks() }, [])

	return (
		<div className="container rounded">
			<h1 className="header display-1 mb-2 mt-5">todos</h1 >
			<div className="form shadow mb-5 bg-body rounded">
				<div className="list">
					<input
						className="input"
						type="text"
						name="label"
						onKeyDown={(event) => {
							if (event.key === "Enter" && inputValue.label.trim() !== "") {
								setList([...list, inputValue])
								setInputValue(initialState)
							}
						}}
						// onChange={(event) => setInputValue(event.target.value)}
						onChange={handleChange}
						value={inputValue.label}
						placeholder="Add a New Task!" >
					</input>
				</div>
				<div className="list">
					{list.map((elementList, index) => {
						return <li key={index} className="todolist d-flex justify-content-between">
							{elementList.label}
							<button
								className="button d-flex"
								type="button"
								onClick={(event) => setList(list.filter((element, id) => { return index !== id }))
								}><i className="fa-regular fa-circle-xmark"></i></button>
						</li>
					})
					}
					<span className="tasks d-flex">{
						list.length === 0 ? "No Tasks, add a Task!" :
							list.length === 1 ? list.length + " Task Left" :
								list.length + " Tasks Left"
					}
					</span>
				</div>
			</div>
		</div >
	);
};

export default Home;
