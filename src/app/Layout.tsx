import { Link, Outlet, useLocation } from 'react-router-dom'

import styles from './Layout.module.css'

export function Layout() {
  const location = useLocation()

  return (
    <div className={styles.layout}>
      <nav className={styles.nav}>
        <Link
          to="/tasks"
          className={location.pathname === '/tasks' ? styles.active : undefined}
        >
          Таски
        </Link>
        <span className={styles.separator}>|</span>
        <Link
          to="/registration"
          className={location.pathname === '/registration' ? styles.active : undefined}
        >
          Регистрация
        </Link>
      </nav>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
