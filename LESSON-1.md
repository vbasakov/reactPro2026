# LESSON-1 — Feature-Sliced Design: список задач

Ветка: lesson-1

## Запуск

```bash
npm run build && npm run dev
```

## Чеклист

### 1. Проект по FSD (3 балла)

- [x] Проект запускается без ошибок — 1 балл
- [x] Структура `src/` по слоям FSD; в `app/` — `App.tsx` и `router.tsx` — 1 балл
- [x] ESLint и Prettier, алиасы импортов через `tsconfig` paths — 1 балл

### 2. Сущность Task (3 балла)

- [x] Тип `Task` и структура `entities/tasks/model/types.ts` — 1 балл
- [x] Презентационный `TaskCard` (props, без side-effects) — 1 балл
- [x] Стили через `TaskCard.module.css` — 1 балл

### 3. Список задач в features (3 балла)

- [x] Хук `useTasks`: фильтрация (`all` / `completed` / `incomplete`) и удаление — 1 балл
- [x] `TaskList` отображает отфильтрованные задачи — 1 балл
- [x] State-хук и проброс пропсов в `TaskCard` — 1 балл

### 4. Страница и виджет (2 балла)

- [x] `TaskPage` подключает виджет со списком задач — 1 балл
- [x] Читаемый модульный код, слои не смешаны — 1 балл

### Бонус (1 балл)

- [x] `FilterButton` вынесен в `shared` и используется в `TaskList` — 1 балл