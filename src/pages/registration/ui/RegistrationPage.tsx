import { RegistrationForm } from 'features/formExamples'

import styles from './RegistrationPage.module.css'

export function RegistrationPage() {
  return (
    <div className={styles.page}>
      <RegistrationForm />
    </div>
  )
}
