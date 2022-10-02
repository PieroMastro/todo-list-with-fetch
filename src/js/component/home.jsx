import { element } from "prop-types";
import React, { useState } from "react";

//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("")
	const [list, setList] = useState([]);


	return (
		<div className="container rounded">
			<h1 className="header display-1 mb-2 mt-5">todos</h1 >
			<div className="form shadow mb-5 bg-body rounded">
				<card className="list">
					<input
						className="input"
						type="text"
						onKeyDown={(event) => {
							if (event.key === "Enter" && inputValue.trim() !== "") {
								setList([...list, inputValue])
								setInputValue("")
							}
						}}
						onChange={(event) => setInputValue(event.target.value)}
						value={inputValue}
						placeholder="Add a New Task!" >
					</input>
				</card>
				<div className="list">
					{list.map((elementList, index) => {
						return <li key={index} className="todolist d-flex justify-content-between">
							{elementList}
							<button
								className="button d-flex"
								type="button"
								onClick={(event) => setList(list.filter((element, id) => { return index !== id }))
								}><i class="fa-regular fa-circle-xmark"></i></button>
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
