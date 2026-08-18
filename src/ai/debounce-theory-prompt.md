# Спецификация: Генерация `src/ai/debounce-theory.md`

> Это вспомогательная спецификация. **НЕ** выполнять напрямую, а использовать из `prompt5.md` раздел 5.

---

## Что сделать

Создай файл `src/ai/debounce-theory.md` с подробным объяснением Debounce-паттерна в контексте использования `useRef`.

> **Важно:** этот файл только для справки, его НЕ включать в коммит. Он создаётся как дополнительный учебный материал.

---

## Структура файла

```markdown
# Debounce в React: теория и практика с useRef

## Что такое Debounce?

**Debounce (дебаунс)** — паттерн, который предотвращает многократное выполнение функции при частых вызовах. Вместо выполнения на каждый вызов, функция выполняется один раз с задержкой после серии вызовов.

### Аналогия из жизни
Представь, что ты сидишь на стуле рядом с дверью. Каждый раз, когда кто-то стучит, ты встаёшь и идёшь открывать. Если кто-то стучит 10 раз подряд — ты бегашь 10 раз. Это **без debounce**.

С **debounce** ты говоришь: "Я подожду 1 секунду после последнего стука, и только потом открою дверь". Если за эту секунду постучали ещё раз — таймер сбрасывается. Дверь откроется только когда все перестанут стучать и пройдёт 1 секунда.

### Где применяется
- **Поиск с автодополнением** — не отправлять запрос на сервер при каждой букве
- **Изменение размера окна** (`window.resize`) — не пересчитывать layout при каждом пикселе
- **Отправка формы** — предотвратить двойную отправку при двойном клике
- **Сохранение черновика** — автосохранение текста через 1 сек после прекращения ввода
- **Фильтрация списка** — не обновлять список при каждом символе

## Почему useRef для Debounce?

Когда ты используешь `setTimeout`, тебе нужно сохранить ID таймера между рендерами, чтобы:
1. Очистить предыдущий таймер при новом вводе
2. Очистить таймер при размонтировании компонента

Если хранить таймер в `useState` — каждый `setTimeout` вызовет ререндер. Это лишняя работа для React.

```tsx
// ❌ Плохо: useState вызывает ререндер при каждом изменении
const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
timerRef.current = setTimeout(() => { ... });
setTimer(timerRef.current); // ререндер!

// ✅ Хорошо: useRef не вызывает ререндер
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
timerRef.current = setTimeout(() => { ... });
```

## Практическая реализация

### 1. Базовый debounce с useRef
```tsx
import { useRef, useEffect, useState } from 'react';

function DebouncedInput({ debounceMs = 1000, children }: Props) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [value, setValue] = useState('');

  const handleChange = (newValue: string) => {
    setValue(newValue);
    
    // Очищаем предыдущий таймер
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Создаём новый
    timerRef.current = setTimeout(() => {
      console.log('Отправляем:', newValue);
    }, debounceMs);
  };

  // cleanup: чистим таймер при размонтировании
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return children({ value, onChange: handleChange });
}
```

### 2. Debounce + HTTP-запрос с AbortController
```tsx
import { useRef, useState, useCallback } from 'react';

