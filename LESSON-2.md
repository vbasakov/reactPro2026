# LESSON-2 — Оптимизация рендеров: memo, useMemo, useCallback

Ветка: lesson-2

## Запуск

```bash
npm run build && npm run dev
```

## Чеклист

### 1. Оптимизация TaskCard с React.memo (3 балла)

- [x] Компонент обёрнут в `React.memo` — 1 балл
- [x] Поведение корректное, props не создаются заново — 1 балл
- [x] Код читаемый и чистый — 1 балл

`TaskCard` экспортируется как `memo`-компонент из `entities/tasks/ui/TaskCard.tsx`. В `TaskList` передаются примитивные props (`id`, `title`, `completed`).

### 2. Мемоизация списка задач с useMemo (3 балла)

- [x] `useMemo` применяется для фильтрации — 1 балл
- [x] UI обновляется корректно — 1 балл
- [x] Поведение не ломается — 1 балл

В `useTasks.ts` отфильтрованный список вычисляется через `useMemo` с зависимостями `[filter, tasks]`. Фильтры `all` / `completed` / `incomplete` и удаление задач работают корректно.

### 3. Мемоизация функций с useCallback (3 балла)

- [x] Используется `useCallback` — 1 балл
- [x] Функции корректно передаются — 1 балл
- [x] Поведение не ломается — 1 балл

`removeTask` обёрнута в `useCallback` и используется в `TaskList` при удалении задачи.

### Бонус: анализ производительности через DevTools (3 балла)

- [ ] Есть скриншот работы с Profiler — 1 балл
- [ ] Есть комментарии к скриншоту с пояснениями — 1 балл
- [ ] Есть анализ 2+ компонентов — 1 балл

## Ключевые файлы

- `src/entities/tasks/ui/TaskCard.tsx` — `memo`-компонент карточки задачи
- `src/features/taskList/model/useTasks.ts` — `useMemo`, `useCallback`, state
- `src/features/taskList/ui/TaskList.tsx` — список задач и фильтры

## Не сделано / вопросы

- Бонусное профилирование: скриншот React DevTools Profiler и наблюдения в `README.md`
