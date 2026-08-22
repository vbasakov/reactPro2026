import { createBrowserRouter } from 'react-router-dom'
import { Layout } from 'app/Layout'
import { TaskPage } from 'pages/tasks'
import { RegistrationPage } from 'pages/registration'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <RegistrationPage />,
      },
      {
        path: '/tasks',
        element: <TaskPage />,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
    ],
  },
])
