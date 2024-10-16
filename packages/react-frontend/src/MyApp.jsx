// src/MyApp.jsx
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";
  
function MyApp() {
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		fetchUsers()
			.then((res) => res.json())
			.then((json) => setCharacters(json["users_list"]))
			.catch((error) => { console.log(error); });
	  }, [] );

	function postUser(person) {
		const promise = fetch("http://localhost:8000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(person),
		});

		return promise;
	}

	function removeOneCharacter(index) {
		fetch(`http://localhost:8000/users/${characters[index].id}`, {
			method: 'DELETE'
		})
			.then((response) => {
				if (response.ok) {
					const updated = characters.filter((_, i) => i !== index);
					setCharacters(updated);
				}
			})
			.catch((error) => {
				console.error(error);
			});
  }

	function updateList(person) { 
    postUser(person)
			.then((response) => response.json())
      .then((newPerson) => setCharacters([...characters, newPerson]))
      .catch((error) => {
        console.log(error);
      })
	}

	function fetchUsers() {
		return fetch("http://localhost:8000/users");
	}

	return (
		<div className="container">
			<Table
				characterData={characters}
				removeCharacter={removeOneCharacter}
			/>
			<Form handleSubmit={updateList} />
		</div>
	);
}

export default MyApp;