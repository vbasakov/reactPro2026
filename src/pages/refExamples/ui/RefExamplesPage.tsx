import { ClickTimer, PreviousInput, FocusTracker, DebouncedLogger, Debouncer } from 'features/refExamples'

import styles from './RefExamplesPage.module.css'

export function RefExamplesPage() {
  return (
    <div className={styles.container}>
      <h1>Задание 5 — useRef в React</h1>

      <section className={styles.section}>
        <ClickTimer />
      </section>

      <section className={styles.section}>
        <PreviousInput />
      </section>

      <section className={styles.section}>
        <FocusTracker />
      </section>

      <section className={styles.section}>
        <DebouncedLogger />
      </section>

      <section className={styles.section}>
        <Debouncer />
      </section>
    </div>
  )
}
