import { TasksWidget } from 'widgets/tasks'

import styles from './TaskPage.module.css'

export function TaskPage() {
  return (
    <div className={styles.baseLayout}>
      <h1>Мои задачи</h1>
      <TasksWidget />
    </div>
  )
}
