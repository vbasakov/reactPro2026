# Debounce-паттерн с useRef

## Что такое Debounce?

Debounce (дебаунс) — техника, которая гарантирует, что функция будет вызвана не чаще чем один раз за определённый интервал времени. Если новая попытка вызова происходит до истечения интервала, предыдущий таймер отменяется и запускается заново.

## Зачем useRef для debounce?

При debounce-логике нам нужно хранить таймер между рендерами, но изменение таймера НЕ должно вызывать перерисовку компонента. `useRef` идеально подходит:

- Значение хранится между рендерами ✅
- Изменение `ref.current` не вызывает ререндер ✅
- Таймер нужно очищать при каждом новом вводе ✅

## Реализация

### Базовый debounce с useRef

```tsx
import { useRef, useEffect, useState } from 'react'

function DebouncedInput({ delay = 1000 }: { delay?: number }) {
  const [value, setValue] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Очищаем предыдущий таймер
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    // Запускаем новый
    timerRef.current = setTimeout(() => {
      console.log('Debounced value:', value)
      // Здесь можно вызвать API
    }, delay)

    // Cleanup при размонтировании или изменении value
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [value, delay])

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Введите текст..."
    />
  )
}
```

### AbortController для отмены HTTP-запросов

При debounce-загрузке на сервер важно отменять предыдущие запросы:

```tsx
import { useRef, useState } from 'react'

function DebouncedSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const search = async (searchQuery: string) => {
    // Отменяем предыдущий запрос
    if (abortRef.current) {
      abortRef.current.abort()
    }

    // Очищаем debounce-таймер
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setIsLoading(true)

    // Debounce
    timerRef.current = setTimeout(async () => {
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}`,
          { signal: controller.signal }
        )
        const data = await response.json()
        setResults(data)
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return // Запрос отменён — не обрабатываем
        }
        console.error('Search failed:', err)
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
    <div>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          search(e.target.value)
        }}
      />
      {isLoading && <span>Загрузка...</span>}
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
```

## Ключевые паттерны

### 1. Таймер в useRef
```tsx
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
```

### 2. AbortController в useRef
```tsx
const abortRef = useRef<AbortController | null>(null)
```

### 3. Значение инпута в useRef (для асинхронных колбеков)
```tsx
const inputValueRef = useRef<string>('')

useEffect(() => {
  inputValueRef.current = inputValue
}, [inputValue])

// В асинхронном колбеке
const query = inputValueRef.current
```

### 4. Cleanup при размонтировании
```tsx
useEffect(() => {
  return () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (abortRef.current) abortRef.current.abort()
  }
}, [])
```

## useRef vs useState для debounce

| Подход | Ререндер | Подходит |
|--------|----------|----------|
| `useState` для таймера | ✅ Каждый setTimer | ❌ Бессмысленно |
| `useRef` для таймера | ❌ Нет | ✅ Идеально |

## Итог

- `useRef` хранит таймер без ререндеров
- `AbortController` отменяет предыдущие HTTP-запросы
- `useEffect` с cleanup гарантирует отсутствие утечек
- Значение инпута можно хранить в отдельном `useRef` для асинхронного доступа
