import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Task } from 'entities/tasks'
import type { Filter } from 'shared/filters'
import { useGetTasksQuery } from '../api/tasksApi'

export type UseTasksHook = {
  tasks: Pick<Task, 'id' | 'title' | 'completed'>[] // отфильтрованные задачи
  filter: Filter // текущий фильтр
  setFilter: (f: Filter) => void // смена фильтра
  removeTask: (id: number) => void // удаление задачи по ID
}

export function useTasks(): UseTasksHook {
  // Загрузка данных через RTK Query
  const { data: remoteTasks } = useGetTasksQuery(undefined, {
    pollingInterval: 0,
  })

  // Локальное состояние для задач
  const [localTasks, setLocalTasks] = useState<Pick<Task, 'id' | 'title' | 'completed'>[]>([])

  // Копируем задачи один раз при первой загрузке remoteTasks
  // localTasks.length === 0 — защита от повторного копирования
  useEffect(() => {
    if (remoteTasks && remoteTasks.length > 0 && localTasks.length === 0) {
      setLocalTasks(remoteTasks)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Фильтр
  const [filter, setFilter] = useState<Filter>('all')

  // Фильтрация
  const filteredTasks = useMemo(() => {
    return localTasks.filter((task) => {
      if (filter === 'incomplete') return !task.completed
      if (filter === 'completed') return task.completed
      return true
    })
  }, [localTasks, filter])

  // Локальное удаление (только для задач, которые были загружены)
  const removeTask = useCallback((id: number) => {
    setLocalTasks((prev) => prev.filter((task) => task.id !== id))
  }, [])

  return { tasks: filteredTasks, filter, setFilter, removeTask }
}