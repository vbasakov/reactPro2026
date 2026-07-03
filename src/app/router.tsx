import { createBrowserRouter } from 'react-router-dom'
import { TaskPage } from 'pages/tasks'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <TaskPage />,
  },
])
