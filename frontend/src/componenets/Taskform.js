// import { create } from 'domain'
import React from 'react'

export const Taskform = ({createTask,name,handleInputChange,isEditing,updateTask}) => {
  return (
    <form className='task-form' 
    // onSubmit={createTask}
onSubmit={isEditing?updateTask:createTask}
    isEditing={isEditing} >
    <input type='text' placeholder='add a task' name="name" value={name} onChange={handleInputChange} />
       <button type='submit'>
{isEditing?"Edit":"Add"}
       </button>
       
        </form>
  )
}
