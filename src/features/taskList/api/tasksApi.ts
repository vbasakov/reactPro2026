import { baseApi } from 'shared/api'
import type { Task } from 'entities/tasks/model/types'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<Pick<Task, 'id' | 'title' | 'completed'>[], void>({
      query: () => 'todos',
      transformResponse: (response: Task[]) =>
        response.map(({ id, title, completed }) => ({
          id,
          title,
          completed
        })),
      providesTags: ['Tasks']
    })
  })
})

export const { useGetTasksQuery } = tasksApi