# LESSON-3 — Advanced Redux: RTK Query и удаление задач

Ветка: lesson-3

## Запуск

```bash
npm run build && npm run dev
```

## Сделано

- Реализована загрузка задач через RTK Query с `jsonplaceholder.typicode.com/todos`
- Задачи отображаются в интерфейсе через `TaskList` + `TaskCard`
- Реализовано локальное удаление задач (без запросов на сервер)
- Создан общий `baseApi` с `injectEndpoints` для модульной архитектуры
- Проект структурирован по FSD: `shared/`, `entities/`, `features/`, `widgets/`, `pages/`

## Чеклист

### 1. API-модуль через RTK Query (3 балла)

- [x] Создан `tasksApi` в `features/taskList/api/tasksApi.ts` через `injectEndpoints` + `fetchBaseQuery` — 1 балл
- [x] Загрузка задач с `https://jsonplaceholder.typicode.com/todos` проходит без ошибок — 1 балл
- [x] Endpoint `getTasks` использует `transformResponse` для получения массива `todos`; экспортируется хук `useGetTasksQuery` — 1 балл

### 2. Отображение задач в интерфейсе (3 балла)

- [x] Реализован хук `useTasks`, в котором данные загружаются через `useGetTasksQuery` — 1 балл
- [x] Загруженные задачи отображаются в интерфейсе (список из `TaskCard`) — 1 балл
- [x] Код структурирован по FSD: типы в `model/`, API в `api/`, UI в `ui/` — 1 балл

### 3. Локальное удаление задачи (3 балла)

- [x] `useEffect` используется для однократного копирования загруженных задач в локальное состояние (`useState`) — 1 балл
- [x] Реализована функция `removeTask(id: number)` без запросов на сервер — 1 балл
- [x] После удаления задача исчезает из UI — 1 балл

### Бонус (3 балла) — общий `baseApi` + `injectEndpoints`

- [x] Создан общий `baseApi` в `shared/api/baseApi.ts` с `reducerPath: 'api'`, `baseUrl` и `tagTypes` (включая `'Tasks'`) — 1 балл
- [x] `tasksApi` переписан на `baseApi.injectEndpoints(...)`; `getTasks` корректно возвращает `Task[]` — 1 балл
- [x] В `store` подключены `baseApi.reducer` и `baseApi.middleware` ровно один раз — 1 балл
