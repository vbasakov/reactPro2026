import { useRef, useEffect, useState } from 'react'

import styles from './DebouncedLogger.module.css'

export function DebouncedLogger() {
  const [value, setValue] = useState<string>('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      console.log('Debounced value:', value)
    }, 1000)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [value])

  return (
    <div className={styles.container}>
      <h3>DebouncedLogger</h3>
      <p>
        Таймер debounce хранится через useRef — логирование с задержкой 1 секунда
      </p>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="text"
          placeholder="Введите текст..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <p className={styles.info}>
        Значение логируется в консоль через 1 секунду после последнего ввода
      </p>
    </div>
  )
}
