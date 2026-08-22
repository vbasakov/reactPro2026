import { memo } from 'react'

import type { Task } from '../model/types'
import styles from './TaskCard.module.css'

export const TaskCard = memo(function TaskCard({ title, completed }: Pick<Task, 'title' | 'completed'>) {
  return (
    <div
      className={completed ? styles.completedTask : styles.incompletedTask}
    >
      {title}
    </div>
  )
})
