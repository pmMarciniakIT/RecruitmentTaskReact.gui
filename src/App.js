import React, { useState } from "react";
import Constants from "./utilities/Constants";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";

export default function App() {

  const [todos, setTodo] = useState([]);
  const [newTodoAdd, setNewTodoAdd] = useState(false);
  const [updateTodo, setUpdateTodo] = useState(null);

  function getTodos() {
    const url = Constants.API_URL_GET_ALL_TODOS;

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(todos => {
        console.log(todos);
        setTodo(todos);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteTodo(id) {
    const url = `${Constants.API_URL_DELETE_TODO}/${id}`;

    fetch(url, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(todos => {
        onTodoDeleted(todos);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {newTodoAdd === false && updateTodo === null && renderHeader()}

          {(todos.length > 0 && newTodoAdd === false && updateTodo === null) && renderTodosTabel()}

          {newTodoAdd && <CreateForm onTodoCreated={onTodoCreated} />}

          {updateTodo !== null && <UpdateForm todo={updateTodo} onTodoUpdated={onTodoUpdated} />}
        </div>
      </div>
    </div>
  );

  function renderHeader() {
    return (
      <div>
        <h1>Recruitment task gui</h1>
        <div className="mt-5">
          <button onClick={getTodos} className="btn btn-primary btn-lg w-100">Get All Todos</button>
          <button onClick={() => { setNewTodoAdd(true); }} className="btn btn-success btn-lg w-100 mt-5">Add new Todo</button>
        </div>
      </div>
    )
  }

  function renderTodosTabel() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Created Date</th>
              <th scope="col">Deadline Date</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) =>
            (
              <tr key={todo.id}>
                <th scope="row">{todo.id}</th>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.createdDate}</td>
                <td style={{ color: todo.isExpired ? 'white' : 'black', backgroundColor: todo.isExpired ? 'red' : 'white' }}>{todo.deadlineDate}</td>
                <td>
                  <button onClick={() => setUpdateTodo(todo)} className="btn btn-secondary btn-lg mx-3 my-3" >Edit</button>
                  <button onClick={() => { if (window.confirm("Are you sure?")) deleteTodo(todo.id) }} className="btn btn-danger btn-lg" >Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  function onTodoCreated(createdTodo) {
    setNewTodoAdd(false);

    if (createdTodo === null) {
      return;
    }

    alert("New todo will be created!");
    getTodos();
  }

  function onTodoUpdated(updatedTodo) {
    setUpdateTodo(null);

    if (updatedTodo === null) {
      return;
    }

    alert("Todo will be updated!");
    getTodos();
  }

  function onTodoDeleted(deletedId) {
    if (deletedId === null) {
      return;
    }

    alert("Todo will be deleted!");
    getTodos();
  }
}

