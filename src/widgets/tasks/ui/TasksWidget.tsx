import { TaskList } from 'features/taskList'

import styles from './TasksWidget.module.css'

export function TasksWidget() {
  return (
    <div className={styles.widget}>
      <h4>Это виджет со списком тасков</h4>
      <TaskList />
    </div>
  )
}
