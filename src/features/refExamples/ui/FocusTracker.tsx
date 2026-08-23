import { useRef } from 'react'

import styles from './FocusTracker.module.css'

export function FocusTracker() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    inputRef.current?.focus()
  }

  const handleBlur = () => {
    inputRef.current?.blur()
  }

  return (
    <div className={styles.container}>
      <h3>FocusTracker</h3>
      <p>
        {'Прямой доступ к DOM через useRef<HTMLInputElement>'}
      </p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleFocus}>
          Фокус на поле
        </button>
        <button className={styles.button} onClick={handleBlur}>
          Снять фокус
        </button>
      </div>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        placeholder="Нажмите 'Фокус на поле'..."
      />
    </div>
  )
}
