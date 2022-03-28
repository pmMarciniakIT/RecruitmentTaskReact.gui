import React, { useState } from 'react'
import Constants from '../utilities/Constants'

export default function CreateForm(props) {
  const defaultData = Object.freeze({
    title: 'Test title',
    desc: 'Test description',
    deadline: new Date().toISOString().slice(0,10)
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

    const createTodo = {
      title: formData.title,
      description: formData.desc,
      deadlineDate: formData.deadline
    }

    const url = Constants.API_URL_CREATE_TODO;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createTodo)
    })
      .then(response => response.json())
      .then(todos => {
        console.log(todos);
        props.onTodoCreated(createTodo);
      })
      .catch((error) => {
        console.log(error);
        alert('Date is incorrect! Try again!');
      });

  };

  return (
    <div>
      <form>
        <h1>Create New Todo</h1>

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
          <input data-date-format="DD.MM.YYYY" value={formData.deadline} name='deadline' type='date' className='form-control' onChange={handleChange} />
        </div>

        <button className='btn btn-success btn-lg mt-5' onClick={submit}>Submit</button>
        <button className='btn btn-danger btn-lg mt-5' onClick={() => props.onToCreated(null)}>Cancel</button>
      </form>
    </div>
  )
}
