import { z } from 'zod'

export const socialLinkItemSchema = z.object({
  id: z.string(),
  url: z.string().url('Некорректный URL').min(1, 'Ссылка обязательна'),
})

export const registrationSchema = z.object({
  username: z.string().min(1, 'Имя пользователя обязательно').min(2, 'Минимум 2 символа'),
  email: z.string().email('Некорректный email').min(1, 'Email обязателен'),
  password: z.string().min(1, 'Пароль обязателен').min(6, 'Минимум 6 символов'),
  confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
  socialLinks: z.array(socialLinkItemSchema).min(1, 'Добавьте хотя бы одну ссылку'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
})

export type RegistrationFormData = z.infer<typeof registrationSchema>
