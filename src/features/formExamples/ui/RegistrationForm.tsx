import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registrationSchema, type RegistrationFormData } from 'features/formExamples/model/schema'

import styles from './RegistrationForm.module.css'

function FormInput({
  label,
  error,
  ...props
}: { label: string; error?: string } & Record<string, unknown> & {
  id?: string
  placeholder?: string
  type?: string
}) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label} htmlFor={props.id}>
        {label}
      </label>
      <input
        className={error ? styles.inputError : styles.input}
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
      />
      {error && (
        <span id={`${props.id}-error`} className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
  )
}

export function RegistrationForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onTouched',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      socialLinks: [{ id: crypto.randomUUID(), url: '' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  })

  const onSubmit = (data: RegistrationFormData) => {
    console.log('Form submitted:', data)
    alert('Форма успешно отправлена! Проверьте консоль.')
  }

  return (
    <form className={styles.registrationForm} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.formTitle}>Регистрация</h2>

      <FormInput
        id="username"
        label="Имя пользователя"
        error={errors.username?.message}
        {...register('username')}
      />

      <FormInput
        id="email"
        label="Email"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <FormInput
        id="password"
        label="Пароль"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />

      <FormInput
        id="confirmPassword"
        label="Подтверждение пароля"
        type="password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {/* Социальные ссылки */}
      <div className={styles.socialSection}>
        <h3 className={styles.socialTitle}>Социальные ссылки</h3>

        {fields.map((field, index) => (
          <div key={field.id} className={styles.socialField}>
            <input
              {...register(`socialLinks.${index}.url`)}
              placeholder="https://github.com/username"
              className={styles.input}
              aria-label={`Социальная ссылка ${index + 1}`}
            />
            {errors.socialLinks?.[index]?.url && (
              <span className={styles.errorText}>
                {errors.socialLinks[index]?.url?.message}
              </span>
            )}
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => remove(index)}
              aria-label={`Удалить ссылку ${index + 1}`}
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          className={styles.addButton}
          onClick={() => append({ id: crypto.randomUUID(), url: '' })}
        >
          Добавить ссылку
        </button>
      </div>

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}
