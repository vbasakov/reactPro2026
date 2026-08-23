# LESSON-5 — useRef

Ветка: lesson-5

## Запуск

```bash
npm run build && npm run dev
```

## Сделано

- Реализованы 4 базовых компонента в `features/refExamples`:
  - ClickTimer — таймер кликов через useRef
  - PreviousInput — хранение предыдущего значения через useRef
  - FocusTracker — фокус на DOM-элементе через ref
  - DebouncedLogger — debounce с таймером в useRef
- Бонус:
  - Debouncer — debounce-загрузка данных с AbortController через useRef

## Чеклист

### 1. ClickTimer (3 балла)
- [x] Время первого/последнего клика через useRef — 1 балл
- [x] Отображается количество кликов и время — 1 балл
- [x] Компоненты не перерисовываются при обновлении ref — 1 балл

### 2. PreviousInput (3 балла)
- [x] Предыдущее значение через useRef — 1 балл
- [x] При вводе отображается предыдущее значение — 1 балл
- [x] Нет лишней перерисовки при обновлении ref — 1 балл

### 3. FocusTracker (3 балла)
- [x] useRef<HTMLInputElement> для DOM-ссылки — 1 балл
- [x] Фокус переносится по клику на кнопку — 1 балл
- [x] Прямой вызов ref.current?.focus() — 1 балл

### 4. DebouncedLogger (3 балла)
- [x] Таймер debounce через useRef — 1 балл
- [x] Очистка предыдущего таймера при новом вводе — 1 балл
- [x] Логирование значения в консоль с задержкой 1с — 1 балл

### 5. Бонус: Debouncer (загрузка с debounce)
- [x] Debounce-загрузка через useRef (timerRef) — 1 балл
- [x] AbortController для отмены запросов через useRef (abortRef) — 1 балл
- [x] Индикатор загрузки и результат отображаются в UI — 1 балл

## Файловая структура

```
src/features/refExamples/          — фича: примеры useRef
  ├── model/
  │   └── types.ts                 — TypeScript типы
  ├── ui/
  │   ├── ClickTimer.tsx           — таймер кликов
  │   ├── ClickTimer.module.css
  │   ├── PreviousInput.tsx        — предыдущее значение
  │   ├── PreviousInput.module.css
  │   ├── FocusTracker.tsx         — фокус на DOM
  │   ├── FocusTracker.module.css
  │   ├── DebouncedLogger.tsx      — debounce-логгер
  │   ├── DebouncedLogger.module.css
  │   ├── Debouncer.tsx            — debounce-загрузка (бонус)
  │   └── Debouncer.module.css
  └── index.ts                     — barrel export

src/pages/refExamples/              — страница с примерами
  ├── ui/RefExamplesPage.tsx
  ├── ui/RefExamplesPage.module.css
  └── index.ts
```

## Замечания

- В ClickTimer используется `useReducer` для принудительного ререндера (так как задание требует отображать данные из `useRef`, а `useState` запрещён)
- В PreviousInput для отображения предыдущего значения в UI используется вспомогательный `useState` (само предыдущее значение хранится в `useRef`, а `useState` нужен только для триггера обновления UI)
