import type { Task } from '../model/types'
import styles from './TaskCard.module.css'

type Props = {
  task: Task
}

export function TaskCard({ task }: Props) {
  return (
    <div
      className={task.completed ? styles.completedTask : styles.incompletedTask}
    >
      {task.title}
    </div>
  )
}
