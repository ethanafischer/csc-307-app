import express from "express";
import cors from "cors";
import { users, findUserByName, findUserById, addUser, deleteUserById } from "./helper.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  let result = users["users_list"];

  if (name != undefined) {
    result = result.filter(user => user.name === name);
  }

  if (job != undefined) {
    result = result.filter(user => user.job === job);
  }

  res.send({ users_list: result });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.delete('/users/:id', (req, res) => {
  const id = req.params["id"];
  deleteUserById(id);
  res.send();
})

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});