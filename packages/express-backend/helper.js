export const users = {
	users_list: [
    {
			id: "xyz789",
			name: "Charlie",
			job: "Janitor"
    },
    {
			id: "abc123",
			name: "Mac",
			job: "Bouncer"
    },
    {
			id: "ppp222",
			name: "Mac",
			job: "Professor"
    },
    {
			id: "yat999",
			name: "Dee",
			job: "Aspring actress"
    },
    {
			id: "zap555",
			name: "Dennis",
			job: "Bartender"
    }
	]
};
  
export const findUserByName = (name) => {
	return users["users_list"].filter(
		(user) => user["name"] === name
	);
};

export const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

export const addUser = (user) => {	
  users["users_list"].push(user);
  return user;
};

  