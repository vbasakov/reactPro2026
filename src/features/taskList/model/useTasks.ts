import { useState, useMemo, useCallback } from 'react'
import type { Task } from 'entities/tasks'
import type { Filter } from 'shared/filters'

export type UseTasksHook = {
  tasks: Task[] // отфильтрованные задачи
  filter: Filter // текущий фильтр
  setFilter: (f: Filter) => void // смена фильтра
  removeTask: (id: string) => void // удаление задачи по ID
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Completed task',
    completed: true,
  },
  {
    id: '2',
    title: 'Incompleted task',
    completed: false,
  },
  {
    id: '3',
    title: 'Another completed task',
    completed: true,
  },
]

export function useTasks(): UseTasksHook {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState<Filter>('all')

  const filteredTasks = useMemo(() => {
      return tasks.filter((task) => {
        if (filter === 'incomplete') return !task.completed
        if (filter === 'completed') return task.completed
        return true //all
      })
    }, [filter, tasks])

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  return { tasks: filteredTasks, filter, setFilter, removeTask }
}