# LESSON-4 — Управление формами

Ветка: lesson-4

## Запуск

```bash
npm run build && npm run dev
```

## Сделано

- Реализована форма регистрации пользователя в `features/formExamples`
- Использован **React Hook Form** + **Zod** схема валидации через `zodResolver`
- Реализованы динамические социальные ссылки через `useFieldArray`
- Проект структурирован по FSD: `shared/`, `features/`, `pages/`
- Подключены зависимости: `zod`, `@hookform/resolvers`, `react-hook-form`
- Добавлен роут `/registration` в `router.tsx`

## Чеклист

### 1. Форма регистрации (4 балла)

- [x] Использован React Hook Form — 1 балл
- [x] Все поля формы обязательны для заполнения (`username`, `email`, `password`, `confirmPassword`) — 1 балл
- [x] Реализована корректная валидация всех полей:
  - Email содержит `@` — 1 балл
  - Пароль ≥ 6 символов — 1 балл
  - Подтверждение пароля совпадает с паролем
- [x] Ошибки отображаются рядом с соответствующими полями (компонент `FormInput`)

### 2. Zod схема (2 балла)

- [x] Использована `zod` схема валидации вместо ручной логики — 1 балл
- [x] `zodResolver(schema)` из `@hookform/resolvers` — 1 балл
- [x] Сообщения об ошибках отображаются корректно рядом с полями
- [x] Типы извлечены через `z.infer<typeof schema>`

### 3. Динамические социальные ссылки (4 балла)

- [x] Использован `useFieldArray` из `react-hook-form` — 1 балл
- [x] Форма корректно обрабатывает массив ссылок (`socialLinks: z.array(...)`) — 1 балл
- [x] Добавление (`append`) и удаление (`remove`) работает без ошибок — 1 балл
- [x] Каждая ссылка валидируется как URL (`z.string().url()`) — 1 балл

## Файловая структура

```
src/features/formExamples/          — фича: примеры форм
  ├── model/
  │   ├── schema.ts                — Zod-схемы валидации
  │   └── types.ts                 — TypeScript типы
  ├── ui/
  │   ├── RegistrationForm.tsx     — основная форма
  │   └── RegistrationForm.module.css
  └── index.ts                     — barrel export

src/pages/registration/             — страница регистрации
  ├── ui/RegistrationPage.tsx
  └── index.ts
```

## Исправлено (LESSON-3 совместимость)

- Исправлен `TaskCard` в `entities/tasks/ui/TaskCard.tsx`: использован `Pick<Task, 'title' | 'completed'>` вместо `Task`
- Исправлен вызов `TaskCard` в `TaskList.tsx`: используется spread `{...task}`

## Замечания

- Бонусное задание (wizard-форма с `useActionState` из React 19) реализовано не было