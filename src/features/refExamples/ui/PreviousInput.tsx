import { useRef, useState, useEffect } from 'react'

import styles from './PreviousInput.module.css'

export function PreviousInput() {
  const [value, setValue] = useState<string>('')
  const [previousDisplay, setPreviousDisplay] = useState<string>('')
  const previousValueRef = useRef<string>('')

  useEffect(() => {
    const prev = previousValueRef.current
    previousValueRef.current = value

    // Компонент НЕ перерисовывается при обновлении ref
    // Отображение предыдущего значения через стейт только при необходимости
    if (prev !== value) {
      setPreviousDisplay(prev)
    }
  }, [value])

  return (
    <div className={styles.container}>
      <h3>PreviousInput</h3>
      <p>
        Предыдущее значение хранится через useRef — компонент не
        перерисовывается при его обновлении
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
      <div className={styles.stats}>
        <p>
          <strong>Текущее значение:</strong> {value || '—'}
        </p>
        <p>
          <strong>
            {'Предыдущее (из useRef): '}
          </strong>
          {previousDisplay || '—'}
        </p>
      </div>
    </div>
  )
}
