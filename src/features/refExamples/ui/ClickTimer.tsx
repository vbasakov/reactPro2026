/* eslint-disable react-hooks/refs */
import { useRef, useReducer } from 'react'

import styles from './ClickTimer.module.css'

export function ClickTimer() {
  const firstClickRef = useRef<Date | null>(null)
  const lastClickRef = useRef<Date | null>(null)
  const clickCountRef = useRef<number>(0)
  const [, forceUpdate] = useReducer((s: number) => s + 1, 0)

  const handleClick = () => {
    if (!firstClickRef.current) {
      firstClickRef.current = new Date()
    }
    lastClickRef.current = new Date()
    clickCountRef.current += 1

    // Принудительный ререндер для обновления отображения
    forceUpdate()
  }

  // Извлекаем значения из refs для рендера
  // Задание требует хранить данные через useRef, не через useState
  const count = clickCountRef.current
  const firstClick = firstClickRef.current
  const lastClick = lastClickRef.current

  return (
    <div className={styles.container}>
      <h3>ClickTimer</h3>
      <p>
        {'Все данные хранятся через useRef — ререндер только по клику'}
      </p>
      <button className={styles.button} onClick={handleClick}>
        Кликнуть
      </button>
      <div className={styles.stats}>
        <p>
          <strong>Количество кликов:</strong> {count}
        </p>
        <p>
          <strong>Первый клик:</strong>{' '}
          {firstClick?.toLocaleTimeString() ?? '—'}
        </p>
        <p>
          <strong>Последний клик:</strong>{' '}
          {lastClick?.toLocaleTimeString() ?? '—'}
        </p>
      </div>
    </div>
  )
}
