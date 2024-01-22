/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContext'
import { useNavigate, useParams } from 'react-router'

const TasksPage = () => {

  const { register, handleSubmit, setValue } = useForm()
  const { createTasks, getTask, updateTask } = useTasks();
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id)
        setValue('title', task.title)
        setValue('description', task.description)
      }
    }
    loadTask()
  }, [])

  const handleTasks = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data)
    } else {
      createTasks(data)
    }
    navigate('/tasks')
  })

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form action="" onSubmit={handleTasks}>
        <input type="text" placeholder='Title' {...register("title")} autoFocus className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
        <textarea rows="3" placeholder='Description' {...register('description')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'></textarea>
        <button>Save</button>
      </form>
    </div>
  )
}

export default TasksPage