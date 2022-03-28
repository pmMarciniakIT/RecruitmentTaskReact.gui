import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function UpdateForm(props) {
  const defaultData = Object.freeze({
    id: props.todo.id,
    title: props.todo.title,
    desc: props.todo.description,
    deadline: props.todo.deadlineDate,
    create: props.todo.createdDate
  });
  const [formData, setFormData] = useState(defaultData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();

    const updateTodo = {
      id: props.todo.id,
      title: formData.title,
      description: formData.desc,
      deadlineDate: formData.deadline,
      createdDate: props.todo.createdDate
    }

    const url = Constants.API_URL_UPDATE_TODO;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateTodo)
    })
      .then(response => response.json())
      .then(todos => {
        console.log(todos);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
    props.onTodoUpdated(updateTodo);
  };

  return (
    <div>
      <form>
        <h1>Update Todo</h1>

        <div>
          <label>Task title</label>
          <input value={formData.title} name='title' type='text' className='form-control' onChange={handleChange} />
        </div>

        <div>
          <label>Task Description</label>
          <input value={formData.desc} name='desc' type='text' className='form-control' onChange={handleChange} />
        </div>

        <div>
          <label>Deadline Date</label>
          <input type="date" data-date-format="DD.MM.YYYY" value={formData.deadline} name='deadline' className='form-control' onChange={handleChange} />
        </div>

        <button className='btn btn-success btn-lg mt-5' onClick={submit}>Submit</button>
        <button className='btn btn-danger btn-lg mt-5' onClick={() => props.onTodoUpdated(null)}>Cancel</button>
      </form>
    </div>
  )
}
