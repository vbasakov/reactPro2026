import { FilterButton } from 'shared/filters'
import { TaskCard } from 'entities/tasks'
import { useTasks } from '../model/useTasks'

import styles from './TaskList.module.css'

export function TaskList() {
  const { tasks, filter, setFilter, removeTask } = useTasks()

  return (
    <div>
      <div className={styles.filters}>
        <FilterButton
          currentFilter={filter}
          handler={setFilter}
          targetFilter="all"
        />
        <FilterButton
          currentFilter={filter}
          handler={setFilter}
          targetFilter="completed"
        />
        <FilterButton
          currentFilter={filter}
          handler={setFilter}
          targetFilter="incomplete"
        />
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className={styles.taskRow}>
            <button onClick={() => removeTask(task.id)}>x</button>
            <TaskCard title={task.title} completed={task.completed} />
          </div>
        ))}
      </div>
    </div>
  )
}
