import { createBrowserRouter } from 'react-router-dom'
import { Layout } from 'app/Layout'
import { TaskPage } from 'pages/tasks'
import { RegistrationPage } from 'pages/registration'
import { RefExamplesPage } from 'pages/refExamples'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <RefExamplesPage />,
      },
      {
        path: '/tasks',
        element: <TaskPage />,
      },
     {
       path: '/registration',
       element: <RegistrationPage />,
     },
      {
        path: '/ref-examples',
        element: <RefExamplesPage />,
      },
    ],
  },
])