function DebouncedSearch({ debounceMs = 1000 }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const search = useCallback(async (searchQuery: string) => {
    // Отменяем предыдущий запрос
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?q=${searchQuery}`,
        { signal: controller.signal }
      );
      const data = await response.json();
      setResults(data);
    } catch (e) {
      if (e.name !== 'AbortError') {
        console.error('Search failed:', e);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);

    // Debounce
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      search(newValue);
    }, debounceMs);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  return (
    <div>
      <input value={query} onChange={handleInputChange} />
      {isLoading && <span>Загрузка...</span>}
      <ul>
        {results.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 3. Custom hook: useDebounce

Можно вынести debounce-логику в хук:

```tsx
import { useRef, useEffect, useState, useCallback } from 'react';

function useDebounce<T>(
  value: T,
  deps: unknown[],
  delay: number
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, ...deps]);

  return debouncedValue;
}

// Использование
function SearchInput() {
  const [inputValue, setInputValue] = useState('');
  const debouncedQuery = useDebounce(inputValue, [], 1000);

  useEffect(() => {
    if (debouncedQuery) {
      fetchResults(debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={inputValue} onChange={e => setInputValue(e.target.value)} />;
}
```

## useRef vs useState для Debounce

| Что | useRef | useState | Почему? |
|-----|--------|----------|---------|
| Таймер `setTimeout` | ✅ | ❌ | Не нужен ререндер при каждом обновлении таймера |
| AbortController | ✅ | ❌ | Не нужен ререндер при отмене запроса |
| Значение инпута | ❌ | ✅ | Нужно обновлять UI при вводе |
| Результат запроса | ❌ | ✅ | Нужно обновлять UI с результатами |
| Состояние загрузки | ❌ | ✅ | Нужно показывать/скрывать спиннер |
| Debounced значение (хук) | ❌ | ✅ | Нужно триггерить effect при изменении |

## Типичные ошибки

### 1. Забыл cleanup в useEffect
```tsx
// ❌ Утечка: таймер не чистится при размонтировании
useEffect(() => {
  timerRef.current = setTimeout(() => { ... }, 1000);
}, [value]);

// ✅ Правильно: чистим таймер
useEffect(() => {
  timerRef.current = setTimeout(() => { ... }, 1000);
  return () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };
}, [value]);
```

### 2. useState для таймера
```tsx
// ❌ Ререндер при каждом setTimeout
const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
const newTimer = setTimeout(() => { ... }, 1000);
setTimer(newTimer);

// ✅ useRef: без ререндера
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
timerRef.current = setTimeout(() => { ... }, 1000);
```

### 3. Не отменяешь предыдущий запрос
```tsx
// ❌ При быстром вводе: 5 запросов, последний может вернуться первым
fetch(`/api/search?q=${query}`).then(setData);

// ✅ Отменяем предыдущий через AbortController
const controller = new AbortController();
abortRef.current = controller;
fetch(`/api/search?q=${query}`, { signal: controller.signal }).then(setData);
```

### 4. Хранение inputValueRef
```tsx
// ❌ Состояние устаревает в setTimeout callback
const [inputValue, setInputValue] = useState('');
setTimeout(() => {
  console.log(inputValue); // старое значение!
}, 1000);

// ✅ useRef всегда актуален
const inputValueRef = useRef(inputValue);
inputValueRef.current = inputValue;
setTimeout(() => {
  console.log(inputValueRef.current); // актуальное значение!
}, 1000);
```

## Связь с заданием: почему useRef — правильный выбор для Debounce?

В задании 5 используется `useRef` для debounce, потому что:

1. **Таймер не часть UI** — нам не нужно, чтобы компонент ререндерился при каждом `setTimeout`
2. **Таймер живёт дольше рендера** — `useRef` сохраняет значение между рендерами без триггера обновления
3. **Cleanup при размонтировании** — `useRef` + `useEffect` cleanup = безопасная очистка ресурсов
4. **AbortController** — тоже хранится в `useRef`, чтобы не вызывать ререндер при отмене HTTP-запроса
5. **inputValueRef** — актуальное значение инпута доступно в асинхронных колбеках (setTimeout, fetch callback)

Без `useRef` пришлось бы использовать `useState`, что привело бы к избыточным ререндерам.
```

---

**Требования к `debounce-theory.md`:**
- Подробное объяснение debounce-паттерна с аналогиями из жизни
- Примеры кода от простого к сложному (базовый debounce → debounce + fetch → debounce + AbortController → custom hook)
- Таблица `useRef vs useState` в контексте debounce
- Типичные ошибки и как их избежать
- Связь с заданием: почему `useRef` — правильный выбор для debounce и загрузки данных
