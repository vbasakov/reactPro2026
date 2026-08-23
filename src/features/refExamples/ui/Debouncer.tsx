import { useRef, useState, useEffect } from 'react'

import styles from './Debouncer.module.css'

interface Post {
  id: number
  title: string
}

export function Debouncer() {
  const [inputValue, setInputValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [data, setData] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const inputValueRef = useRef<string>('')

  useEffect(() => {
    inputValueRef.current = inputValue
  }, [inputValue])

  const handleLoad = () => {
    const query = inputValueRef.current.trim()
    if (!query) return

    // Отменяем предыдущий запрос
    if (abortRef.current) {
      abortRef.current.abort()
    }

    // Очищаем предыдущий debounce-таймер
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setIsLoading(true)
    setError(null)

    // Debounce 1 секунда
    timerRef.current = setTimeout(async () => {
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        const allPosts: Post[] = await response.json()
        // Фильтруем посты по совпадению title с запросом
        const filtered = allPosts.filter((post) =>
          post.title.toLowerCase().includes(query.toLowerCase())
        )

        setData(filtered.slice(0, 20))
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          // Запрос был отменён — не показываем ошибку
          return
        }
        setError(err instanceof Error ? err.message : 'Unknown error')
        setData([])
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (abortRef.current) abortRef.current.abort()
    }
  }, [])

  return (
    <div className={styles.container}>
      <h3>Debouncer — debounce-загрузка данных</h3>
      <p>
        Практическое применение useRef: debounce-таймер + AbortController для отмены запросов
      </p>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="text"
          placeholder="Введите запрос для поиска..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={handleLoad}
          disabled={isLoading || !inputValue.trim()}
        >
          {isLoading ? 'Загрузка...' : 'Загрузить'}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {isLoading && <p className={styles.loading}>Загрузка...</p>}
      {data.length > 0 && (
        <ul className={styles.list}>
          {data.map((post) => (
            <li key={post.id} className={styles.listItem}>
              <strong>#{post.id}</strong> {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
